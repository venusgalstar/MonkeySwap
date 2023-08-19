import { Currency } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Text } from 'components/uikit'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import tryParseCurrencyAmount from 'lib/utils/tryParseCurrencyAmount'
import { useMemo, useState } from 'react'

import { WRAPPED_NATIVE_CURRENCY } from 'config/constants/tokens'
import { useTransactionAdder } from '../state/transactions/hooks'
import { TransactionType } from '../state/transactions/types'
import { useWETHContract } from './useContract'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }

export enum WrapInputError {
  NO_ERROR, // must be equal to 0 so all other errors are truthy
  ENTER_NATIVE_AMOUNT,
  ENTER_WRAPPED_AMOUNT,
  INSUFFICIENT_NATIVE_BALANCE,
  INSUFFICIENT_WRAPPED_BALANCE,
}

export function WrapErrorText({ wrapInputError }: { wrapInputError: WrapInputError }) {
  const native = useNativeCurrency()
  const wrapped = native?.wrapped

  switch (wrapInputError) {
    case WrapInputError.NO_ERROR:
      return null
    case WrapInputError.ENTER_NATIVE_AMOUNT:
      return <Text>Enter {native?.symbol} amount</Text>
    case WrapInputError.ENTER_WRAPPED_AMOUNT:
      return <Text>Enter {wrapped?.symbol} amount</Text>

    case WrapInputError.INSUFFICIENT_NATIVE_BALANCE:
      return <Text>Insufficient {native?.symbol} balance</Text>
    case WrapInputError.INSUFFICIENT_WRAPPED_BALANCE:
      return <Text>Insufficient {wrapped?.symbol} balance</Text>
  }
}

/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined | null,
  outputCurrency: Currency | undefined | null,
  typedValue: string | undefined,
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: WrapInputError } {
  const { chainId, account } = useWeb3React()
  const wethContract = useWETHContract()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(
    () => tryParseCurrencyAmount(typedValue, inputCurrency ?? undefined),
    [inputCurrency, typedValue],
  )
  const addTransaction = useTransactionAdder()

  // This allows an async error to propagate within the React lifecycle.
  // Without rethrowing it here, it would not show up in the UI - only the dev console.
  const [error, setError] = useState<Error>()
  if (error) throw error

  return useMemo(() => {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE
    if (inputCurrency.chainId !== outputCurrency.chainId) return NOT_APPLICABLE
    const weth = WRAPPED_NATIVE_CURRENCY[chainId]
    if (!weth) return NOT_APPLICABLE

    const hasInputAmount = Boolean(inputAmount?.greaterThan('0'))
    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency.isNative && weth.equals(outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const network = await wethContract.provider.getNetwork()
                  if (
                    network.chainId !== chainId ||
                    wethContract.address !== WRAPPED_NATIVE_CURRENCY[network.chainId]?.address
                  ) {
                    // sendAnalyticsEvent(InterfaceEventName.WRAP_TOKEN_TXN_INVALIDATED, {
                    //   ...eventProperties,
                    //   contract_address: wethContract.address,
                    //   contract_chain_id: network.chainId,
                    //   type: WrapType.WRAP,
                    // })
                    const error = new Error(`Invalid WETH contract
Please file a bug detailing how this happened - https://github.com/Uniswap/interface/issues/new?labels=bug&template=bug-report.md&title=Invalid%20WETH%20contract`)
                    setError(error)
                    throw error
                  }
                  const txReceipt = await wethContract.deposit({ value: `0x${inputAmount.quotient.toString(16)}` })
                  addTransaction(txReceipt, {
                    type: TransactionType.WRAP,
                    unwrapped: false,
                    currencyAmountRaw: inputAmount?.quotient.toString(),
                    chainId,
                  })
                  // sendAnalyticsEvent(InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, {
                  //   ...eventProperties,
                  //   type: WrapType.WRAP,
                  // })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance
          ? undefined
          : hasInputAmount
          ? WrapInputError.INSUFFICIENT_NATIVE_BALANCE
          : WrapInputError.ENTER_NATIVE_AMOUNT,
      }
    } else if (weth.equals(inputCurrency) && outputCurrency.isNative) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.withdraw(`0x${inputAmount.quotient.toString(16)}`)
                  addTransaction(txReceipt, {
                    type: TransactionType.WRAP,
                    unwrapped: true,
                    currencyAmountRaw: inputAmount?.quotient.toString(),
                    chainId,
                  })
                  // sendAnalyticsEvent(InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, {
                  //   ...eventProperties,
                  //   type: WrapType.UNWRAP,
                  // })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance
          ? undefined
          : hasInputAmount
          ? WrapInputError.INSUFFICIENT_WRAPPED_BALANCE
          : WrapInputError.ENTER_WRAPPED_AMOUNT,
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction])
}
