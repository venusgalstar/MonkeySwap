import { ReactNode } from 'react'
import { ButtonProps as ThemeUIButtonProps } from 'theme-ui'
import { iconTypes } from '../Svg/types'
import { colorProps } from 'theme/types'

export enum sizes {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export type Sizes = (typeof sizes)[keyof typeof sizes]

export const buttonFontSizes: Record<sizes | any, string> = {
  [sizes.SMALL]: '12px',
  [sizes.MEDIUM]: '16px',
  [sizes.LARGE]: '18px',
}

export const buttonLineHeight: Record<sizes | any, string> = {
  [sizes.SMALL]: '10px',
  [sizes.MEDIUM]: '24px',
  [sizes.LARGE]: '33px',
}

export const buttonPadding: Record<sizes | any, { x: number; y: number }> = {
  [sizes.SMALL]: { x: 5, y: 2 },
  [sizes.MEDIUM]: { x: 7, y: 3 },
  [sizes.LARGE]: { x: 10, y: 6 },
}

export enum variants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  TEXT = 'text',
  SUCCESS = 'success',
  DANGER = 'danger',
}

export enum iconButtonVariants {
  PRIMARY = 'primary',
  TRANSPARENT = 'transparent',
  CIRCULAR = 'circular',
}

export type sizeProps = `${sizes}`
export type variantProps = `${variants}`
export type iconButtonVariantsProps = `${iconButtonVariants}`

export interface ButtonProps extends Omit<ThemeUIButtonProps, 'sx'> {
  variant?: variantProps
  size?: sizeProps
  startIcon?: ReactNode
  endIcon?: ReactNode
  fullWidth?: boolean
  load?: boolean
  [key: string]: any
}

export interface IconButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: iconButtonVariantsProps
  color?: colorProps
  background?: colorProps
  icon?: iconTypes
  iconWidth?: number
}

export type ButtonThemeVariant = {
  background: string
  backgroundActive: string
  backgroundHover: string
  border: string | number
  borderColorHover: string
  boxShadow: string
  boxShadowActive: string
  color: string
}

export type ButtonTheme = {
  [key in variants]: ButtonThemeVariant
}
