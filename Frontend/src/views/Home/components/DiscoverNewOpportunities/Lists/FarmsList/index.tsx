import { useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Grid, Box } from 'theme-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper.min.css'

// Components
import { Flex, SwiperDots, Text } from 'components/uikit'
import ListCard from '../ListCard'

// Hooks
import useSwiper from 'hooks/useSwiper'
import { useTranslation } from 'contexts/Localization'

// Types
import { FarmDTO, SortedFarms } from 'state/homepage/types'

interface FarmsListProps {
  farms: SortedFarms
}

const FarmsList = ({ farms }: FarmsListProps) => {
  const router = useRouter()
  const { chainId: currentChain } = useWeb3React()
  const [activeSlide, setActiveSlide] = useState(0)
  const { swiper, setSwiper } = useSwiper()
  const { t } = useTranslation()

  const { blueChips, highestYield } = farms

  const sortedFarms = [
    { title: 'Highest Yield', farms: highestYield },
    { title: 'Blue Chips', farms: blueChips },
  ]

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex)
  }

  const slideTo = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

  const handleClick = (item: FarmDTO) => {
    const { chainId, pid, type } = item
    if (chainId !== currentChain) {
      router.push(`/farms?switchChain=true`)
    } else {
      router.push(`/farms?${type === 'jungle' ? 'jid' : 'pid'}=${pid}`)
    }
  }

  const renderListCard = (item: FarmDTO, itemIndex: number): JSX.Element => {
    const { chainId, apr, stake, reward } = item
    const { symbol } = stake
    const { symbol: rewardSymbol } = reward
    const [firstToken, secondToken] = symbol.split('-')
    return (
      <ListCard
        key={`${symbol}${itemIndex}`}
        name={symbol}
        chainId={chainId}
        serviceTokenProps={{ token1: firstToken, token2: secondToken, token3: rewardSymbol, stakeLp: true }}
        handleClick={() => handleClick(item)}
        hoverTitle="Stake"
        rightContent={
          <Flex sx={{ flexDirection: 'column', alignItems: 'end' }}>
            <Text sx={{ opacity: '0.6', fontSize: ['10px', '10px', '12px'], fontWeight: 'light' }}>{t('APY')}</Text>
            <Box
              sx={{
                fontSize: ['12px', '12px', '16px'],
                fontWeight: 'bold',
                color: 'success',
              }}
            >
              {(Math.floor(apr * 100) / 100).toFixed(2)}%
            </Box>
          </Flex>
        }
      />
    )
  }

  const slides = sortedFarms.map(({ title, farms }, index) => {
    return (
      <Grid key={index} sx={{ width: '100%' }} columns="1fr">
        <Flex sx={{ justifyContent: 'center' }}>
          <Text sx={{ fontSize: '12px', fontWeight: '300', color: '#A09F9C' }}>{t(title)}</Text>
        </Flex>
        {farms?.map((item, itemIndex) => renderListCard(item, itemIndex))}
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
          id="farmsListSwiper"
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
        columns="1fr 1fr"
        sx={{
          gridGap: '10px',
          mt: '35px',
          display: ['none', 'none', 'grid'],
        }}
      >
        {sortedFarms.map(({ title, farms }, index) => {
          return (
            <Flex key={index} sx={{ flexDirection: 'column', gap: '15px' }}>
              <Flex sx={{ justifyContent: 'center' }}>
                <Text sx={{ fontSize: '16px', fontWeight: '300', color: '#A09F9C' }}>{t(title)}</Text>
              </Flex>
              {farms?.map((item, itemIndex) => renderListCard(item, itemIndex))}
            </Flex>
          )
        })}
      </Grid>
    </>
  )
}

export default FarmsList
