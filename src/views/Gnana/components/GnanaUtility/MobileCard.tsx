import { useState } from 'react'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import 'swiper/swiper.min.css'
import { Bubble } from './styles'
import { getDotPos } from 'utils/getDotPos'
import { utilitySlides } from './UtilitySlides'
import { Flex, SwiperDots } from 'components/uikit'

const MobileCard = () => {
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, utilitySlides.length)
    setActiveSlide(slideNumber)
  }
  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }
  return (
    <>
      <Swiper
        id="serviceSwiper"
        initialSlide={0}
        onSwiper={setSwiper}
        spaceBetween={20}
        slidesPerView={1}
        loopedSlides={utilitySlides?.length}
        centeredSlides
        resizeObserver
        onSlideChange={handleSlide}
      >
        {utilitySlides.map((slide, index) => {
          return (
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }} key={slide.key}>
              {slide}
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Flex sx={{ justifyContent: 'center', alignContent: 'center', width: '100%', mt: '30px' }}>
        {[...Array(utilitySlides?.length)].map((_, i) => {
          return <SwiperDots isActive={i === activeSlide} onClick={() => slideNewsNav(i)} key={i} />
        })}
      </Flex>
    </>
  )
}

export default MobileCard
