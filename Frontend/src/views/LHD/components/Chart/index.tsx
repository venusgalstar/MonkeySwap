import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Flex, Text } from 'components/uikit'
import { createPortal } from 'react-dom'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  Filler,
  Point,
  ChartOptions,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import { LiquidityHealthChart } from 'state/lhd/types'
import { getColor } from '../../utils/getColor'
import { useTranslation } from '../../../../contexts/Localization'
import PriceChange from '../FullProfile/components/PercentageChange'
import { formatDollar } from '../../../../utils/formatNumbers'
import useIsMobile from '../../../../hooks/useIsMobile'
import { useThemeUI } from 'theme-ui'

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Tooltip, LineController, Filler)

let hideTimeout: NodeJS.Timeout | null = null

let liquidityDebt: unknown = null
let sustainabilityLower: unknown = null
let sustainabilityUpper: unknown = null

let selectedTooltip: any = null

const CustomTooltip = ({
  show,
  x,
  y,
  data,
  isOwnedExtractable,
}: {
  show: boolean
  x: number
  y: number
  data: any
  isOwnedExtractable: boolean
}) => {
  const { t } = useTranslation()
  const { theme } = useThemeUI()
  const white2 = theme!.colors!.white2
  selectedTooltip = data

  if (!show) return null
  return createPortal(
    <Flex
      sx={{
        position: 'absolute',
        left: x,
        top: y - 23,
        transform: 'translate(-50%, -100%)',
        zIndex: 100,
        borderRadius: '10px',
        background: 'white2',
        flexDirection: 'column',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        width: '370px',
        '::after': {
          content: '""',
          position: 'absolute',
          left: '50%',
          bottom: '-10px',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `10px solid ${white2}`,
          transform: 'translateX(-50%)',
        },
      }}
    >
      <Flex
        sx={{
          background: 'white3',
          flexDirection: 'row',
          gap: '15px',
          pl: '20px',
          pr: '20px',
          pt: '15px',
          pb: '10px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          justifyContent: 'space-between',
        }}
      >
        <Flex sx={{ flex: '0 0 40px' }}>
          <img src={data?.image} width="40px" height="40px" sx={{ borderRadius: '50%' }} />
        </Flex>
        <Flex sx={{ flexDirection: 'column', flex: '0 0 220px' }}>
          <Text>{data?.name}</Text>
          <Text sx={{ fontWeight: 700, fontSize: ['14px'] }}>
            ${data?.currentPrice.toFixed(5) > 0 ? data?.currentPrice.toFixed(5) : data?.currentPrice.toFixed(10)}
            <PriceChange priceChange={data?.priceChange24hr?.toFixed(2)} />
          </Text>
        </Flex>
        <Flex sx={{ flexDirection: 'column', alignItems: 'flex-end', flex: '0 0 50px' }}>
          <Text sx={{ fontWeight: 400, fontSize: ['12px'], lineHeight: ['20px'], color: 'textDisabled' }}>
            {t('SCORE')}
          </Text>
          <Text
            sx={{
              fontWeight: 700,
              fontSize: ['30px'],
              lineHeight: ['30px'],
              color: getColor(data?.totalScore * 100),
            }}
          >
            {Math.floor(data?.totalScore * 100)}
          </Text>
        </Flex>
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          padding: '20px',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          gap: '10px',
        }}
      >
        <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text sx={{ fontWeight: 400 }}>Market Cap (x-axis):</Text>
          <Text sx={{ alignItems: 'flex-end' }}>{formatDollar({ num: data?.mcap })}</Text>
        </Flex>
        <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text sx={{ fontWeight: 400 }}>
            {`${isOwnedExtractable === false ? 'Total' : 'Owned'} Extractable Liquidity (y-axis):`}
          </Text>
          <Text sx={{ alignItems: 'flex-end' }}>
            {Math.round(
              isOwnedExtractable === false
                ? data?.extractableLiquidityPercentage
                : data?.ownedExtractableLiquidityPercentage,
            )}
            %
          </Text>
        </Flex>
      </Flex>
    </Flex>,
    document.body,
  )
}

function drawDebtLine(chart: ChartJS<'scatter'>, ownedPoint: { x: number; y: number }) {
  const { ctx, scales } = chart
  const { x: xScale, y: yScale } = scales

  const xPixel2 = xScale?.getPixelForValue(ownedPoint.x)
  const yPixel2 = yScale?.getPixelForValue(ownedPoint.y)

  //Sus lower data
  const susLowerDataset = chart.config.data.datasets[0]
  const index = susLowerDataset.data.findIndex((x: any) => x.x >= ownedPoint.x)
  const susLowerPoint1: Point = susLowerDataset.data[index - 1] as Point
  const susLowerPoint2: Point = susLowerDataset.data[index] as Point
  const susLowerSlope = (susLowerPoint2?.y - susLowerPoint1?.y) / (susLowerPoint2?.x - susLowerPoint1?.x)
  const susLowerYIntercept = susLowerPoint1?.y - susLowerSlope * susLowerPoint1?.x
  const xPixel1 = xScale?.getPixelForValue(ownedPoint.x)
  const yPixel1 = yScale?.getPixelForValue(susLowerSlope * ownedPoint.x + susLowerYIntercept)
  const susLowerRange = susLowerSlope * ownedPoint.x + susLowerYIntercept

  //Sus upper data
  const susUpperDataset = chart.config.data.datasets[1]
  const susUpperPoint1: Point = susUpperDataset.data[index - 1] as Point
  const susUpperPoint2: Point = susUpperDataset.data[index] as Point
  const susUpperSlope = (susUpperPoint2?.y - susUpperPoint1?.y) / (susUpperPoint2?.x - susUpperPoint1?.x)
  const susUpperYIntercept = susUpperPoint1?.y - susUpperSlope * susUpperPoint1?.x
  const susUpperRange = susUpperSlope * ownedPoint.x + susUpperYIntercept

  // passBackData({
  //   liquidityDebt: susLowerRange - ownedPoint.y,
  //   sustainabilityLower: susLowerRange,
  //   sustainabilityUpper: susUpperRange,
  // })

  liquidityDebt = susLowerRange - ownedPoint.y
  sustainabilityLower = susLowerRange
  sustainabilityUpper = susUpperRange

  if (ownedPoint.y < susLowerRange) {
    ctx.beginPath()
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 2
    ctx.strokeStyle = '#DF4141'
    ctx.moveTo(xPixel1, yPixel1)
    ctx.lineTo(xPixel2, yPixel2)
    ctx.stroke()
    ctx.setLineDash([])
  }
}

const logoPlugin = {
  id: 'printIcons',

  afterDraw: function (chart: ChartJS<'scatter'>) {
    const { ctx } = chart

    const dataset = chart.config.data.datasets[2]
    let point1: any, point2: any

    dataset?.data?.forEach(function (point: any) {
      const { x, y, r, data } = point
      const imageData = new Image()
      imageData.src = `${data?.image}`

      const size = r * 3
      const xScale = chart.scales['x']
      const yScale = chart.scales['y']
      const xPixel = xScale?.getPixelForValue(x)
      const yPixel = yScale?.getPixelForValue(y)
      const imageX = xPixel - size / 2
      const imageY = yPixel - size / 2

      const xAxis = chart.scales['x']
      const xStartPixel = xAxis?.getPixelForValue(xAxis?.min)

      if (xPixel >= xStartPixel) {
        ctx.beginPath()

        if (r == 10) {
          ctx.globalAlpha = 1
          if (!point1) {
            point1 = point
            ctx.strokeStyle = '#1179A6'
          } else {
            point2 = point

            ctx.strokeStyle = '#904DC4'
          }
        } else {
          ctx.globalAlpha = 0.7
          const borderColor = isBelowBottomLine(chart, { x, y }) ? '#38A611' : '#DF4141'
          ctx.strokeStyle = borderColor
        }

        ctx.lineWidth = 3
        ctx.fillStyle = 'white'
        ctx.arc(imageX + size / 2, imageY + size / 2, size / 2 + 3, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()

        ctx.save()
        ctx.beginPath()
        ctx.arc(imageX + size / 2, imageY + size / 2, size / 2, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.clip()

        ctx.drawImage(imageData, imageX, imageY, size, size)
        ctx.restore()
        ctx.globalAlpha = 1
        if (point2) {
          drawDebtLine(chart, point2)
        }
      }
    })
  },
}

const getYIntercept = (x: number, dataset: any) => {
  for (let i = 1; i < dataset.data.length; i++) {
    const point1 = dataset.data[i - 1].getProps(['x', 'y'])
    const point2 = dataset.data[i].getProps(['x', 'y'])
    if (point1.x <= x && point2.x >= x) {
      const slope = (point2.y - point1.y) / (point2.x - point1.x)
      const y = point1.y + slope * (x - point1.x)
      return y
    }
  }
  return null
}

const gradientFillBetweenLines = {
  id: 'gradientFillBetweenLines',
  beforeDatasetsDraw: (chart: { getDatasetMeta?: any; scales?: any; width?: any; ctx?: any }, _args: any) => {
    const xAxis = chart.scales['x']
    const xStartPixel = xAxis?.getPixelForValue(xAxis?.start)
    const xEndPixel = xAxis?.getPixelForValue(xAxis?.end)

    const { ctx } = chart
    const susLowerLine = chart.getDatasetMeta(0)
    const susUpperLine = chart.getDatasetMeta(1)
    const yAxis = chart.scales[susLowerLine.yAxisID]

    const greenGradient = ctx.createLinearGradient(0, 0, chart.width, 0)
    greenGradient.addColorStop(0, 'rgba(56, 166, 17, 0.3)')
    greenGradient.addColorStop(1, 'rgba(191, 220, 181, 0.3)')

    const redGradient = ctx.createLinearGradient(0, 0, chart.width, 0)
    redGradient.addColorStop(0, 'rgba(233, 35, 35, 0.2)')
    redGradient.addColorStop(1, 'rgba(233, 35, 35, 0.1)')

    ctx.save()
    ctx.fillStyle = greenGradient
    ctx.beginPath()

    ctx.moveTo(xStartPixel, getYIntercept(xStartPixel, susUpperLine))

    //Map to sus upper
    for (let i = 1; i < susUpperLine.data.length; i++) {
      const pointProps = susUpperLine.data[i].getProps(['x', 'y'])
      if (pointProps.x >= xStartPixel && pointProps.x <= xEndPixel) {
        ctx.lineTo(pointProps.x, pointProps.y)
      } else if (pointProps.x > xEndPixel) {
        ctx.lineTo(xEndPixel, getYIntercept(xEndPixel, susUpperLine))
      }
    }

    //Map to sus Lower
    for (let i = susLowerLine.data.length - 1; i >= 0; i--) {
      const pointProps = susLowerLine.data[i].getProps(['x', 'y'])
      if (pointProps.x >= xStartPixel && pointProps.x <= xEndPixel) {
        ctx.lineTo(pointProps.x, pointProps.y)
      } else if (pointProps.x < xStartPixel) {
        ctx.lineTo(xStartPixel, getYIntercept(xStartPixel, susLowerLine))
      } else {
        ctx.lineTo(xEndPixel, getYIntercept(xEndPixel, susLowerLine))
      }
    }

    ctx.closePath()
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.fillStyle = redGradient
    ctx.beginPath()

    ctx.moveTo(xStartPixel, getYIntercept(xStartPixel, susLowerLine))

    //Map red area
    for (let i = 1; i < susLowerLine.data.length; i++) {
      const pointProps = susLowerLine.data[i].getProps(['x', 'y'])
      if (pointProps.x >= xStartPixel && pointProps.x <= xEndPixel) {
        ctx.lineTo(pointProps.x, pointProps.y)
      } else if (pointProps.x < xStartPixel) {
        ctx.lineTo(xStartPixel, getYIntercept(xStartPixel, susLowerLine))
      } else {
        ctx.lineTo(xEndPixel, getYIntercept(xEndPixel, susLowerLine))
      }
    }

    //Red fill
    ctx.lineTo(xEndPixel, yAxis?.getPixelForValue(0))
    ctx.lineTo(xStartPixel, yAxis?.getPixelForValue(0))

    ctx.closePath()
    ctx.fill()
    ctx.restore()
  },
}

function isBelowBottomLine(chart: any, point: any) {
  const { x, y } = point

  const line1Dataset = chart.config.data.datasets[0]
  const index = line1Dataset.data.findIndex((linePoint: { x: number }) => linePoint.x >= x)

  const point1 = line1Dataset.data[index - 1]
  const point2 = line1Dataset.data[index]

  const slope = (point2?.y - point1?.y) / (point2?.x - point1?.x)
  const yIntercept = point1?.y - slope * point1?.x

  const bottomLineY = slope * x + yIntercept

  return y > bottomLineY
}

ChartJS.register(logoPlugin, gradientFillBetweenLines)

const Chart = ({ chartData, passBackData }: { chartData: LiquidityHealthChart; passBackData: any }) => {
  const canvasRef = useRef(null)
  const [zoomPlugin, setZoomPlugin] = useState(null)
  const [tooltipState, setTooltipState] = useState({ show: false, x: 0, y: 0, data: '', isOwnedExtractable: false })
  const isMobile = useIsMobile()
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('chartjs-plugin-zoom').then((plugin) => {
        setZoomPlugin(plugin.default as any)
      })
    }
  }, [chartData])

  useEffect(() => {
    if (zoomPlugin) {
      ChartJS.register(zoomPlugin)
    }
  }, [zoomPlugin])

  useEffect(() => {
    if (liquidityDebt && sustainabilityLower && sustainabilityUpper) {
      passBackData({
        liquidityDebt: liquidityDebt,
        sustainabilityLower: sustainabilityLower,
        sustainabilityUpper: sustainabilityUpper,
      })
    }
  }, [liquidityDebt, sustainabilityLower, sustainabilityUpper])

  useEffect(() => {
    const newOptions: ChartOptions<'scatter'> = {
      animation: {
        duration: 0,
      },
      scales: {
        y: {
          title: {
            display: isMobile !== true,
            text: 'Extractable Liquidity / Market Cap',
            color: '#A09F9C',
            font: {
              family: 'Poppins',
              size: 10,
            },
            padding: {
              bottom: 10,
            },
          },
          ticks: {
            suggestedMin: 0,
            callback: function (tickValue: string | number, index: number, ticks: any[]) {
              if (typeof tickValue === 'number') {
                return `${tickValue}%`
              }
              return tickValue
            },
            font: {
              family: 'Poppins',
              size: 10,
              weight: '500',
            },
          },
          type: 'linear',
          border: { dash: [4, 4] },
          beginAtZero: true,
        },
        x: {
          title: {
            display: isMobile !== true,
            text: 'Market Cap',
            color: '#A09F9C',
            font: {
              family: 'Poppins',
              size: 10,
            },
            padding: {
              top: 10,
            },
          },
          ticks: {
            callback: function (tickValue: string | number, index: number, ticks: any[]) {
              if (typeof tickValue === 'number') {
                return `$${tickValue.toFixed(2)}M`
              }
              return tickValue
            },
            font: {
              family: 'Poppins',
              size: 10,
              weight: '500',
            },
          },
          border: { dash: [4, 4] },
          min: chartData.healthBottom[0].x,
          max: chartData.healthBottom[chartData.healthBottom.length - 1].x,
          beginAtZero: false,
        },
      },
      onClick: (context: any) => {
        customTooltipHandler(context.chart.canvas, context, 'click')
      },
      plugins: {
        zoom: {
          limits: {
            x: {
              min: chartData.healthBottom[0].x,
              max: chartData.healthBottom[chartData.healthBottom.length - 1].x,
              minRange: 0.1,
            },
            y: {
              min: 1,
              max: 100,
              minRange: 1.0,
            },
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
        },
        tooltip: {
          usePointStyle: true,
          enabled: false,
          external: (context: any) => {
            customTooltipHandler(context.chart.canvas, context)
          },
        },
      },
    } as ChartOptions<'scatter'>

    setOptions(newOptions)
  }, [chartData, isMobile])

  const customTooltipHandler = (
    canvas: HTMLCanvasElement,
    context: { chart?: any; tooltip?: any },
    type: string = '',
  ) => {
    const { tooltip } = context

    console.log(type)

    if (type === 'click') {
      if (selectedTooltip.link) {
        window.location.href = selectedTooltip.link
      }
    } else {
      if (tooltip.opacity === 0) {
        if (hideTimeout) clearTimeout(hideTimeout)

        hideTimeout = setTimeout(() => {
          setTooltipState((prevState) => ({ ...prevState, show: false }))
        }, 500)

        canvas.style.cursor = 'default'

        return
      }

      if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
      }

      const currentItem = tooltip.dataPoints[0]

      if (currentItem) {
        canvas.style.cursor = 'pointer'
      } else {
        canvas.style.cursor = 'default'
      }

      const data = context.chart.data.datasets[currentItem.datasetIndex].data[currentItem.dataIndex].data

      if (!data) return

      const canvasPosition = context.chart.canvas.getBoundingClientRect()

      setTooltipState({
        show: true,
        x: canvasPosition.left + window.scrollX + currentItem.element.x,
        y: canvasPosition.top + window.scrollY + currentItem.element.y,
        data: data,
        //Last one is the owned extractable liquidity icon
        isOwnedExtractable:
          currentItem.dataIndex === context.chart.data.datasets[currentItem.datasetIndex].data.length - 1,
      })
    }
  }

  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: 'Sus Lower',
          data: chartData.healthBottom,
          borderColor: '#38A611',
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.4,
          fill: false,
          showLine: true,
        },
        {
          label: 'Sus Upper',
          data: chartData.healthTop,
          borderColor: '#38A611',
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.4,
          fill: '-1',
          showLine: true,
        },
        {
          label: 'Comparable Tokens',
          data: chartData?.tokens,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          showLine: false,
          hitRadius: 20,
        },
      ],
    }
  }, [chartData])

  return (
    <>
      <Scatter
        options={options}
        data={data}
        ref={canvasRef}
        sx={{ ml: '20px', mr: '20px', mt: '20px' }}
        height={isMobile ? '240px' : 'inherit'}
      />
      {isMobile && (
        <Flex sx={{ justifyContent: 'space-between', mt: '10px', gap: '20px' }}>
          <Text sx={{ fontSize: '10px', fontWeight: '400' }}>Y: Extractable Liquidity / Market Cap</Text>
          <Text sx={{ fontSize: '10px', fontWeight: '400' }}>X: Market Cap</Text>
        </Flex>
      )}
      <CustomTooltip
        show={tooltipState.show}
        x={tooltipState.x}
        y={tooltipState.y}
        data={tooltipState.data}
        isOwnedExtractable={tooltipState.isOwnedExtractable}
      />
    </>
  )
}

export default Chart
