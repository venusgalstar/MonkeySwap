import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CountUp from 'react-countup'
import { useThemeUI } from 'theme-ui'

// Hooks
import useGetIndustryStats from 'state/lhd/hooks/useGetIndustryStats'
import { useTranslation } from 'contexts/Localization'

// Components
import { Button, Flex, Link, Text } from 'components/uikit'

// Styles
import { styles } from './styles'

// Constants
const SLIDE_INDEX = 1 // Index of the LHD component in the SwiperSlide slides array

const LHD = ({ randomLHDImage, activeSlide }: { randomLHDImage: number; activeSlide: number }) => {
  const [hasBeenViewed, setHasBeenViewed] = useState(false)
  const { push } = useRouter()
  const { colorMode } = useThemeUI()
  const { data: industryStats } = useGetIndustryStats()
  const { t } = useTranslation()

  const { tokensTracked = 0 } = industryStats || {}

  // Helper to animate the countUp when the slide is viewed for the fist time only
  useEffect(() => {
    if (activeSlide === SLIDE_INDEX) {
      setHasBeenViewed(true)
    }
  }, [activeSlide])

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={styles.slideTitle}>{t('Gain The Upper Hand')}</Text>
        <Text sx={styles.slideSubtitle}>
          {t('Take your analysis to the next level with liquidity health data across')}{' '}
          <Text sx={styles.counterText}>
            <CountUp end={hasBeenViewed ? tokensTracked : 0} decimals={0} duration={4} separator="," />{' '}
          </Text>
          {t('projects and counting.')}
        </Text>
        <Text sx={styles.availableOn}>{t('LIQUIDITY HEALTH DASHBOARD BETA NOW LIVE!')}</Text>
        <Link href="/liquidity-health" sx={{ textDecoration: 'none' }}>
          <Flex
            sx={{
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              mt: '25px',
              display: ['flex', 'flex', 'none'],
            }}
          >
            <Image
              src={`/images/homepage/lhd/lhd-drop-${colorMode}.svg`}
              alt="liquidity health drop"
              width={20}
              height={25}
            />
            <Text sx={{ fontSize: '16px' }}>{t('Liquidity Health Dashboard')}</Text>
          </Flex>
          <Flex sx={{ ...styles.billImage, position: 'relative', justifyContent: 'start', marginTop: '10px' }}>
            <Image
              src={`/images/homepage/lhd/lhd-chart-${colorMode}.svg`}
              alt="liquidity health dashboard"
              sx={{
                ...styles.image,
                py: '0px',
                objectFit: 'cover',
                width: '300px',
                height: 'fit-content',
                border: '2px solid #FFB300',
              }}
              width={150}
              height={150}
            />
            <Image
              src={`/images/homepage/lhd/lhd-card-${randomLHDImage}.svg`}
              alt="liquidity health dashboard"
              sx={{
                ...styles.image,
                position: 'absolute',
                top: '25px',
                left: '100px',
                height: '70px',
                borderRadius: '0px',
              }}
              width={400}
              height={400}
            />
          </Flex>
        </Link>
        <Flex sx={styles.buttonContainer}>
          <Button
            variant="secondary"
            sx={styles.learnMoreButton}
            onClick={() =>
              window.open(
                'https://apeswap.gitbook.io/apeswap-finance/product-and-features/liquidity-health-dashboard',
                '_blank',
              )
            }
          >
            {t('Learn more')}
          </Button>
          <Link href="/liquidity-health" sx={{ textDecoration: 'none' }}>
            <Button sx={{ fontSize: ['14px', '14px', '16px'], width: '138px' }}>{t('Enter now')}</Button>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['0', '0', '0', '100%'], justifyContent: 'center' }}>
        <Flex
          sx={{ ...styles.imageWrapper, position: 'relative', padding: '0px', height: '355px !important' }}
          onClick={() => push(`/liquidity-health`)}
        >
          <Flex sx={{ gap: '5px', mb: '18px' }}>
            <Image
              src={`/images/homepage/lhd/lhd-drop-${colorMode}.svg`}
              alt="liquidity health drop"
              width={20}
              height={25}
            />
            <Text sx={{ fontSize: '20px' }}>{t('Liquidity Health Dashboard')}</Text>
          </Flex>
          <Image
            src={`/images/homepage/lhd/lhd-chart-${colorMode}.svg`}
            alt="liquidity health dashboard"
            sx={{
              ...styles.image,
              border: '3px solid #FFB300',
              objectFit: 'cover',
              maxWidth: '550px',
              height: 'fit-content',
              maxHeight: '275px',
              alignSelf: 'end',
            }}
            width={150}
            height={150}
          />
          <Image
            src={`/images/homepage/lhd/lhd-card-${randomLHDImage}.svg`}
            alt="liquidity health dashboard"
            sx={{
              ...styles.image,
              position: 'absolute',
              top: ['auto', 'auto', 'auto', '80px', '65px'],
              left: ['auto', 'auto', 'auto', '100px', '180px'],
              maxHeight: ['auto', 'auto', 'auto', '100px', '150px'],
            }}
            width={400}
            height={400}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LHD
