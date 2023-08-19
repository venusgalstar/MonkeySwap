// Components
import { Flex } from 'components/uikit'

// Hooks
import useGetHomepageStats from 'state/homepage/hooks/useGetHomepageStats'

// Types
import { BondsStats } from 'state/homepage/types'
import BondsLandingCard from './BondsLandingCard'
interface ICardsDescription {
  name: BondsStats
  subTitle: string
  defaultValue: number
}

// Constants
const CARDS_DESCRIPTION: ICardsDescription[] = [
  { name: BondsStats.TotalBondsSold, subTitle: 'TOTAL BONDS SOLD', defaultValue: 12000 },
  { name: BondsStats.TotalBondedValue, subTitle: 'TOTAL BONDED VALUE', defaultValue: 4000000 },
  { name: BondsStats.BondsPartners, subTitle: 'BONDS PARTNERS', defaultValue: 40 },
]

const BondsLandingCards = () => {
  const { data: stats, isLoading } = useGetHomepageStats()

  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <Flex
        sx={{
          maxWidth: '1200px',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          mb: '20px',
          background: ['white2', 'white2', 'white2', 'transparent'],
          borderRadius: '15px',
          mt: '20px',
        }}
      >
        {CARDS_DESCRIPTION.map(({ name, subTitle, defaultValue }) => (
          <BondsLandingCard
            name={name}
            amount={stats?.[name] ?? defaultValue}
            subTitle={subTitle}
            key={name}
            isLoading={isLoading}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default BondsLandingCards
