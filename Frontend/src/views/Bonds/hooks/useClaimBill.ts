import { useCallback } from 'react'
import track from 'utils/track'
import { useBillType } from './useBillType'
import { useWeb3React } from '@web3-react/core'
import { useBondContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { useRouter } from 'next/router'
import { useHideCircular } from 'hooks/useHideCircular'

// Claim a Bill
const useClaimBill = (billAddress: string, billIds: string[], earnToken?: string) => {
  const { chainId } = useWeb3React()
  const router = useRouter()
  const bondContract = useBondContract(billAddress)
  const billType = useBillType(billAddress)
  const addTransaction = useTransactionAdder()
  const hideCircular = useHideCircular()
  const handleClaimBill = useCallback(async () => {
    const tx = await bondContract.batchRedeem(billIds)
    addTransaction(tx, { type: TransactionType.CLAIM_BILL })
    track({
      event: 'bond',
      chain: chainId,
      data: {
        cat: 'claim',
        type: billType ?? '',
        address: bondContract.address,
        id: billIds,
      },
    })
    if (earnToken?.toLowerCase() === 'banana' && !hideCircular) {
      router.push('?modal=circular-gh')
    }
    return tx
  }, [bondContract, billIds, addTransaction, chainId, billType, router, earnToken, hideCircular])

  return { onClaimBill: handleClaimBill, billType }
}

export default useClaimBill
