import React, { useState } from 'react'
import { Skeleton } from 'components/uikit'
import Image from 'next/image'

const BAD_SRCS: { [tokenAddress: string]: true } = {}

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcs: string[]
  width?: number
  height?: number
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const Logo = ({ srcs, alt, width, height }: LogoProps) => {
  const [, refresh] = useState<number>(0)

  const src: string | undefined = srcs.find((s) => !BAD_SRCS[s])

  if (src) {
    return (
      <Image
        unoptimized
        sx={{ borderRadius: width ? width / 2 : 15 }}
        alt={alt || ''}
        src={src}
        width={width || 30}
        height={height || 30}
        onError={() => {
          if (src) BAD_SRCS[src] = true
          refresh((i) => i + 1)
        }}
      />
    )
  }

  return <Skeleton />
}

export default Logo
