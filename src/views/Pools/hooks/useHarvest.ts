import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useMasterChefContract, useMasterChefV2Contract, useSousChef } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'
import { updateUserPendingReward } from 'state/pools'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import track from 'utils/track'
import { useRouter } from 'next/router'
import { useHideCircular } from 'hooks/useHideCircular'

export const useSousHarvest = (sousId: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterChefContract()
  const masterChefContractV2 = useMasterChefV2Contract()
  const sousChefContract = useSousChef(sousId)
  const addTransaction = useTransactionAdder()
  const router = useRouter()
  const hideCircular = useHideCircular()

  const handleHarvest = useCallback(async () => {
    let trxHash
    if (sousId === 0) {
      trxHash = await masterChefContractV2?.deposit(0, '0').then((trx) => {
        addTransaction(trx, { type: TransactionType.HARVEST })
        if (!hideCircular) router.push('?modal=circular-ph')
        return trx.wait()
      })
    } else if (sousId === 999) {
      trxHash = await masterChefContract?.deposit(0, '0').then((trx) => {
        if (!hideCircular) router.push('?modal=circular-ph')
        addTransaction(trx, { type: TransactionType.HARVEST })
        return trx.wait()
      })
    } else {
      trxHash = await sousChefContract?.deposit('0').then((trx) => {
        addTransaction(trx, { type: TransactionType.HARVEST })
        if (sousId === 238 && !hideCircular) router.push('?modal=circular-ph')
        return trx.wait()
      })
    }
    dispatch(updateUserPendingReward(chainId as SupportedChainId, sousId, account ?? ''))
    track({
      event: 'pool',
      chain: chainId,
      data: {
        cat: 'harvest',
        sousId,
      },
    })
    return trxHash
  }, [
    account,
    dispatch,
    addTransaction,
    masterChefContract,
    masterChefContractV2,
    sousChefContract,
    sousId,
    chainId,
    router,
    hideCircular,
  ])

  return { onHarvest: handleHarvest }
}
