import { Box } from 'theme-ui'
import CountUp from 'react-countup'

// Components
import { Flex, Skeleton, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'

// Utils
import { formatDollar } from 'utils/formatNumbers'

// Types
import { BondsStats } from 'state/homepage/types'

const BondStatsCard = ({
  name,
  amount,
  subTitle,
  isLoading,
}: {
  name: string
  amount: number
  subTitle: string
  isLoading: boolean
}) => {
  const { t } = useTranslation()

  const renderCountUp = (): JSX.Element => {
    if (isLoading) {
      return (
        <Skeleton
          sx={{ width: ['100%', '100%', '100%'], height: ['22px', '22px', '30px'], mb: ['5px', '5px', '12px'] }}
        />
      )
    }
    const isTotalBondsSold = name === BondsStats.TotalBondsSold
    const amountCurrency: string = !isTotalBondsSold ? '$' : ''
    const formattedAmount = formatDollar({ num: amount })
    const lastChar = formattedAmount.slice(formattedAmount.length - 1)
    const withoutFirstAndLastSlice = Number(formattedAmount.slice(1, -1))

    return (
      <>
        {/* Mobile view starts */}
        <Box sx={{ display: ['block', 'block', 'block', 'none'] }}>
          {amountCurrency}
          <CountUp
            end={isTotalBondsSold ? amount : withoutFirstAndLastSlice}
            decimals={isTotalBondsSold ? 0 : 2}
            duration={1}
            separator=","
          />
          {name !== BondsStats.TotalBondsSold && lastChar}
        </Box>
        {/* Desktop view starts */}
        <Box sx={{ display: ['none', 'none', 'none', 'block'] }}>
          {amountCurrency}
          <CountUp end={amount} decimals={0} duration={3} separator="," />
        </Box>
      </>
    )
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        mb: '20px',
      }}
    >
      <Flex sx={{ width: ['100%', '80%', '100%'], justifyContent: 'center', display: isLoading ? 'block' : 'flex' }}>
        <Text sx={{ fontSize: ['22px', '22px', '30px'], fontWeight: 'bold', mb: ['5px', '5px', '12px'] }}>
          {renderCountUp()}
        </Text>
      </Flex>
      <Text sx={{ fontSize: ['12px', '12px', '14px'], fontWeight: 'light', opacity: '0.7' }}>{t(subTitle)}</Text>
    </Flex>
  )
}

export default BondStatsCard
