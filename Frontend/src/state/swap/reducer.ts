import { createReducer } from '@reduxjs/toolkit'
import { parsedQueryString } from 'hooks/useParsedQueryString'

import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions'
import { queryParametersToSwapState } from './hooks/hooks'
import { ChainId } from 'config/constants/chains'

export interface SwapState {
  // independentField is used to set which Field has been modified by the user, though LiFi does not support output quotes right now
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | null
    readonly chain: ChainId | null
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | null
    readonly chain: ChainId | null
  }
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient: string | null
}

const initialState: SwapState = queryParametersToSwapState(parsedQueryString())

export default createReducer<SwapState>(initialState, (builder) =>
  builder
    .addCase(
      replaceSwapState,
      (
        state,
        { payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId, inputChain, outputChain } },
      ) => {
        return {
          [Field.INPUT]: {
            currencyId: inputCurrencyId ?? null,
            chain: inputChain ?? null,
          },
          [Field.OUTPUT]: {
            currencyId: outputCurrencyId ?? null,
            chain: outputChain ?? null,
          },
          independentField: field,
          typedValue,
          recipient,
        }
      },
    )
    .addCase(selectCurrency, (state, { payload: { currencyId, field, chain } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT
      if (currencyId === state?.[otherField]?.currencyId && chain === state?.[otherField]?.chain) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { currencyId, chain },
          [otherField]: { currencyId: state[field].currencyId },
        }
      } else {
        // the normal case
        return {
          ...state,
          [field]: { currencyId, chain },
        }
      }
    })
    .addCase(switchCurrencies, (state) => {
      return {
        ...state,
        independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId, chain: state[Field.OUTPUT].chain },
        [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId, chain: state[Field.INPUT].chain },
      }
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    }),
)
