import React from 'react'
import { SvgProps, rotation } from './types'

const Logout: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, height, getStyles }) => {
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
    <svg
      width={width || '18'}
      height={height || '19'}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={style}
    >
      <path
        d="M3.46767 17.2253C2.91777 17.2253 2.44902 17.0316 2.06142 16.6443C1.67412 16.2567 1.48047 15.788 1.48047 15.2381V4.62527C1.48047 4.07537 1.67412 3.60347 2.06142 3.20957C2.44902 2.81597 2.91777 2.61917 3.46767 2.61917H9.01797V4.62527H3.46767V15.2381H9.01797V17.2253H3.46767ZM12.3552 14.1504L10.9305 12.7631L12.7489 10.9253H6.67392V8.93807H12.7305L10.8927 7.11917L12.3178 5.71292L16.5366 9.95057L12.3552 14.1504Z"
        fill="#FAFAFA"
      />
    </svg>
  )
}

export default Logout
