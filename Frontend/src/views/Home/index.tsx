import WelcomeContent from './components/WelcomeContent/WelcomeContent'
import SwiperProvider from 'contexts/SwiperProvider'
import { Flex } from 'components/uikit'
import useAllTokenPrices from 'hooks/useAllTokenPrices'

// Components
import BondsStatsCards from './components/BondsStatsCards'
import DiscoverNewOpportunities from './components/DiscoverNewOpportunities'
import LiveAndUpcoming from './components/LiveAndUpcoming'
import FriendsOfApeSwap from './components/FriendsOfApeSwap'

const Home = ({ randomImage, randomLHDImage }: { randomImage: number; randomLHDImage: number }) => {
  useAllTokenPrices()

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%' }}>
      <SwiperProvider>
        <WelcomeContent randomImage={randomImage} randomLHDImage={randomLHDImage} />
      </SwiperProvider>
      <BondsStatsCards />
      <DiscoverNewOpportunities />
      <SwiperProvider>
        <LiveAndUpcoming />
      </SwiperProvider>
      <FriendsOfApeSwap />
    </Flex>
  )
}

export default Home
