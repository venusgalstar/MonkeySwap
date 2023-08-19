import { useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Box } from 'theme-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper.min.css'
import { chunk } from 'lodash'

// Components
import { Flex, Text, SwiperDots, Link } from 'components/uikit'
import ListCard from '../ListCard'

// Hooks
import useSwiper from 'hooks/useSwiper'
import { useTranslation } from 'contexts/Localization'

// Types
import { BondDTO } from 'state/homepage/types'
import { useWeb3React } from '@web3-react/core'

interface BondsListProps {
  bonds: BondDTO[]
}

const BondsList = ({ bonds }: BondsListProps) => {
  const router = useRouter()
  const [activeSlide, setActiveSlide] = useState(0)
  const { chainId: currentChain } = useWeb3React()
  const { swiper, setSwiper } = useSwiper()
  const { t } = useTranslation()

  const chunkedBonds = chunk(bonds, 4)

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex)
  }

  const slideTo = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

  const handleCardClick = (item: BondDTO): void => {
    const { chainId, billAddress } = item
    if (chainId !== currentChain) {
      router.push('/bonds?switchChain=true')
    } else {
      router.push(`/bonds?bondAddress=${billAddress.toLowerCase()}`)
    }
  }

  const renderListCard = (item: BondDTO, itemIndex: number): JSX.Element => {
    const { payoutTokenName = '', chainId, discount = 0, isFeatured, isNew } = item
    return (
      <ListCard
        key={`${payoutTokenName}${itemIndex}`}
        name={payoutTokenName}
        chainId={chainId}
        serviceTokenProps={{ token1: payoutTokenName }}
        isFeatured={isFeatured}
        isNew={isNew}
        handleClick={() => handleCardClick(item)}
        rightContent={
          <Flex sx={{ flexDirection: 'column', alignItems: 'end' }}>
            <Text sx={{ opacity: '0.6', fontSize: ['10px', '10px', '12px'], fontWeight: 'light' }}>
              {t('Discount')}
            </Text>
            <Box
              sx={{
                fontSize: ['12px', '12px', '16px'],
                fontWeight: 'bold',
                color: discount >= 0 ? 'success' : 'error',
              }}
            >
              {(Math.floor(discount * 100) / 100).toFixed(2)}%
            </Box>
          </Flex>
        }
      />
    )
  }

  const slides = chunkedBonds.map((chunk, index) => (
    <Grid key={index} sx={{ width: '100%' }} columns="1fr">
      {chunk.map((item, itemIndex) => renderListCard(item, itemIndex))}
    </Grid>
  ))

  return (
    <>
      {/* Mobile view starts */}
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          display: ['flex', 'flex', 'none'],
          mt: '30px',
        }}
      >
        <Swiper
          id="bondsListSwiper"
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
          <Flex sx={{ mt: '50px' }}>
            {[...Array(slides.length)].map((_, i) => {
              return <SwiperDots isActive={i === activeSlide} onClick={() => slideTo(i)} key={i} />
            })}
          </Flex>
        </Flex>
      </Flex>
      {/* Desktop view starts */}
      <Grid
        columns="1fr 1fr 1fr"
        sx={{
          gridGap: '10px',
          mt: '70px',
          display: ['none', 'none', 'grid'],
        }}
      >
        {chunkedBonds.map((chunk, index) => (
          <Flex key={index} sx={{ flexDirection: 'column', gap: '15px' }}>
            {chunk.map((item, itemIndex) => renderListCard(item, itemIndex))}
          </Flex>
        ))}
      </Grid>
      <Flex sx={{ mt: ['10px', '10px', '15px'], justifyContent: 'center' }}>
        <Link href="/bond-markets">{'See All Bonds >'}</Link>
      </Flex>
    </>
  )
}

export default BondsList
