enum colorValues {
  background = 'background',
  backgroundDisabled = 'backgroundDisabled',
  navbar = 'navbar',
  body = 'body',
  lvl1 = 'lvl1',
  lvl2 = 'lvl2',
  primaryBright = 'primaryBright',
  primaryDark = 'primaryDark',
  success = 'success',
  error = 'error',
  info = 'info',
  yellow = 'yellow',
  brown = 'brown',
  primaryButtonDisable = 'primaryButtonDisable',
  secondaryButtonDisableBg = 'secondaryButtonDisableBg',
  secondaryButtonDisableColor = 'secondaryButtonDisableColor',
  dividerColor = 'dividerColor',
  text = 'text',
  textDisabled = 'textDisabled',
  textareaColor = 'textareaColor',
  heading = 'heading',
  black = 'black',
  gradient = 'gradient',
  white1 = 'white1',
  white2 = 'white2',
  white3 = 'white3',
  white4 = 'white4',
  moon = 'moon',
  island = 'island',
  navMenuLogo = 'navMenuLogo',
  footer = 'footer',
  gray = 'gray',
  smartGradient = 'smartGradient',
  modalOverlay = 'modalOverlay',
  buttonDisabledText = 'buttonDisabledText',
}

export type MediaQueries = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
  xxxl: string
  nav: string
}

export type colorProps = `${colorValues}`

export default colorValues
