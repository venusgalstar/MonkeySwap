import { Currency, CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { SWAP_ROUTER_ADDRESSES } from 'config/constants/addresses'
import { useMemo } from 'react'

import { useApproval } from '../useApproval'

// wraps useApproveCallback in the context of a swap
export default function useSwapApproval(
  inputCurrencyAmount: CurrencyAmount<Currency> | undefined,
  useIsPendingApproval: (token?: Token, spender?: string) => boolean,
) {
  const { chainId } = useWeb3React()

  const amountToApprove = useMemo(
    () => (inputCurrencyAmount?.currency.isToken ? inputCurrencyAmount : undefined),
    [inputCurrencyAmount],
  )
  const spender = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined

  return useApproval(amountToApprove, spender, useIsPendingApproval)
}
