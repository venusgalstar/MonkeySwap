import React from 'react'
import { Button } from 'theme-ui'
import Svg from '../Svg'
import { icons } from '../Svg/types'
import { IconButtonProps, iconButtonVariants as variants } from './types'
import style from './styles'
import colorValues from 'theme/types'
import Flex from '../Flex'

const IconButton: React.FC<IconButtonProps> = ({
  icon = icons.DISCORD,
  color = colorValues.white1,
  background = colorValues.yellow,
  variant = variants.PRIMARY,
  iconWidth,
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant={variant}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        variant: `buttons.${variant}`,
        color: 'primaryBright',
        background,
        ...(variant === variants.PRIMARY ? style.primary : {}),
        ...(variant === variants.TRANSPARENT ? style.transparent : {}),
      }}
    >
      {children || (
        <span sx={{ height: iconWidth, width: iconWidth }}>
          <Svg color={color} icon={icon} {...props} width={iconWidth} />
        </span>
      )}
    </Button>
  )
}

export default IconButton
