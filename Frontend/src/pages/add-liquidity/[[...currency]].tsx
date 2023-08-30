import { useWeb3React } from '@web3-react/core'
import PageContainer from 'components/PageContainer'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import { useRouter } from 'next/router'
import AddLiquidityV2 from 'views/V2/AddLiquidityV2'

const AddLiquidityPageV2 = () => {
  const { chainId } = useWeb3React()
  const { query } = useRouter()
  const [currencyIdA, currencyIdB] = (query.currency as string[]) || [undefined, undefined]
  const bananaAddress = BANANA_ADDRESSES[chainId || 56]

  return (
    <PageContainer variant="dex">
      <AddLiquidityV2 currencyIdA={currencyIdA ?? 'ETH'} currencyIdB={currencyIdB ?? bananaAddress} />
    </PageContainer>
  )
}

export default AddLiquidityPageV2
