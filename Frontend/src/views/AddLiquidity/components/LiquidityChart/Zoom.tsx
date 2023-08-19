import { Flex } from 'components/uikit'
import { ScaleLinear, select, zoom, ZoomBehavior, zoomIdentity, ZoomTransform } from 'd3'
import { useEffect, useMemo, useRef } from 'react'
import { RefreshCcw, ZoomIn, ZoomOut } from 'react-feather'

import { ZoomLevels } from './types'

export default function Zoom({
  svg,
  xScale,
  setZoom,
  width,
  height,
  resetBrush,
  showResetButton,
  zoomLevels,
}: {
  svg: SVGElement | null
  xScale: ScaleLinear<number, number>
  setZoom: (transform: ZoomTransform) => void
  width: number
  height: number
  resetBrush: () => void
  showResetButton: boolean
  zoomLevels: ZoomLevels
}) {
  const zoomBehavior = useRef<ZoomBehavior<Element, unknown>>()

  const [zoomIn, zoomOut, zoomInitial, zoomReset] = useMemo(
    () => [
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .transition()
          .call(zoomBehavior.current.scaleBy, 2),
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .transition()
          .call(zoomBehavior.current.scaleBy, 0.5),
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .transition()
          .call(zoomBehavior.current.scaleTo, 0.5),
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .call(zoomBehavior.current.transform, zoomIdentity.translate(0, 0).scale(1))
          .transition()
          .call(zoomBehavior.current.scaleTo, 0.5),
    ],
    [svg],
  )

  useEffect(() => {
    if (!svg) return

    zoomBehavior.current = zoom()
      .scaleExtent([zoomLevels.min, zoomLevels.max])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', ({ transform }: { transform: ZoomTransform }) => setZoom(transform))

    select(svg as Element).call(zoomBehavior.current)
  }, [height, width, setZoom, svg, xScale, zoomBehavior, zoomLevels, zoomLevels.max, zoomLevels.min])

  useEffect(() => {
    // reset zoom to initial on zoomLevel change
    zoomInitial()
  }, [zoomInitial, zoomLevels])

  return (
    <Flex
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${showResetButton ? '3' : '2'}, 1fr)`,
        gridGap: '6px',
      }}
    >
      <Flex onClick={zoomIn} disabled={false} sx={{ cursor: 'pointer' }}>
        <ZoomIn size={16} />
      </Flex>
      <Flex onClick={zoomOut} disabled={false} sx={{ cursor: 'pointer' }}>
        <ZoomOut size={16} />
      </Flex>
      {showResetButton && (
        <Flex
          onClick={() => {
            resetBrush()
            zoomReset()
          }}
          disabled={false}
          sx={{ cursor: 'pointer', alignItems: 'center' }}
        >
          <RefreshCcw size={14} />
        </Flex>
      )}
    </Flex>
  )
}
