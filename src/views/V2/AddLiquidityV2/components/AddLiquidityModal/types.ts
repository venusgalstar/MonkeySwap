import { Currency, CurrencyAmount, Percent, Price, Token } from '@ape.swap/sdk-core'

export interface AddLiquidityModalProps {
  currencies: { CURRENCY_A?: Currency; CURRENCY_B?: Currency }
  liquidityMinted: CurrencyAmount<Token> | undefined
  noLiquidity: boolean | undefined
  title: string
  price: Price<Currency, Currency> | undefined
  poolTokenPercentage: Percent | undefined
  txHash: string
  attemptingTxn: boolean
  parsedAmounts: { CURRENCY_A?: CurrencyAmount<Currency>; CURRENCY_B?: CurrencyAmount<Currency> }
  onDismiss: () => void
  onAdd: () => void
}
