import { Currency, CurrencyAmount, Percent, Token } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { ReactNode } from 'react'

export interface RemoveLiquidityActionProps {
  pair: Pair | null | undefined
  parsedAmounts: {
    LIQUIDITY_PERCENT: Percent
    LIQUIDITY?: CurrencyAmount<Token> | undefined
    CURRENCY_A?: CurrencyAmount<Currency> | undefined
    CURRENCY_B?: CurrencyAmount<Currency> | undefined
  }
  error: ReactNode
  tradeValueUsd: number
}
