import React from 'react'
import { Flex as ThemeUIFlex } from 'theme-ui'

const Flex = ({ children, ...props }: { children: React.ReactNode } | any) => {
  return <ThemeUIFlex {...props}>{children}</ThemeUIFlex>
}

export default Flex
