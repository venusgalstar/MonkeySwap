import { useWeb3React } from '@web3-react/core'
import {
  useDualFarmContract,
  useJungleFarmContract,
  useMasterChefContract,
  useMasterChefV2Contract,
} from 'hooks/useContract'
import { useCallback } from 'react'
import { FarmTypes } from 'state/farms/types'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { useToastError } from '../../../state/application/hooks'
import { useRouter } from 'next/router'
import { useHideCircular } from 'hooks/useHideCircular'

const useHarvest = (farmType: FarmTypes, pid: number, contractAddress?: string) => {
  const { account } = useWeb3React()
  const masterChefV1Contract = useMasterChefContract()
  const masterChefV2Contract = useMasterChefV2Contract()
  const jungleFarmContract = useJungleFarmContract(contractAddress ?? '')
  const miniApeContract = useDualFarmContract()
  const addTransaction = useTransactionAdder()
  const toastError = useToastError()
  const router = useRouter()
  const hideCircular = useHideCircular()

  return useCallback(async () => {
    if (farmType === FarmTypes.MASTER_CHEF_V1) {
      return masterChefV1Contract
        ?.deposit(pid, '0')
        .then((trx) => {
          if (!hideCircular) router.push('?modal=circular-gh')
          addTransaction(trx, { type: TransactionType.HARVEST })
          return trx.wait()
        })
        .catch((e) => {
          console.error(e)
          toastError(e)
        })
    }
    if (farmType === FarmTypes.MASTER_CHEF_V2) {
      return masterChefV2Contract
        ?.deposit(pid, '0')
        .then((trx) => {
          if (!hideCircular) router.push('?modal=circular-gh')
          addTransaction(trx, { type: TransactionType.HARVEST })
          return trx.wait()
        })
        .catch((e) => {
          console.error(e)
          toastError(e)
        })
    }
    if (farmType === FarmTypes.JUNLGE_FARM) {
      return jungleFarmContract
        ?.deposit('0')
        .then((trx) => {
          addTransaction(trx, { type: TransactionType.HARVEST })
          return trx.wait()
        })
        .catch((e) => {
          console.error(e)
          toastError(e)
        })
    }
    if (farmType === FarmTypes.DUAL_FARM) {
      return miniApeContract
        ?.harvest(pid, account ?? '')
        .then((trx) => {
          addTransaction(trx, { type: TransactionType.HARVEST })
          return trx.wait()
        })
        .catch((e) => {
          console.error(e)
          toastError(e)
        })
    }
  }, [
    pid,
    farmType,
    account,
    masterChefV1Contract,
    masterChefV2Contract,
    addTransaction,
    jungleFarmContract,
    miniApeContract,
    toastError,
    router,
    hideCircular,
  ])
}

export default useHarvest
