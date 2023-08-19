import { useEffect, useState } from 'react'

const useProgressiveImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<string | undefined>(undefined)
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setSourceLoaded(src)
  }, [src])

  return sourceLoaded
}

export default useProgressiveImage
