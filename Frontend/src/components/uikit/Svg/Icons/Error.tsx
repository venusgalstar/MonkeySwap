import React from 'react'
import { rotation, SvgProps } from './types'

const Error: React.FC<SvgProps> = ({ direction = 'right', color = 'white', width, getStyles }) => {
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
    <svg width={width || '30'} viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <path
        d="M3.14966 26H26.8503C29.2739 26 30.7847 23.447 29.5729 21.4138L17.7226 1.52492C16.5108 -0.508305 13.4892 -0.508305 12.2774 1.52492L0.427071 21.4138C-0.784717 23.447 0.726083 26 3.14966 26ZM15 15.2988C14.1344 15.2988 13.4262 14.6109 13.4262 13.7701V10.7126C13.4262 9.87182 14.1344 9.18389 15 9.18389C15.8656 9.18389 16.5738 9.87182 16.5738 10.7126V13.7701C16.5738 14.6109 15.8656 15.2988 15 15.2988ZM16.5738 19.8851C16.5738 20.7293 15.8893 21.4138 15.045 21.4138H14.955C14.1107 21.4138 13.4262 20.7293 13.4262 19.8851C13.4262 19.0408 14.1107 18.3563 14.955 18.3563H15.045C15.8893 18.3563 16.5738 19.0408 16.5738 19.8851Z"
        fill="#DF4141"
      />
    </svg>
  )
}

export default Error
