import { Trade } from '@ape.swap/router-sdk'
import { Currency, CurrencyAmount, Percent, TradeType } from '@ape.swap/sdk-core'
import useSwapApproval from 'lib/hooks/swap/useSwapApproval'
import { ApprovalState, useApproval } from 'lib/hooks/useApproval'
import { useCallback } from 'react'
import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks'
import { TransactionType } from '../state/transactions/types'
import useZapApproval from './useZapApproval'
import { useToastError } from 'state/application/hooks'
import { Route } from '@lifi/sdk'
export { ApprovalState } from 'lib/hooks/useApproval'

function useGetAndTrackApproval(getApproval: ReturnType<typeof useApproval>[1]) {
  const addTransaction = useTransactionAdder()
  const toastError = useToastError()
  return useCallback(() => {
    return getApproval()
      .then((pending) => {
        if (pending) {
          const { response, tokenAddress, spenderAddress: spender } = pending
          addTransaction(response, { type: TransactionType.APPROVAL, tokenAddress, spender })
        }
      })
      .catch((e) => {
        toastError(e)
      })
  }, [getApproval, addTransaction, toastError])
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string,
): [ApprovalState, () => Promise<void>] {
  const [approval, getApproval] = useApproval(amountToApprove, spender, useHasPendingApproval)
  return [approval, useGetAndTrackApproval(getApproval)]
}

export function useApproveCallbackFromTrade(
  inputCurrencyAmount: CurrencyAmount<Currency> | undefined,
): [ApprovalState, () => Promise<void>] {
  const [approval, getApproval] = useSwapApproval(inputCurrencyAmount, useHasPendingApproval)
  return [approval, useGetAndTrackApproval(getApproval)]
}

export function useApproveCallbackFromZap(zap: any, allowedSlippage: Percent): [ApprovalState, () => Promise<void>] {
  const [approval, getApproval] = useZapApproval(zap, allowedSlippage, useHasPendingApproval)
  return [approval, useGetAndTrackApproval(getApproval)]
}
