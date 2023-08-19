import PageContainer from 'components/PageContainer'
import { useRouter } from 'next/router'
import ZapLiquidity from 'views/V2/Zap'

const ZapPage = () => {
  const { query } = useRouter()
  const [currencyIdA, currencyIdB, currencyIdC] = (query.currency as string[]) || [undefined, undefined, undefined]

  return (
    <PageContainer variant="dex">
      <ZapLiquidity currencyIdA={currencyIdA} currencyIdB={currencyIdB} currencyIdC={currencyIdC} />
    </PageContainer>
  )
}

export default ZapPage
