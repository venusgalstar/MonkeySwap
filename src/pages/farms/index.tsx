import PageContainer from 'components/PageContainer'
import { usePollFarms } from 'state/farms/hooks'
import Farms from 'views/Farms'

const FarmsPage = () => {
  usePollFarms()
  return (
    <PageContainer variant="listView">
      <Farms />
    </PageContainer>
  )
}

export default FarmsPage
