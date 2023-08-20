import React from 'react'
import { SvgProps } from '../types'

const CRONOS: React.FC<SvgProps> = ({ width }) => {
  return (
    <svg
      width={width || '30'}
      height={width || '30'}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2197_3119)">
        <rect width="30" height="30" rx="15" fill="#FAFAFA" />
        <g clipPath="url(#clip1_2197_3119)">
          <path
            d="M15.009 2.5L4.16666 8.75V21.25L15.009 27.5L25.8333 21.25V8.75L15.009 2.5ZM22.6221 19.3948L14.991 23.7896L7.37787 19.3948V10.6052L15.009 6.21037L22.6221 10.6052V19.3948Z"
            fill="#002D74"
          />
          <path
            d="M15.009 27.5L25.8333 21.25V8.75L15.009 2.5V6.21037L22.6221 10.6052V19.4128L14.991 23.8076V27.5H15.009Z"
            fill="url(#paint0_linear_2197_3119)"
          />
          <path
            d="M14.991 2.5L4.16666 8.75V21.25L14.991 27.5V23.7896L7.37787 19.3948V10.5872L14.991 6.21037V2.5Z"
            fill="url(#paint1_linear_2197_3119)"
          />
          <path
            d="M20.0604 17.9178L15.009 20.8357L9.93964 17.9178V12.0821L15.009 9.16425L20.0604 12.0821L17.9496 13.3069L14.991 11.5958L12.0504 13.3069V16.7111L15.009 18.4222L17.9677 16.7111L20.0604 17.9178Z"
            fill="#002D74"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2197_3119"
          x1="20.4242"
          y1="27.5005"
          x2="20.4242"
          y2="15.0003"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002D74" />
          <stop offset="1" stopColor="#002D74" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2197_3119"
          x1="9.58302"
          y1="2.5"
          x2="9.58302"
          y2="15.0003"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002D74" />
          <stop offset="1" stopColor="#002D74" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_2197_3119">
          <rect width="30" height="30" rx="15" fill="white" />
        </clipPath>
        <clipPath id="clip1_2197_3119">
          <rect width="21.6667" height="25" fill="white" transform="translate(4.16666 2.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CRONOS
