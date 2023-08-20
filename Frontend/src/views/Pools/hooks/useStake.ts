import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useMasterChefContract, useMasterChefV2Contract, useSousChef } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'
import { updateUserBalance, updateUserStakedBalance } from 'state/pools'
import BigNumber from 'bignumber.js'
import track from 'utils/track'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

export const useSousStake = (sousId: number, tokenValue: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterChefContract()
  const masterChefContractV2 = useMasterChefV2Contract()
  const addTransaction = useTransactionAdder()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      let trxHash
      if (sousId === 0) {
        trxHash = await masterChefContractV2
          ?.deposit(0, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.STAKE })
            return trx.wait()
          })
      } else if (sousId === 999) {
        trxHash = await masterChefContract
          ?.enterStaking(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.STAKE })
            return trx.wait()
          })
      } else {
        trxHash = await sousChefContract
          .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.STAKE })
            return trx.wait()
          })
      }
      dispatch(updateUserStakedBalance(chainId as SupportedChainId, sousId, account ?? ''))
      dispatch(updateUserBalance(chainId as SupportedChainId, sousId, account ?? ''))
      track({
        event: 'pool',
        chain: 56,
        data: {
          cat: 'stake',
          amount,
          pid: sousId,
          usdAmount: parseFloat(amount) * tokenValue,
        },
      })
      return trxHash
    },
    [
      account,
      dispatch,
      addTransaction,
      tokenValue,
      masterChefContract,
      masterChefContractV2,
      sousChefContract,
      sousId,
      chainId,
    ],
  )

  return { onStake: handleStake }
}
