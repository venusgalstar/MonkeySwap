// Contexts
import SwiperProvider from 'contexts/SwiperProvider'

// Components
import BondsList from './BondsList'
import FarmsList from './FarmsList'
import TokensList from './TokensList'

// Types
import { TabNavOptions } from '../types'
import { HomepageDTO } from 'state/homepage/types'
interface ListsProps {
  activeTab: TabNavOptions
  stats: HomepageDTO | undefined
}

const Lists = ({ activeTab, stats }: ListsProps) => {
  const { bonds = [], farms = {}, tokens = {} } = stats ?? {}
  const activeList = {
    [TabNavOptions.BONDS]: <BondsList bonds={bonds} />,
    [TabNavOptions.FARMS]: <FarmsList farms={farms} />,
    [TabNavOptions.TOKENS]: <TokensList tokens={tokens} />,
  }

  return <SwiperProvider>{activeList[activeTab]}</SwiperProvider>
}

export default Lists
