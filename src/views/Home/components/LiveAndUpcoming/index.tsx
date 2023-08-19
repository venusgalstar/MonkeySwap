import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Box } from 'theme-ui'

// Components
import { Text, Flex, Button } from 'components/uikit'
import NewsModal from 'components/NewsLetter/NewsModal'
import ArrowNav from './components/ArrowNav'

// Constants
import { mailChimpUrl } from 'config/constants/api'
import { breakpointMap } from 'theme/base'

// Hooks
import { useTranslation } from 'contexts/Localization'
import useGetLiveAndUpcoming from 'state/homepage/hooks/useGetLiveAndUpcoming'
import useModal from 'hooks/useModal'
import useSwiper from 'hooks/useSwiper'

// Types
import { LiveAndUpcoming } from 'state/homepage/types'

// Constants
const SPACE_BETWEEN_SLIDERS = 20
const SLIDER_DESIRED_WIDTH = 224

const LiveAndUpcoming = () => {
  const [swiperSlideWidth, setSwiperSliderWidth] = useState(224)
  const [activeSlide, setActiveSlide] = useState(0)
  const swiperRef = useRef(null)

  const { data } = useGetLiveAndUpcoming()
  const { swiper, setSwiper } = useSwiper()
  const { t } = useTranslation()

  // @ts-ignore
  const swiperWidth = swiperRef?.current?.offsetWidth

  /** I have learned this math trick for calculating spindle spacing while working as a carpenter,
  in this case the width of the slider is being dynamically calculated based on the width of the swiper on the screen */
  const slidersCount = Math.floor(swiperWidth / SLIDER_DESIRED_WIDTH)
  const widthOfSpindles = (swiperWidth - (slidersCount - 1) * SPACE_BETWEEN_SLIDERS) / slidersCount

  const isMobile = swiperWidth < breakpointMap.md

  useEffect(() => {
    if (isMobile) {
      setSwiperSliderWidth(widthOfSpindles - 50)
    } else {
      setSwiperSliderWidth(widthOfSpindles)
    }
  }, [widthOfSpindles, swiperWidth, isMobile])

  const [onPresentModal] = useModal(<NewsModal mailChimpUrl={mailChimpUrl} />, false, false, 'newsModal')

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex)
  }

  return (
    <Flex
      sx={{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'end',
        mb: ['60px', '60px', '75px'],
        mt: ['30px', '30px', '50px'],
      }}
    >
      <Flex
        sx={{
          mr: '20px',
          display: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'block'],
          height: widthOfSpindles,
          alignSelf: 'end',
        }}
      >
        <ArrowNav handleNav={() => swiper?.slidePrev()} direction="left" />
      </Flex>
      <Flex
        sx={{
          maxWidth: '1412px',
          width: '90vw',
          flexDirection: 'column',
          alignSelf: 'center',
          mt: ['62px', '62px', '90px'],
        }}
      >
        <Text sx={{ fontSize: ['25px', '25px', '35px'], fontWeight: '500' }}>{t('Live & Upcoming')}</Text>
        <Button
          onClick={onPresentModal}
          variant="text"
          sx={{
            fontSize: ['12px', '12px', '15px'],
            fontWeight: '500',
            color: '#FFB300',
            opacity: '0.5',
            textTransform: 'initial',
            pl: '0px',
          }}
        >
          {t('Subscribe to our newsletter >')}
        </Button>
        <Flex>
          <Box sx={{ mr: '20px', display: ['none', 'none', 'block', 'block', 'block', 'block', 'block', 'none'] }}>
            <ArrowNav handleNav={() => swiper?.slidePrev()} direction="left" />
          </Box>
          <Swiper
            ref={swiperRef}
            id="bondsListSwiper"
            onSwiper={setSwiper}
            slidesPerView={isMobile ? 'auto' : slidersCount}
            loop
            loopedSlides={data?.length}
            lazy
            onSlideChange={handleSlide}
            style={{ width: '100%' }}
            spaceBetween={SPACE_BETWEEN_SLIDERS}
          >
            {data
              ?.sort(
                (a: LiveAndUpcoming, b: LiveAndUpcoming) => new Date(a.time).getTime() - new Date(b.time).getTime(),
              ) // Sort by date
              .map((slide: LiveAndUpcoming, index: number) => {
                const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' }

                const [slideImage] = slide?.photo
                const slideTime = slide?.time
                const timestamp = new Date(slideTime)

                let line1 = slide?.tag ? slide?.tag : 'NOW'
                let line2 = ''

                if (timestamp.getTime() > Date.now() && !slide?.tag) {
                  line1 = timestamp.toLocaleDateString('en-GB', options)
                  line2 = `${timestamp.getUTCHours().toString().padStart(2, '0')}:${timestamp
                    .getUTCMinutes()
                    .toString()
                    .padStart(2, '0')} UTC`
                }

                return (
                  <SwiperSlide
                    key={`${index}${slide.id}`}
                    id={`${index}${slide.id}`}
                    style={{
                      maxWidth: `${swiperSlideWidth}px`,
                      minWidth: `${swiperSlideWidth}px`,
                    }}
                  >
                    <Link target={slide?.link && '_blank'} href={slide?.link || ''}>
                      <Flex
                        sx={{
                          height: `${swiperSlideWidth}px`,
                          width: `${swiperSlideWidth}px`,
                        }}
                      >
                        <Box
                          sx={{
                            width: '50px',
                            height: '33px',
                            right: '10px',
                            top: '6px',
                            borderRadius: '5px',
                            backgroundColor: 'rgba(33, 33, 33, 0.7)',
                            position: 'absolute',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text sx={{ lineHeight: '12.5px', fontSize: '11px', fontWeight: '700', color: 'white' }}>
                            {line1}
                          </Text>
                          <Text sx={{ lineHeight: '12.5px', fontSize: '8px', fontWeight: '500', color: 'white' }}>
                            {line2}
                          </Text>
                        </Box>
                        <Image src={slideImage.url} fill alt="Slide image" style={{ borderRadius: '10px' }} />
                      </Flex>
                    </Link>
                  </SwiperSlide>
                )
              })}
          </Swiper>
          <Box sx={{ ml: '20px', display: ['none', 'none', 'block', 'block', 'block', 'block', 'block', 'none'] }}>
            <ArrowNav handleNav={() => swiper?.slideNext()} direction="right" />
          </Box>
        </Flex>
      </Flex>
      <Flex
        sx={{
          ml: '20px',
          display: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'block'],
          height: widthOfSpindles,
          alignSelf: 'end',
        }}
      >
        <ArrowNav handleNav={() => swiper?.slideNext()} direction="right" />
      </Flex>
    </Flex>
  )
}

export default LiveAndUpcoming
