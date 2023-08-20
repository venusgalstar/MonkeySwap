import { Grid } from 'theme-ui'

// Components
import { Flex } from 'components/uikit'
import BondStatsCard from './BondStatsCard'

// Hooks
import useGetHomepageStats from 'state/homepage/hooks/useGetHomepageStats'

// Types
import { BondsStats } from 'state/homepage/types'
interface ICardsDescription {
  name: BondsStats
  subTitle: string
  defaultValue: number
}

// Constants
const CARDS_DESCRIPTION: ICardsDescription[] = [
  { name: BondsStats.TotalBondsSold, subTitle: 'TOTAL BONDS SOLD', defaultValue: 12000 },
  { name: BondsStats.TotalBondedValue, subTitle: 'TOTAL BONDED VALUE', defaultValue: 4000000 },
  { name: BondsStats.TotalTradeVolume, subTitle: 'TOTAL TRADE VOL', defaultValue: 18000000000 },
  { name: BondsStats.TotalValueLocked, subTitle: 'TOTAL VALUE LOCKED', defaultValue: 30000000 },
]

const BondsStatsCards = () => {
  const { data: stats, isLoading } = useGetHomepageStats()

  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <Grid
        sx={{
          display: ['grid', 'grid', 'flex', 'flex'],
          maxWidth: '1200px',
          mx: '30px',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          gridTemplateColumns: ['1fr 1fr', '1fr 1fr', 'inherit', 'inherit'],
          my: ['20px', '20px', '50px'],
        }}
      >
        {CARDS_DESCRIPTION.map(({ name, subTitle, defaultValue }) => (
          <BondStatsCard
            name={name}
            amount={stats?.[name] ?? defaultValue}
            subTitle={subTitle}
            key={name}
            isLoading={isLoading}
          />
        ))}
      </Grid>
    </Flex>
  )
}

export default BondsStatsCards
