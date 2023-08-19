import { SvgProps } from './types'
import React from 'react'
import { useThemeUI } from 'theme-ui'

const Chain: React.FC<SvgProps> = ({ width }) => {
  const theme = useThemeUI()
  return (
    <svg width={width || '10'}
         height='14'
         viewBox='0 0 14 14'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.02932 5.97059C7.48329 5.42478 6.74284 5.11816 5.97079 5.11816C5.19874 5.11816 4.45829 5.42478 3.91225 5.97059L1.85305 8.02912C1.30701 8.57516 1.00024 9.31576 1.00024 10.088C1.00024 10.8602 1.30701 11.6008 1.85305 12.1469C2.3991 12.6929 3.1397 12.9997 3.91192 12.9997C4.68415 12.9997 5.42474 12.6929 5.97079 12.1469L7.00005 11.1176'
        stroke={theme.theme.colors?.text?.toString()} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M5.9707 8.02908C6.51674 8.57489 7.25719 8.8815 8.02924 8.8815C8.80129 8.8815 9.54173 8.57489 10.0878 8.02908L12.147 5.97054C12.693 5.4245 12.9998 4.6839 12.9998 3.91168C12.9998 3.13945 12.693 2.39886 12.147 1.85281C11.6009 1.30676 10.8603 1 10.0881 1C9.31588 1 8.57528 1.30676 8.02924 1.85281L6.99997 2.88208'
        stroke={theme.theme.colors?.text?.toString()} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default Chain
