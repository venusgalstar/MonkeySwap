import React from 'react'
import { SvgProps, rotation } from './types'

const ScrollTop: React.FC<SvgProps> = ({ direction = 'right', color = 'primaryBright', getStyles }) => {
  const deg: rotation = {
    left: 180,
    up: 270,
    right: 0,
    down: 90,
  }
  const style = getStyles({
    degree: deg[direction as keyof rotation],
    color,
  })

  return (
    <svg width='100%' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg' sx={style}>
      <g clipPath='url(#scroll-top)'>
        <rect width='50' height='50' rx='25'  fill='#FFB300' stroke='#fff' />
        <path
          d='M24.9999 13.2352C25.2063 13.2352 25.3998 13.267 25.5804 13.3304C25.761 13.3929 25.9287 13.4996 26.0835 13.6507L36.3003 23.6214C36.6099 23.9236 36.7646 24.2826 36.7646 24.6986C36.7646 25.1135 36.6099 25.472 36.3003 25.7742C35.9907 26.0763 35.6295 26.2274 35.2167 26.2274C34.8039 26.2274 34.4427 26.0763 34.1331 25.7742L26.5479 18.3717L26.5479 35.2917C26.5479 35.7197 26.3993 36.0722 26.1021 36.3492C25.8059 36.6262 25.4385 36.7646 24.9999 36.7646C24.5613 36.7646 24.1934 36.6201 23.8962 36.3311C23.6 36.041 23.452 35.682 23.452 35.2539L23.452 18.3717L15.8668 25.7742C15.5572 26.0763 15.196 26.2274 14.7832 26.2274C14.3704 26.2274 14.0092 26.0763 13.6996 25.7742C13.39 25.472 13.2352 25.1135 13.2352 24.6986C13.2352 24.2826 13.39 23.9236 13.6996 23.6214L23.9164 13.6507C24.0712 13.4996 24.2388 13.3929 24.4194 13.3304C24.6 13.267 24.7935 13.2352 24.9999 13.2352Z'
          fill='#FAFAFA' />
      </g>
      <defs>
        <clipPath id='scroll-top'>
          <rect width='50' height='50' rx='25' fill='#fff' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ScrollTop
