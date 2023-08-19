import React, { useState } from 'react'
import { styles } from './styles'
import BackgroundCircles from './BackgroundCircles'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import useSwiper from 'hooks/useSwiper'
import SwiperCore, { Autoplay } from 'swiper'
import { getDotPos } from 'utils/getDotPos'
import DefiRedefined from './slides/DefiRedefined'

// Components
import LHD from './slides/LHD'
//import ApeSwapV3 from './slides/ApeSwapV3'
import { Flex, SwiperDots } from 'components/uikit'

SwiperCore.use([Autoplay])

const WelcomeContent = ({ randomImage, randomLHDImage }: { randomImage: number; randomLHDImage: number }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { swiper, setSwiper } = useSwiper()
  const slides = [
    <DefiRedefined randomImage={randomImage} key={0} /> /*, <ApeSwapV3 key={1} />*/,
    <LHD randomLHDImage={randomLHDImage} key={1} activeSlide={activeSlide} />,
  ]

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, 2)
    setActiveSlide(slideNumber)
  }

  const slideTo = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.centeredContainer}>
        <Flex sx={styles.slideContainer}>
          {slides.length > 1 ? (
            <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <Swiper
                id="homeSwiper"
                autoplay={{
                  delay: 12000,
                  disableOnInteraction: false,
                }}
                onSwiper={setSwiper}
                slidesPerView="auto"
                centeredSlides
                lazy
                preloadImages={false}
                onSlideChange={handleSlide}
                style={{ width: '100%' }}
              >
                {slides.map((slide, index) => {
                  return (
                    <SwiperSlide
                      style={{
                        width: '100%',
                        padding: '1px',
                        height: 'fit-content',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      key={index}
                    >
                      {slide}
                    </SwiperSlide>
                  )
                })}
              </Swiper>
              <Flex
                sx={{
                  position: 'relative',
                  width: '95vw',
                  maxWidth: '1412px',
                  justifyContent: ['center', 'center', 'center', 'flex-start'],
                }}
              >
                <Flex sx={styles.bubbleContainer}>
                  {[...Array(slides.length)].map((_, i) => {
                    return <SwiperDots isActive={i === activeSlide} onClick={() => slideTo(i)} key={i} />
                  })}
                </Flex>
              </Flex>
            </Flex>
          ) : (
            slides[0]
          )}
        </Flex>
        <Flex sx={styles.circlesContainer}>
          <Flex sx={styles.yellowShadow} />
          <BackgroundCircles />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default WelcomeContent
