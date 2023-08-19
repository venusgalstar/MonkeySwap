import React from 'react'
import { rotation, SvgProps } from './types'

const LiquidityIcon: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, getStyles }) => {
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
    <svg width={'100%'} height='39' viewBox='0 0 30 39' fill='none'>
      <g opacity='0.89' clipPath='url(#clip0_1992_116620)'>
        <path
          d='M15.9871 0.336479C15.4839 -0.110857 14.729 -0.110857 14.2258 0.336479C11.2403 2.9772 1.68872 12.3424 1.68872 24.079C1.68872 37.9897 12.8419 38.9998 15.1065 38.9998C17.371 38.9998 28.5242 37.9897 28.5242 24.079C28.5194 12.3424 18.9726 2.9772 15.9871 0.336479ZM21.0678 25.3248H17.1919V29.5288C17.1919 30.3465 16.5242 31.0103 15.7016 31.0103H14.5113C13.6887 31.0103 13.021 30.3465 13.021 29.5288V25.3248H9.14517C8.32259 25.3248 7.65485 24.661 7.65485 23.8433V22.6167C7.65485 21.799 8.32259 21.1352 9.14517 21.1352H13.021V16.9312C13.021 16.1135 13.6887 15.4497 14.5113 15.4497H15.7016C16.5242 15.4497 17.1919 16.1135 17.1919 16.9312V21.1352H21.0678C21.8903 21.1352 22.5581 21.799 22.5581 22.6167V23.8433C22.5581 24.661 21.8903 25.3248 21.0678 25.3248Z'
          fill='#4D4040' />
        <g opacity='1' filter='url(#filter0_d_1992_116620)'>
          <path
            d='M14.5065 31.0059H15.6968C16.5194 31.0059 17.1871 30.3421 17.1871 29.5244V25.3204H21.0629C21.8855 25.3204 22.5533 24.6566 22.5533 23.8389V22.6123C22.5533 21.7946 21.8855 21.1308 21.0629 21.1308H17.1871V16.9268C17.1871 16.1091 16.5194 15.4453 15.6968 15.4453H14.5065C13.6839 15.4453 13.0162 16.1091 13.0162 16.9268V21.1308H9.14035C8.31777 21.1308 7.65002 21.7946 7.65002 22.6123V23.8389C7.65002 24.6566 8.31777 25.3204 9.14035 25.3204H13.0162V29.5244C13.0162 30.3421 13.6839 31.0059 14.5065 31.0059Z'
            fill='white'  sx={style}/>
        </g>
      </g>
      <defs>
        <filter id='filter0_d_1992_116620' x='-2.34998' y='5.44531' width='34.9032' height='35.5605'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                         result='hardAlpha' />
          <feOffset />
          <feGaussianBlur stdDeviation='5' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1992_116620' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1992_116620' result='shape' />
        </filter>
        <clipPath id='clip0_1992_116620' sx={style}>
          <rect width='30' height='39' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default LiquidityIcon
