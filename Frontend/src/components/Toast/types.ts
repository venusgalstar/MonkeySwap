export enum variants {
  ERROR = 'error',
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
}

export enum sizes {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export const alertFontSizes = {
  [sizes.SMALL]: 1,
  [sizes.MEDIUM]: 2,
  [sizes.LARGE]: 4,
}

export type sizeProps = `${sizes}`
export type variantProps = `${variants}`

export interface AlertProps {
  popKey: string
  popIndex: number
  variant?: variantProps
  text?: string
  linkText?: string
  url?: string
  size?: sizeProps
  onClose?: () => void
  sx?: any
  errorText?: string
}
