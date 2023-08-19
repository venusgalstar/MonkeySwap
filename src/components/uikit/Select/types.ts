import React, { InputHTMLAttributes, ReactHTMLElement } from 'react'

export enum positions {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum sizes {
  XSMALL = 'xsm',
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export const fontSizes = {
  [sizes.XSMALL]: 1,
  [sizes.SMALL]: 1,
  [sizes.MEDIUM]: 3,
  [sizes.LARGE]: 6,
}

export const selectPadding = {
  [sizes.XSMALL]: 2,
  [sizes.SMALL]: 4,
  [sizes.MEDIUM]: 6,
  [sizes.LARGE]: 8,
}

export const selectedExtraPadding = {
  [sizes.XSMALL]: 1,
  [sizes.SMALL]: 0,
  [sizes.MEDIUM]: 0,
  [sizes.LARGE]: 0,
}

export const selectItemPadding = {
  [sizes.XSMALL]: 2,
  [sizes.SMALL]: 4,
  [sizes.MEDIUM]: 6,
  [sizes.LARGE]: 8,
}

type sizeProps = `${sizes}`
type positionProps = `${positions}`

export interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  active?: number | string
  size?: sizeProps
  width?: string | number
  label?: JSX.Element
  position?: positionProps
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export interface SelectItemProps {
  children: React.ReactNode
  onClick?: (value: number | string) => void
  url?: string
  active?: boolean
  size?: sizeProps
  value: number | string
  sx?: any
}
