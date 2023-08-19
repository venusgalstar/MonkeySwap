import React from 'react'
import { SvgProps, rotation } from './types'

const HamburgerClosed: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, getStyles }) => {
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
    <svg width={width || '24px'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <path d="M14.5809 14.5809C15.1396 14.0222 15.1396 13.1164 14.5809 12.5578L9.52316 7.49997L14.5809 2.44225C15.1396 1.88357 15.1396 0.977791 14.5809 0.41912C14.0222 -0.13955 13.1164 -0.139549 12.5578 0.419122L7.50003 5.47684L2.44219 0.419003C1.88352 -0.139668 0.977738 -0.139668 0.419067 0.419003C-0.139603 0.977673 -0.139602 1.88346 0.419069 2.44213L5.47691 7.49997L0.419003 12.5579C-0.139668 13.1165 -0.139668 14.0223 0.419003 14.581C0.977673 15.1397 1.88346 15.1397 2.44213 14.581L7.50003 9.52309L12.5578 14.5809C13.1165 15.1396 14.0223 15.1396 14.5809 14.5809Z" />
    </svg>
  )
}

export default HamburgerClosed
