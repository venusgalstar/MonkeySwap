import React from 'react'
import { SvgProps } from './types'

const Logo: React.FC<SvgProps> = ({ width }) => {
  return (
    <img src="logo.png"></img>
  )
}

export default Logo
