import React from 'react'

const Tlos = (props: any) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_1577_47710)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#d9d5d2"
          fillOpacity="0.5"
        />
        <g filter="url(#filter0_di_1577_47710)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.4607 6.21762C16.5116 6.0852 16.4197 5.94137 16.2781 5.93198L13.8914 5.77369C13.8176 5.7688 13.7466 5.80297 13.7045 5.86371L13.0721 6.77472C13.0325 6.83175 12.9673 6.8656 12.8979 6.8652L8.69644 6.8404C8.49029 6.83918 8.29088 6.91362 8.13595 7.0496L6.97023 8.07278C6.71086 8.30042 6.61665 8.66331 6.7325 8.98838L7.28776 10.5463C7.29061 10.5543 7.28926 10.5632 7.28412 10.57C6.97214 10.9848 6.79077 11.483 6.76311 12.0012L6.7537 12.1778C6.69494 13.2789 6.82461 14.3819 7.13724 15.4394C7.39486 16.3108 7.6901 17.3095 7.87107 17.9217C7.96654 18.2447 8.29642 18.4352 8.62389 18.3565C9.32896 18.1872 10.5399 17.8963 11.4936 17.6667C12.3322 17.4647 13.1296 17.1205 13.8526 16.65L14.305 16.3556C14.74 16.0725 15.0808 15.6663 15.284 15.1887C15.2873 15.1809 15.2943 15.1753 15.3027 15.1737L16.9295 14.8756C17.269 14.8134 17.5361 14.5504 17.6036 14.212L17.9068 12.6908C17.9472 12.4887 17.9119 12.2787 17.8078 12.1008L15.8341 8.72849C15.7048 8.50756 15.683 8.23979 15.7749 8.00086L16.4607 6.21762Z"
            stroke="var(--theme-ui-colors-text)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_di_1577_47710"
          x="5.22261"
          y="4.79273"
          width="14.1612"
          height="15.5231"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.480491" />
          <feGaussianBlur stdDeviation="0.480491" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1577_47710" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1577_47710" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.480491" />
          <feGaussianBlur stdDeviation="0.480491" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1577_47710" />
        </filter>
        <clipPath id="clip0_1577_47710">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Tlos
