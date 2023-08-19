import { useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Box } from 'theme-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper.min.css'

// Components
import { Flex, SwiperDots, Text } from 'components/uikit'
import ListCard from '../ListCard'
import LineChart from './LineChart'

// Hooks
import useSwiper from 'hooks/useSwiper'
import { useTranslation } from 'contexts/Localization'

// Types
import { TokenDTO, SortedTokens } from 'state/homepage/types'

interface TokensListProps {
  tokens: SortedTokens
}

const TokensList = ({ tokens }: TokensListProps) => {
  const router = useRouter()
  const [activeSlide, setActiveSlide] = useState(0)
  const { swiper, setSwiper } = useSwiper()
  const { t } = useTranslation()

  const { trending, mostTraded, new: newTokens } = tokens

  const sortedTokens = [
    { title: 'Trending', tokens: trending },
    { title: 'Most Traded', tokens: mostTraded },
    { title: 'New', tokens: newTokens },
  ]

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex)
  }

  const slideTo = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

  const handleClick = (item: TokenDTO) => {
    const { tokenAddress } = item
    router.push(`https://dex.apeswap.finance/swap?outputCurrency=${tokenAddress}`)
  }

  const renderListCard = (item: TokenDTO, itemIndex: number): JSX.Element => {
    const { tokenTicker, chainId, priceChange24h, tokenPrice, priceHistory } = item
    return (
      <ListCard
        key={`${tokenTicker}${itemIndex}`}
        name={tokenTicker}
        chainId={chainId}
        serviceTokenProps={{ token1: tokenTicker }}
        bg="transparent"
        handleClick={() => handleClick(item)}
        rightContent={
          <Flex
            sx={{
              alignItems: 'center',
              gap: ['60px', '60px', '30px'],
            }}
          >
            <LineChart priceHistory={priceHistory} isBullish={priceChange24h > 0} />
            <Flex sx={{ flexDirection: 'column', alignItems: 'end' }}>
              <Box
                sx={{
                  fontSize: ['10px', '10px', '12px'],
                  fontWeight: 'bold',
                  color: priceChange24h >= 0 ? 'success' : 'error',
                }}
              >
                {`${priceChange24h > 0 ? '+' : ''}${(Math.floor(priceChange24h * 100) / 100).toFixed(2)}%`}
              </Box>
              <Box
                sx={{
                  fontSize: ['12px', '12px', '14px'],
                  fontWeight: 'bold',
                  display: ['flex', 'flex', 'none'],
                }}
              >
                ${String(tokenPrice).slice(0, 6)}
              </Box>
              <Box
                sx={{
                  fontSize: ['12px', '12px', '14px'],
                  fontWeight: 'bold',
                  display: ['none', 'none', 'flex'],
                }}
              >
                ${String(tokenPrice).slice(0, 8)}
              </Box>
            </Flex>
          </Flex>
        }
      />
    )
  }

  const slides = sortedTokens.map(({ title, tokens }, index) => {
    return (
      <Grid key={index} sx={{ width: '100%' }} columns="1fr">
        <Flex sx={{ justifyContent: 'center' }}>
          <Text sx={{ fontSize: '12px', fontWeight: '300', color: '#A09F9C' }}>{t(title)}</Text>
        </Flex>
        <Flex sx={{ flexDirection: 'column', gap: '10px', bg: 'white2', borderRadius: '10px' }}>
          {tokens?.map((item, itemIndex) => renderListCard(item, itemIndex))}
        </Flex>
      </Grid>
    )
  })

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
          id="tokensListSwiper"
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
          mt: '35px',
          display: ['none', 'none', 'grid'],
        }}
      >
        {sortedTokens.map(({ title, tokens }, index) => {
          return (
            <Flex key={index} sx={{ flexDirection: 'column', gap: '15px' }}>
              <Flex sx={{ justifyContent: 'center' }}>
                <Text sx={{ fontSize: '16px', fontWeight: '300', color: '#A09F9C' }}>{t(title)}</Text>
              </Flex>
              <Flex sx={{ flexDirection: 'column', gap: '10px', bg: 'white2', borderRadius: '10px' }}>
                {tokens?.map((item, itemIndex) => renderListCard(item, itemIndex))}
              </Flex>
            </Flex>
          )
        })}
      </Grid>
    </>
  )
}

export default TokensList
