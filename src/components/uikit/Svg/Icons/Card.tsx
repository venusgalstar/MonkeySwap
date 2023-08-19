import React from 'react'
import { SvgProps, rotation } from './types'

const Card: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, getStyles }) => {
  const deg: rotation = {
    left: 90,
    up: 180,
    right: 270,
    down: 0,
  }
  const style = getStyles({
    degree: deg[direction as keyof rotation],
    color,
  })

  return (
    <svg width={width || '24'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <path d="M22 7.55c0 .66-.54 1.2-1.2 1.2H3.2c-.66 0-1.2-.54-1.2-1.2v-.01C2 5.25 3.85 3.4 6.14 3.4h11.71C20.14 3.4 22 5.26 22 7.55ZM2 11.45v5.01c0 2.29 1.85 4.14 4.14 4.14h11.71c2.29 0 4.15-1.86 4.15-4.15v-5c0-.66-.54-1.2-1.2-1.2H3.2c-.66 0-1.2.54-1.2 1.2Zm6 5.8H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75s-.34.75-.75.75Zm6.5 0h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
    </svg>
  )
}

export default Card
