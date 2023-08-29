import { Text as ThemeUIText } from 'theme-ui'
import { TextProps, variants } from './types'

const Text = ({
  variant = variants.NORMAL,
  weight = variants.NORMAL,
  size,
  children,
  color = 'text',
  ...props
}: TextProps | any) => {
  return (
    <ThemeUIText
      {...props}
      sx={{
        variant: variant === variants.LINK ? `flex.${variant}` : `text.${variant}`,
        color,
        fontWeight: weight,
        fontSize: size,
      }}
    >
      {children}
    </ThemeUIText>
  )
}

export default Text
