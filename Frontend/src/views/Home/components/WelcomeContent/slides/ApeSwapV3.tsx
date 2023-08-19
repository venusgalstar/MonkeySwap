import { styles } from './styles'
import Bnb from './grayChains/bnb'
import Poly from './grayChains/poly'
import { Box } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import { Button, Flex, Link, Text } from 'components/uikit'
import useSelectChain from 'hooks/useSelectChain'
import Image from 'next/image'
import { ChainId } from 'config/constants/chains'

const ApeSwapV3 = () => {
  const { t } = useTranslation()
  const switchNetwork = useSelectChain()
  const { push } = useRouter()

  const handleNetworkSwitch = (chainId: ChainId) => {
    push('/add-liquidity')
    switchNetwork(chainId)
  }

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={{ ...styles.slideTitle, fontSize: ['43px', '43px', '38px', '64px'] }}>
          {t('Do More With Your Liquidity')}
        </Text>
        <Text sx={styles.slideSubtitle}>
          {t('Leverage ApeSwap’s new V3 capabilities to concentrate your liquidity depth.')}
        </Text>
        <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '0px'] }}>
          <Text sx={styles.availableOn}>{t('AVAILABLE ON')}</Text>
          <Bnb
            sx={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => handleNetworkSwitch(ChainId.BSC)}
          />
          <Poly
            sx={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => handleNetworkSwitch(ChainId.POLYGON)}
          />
        </Flex>
        <Link href="/add-liquidity" sx={{ textDecoration: 'none' }}>
          <Flex sx={styles.billImage}>
            <Box sx={{ ...styles.image, backgroundImage: `url('/images/homepage/add-liquidity-0.png')` }} />
          </Flex>
        </Link>
        <Flex sx={styles.buttonContainer}>
          <Button
            variant="secondary"
            sx={{ ...styles.learnMoreButton }}
            onClick={() =>
              window.open(
                'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity/how-to-add-liquidity',
                '_blank',
              )
            }
          >
            {t('Learn more')}
          </Button>
          <Link href="/add-liquidity" sx={{ textDecoration: 'none' }}>
            <Button sx={{ fontSize: ['14px', '14px', '14px', '16px'], minWidth: '140px' }}>{t('Add liquidity')}</Button>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['0', '0', '0', '100%'], justifyContent: 'center' }}>
        <Flex sx={{ ...styles.imageWrapper, background: 'none' }} onClick={() => push(`/bonds`)}>
          <Image src="/images/homepage/add-liquidity-0.png" sx={styles.image} alt="" width={500} height={500} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ApeSwapV3
