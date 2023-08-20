import { BoxProps } from 'theme-ui'

export enum animation {
  PULSE = 'pulse',
  WAVES = 'waves',
}

export enum variant {
  RECT = 'rect',
  CIRCLE = 'circle',
}

type Animation = `${animation}`
type Variant = `${variant}`

export interface SkeletonProps extends BoxProps {
  animation?: Animation
  variant?: Variant
  width?: string | number
  height?: string | number
}
