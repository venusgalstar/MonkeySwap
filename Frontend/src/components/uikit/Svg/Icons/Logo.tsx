import React from 'react'
import { SvgProps } from './types'
import Image from 'next/image'

const Logo: React.FC<SvgProps> = ({ width }) => {
  return (
    <Image src="/logo.png" width={35} height={35} alt="Logo Image" />
  )
}

export default Logo
