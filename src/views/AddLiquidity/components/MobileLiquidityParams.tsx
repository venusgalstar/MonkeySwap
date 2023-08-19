import { Currency } from '@ape.swap/sdk-core'
import TokenSelector from 'components/TokenSelector'
import { Flex, Text } from 'components/uikit'
import FeeSelector from './FeeSelector'
import { MobileLiquidityChart } from './LiquidityChart'
import NewPool from './NewPool'
import RangeSelector from './RangeSelectors'
import { MOBILE_DISPLAY } from './styles'
import { LiquidityParamsInterface } from './types'

interface MobileParamsInterface extends LiquidityParamsInterface {
  handleCurrencyASelect: (currencyA: Currency) => void
  handleCurrencyBSelect: (currencyB: Currency) => void
}

const MobileLiquidityParams = ({
  feeAmount,
  price,
  currencyA,
  currencyB,
  priceLower,
  priceUpper,
  ticksAtLimit,
  noLiquidity,
  startPriceTypedValue,
  getDecrementLower,
  getIncrementLower,
  getDecrementUpper,
  getIncrementUpper,
  onHandleFeeSelect,
  onLeftRangeInput,
  onRightRangeInput,
  handleCurrencyASelect,
  handleCurrencyBSelect,
  onStartPriceInput,
}: MobileParamsInterface) => {
  return (
    <Flex sx={{ flexDirection: 'column', display: MOBILE_DISPLAY }}>
      <Flex
        sx={{
          padding: '20px',
          background: 'white3',
          borderRadius: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          mb: '20px',
        }}
      >
        <TokenSelector onCurrencySelect={handleCurrencyASelect} currency={currencyA} otherCurrency={currencyB} />
        <Flex sx={{ background: 'white4', borderRadius: '10px', padding: '2.5px 7.5px', margin: '0px 10px' }}>
          <Text weight={700}>+</Text>
        </Flex>
        <TokenSelector onCurrencySelect={handleCurrencyBSelect} currency={currencyB} otherCurrency={currencyA} />
      </Flex>
      <FeeSelector
        feeAmount={feeAmount}
        currencyA={currencyA}
        currencyB={currencyB}
        onHandleFeeSelect={onHandleFeeSelect}
        locked={!currencyA || !currencyB}
      />
      {noLiquidity ? (
        <NewPool
          startPriceTypedValue={startPriceTypedValue}
          currencyA={currencyA}
          currencyB={currencyB}
          onStartPriceInput={onStartPriceInput}
        />
      ) : (
        <MobileLiquidityChart
          id="mobileLiquidityChart"
          currencyA={currencyA ?? undefined}
          currencyB={currencyB ?? undefined}
          feeAmount={feeAmount}
          ticksAtLimit={ticksAtLimit}
          price={price}
          priceLower={priceLower}
          priceUpper={priceUpper}
          locked={!currencyA || !currencyB || !feeAmount}
          onLeftRangeInput={onLeftRangeInput}
          onRightRangeInput={onRightRangeInput}
          interactive={true}
        />
      )}
      <RangeSelector
        price={price}
        priceLower={priceLower}
        priceUpper={priceUpper}
        currencyA={currencyA ?? undefined}
        currencyB={currencyB ?? undefined}
        ticksAtLimit={ticksAtLimit}
        locked={!currencyA || !currencyB || !feeAmount}
        getDecrementLower={getDecrementLower}
        getIncrementLower={getIncrementLower}
        getDecrementUpper={getDecrementUpper}
        getIncrementUpper={getIncrementUpper}
        onLeftRangeInput={onLeftRangeInput}
        onRightRangeInput={onRightRangeInput}
      />
    </Flex>
  )
}

export default MobileLiquidityParams
