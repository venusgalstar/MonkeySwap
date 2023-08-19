import { createAction } from '@reduxjs/toolkit'
import { ChainId } from 'config/constants/chains';

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

//change chain type
export const selectCurrency = createAction<{ field: Field; currencyId: string; chain?: ChainId }>(
  'swap/selectCurrency',
)
export const switchCurrencies = createAction<void>('swap/switchCurrencies')
export const typeInput = createAction<{ field: Field; typedValue: string }>('swap/typeInput')
export const replaceSwapState = createAction<{
  field: Field
  typedValue: string
  inputCurrencyId?: string
  inputChain?: ChainId
  outputCurrencyId?: string
  outputChain?: ChainId
  recipient: string | null
}>('swap/replaceSwapState')
export const setRecipient = createAction<{ recipient: string | null }>('swap/setRecipient')
