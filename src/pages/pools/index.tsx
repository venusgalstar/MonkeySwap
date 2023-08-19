import PageContainer from 'components/PageContainer'
import { usePollPools } from 'state/pools/hooks'
import Pools from 'views/Pools'

const PoolsPage = () => {
  usePollPools()
  return (
    <PageContainer variant="listView">
      <Pools />
    </PageContainer>
  )
}

export default PoolsPage
