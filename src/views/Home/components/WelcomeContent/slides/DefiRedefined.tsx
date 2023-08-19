import React from 'react'
import { styles } from './styles'
import { Box } from 'theme-ui'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { grayIcons } from './grayChains'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/products'
import { Button, Flex, Link, Text } from 'components/uikit'
import useSelectChain from 'hooks/useSelectChain'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ChainId } from 'config/constants/chains'

// Hooks
import useGetTvlStats from 'state/homepage/hooks/useGetTvlStats'

const DefiRedefined = ({ randomImage }: { randomImage: number }) => {
  const { data: rawStats } = useGetTvlStats()
  const { t } = useTranslation()
  const switchNetwork = useSelectChain()
  const { push } = useRouter()

  const handleNetworkSwitch = (chainId: ChainId) => {
    push('/bonds')
    switchNetwork(chainId)
  }

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={styles.slideTitle}>{t('DeFi, Redefined')}</Text>
        <Text sx={styles.slideSubtitle}>
          {t('Join our growing network of')}{' '}
          {rawStats?.bondingPartnerCount && (
            <Text sx={styles.counterText}>
              <CountUp end={rawStats?.bondingPartnerCount} decimals={0} duration={3} separator="," />{' '}
            </Text>
          )}
          {t('communities building project-owned liquidity through ApeSwap Bonds.')}
        </Text>
        <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '0px'] }}>
          <Text sx={styles.availableOn}>{t('BONDS AVAILABLE ON')}</Text>
          {AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS].map((chainId) => {
            return (
              <Flex
                key={chainId}
                sx={{ marginRight: '10px', cursor: 'pointer' }}
                onClick={() => handleNetworkSwitch(chainId)}
              >
                {grayIcons[chainId]}
              </Flex>
            )
          })}
        </Flex>
        <Link href="/bonds">
          <Flex sx={styles.billImage}>
            <Box
              sx={{ ...styles.image, backgroundImage: `url('/images/homepage/treasury-bills-${randomImage}.jpg')` }}
            />
          </Flex>
        </Link>
        <Flex sx={styles.buttonContainer}>
          <Button
            variant="secondary"
            sx={styles.learnMoreButton}
            onClick={() => window.open('https://prelanding.webflow.io/bonds', '_blank')}
          >
            {t('Learn more')}
          </Button>
          <Link href="/bonds" sx={{ textDecoration: 'none' }}>
            <Button sx={{ fontSize: ['14px', '14px', '16px'], width: '138px' }}>{t('Buy a bond')}</Button>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['0', '0', '0', '100%'], justifyContent: 'center' }}>
        <Flex sx={{ ...styles.imageWrapper, background: 'lvl1' }} onClick={() => push(`/bonds`)}>
          <Image
            src={`/images/homepage/treasury-bills-${randomImage}.jpg`}
            alt="bond"
            sx={styles.image}
            width={400}
            height={400}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined
