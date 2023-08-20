import PageContainer from 'components/PageContainer'
import { usePollBills, usePollUserBills } from 'state/bills/hooks'
import Bonds from 'views/Bonds'

const BondsPage = () => {
  usePollBills()
  usePollUserBills()
  return (
    <PageContainer variant="listView">
      <Bonds />
    </PageContainer>
  )
}

export default BondsPage
