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

const BondsLandingCard = ({
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
    const isBondedValue = name === BondsStats.TotalBondedValue
    const amountCurrency: string = isBondedValue ? '$' : ''
    const formattedAmount = formatDollar({ num: amount })
    const lastChar = formattedAmount.slice(formattedAmount.length - 1)
    const withoutFirstAndLastSlice = Number(formattedAmount.slice(1, -1))

    return (
      <>
        {/* Mobile view starts */}
        <Box sx={{ display: ['block', 'block', 'block', 'none'], pt: '5px' }}>
          {amountCurrency}
          <CountUp
            end={isBondedValue ? withoutFirstAndLastSlice : amount}
            decimals={isBondedValue ? 2 : 0}
            duration={1}
            separator=","
          />
          {isBondedValue && lastChar}
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
        background: 'white2',
        borderRadius: '15px',
        py: ['10px', '10px', '10px', '25px'],
        width: ['350px'],
        ':first-of-type': {
          mr: '10px',
        },
        ':last-of-type': {
          ml: '10px',
        },
      }}
    >
      <Flex sx={{ width: ['100%', '80%', '100%'], justifyContent: 'center', display: isLoading ? 'block' : 'flex' }}>
        <Text sx={{ fontSize: ['14px', '14px', '14px', '30px'], fontWeight: 'bold', mb: ['5px', '5px', '12px'] }}>
          {renderCountUp()}
        </Text>
      </Flex>
      <Text
        sx={{
          fontSize: ['10px', '10px', '10px', '14px'],
          lineHeight: ['10px', '10px', '10px', '14px'],
          fontWeight: 'light',
          opacity: '0.7',
        }}
      >
        {t(subTitle)}
      </Text>
    </Flex>
  )
}

export default BondsLandingCard
