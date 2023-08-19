import React from 'react'
import { SvgProps } from '../types'

const ETH: React.FC<SvgProps> = ({ width }) => {
  return (
    <svg
      width={width || '30'}
      height={width || '30'}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2171_2890)">
        <path
          d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
          fill="#627EEA"
        />
        <path d="M15.4669 3.75V12.0656L22.4953 15.2062L15.4669 3.75Z" fill="white" fillOpacity="0.602" />
        <path d="M15.4669 3.75L8.4375 15.2062L15.4669 12.0656V3.75Z" fill="white" />
        <path d="M15.4669 20.595V26.2453L22.5 16.515L15.4669 20.595Z" fill="white" fillOpacity="0.602" />
        <path d="M15.4669 26.2453V20.5941L8.4375 16.515L15.4669 26.2453Z" fill="white" />
        <path d="M15.4669 19.2872L22.4953 15.2063L15.4669 12.0675V19.2872Z" fill="white" fillOpacity="0.2" />
        <path d="M8.4375 15.2063L15.4669 19.2872V12.0675L8.4375 15.2063Z" fill="white" fillOpacity="0.602" />
      </g>
      <defs>
        <clipPath id="clip0_2171_2890">
          <rect width="30" height="30" rx="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ETH
