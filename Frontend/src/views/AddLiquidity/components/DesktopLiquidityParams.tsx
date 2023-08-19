import { Flex } from 'components/uikit'
import FeeSelector from './FeeSelector'
import { DesktopLiquidityChart } from './LiquidityChart'
import NewPool from './NewPool'
import RangeSelector from './RangeSelectors'
import { DESKTOP_DISPLAY } from './styles'
import { LiquidityParamsInterface } from './types'

const DesktopLiquidityParams = ({
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
  onStartPriceInput,
}: LiquidityParamsInterface) => {
  return (
    <Flex variant="flex.v3SubDexContainer" sx={{ display: DESKTOP_DISPLAY }}>
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
        <DesktopLiquidityChart
          id="desktopLiquidityChart"
          currencyA={currencyA ?? undefined}
          currencyB={currencyB ?? undefined}
          feeAmount={feeAmount}
          ticksAtLimit={ticksAtLimit}
          price={price}
          priceLower={priceLower}
          priceUpper={priceUpper}
          onLeftRangeInput={onLeftRangeInput}
          onRightRangeInput={onRightRangeInput}
          interactive={true}
          locked={!currencyA || !currencyB || !feeAmount}
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

export default DesktopLiquidityParams
