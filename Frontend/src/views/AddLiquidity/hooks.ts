import { Currency } from '@ape.swap/sdk-core'
import { FeeAmount } from '@ape.swap/v3-sdk'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { currencyId } from 'utils/currencyId'

export const useHandleCurrencyASelect = ({
  currencyIdB,
  currencyIdA,
}: {
  currencyIdB: string
  currencyIdA: string
}) => {
  const { push } = useRouter()
  return useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)
      if (newCurrencyIdA === currencyIdB) {
        push(`/add-liquidity/${currencyIdB}/${currencyIdA}`)
      } else {
        push(`/add-liquidity/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, currencyIdA, push],
  )
}

export const useHandleCurrencyBSelect = ({
  currencyIdA,
  currencyIdB,
}: {
  currencyIdA: string
  currencyIdB: string
}) => {
  const { push } = useRouter()
  return useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          push(`/add-liquidity/?currencyIdB=${currencyIdB}/${newCurrencyIdB}`)
        } else {
          push(`/add-liquidity/${newCurrencyIdB}`)
        }
      } else {
        push(`/add-liquidity/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdB, currencyIdA, push],
  )
}

export const useHandleFeeSelect = ({
  currencyIdA,
  currencyIdB,
  onLeftRangeInput,
  onRightRangeInput,
}: {
  currencyIdA: string
  currencyIdB: string
  onLeftRangeInput: (input: string) => void
  onRightRangeInput: (input: string) => void
}) => {
  const { push } = useRouter()
  return useCallback(
    (newFeeAmount: FeeAmount) => {
      onLeftRangeInput('')
      onRightRangeInput('')
      push(`/add-liquidity/${currencyIdA}/${currencyIdB}/${newFeeAmount}`, undefined, { shallow: true })
    },
    [currencyIdA, currencyIdB, push, onLeftRangeInput, onRightRangeInput],
  )
}
