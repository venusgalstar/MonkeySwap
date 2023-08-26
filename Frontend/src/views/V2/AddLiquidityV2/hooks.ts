import { Currency } from '@ape.swap/sdk-core'
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
      console.log('>> currencyA', currencyA);
      console.log('>> newCurrencyIdA', newCurrencyIdA);
      console.log('>> currencyIdB', currencyIdB);
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
      console.log('>> currencyB', currencyB);
      console.log('>> currencyIdA', currencyIdA);
      console.log('>> newCurrencyIdB', newCurrencyIdB);
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
