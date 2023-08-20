import { Currency, Token, CurrencyAmount, Percent } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'

export interface RemoveLiquidityModalProps {
  pair: Pair | undefined | null
  title: string
  txHash: string
  attemptingTxn: boolean
  parsedAmounts: {
    LIQUIDITY_PERCENT: Percent
    LIQUIDITY?: CurrencyAmount<Token> | undefined
    CURRENCY_A?: CurrencyAmount<Currency> | undefined
    CURRENCY_B?: CurrencyAmount<Currency> | undefined
  }
  onDismiss: () => void
  onRemove: () => void
}
