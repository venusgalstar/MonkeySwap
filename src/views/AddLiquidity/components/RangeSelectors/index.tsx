import { Currency, Price, Token } from '@ape.swap/sdk-core'
import { Button, Flex, IconButton, NumericInput, Text } from 'components/uikit'
import { useCurrency } from 'hooks/Tokens'
import { Bound } from 'state/mint/v3/actions'
import RangeSelector from './RangeSelector'

const RangeSelectors = ({
  price,
  priceLower,
  priceUpper,
  currencyA,
  currencyB,
  ticksAtLimit,
  locked,
  getDecrementLower,
  getIncrementLower,
  getDecrementUpper,
  getIncrementUpper,
  onLeftRangeInput,
  onRightRangeInput,
}: {
  price?: number | undefined
  priceLower?: Price<Token, Token> | undefined
  priceUpper?: Price<Token, Token> | undefined
  currencyA?: Currency | null
  currencyB?: Currency | null
  locked?: boolean
  ticksAtLimit: Partial<Record<Bound, boolean | undefined>>
  getDecrementLower: () => string
  getIncrementLower: () => string
  getDecrementUpper: () => string
  getIncrementUpper: () => string
  onLeftRangeInput: (typedValue: string) => void
  onRightRangeInput: (typedValue: string) => void
}) => {
  const tokenA = (currencyA ?? undefined)?.wrapped
  const tokenB = (currencyB ?? undefined)?.wrapped
  const isSorted = tokenA && tokenB && tokenA.sortsBefore(tokenB)

  const leftPrice = isSorted ? priceLower : priceUpper?.invert()
  const rightPrice = isSorted ? priceUpper : priceLower?.invert()

  // Min price variables
  const minPriceDisbaled = ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]
  const minPriceValue = minPriceDisbaled ? '0' : leftPrice?.toSignificant(5) ?? ''

  // Max price variables
  const maxPriceDisabled = ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]
  const maxPriceValue = maxPriceDisabled ? '∞' : rightPrice?.toSignificant(5) ?? ''

  return (
    <Flex sx={{ justifyContent: 'space-between', flexDirection: 'column' }}>
      <Flex sx={{ height: '28px', alignItems: 'center', pb: '2px' }}>
        <Text size="13px" weight={700} sx={{ opacity: locked && 0.4 }}>
          Current Price:
        </Text>
        <Text size="13px" ml="10px" sx={{ opacity: locked && 0.4 }}>
          {price} {currencyB?.symbol} per {currencyA?.symbol}
        </Text>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <RangeSelector
          rangeType="Min Price"
          value={minPriceValue}
          disabled={minPriceDisbaled}
          tokenASymbol={currencyA?.symbol}
          tokenBSymbol={currencyB?.symbol}
          locked={locked}
          onRangeInput={onLeftRangeInput}
          onDecrementRange={isSorted ? getDecrementLower : getIncrementUpper}
          onIncrementRange={isSorted ? getIncrementLower : getDecrementUpper}
        />
        <Flex sx={{ margin: '0px 2.5px' }} />
        <RangeSelector
          rangeType="Max Price"
          value={maxPriceValue}
          disabled={maxPriceDisabled}
          tokenASymbol={currencyA?.symbol}
          tokenBSymbol={currencyB?.symbol}
          locked={locked}
          onRangeInput={onRightRangeInput}
          onDecrementRange={isSorted ? getDecrementUpper : getIncrementLower}
          onIncrementRange={isSorted ? getIncrementUpper : getDecrementLower}
        />
      </Flex>
    </Flex>
  )
}

export default RangeSelectors
