import React from 'react'
import { SvgProps, rotation } from './types'

const Caret: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, getStyles }) => {
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
    <svg width={width || '7'} viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <g clipPath="url(#clip0_2781_12334)">
        <path
          d="M6.80446 0.947994C6.54375 0.684001 6.12104 0.684002 5.86032 0.947995L3.66666 3.16922C3.57495 3.26209 3.42502 3.26209 3.33331 3.16922L1.13968 0.948025C0.87896 0.684031 0.456254 0.684031 0.195537 0.948025C-0.0651795 1.21202 -0.0651789 1.64004 0.195538 1.90403L2.55584 4.294L2.99995 4.74368C3.2751 5.02229 3.72487 5.02229 4.00002 4.74368L4.44412 4.294L6.80446 1.904C7.06518 1.64001 7.06518 1.21199 6.80446 0.947994Z"
          fill="#A09F9C"
        />
      </g>
      <defs>
        <clipPath id="clip0_2781_12334">
          <rect width="7" height="4.5" fill="white" transform="translate(0 0.75)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Caret
