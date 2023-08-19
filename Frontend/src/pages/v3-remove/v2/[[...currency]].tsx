import PageContainer from 'components/PageContainer'
import { useRouter } from 'next/router'
import RemoveLiquidityV2 from 'views/V2/RemoveLiquidityV2'

const RemoveLiquidityPage = () => {
  const { query } = useRouter()
  const [currencyIdA, currencyIdB] = (query.currency as string[]) || [undefined, undefined]

  return (
    <PageContainer variant="dex">
      <RemoveLiquidityV2 currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
    </PageContainer>
  )
}

export default RemoveLiquidityPage
