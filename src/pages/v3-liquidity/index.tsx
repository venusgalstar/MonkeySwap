import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import PageContainer from 'components/PageContainer'
import { useRouter } from 'next/router'
import Positions from 'views/Positions'

const LiquidityPage = () => {
  const { chainId } = useWeb3React()
  const { query, push } = useRouter()
  if (chainId === SupportedChainId.ARBITRUM_ONE || chainId === SupportedChainId.MAINNET) {
    push(`${process.env.NEXT_PUBLIC_LEGACY_APESWAP_URL}/liquidity`)
  }
  return (
    <PageContainer variant="dex">
      <Positions />
    </PageContainer>
  )
}

export default LiquidityPage
