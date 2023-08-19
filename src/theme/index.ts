import type { Theme } from 'theme-ui'
import baseTheme from './base'
import Colors from './colors'
import components from './components'

export const theme: Theme = {
  ...baseTheme,
  ...components,
  colors: { ...Colors },
}
