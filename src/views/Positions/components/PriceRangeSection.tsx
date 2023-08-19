import { Currency, Price, Token } from '@ape.swap/sdk-core'
import { Pool } from '@ape.swap/v3-sdk'
import { Flex, Skeleton, Svg, Text } from 'components/uikit'
import { Bound } from 'state/mint/v3/actions'
import { formatTickPrice } from 'utils/formatTickPrice'
import RangeTag from './RangeTag'

const PriceRangeSection = ({
  currencyQuote,
  currencyBase,
  removed,
  inRange,
  inverted,
  manuallyInverted,
  pool,
  priceUpper,
  priceLower,
  tickAtLimit,
  setManuallyInverted,
}: {
  currencyQuote: Currency | undefined | null
  currencyBase: Currency | undefined | null
  removed: boolean | undefined
  inRange: boolean
  inverted: boolean | undefined
  manuallyInverted: boolean
  pool: Pool | null | undefined
  priceUpper: Price<Token, Token> | undefined
  priceLower: Price<Token, Token> | undefined
  tickAtLimit: {
    LOWER?: boolean | undefined
    UPPER?: boolean | undefined
  }
  setManuallyInverted: (manuallyInverted: boolean) => void
}) => {
  const valuesLoading = !pool || !priceLower || !priceUpper
  return (
    <>
      <Flex
        sx={{
          height: '30px',
          margin: '20px 0px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Text mr="5px"> Price Range </Text>
          <RangeTag removed={removed} inRange={inRange} />
        </Flex>
        <Flex
          onClick={() => setManuallyInverted(!manuallyInverted)}
          sx={{
            padding: '5px',
            background: 'white3',
            borderRadius: '15px',
            cursor: 'pointer',
            width: '25px',
            height: '25px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg icon="switchArrows" width="15px" />
        </Flex>
      </Flex>
      <Flex sx={{ height: '123px' }}>
        <Flex sx={{ width: '100%', flexDirection: 'column', mr: ['0px', '0px', '10px'] }}>
          <Flex
            sx={{
              height: '100%',
              mb: '10px',
              borderRadius: '10px',
              background: 'white3',
              padding: '5px 10px',
              flexDirection: 'column',
            }}
          >
            <Flex
              sx={{
                justifyContent: 'space-between',
                width: '100%',
                flexWrap: 'nowrap',
                alignItems: 'center',
              }}
            >
              <Text sx={{ fontSize: ['2.8vw', '2.8vw', '16px'], whiteSpace: 'nowrap' }}> Min Price </Text>
              {valuesLoading ? (
                <Skeleton width={50} animation="waves" />
              ) : (
                <Text sx={{ fontSize: ['2.8vw', '2.8vw', '16px'], whiteSpace: 'nowrap' }}>
                  {' '}
                  {formatTickPrice(priceLower, tickAtLimit, Bound.LOWER)}
                </Text>
              )}
            </Flex>
            <Flex sx={{ width: '100%', justifyContent: 'flex-end', height: '10px' }}>
              <Text opacity={0.7} sx={{ fontSize: ['2.7vw', '2.7vw', '12px'], lineHeight: ['10px', '10px', 'auto'] }}>
                {currencyQuote?.symbol} per {currencyBase?.symbol}
              </Text>
            </Flex>
          </Flex>
          <Flex
            sx={{
              height: '100%',
              mt: '10px',
              borderRadius: '10px',
              background: 'white3',
              padding: '5px 10px',
              flexDirection: 'column',
            }}
          >
            <Flex sx={{ justifyContent: 'space-between', width: '100%', flexWrap: 'noWrap', alignItems: 'center' }}>
              <Text sx={{ fontSize: ['2.8vw', '2.8vw', '16px'], whiteSpace: 'nowrap' }}>Max Price </Text>
              {valuesLoading ? (
                <Skeleton width={50} animation="waves" />
              ) : (
                <Text sx={{ fontSize: ['2.8vw', '2.8vw', '16px'], whiteSpace: 'nowrap' }}>
                  {' '}
                  {formatTickPrice(priceUpper, tickAtLimit, Bound.UPPER)}
                </Text>
              )}
            </Flex>
            <Flex sx={{ width: '100%', justifyContent: 'flex-end', height: '10px' }}>
              <Text opacity={0.7} sx={{ fontSize: ['2.7vw', '2.7vw', '12px'], lineHeight: ['10px', '10px', 'auto'] }}>
                {currencyQuote?.symbol} per {currencyBase?.symbol}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          sx={{
            width: ['90%', '90%', '100%'],
            borderRadius: '10px',
            ml: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'white3',
          }}
        >
          <Text sx={{ fontSize: ['3vw', '3vw', '16px'] }}>Current Price</Text>
          <Text weight={700} margin="5px 0px" sx={{ fontSize: ['4vw', '4vw', '20px'] }}>
            {valuesLoading ? (
              <Skeleton width={100} animation="waves" />
            ) : (
              (inverted ? pool?.token1Price : pool?.token0Price)?.toSignificant(6)
            )}
          </Text>
          <Text opacity={0.7} sx={{ fontSize: ['2.7vw', '2.7vw', '12px'] }}>
            {currencyQuote?.symbol} per {currencyBase?.symbol}
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default PriceRangeSection
