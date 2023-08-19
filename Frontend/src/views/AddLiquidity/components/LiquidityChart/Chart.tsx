import { max, scaleLinear, ZoomTransform } from 'd3'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChartEntry, LiquidityChartRangeInputProps } from './types'
import { Area } from './Area'
import { Line } from './Line'
import { Brush } from './Brush'
import { AxisBottom } from './AxisBottom'
import Zoom from './Zoom'
import { Bound } from 'state/mint/v3/actions'
import { Flex, Text } from 'components/uikit'
import { CHART_DESKTOP_HEIGHT } from '.'

const xAccessor = (d: ChartEntry) => d.price0
const yAccessor = (d: ChartEntry) => d.activeLiquidity

const Chart = ({
  id = 'liquidityChartRangeInput',
  data: { series, current },
  ticksAtLimit,
  feeAmount,
  currencyA,
  currencyB,
  styles,
  dimensions: { width, height },
  margins,
  interactive = true,
  brushDomain,
  brushLabels,
  onBrushDomainChange,
  zoomLevels,
}: LiquidityChartRangeInputProps) => {
  const zoomRef = useRef<SVGRectElement | null>(null)

  const [zoom, setZoom] = useState<ZoomTransform | null>(null)

  const [innerHeight, innerWidth] = useMemo(
    () => [height - margins.top - margins.bottom, width - margins.left - margins.right],
    [width, height, margins],
  )

  const { xScale, yScale } = useMemo(() => {
    const scales = {
      xScale: scaleLinear()
        .domain([current * zoomLevels.initialMin, current * zoomLevels.initialMax] as number[])
        .range([0, innerWidth]),
      yScale: scaleLinear()
        .domain([0, max(series, yAccessor)] as number[])
        .range([innerHeight, 0]),
    }

    if (zoom) {
      const newXscale = zoom.rescaleX(scales.xScale)
      scales.xScale.domain(newXscale.domain())
    }

    return scales
  }, [current, zoomLevels.initialMin, zoomLevels.initialMax, innerWidth, series, innerHeight, zoom])

  useEffect(() => {
    // reset zoom as necessary
    setZoom(null)
  }, [zoomLevels])

  useEffect(() => {
    if (!brushDomain) {
      onBrushDomainChange(xScale.domain() as [number, number], undefined)
    }
  }, [brushDomain, feeAmount, onBrushDomainChange, xScale])

  // Reset the view only when the fee and currency changes
  useEffect(() => {
    if (feeAmount) {
      onBrushDomainChange(
        [current * zoomLevels.initialMin, current * zoomLevels.initialMax] as [number, number],
        'reset',
      )
    }
  }, [feeAmount, currencyA, currencyB]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex sx={{ position: 'relative', flexDirection: 'column', width: '100%' }}>
      <Flex sx={{ height: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text> Select Range </Text>
        <Zoom
          svg={zoomRef.current}
          xScale={xScale}
          setZoom={setZoom}
          width={innerWidth}
          height={height}
          resetBrush={() => {
            onBrushDomainChange(
              [current * zoomLevels.initialMin, current * zoomLevels.initialMax] as [number, number],
              'reset',
            )
          }}
          showResetButton // ={Boolean(ticksAtLimit[Bound.LOWER] || ticksAtLimit[Bound.UPPER])}
          zoomLevels={zoomLevels}
        />
      </Flex>
      <Flex
        sx={{
          position: 'relative',
          mb: '10px',
          mt: '10px',
          width: '100%',
          background: 'white3',
          height: CHART_DESKTOP_HEIGHT,
          paddingBottom: '10px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <svg sx={{ overflow: 'visible' }} width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <clipPath id={`${id}-chart-clip`}>
              <rect x="0" y="0" width={innerWidth} height={height} />
            </clipPath>
            {brushDomain && (
              // mask to highlight selected area
              <mask id={`${id}-chart-area-mask`}>
                <rect
                  fill="white"
                  x={xScale(brushDomain[0])}
                  y="0"
                  width={xScale(brushDomain[1]) - xScale(brushDomain[0])}
                  height={innerHeight}
                />
              </mask>
            )}
          </defs>
          <g transform={`translate(${margins.left},${margins.top})`} sx={{ border: '1px solid red' }}>
            <g clipPath={`url(#${id}-chart-clip)`}>
              <Area series={series} xScale={xScale} yScale={yScale} xValue={xAccessor} yValue={yAccessor} />

              {brushDomain && (
                // duplicate area chart with mask for selected area
                <g mask={`url(#${id}-chart-area-mask)`}>
                  <Area
                    series={series}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xAccessor}
                    yValue={yAccessor}
                    fill={styles.area.selection}
                  />
                </g>
              )}
              <Line value={current} xScale={xScale} innerHeight={innerHeight} />

              <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            </g>

            <rect
              sx={{
                width: innerWidth,
                height: height,
                cursor: 'grab',
                fill: 'transparent',
                ':active': {
                  cursor: 'grabbing',
                },
              }}
              ref={zoomRef}
            />

            <Brush
              id={id}
              xScale={xScale}
              interactive={interactive}
              brushLabelValue={brushLabels}
              brushExtent={brushDomain ?? (xScale.domain() as [number, number])}
              innerWidth={innerWidth}
              innerHeight={innerHeight}
              setBrushExtent={onBrushDomainChange}
              westHandleColor={styles.brush.handle.west}
              eastHandleColor={styles.brush.handle.east}
            />
          </g>
        </svg>
      </Flex>
    </Flex>
  )
}

export default Chart
