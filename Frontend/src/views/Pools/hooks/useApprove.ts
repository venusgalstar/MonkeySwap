import { useWeb3React } from '@web3-react/core'
import { Erc20 } from 'config/abi/types'
import { Contract, ethers } from 'ethers'
import { useSousChef } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import track from 'utils/track'

// Approve a Pool
export const useSousApprove = (lpContract: Erc20 | null, sousId: number) => {
  const { chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const addTransaction = useTransactionAdder()
  const handleApprove = useCallback(async () => {
    const tx = await lpContract?.approve(sousChefContract.address, ethers.constants.MaxUint256).then((trx) => {
      addTransaction(trx, {
        type: TransactionType.APPROVAL,
        tokenAddress: lpContract.address ?? '',
        spender: sousChefContract.address ?? '',
      })
      return trx.wait()
    })
    track({
      event: 'pool',
      chain: chainId,
      data: {
        token: tx?.to,
        id: sousId,
        cat: 'enable',
      },
    })
    return tx
  }, [lpContract, sousChefContract, addTransaction, sousId, chainId])

  return { onApprove: handleApprove }
}
