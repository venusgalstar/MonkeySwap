import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useMasterChefContract, useMasterChefV2Contract, useSousChef } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'
import { updateUserBalance, updateUserPendingReward, updateUserStakedBalance } from 'state/pools'
import BigNumber from 'bignumber.js'
import track from 'utils/track'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

export const useSousUnstake = (sousId: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterChefContract()
  const masterChefContractV2 = useMasterChefV2Contract()
  const sousChefContract = useSousChef(sousId)
  const addTransaction = useTransactionAdder()

  const handleUnstake = useCallback(
    async (amount: string) => {
      let trxHash
      if (sousId === 0) {
        trxHash = await masterChefContractV2
          ?.withdraw(0, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.WITHDRAW })
            return trx.wait()
          })
      } else if (sousId === 999) {
        trxHash = await masterChefContract
          ?.leaveStaking(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.WITHDRAW })
            return trx.wait()
          })
      } else {
        trxHash = await sousChefContract
          .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.WITHDRAW })
            return trx.wait()
          })
      }
      dispatch(updateUserStakedBalance(chainId as SupportedChainId, sousId, account ?? ''))
      dispatch(updateUserBalance(chainId as SupportedChainId, sousId, account ?? ''))
      dispatch(updateUserPendingReward(chainId as SupportedChainId, sousId, account ?? ''))
      track({
        event: 'pool',
        chain: chainId,
        data: {
          cat: 'unstake',
          amount,
          sousId,
        },
      })
      return trxHash
    },
    [account, dispatch, addTransaction, masterChefContract, masterChefContractV2, sousChefContract, sousId, chainId],
  )

  return { onUnstake: handleUnstake }
}
