import { SvgProps } from './types'

const GreenShield = ({ width }: SvgProps) => {

  return (
    <svg width={width || '10'}
         height='12'
         viewBox='0 0 10 12'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.0625 6.6H2.5V4.8H4.0625V3.3H5.9375V4.8H7.5V6.6H5.9375V8.1H4.0625V6.6ZM5 0L0 1.8V5.454C0 8.484 2.13125 11.31 5 12C7.86875 11.31 10 8.484 10 5.454V1.8L5 0Z'
        fill='#38A611' />
    </svg>
  )
}

export default GreenShield
