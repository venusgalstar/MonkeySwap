import { useCallback } from 'react'
import { useTreasury } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import track from 'utils/track'
import { useBananaPrice, useToastError } from 'state/application/hooks'
import { Treasury } from 'config/abi/types'
import { TransactionInfo, TransactionType } from '../../state/transactions/types'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { TransactionResponse } from '@ethersproject/providers'

export const buy = async (
  contract: Treasury | null,
  amount: string,
  addTransaction: (response: TransactionResponse, info: TransactionInfo) => void,
) => {
  try {
    return contract?.buy(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).then((tx) => {
      tx.wait()
      addTransaction(tx, { type: TransactionType.GNANA_BUY })
      return tx.hash
    })
  } catch (err) {
    return console.warn(err)
  }
}

export const useBuyGnana = () => {
  const treasuryContract = useTreasury()
  const addTransaction = useTransactionAdder()
  const bananaPrice = useBananaPrice()

  return useCallback(
    async (val: string) => {
      const onBuy = await treasuryContract
        ?.buy(new BigNumber(val).times(new BigNumber(10).pow(18)).toString())
        .then((trx) => {
          addTransaction(trx, { type: TransactionType.GNANA_BUY })
          trx.wait()
          track({
            event: 'gnana',
            chain: 56,
            data: {
              val,
              cat: 'buy',
              usdAmount: parseFloat(val) * parseFloat(bananaPrice ?? '0'),
            },
          })
        })
      return onBuy
    },
    [addTransaction, bananaPrice, treasuryContract],
  )
}

export const sell = async (
  contract: Treasury | null,
  amount: string,
  addTransaction: (response: TransactionResponse, info: TransactionInfo) => void,
) => {
  try {
    return contract?.sell(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).then((tx) => {
      tx.wait()
      addTransaction(tx, { type: TransactionType.GNANA_SELL })
      return tx.hash
    })
  } catch (err) {
    return console.warn(err)
  }
}

export const useSellGoldenBanana = () => {
  const treasuryContract = useTreasury()
  const bananaPrice = useBananaPrice()
  const addTransaction = useTransactionAdder()

  const handleSell = useCallback(
    async (amount: string) => {
      try {
        const txHash = await sell(treasuryContract, amount, addTransaction)
        track({
          event: 'gnana',
          chain: 56,
          data: {
            amount,
            cat: 'sell',
            usdAmount: parseFloat(amount) * parseFloat(bananaPrice ?? '0'),
          },
        })
        return txHash
      } catch (e) {
        return false
      }
    },
    [addTransaction, bananaPrice, treasuryContract],
  )

  return { handleSell }
}

export const useBuyGoldenBanana = () => {
  const treasuryContract = useTreasury()
  const bananaPrice = useBananaPrice()
  const toastError = useToastError()
  const addTransaction = useTransactionAdder()

  const handleBuy = useCallback(
    async (amount: string) => {
      try {
        return await buy(treasuryContract, amount, addTransaction)
          .then(() =>
            track({
              event: 'gnana',
              chain: 56,
              data: {
                amount,
                cat: 'buy',
                usdAmount: parseFloat(amount) * parseFloat(bananaPrice ?? '0'),
              },
            }),
          )
          .catch((e) => {
            toastError(e)
          })
      } catch (e) {
        return false
      }
    },
    [bananaPrice, toastError, treasuryContract, addTransaction],
  )

  return { handleBuy }
}
