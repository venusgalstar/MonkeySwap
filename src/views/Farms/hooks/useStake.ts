import { useWeb3React } from '@web3-react/core'
import {
  useDualFarmContract,
  useJungleFarmContract,
  useMasterChefContract,
  useMasterChefV2Contract,
} from 'hooks/useContract'
import { useCallback } from 'react'
import { FarmTypes } from 'state/farms/types'
import BigNumber from 'bignumber.js'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

const useStake = (farmType: FarmTypes, pid: number, contractAddress?: string) => {
  const { account } = useWeb3React()
  const masterChefV1Contract = useMasterChefContract()
  const masterChefV2Contract = useMasterChefV2Contract()
  const jungleFarmContract = useJungleFarmContract(contractAddress ?? '')
  const miniApeContract = useDualFarmContract()
  const addTransaction = useTransactionAdder()

  const callReturn = useCallback(
    async (amount: string) => {
      if (farmType === FarmTypes.MASTER_CHEF_V1) {
        return masterChefV1Contract
          ?.deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.STAKE })
            return trx.wait()
          })
      }
      if (farmType === FarmTypes.MASTER_CHEF_V2) {
        return masterChefV2Contract
          ?.deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.STAKE })
            return trx.wait()
          })
      }
      if (farmType === FarmTypes.JUNLGE_FARM) {
        return jungleFarmContract
          ?.deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.STAKE })
            return trx.wait()
          })
      }
      if (farmType === FarmTypes.DUAL_FARM) {
        return miniApeContract
          ?.deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), account ?? '')
          .then((trx) => {
            addTransaction(trx, { type: TransactionType.STAKE })
            return trx.wait()
          })
      }
    },
    [
      pid,
      farmType,
      account,
      masterChefV1Contract,
      masterChefV2Contract,
      addTransaction,
      jungleFarmContract,
      miniApeContract,
    ],
  )

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await callReturn(amount)
      return txHash
    },
    [callReturn],
  )

  return handleStake
}

export default useStake
