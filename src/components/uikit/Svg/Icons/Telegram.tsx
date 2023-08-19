import React from 'react'
import { SvgProps, rotation } from './types'

const Telegram: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, getStyles }) => {
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
    <svg width={width || '40'} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <path
        d="M30.38 11.1315L9.12065 19.2774C7.66979 19.8564 7.67818 20.6606 8.85446 21.0192L14.3126 22.7111L26.9411 14.794C27.5383 14.433 28.0838 14.6272 27.6354 15.0227L17.4038 24.198H17.4014L17.4038 24.1992L17.0273 29.7894C17.5788 29.7894 17.8223 29.538 18.1316 29.2414L20.7827 26.6798L26.2972 30.7271C27.314 31.2835 28.0443 30.9975 28.2973 29.7918L31.9172 12.84C32.2877 11.3638 31.3501 10.6954 30.38 11.1315Z"
        fill="#FAFAFA"
      />
    </svg>
  )
}

export default Telegram
