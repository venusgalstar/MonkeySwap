import { Price, Token, Currency } from '@ape.swap/sdk-core'
import { FeeAmount } from '@ape.swap/v3-sdk'
import { Bound } from 'state/mint/v3/actions'

export interface LiquidityParamsInterface {
  feeAmount: FeeAmount | undefined
  price: number | undefined
  currencyA: Currency | undefined
  currencyB: Currency | undefined
  priceLower: Price<Token, Token> | undefined
  priceUpper: Price<Token, Token> | undefined
  ticksAtLimit: Partial<Record<Bound, boolean | undefined>>
  noLiquidity: boolean | undefined
  startPriceTypedValue: string
  getDecrementLower: () => string
  getIncrementLower: () => string
  getDecrementUpper: () => string
  getIncrementUpper: () => string
  onHandleFeeSelect: (fee: FeeAmount) => void
  onLeftRangeInput: (typedValue: string) => void
  onRightRangeInput: (typedValue: string) => void
  onStartPriceInput: (typedValue: string) => void
}
