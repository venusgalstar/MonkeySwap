import { NETWORK_LABEL } from 'config/constants/chains'
import { DOC_LINKS, FARMS, ROUTE_NAMES } from 'config/constants/tutorials'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Svg } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'
import ScrollTop from './ScrollTop'

export const FloatingDocs = () => {
  const { asPath } = useRouter()
  const { chainId } = useWeb3React()
  const getDocsLink = () => {
    const networkLabel = NETWORK_LABEL[chainId as SupportedChainId]
    const farmTypes = networkLabel ? FARMS[networkLabel] : ''
    DOC_LINKS['FARMS'] = `https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms/${farmTypes}`
    return DOC_LINKS[ROUTE_NAMES[asPath ?? '/'] || 'HOME']
  }
  const showScroll = asPath.includes('/farms') || asPath.includes('/liquidity-health')

  return (
    <Flex sx={{
        position: 'fixed',
        right: ['20px', '20px', '35px'],
        bottom: ['75px', '75px', '75px', '75px', '30px'],
        width: ['40px', '40px', '50px'],
        flexDirection: 'column',
        zIndex: 3,
      }}>
      {showScroll && <ScrollTop />}
      <Flex sx={{ cursor: 'pointer' }}
            onClick={() => window.open(getDocsLink(), '_blank')}>
        <Svg icon='docs' color='primaryBright' />
      </Flex>
    </Flex>
  )
}

export default FloatingDocs
