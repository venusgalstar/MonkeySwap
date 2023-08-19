import React, { createContext, Dispatch, useState } from 'react'
import SwiperCore from 'swiper'

interface Context {
  swiper: SwiperCore | undefined
  setSwiper: Dispatch<React.SetStateAction<SwiperCore | undefined>>
  destroySwiper: () => void
}

export const SwiperContext = createContext<Context>({
  swiper: undefined,
  setSwiper: () => null,
  destroySwiper: () => null,
})

const SwiperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [swiper, setSwiper] = useState<SwiperCore | undefined>(undefined)

  const destroySwiper = () => {
    if (swiper) {
      swiper.destroy()
      setSwiper(undefined)
    }
  }

  return <SwiperContext.Provider value={{ swiper, setSwiper, destroySwiper }}>{children}</SwiperContext.Provider>
}

export default SwiperProvider
