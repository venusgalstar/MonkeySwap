import { SvgProps } from './types'
import React from 'react'

const Verified: React.FC<SvgProps> = ({ width }) => {
  return (
    <svg width={width || '14'}
         height='13'
         viewBox='0 0 14 13'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.4166 6.5L11.9933 4.8725L12.1916 2.72L10.0858 2.24167L8.98325 0.375L6.99992 1.22667L5.01659 0.375L3.91409 2.23583L1.80825 2.70833L2.00659 4.86667L0.583252 6.5L2.00659 8.1275L1.80825 10.2858L3.91409 10.7642L5.01659 12.625L6.99992 11.7675L8.98325 12.6192L10.0858 10.7583L12.1916 10.28L11.9933 8.1275L13.4166 6.5ZM5.88575 9.25333L3.66909 7.03083L4.53242 6.1675L5.88575 7.52667L9.29825 4.1025L10.1616 4.96583L5.88575 9.25333Z'
        fill='#00A3FF' />
    </svg>
  )
}

export default Verified
