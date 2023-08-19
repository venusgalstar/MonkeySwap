import { ScaleLinear } from 'd3'
import { useMemo } from 'react'

export const Line = ({
  value,
  xScale,
  innerHeight,
}: {
  value: number
  xScale: ScaleLinear<number, number>
  innerHeight: number
}) =>
  useMemo(
    () => (
      <line
        sx={{ opacity: 0.5, strokeWidth: 2, stroke: 'text', fill: 'none' }}
        x1={xScale(value)}
        y1="0"
        x2={xScale(value)}
        y2={innerHeight}
      />
    ),
    [value, xScale, innerHeight],
  )
