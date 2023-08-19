import React from 'react'
import { SvgProps, rotation } from './types'

const Explorer: React.FC<SvgProps> = ({ direction = 'right', color = 'white', width, getStyles }) => {
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
    <svg width={width || '123'} viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <path
        fill="#21325B"
        d="M25.79 58.415a5.157 5.157 0 015.181-5.156l8.59.028a5.164 5.164 0 015.164 5.164v32.48c.967-.287 2.209-.593 3.568-.913a4.3 4.3 0 003.317-4.187V45.54a5.165 5.165 0 015.164-5.165h8.607a5.165 5.165 0 015.164 5.165v37.393s2.155-.872 4.254-1.758a4.311 4.311 0 002.632-3.967V32.63a5.164 5.164 0 015.163-5.164H91.2a5.164 5.164 0 015.164 5.164V69.34c7.462-5.408 15.024-11.912 21.025-19.733a8.662 8.662 0 001.319-8.092A60.792 60.792 0 0060.567.686 60.788 60.788 0 008.577 91.75a7.688 7.688 0 007.334 3.8c1.628-.143 3.655-.346 6.065-.63a4.3 4.3 0 003.815-4.268l-.001-32.236z"
      ></path>
      <path
        fill="#979695"
        d="M25.602 110.51a60.813 60.813 0 0063.371 5.013 60.815 60.815 0 0033.212-54.203c0-1.4-.065-2.785-.158-4.162-22.219 33.138-63.244 48.63-96.423 53.347"
      ></path>
    </svg>
  )
}

export default Explorer
