import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useTokenContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

// Approve a bill
const useApproveBill = (tokenAddress: string, billAddress: string) => {
  const tokenContract = useTokenContract(tokenAddress)
  const addTransaction = useTransactionAdder()

  const handleApprove = useCallback(async () => {
    const tx = await tokenContract?.approve(billAddress, ethers.constants.MaxUint256).then((trx) => {
      addTransaction(trx, {
        type: TransactionType.APPROVAL,
        tokenAddress: tokenAddress ?? '',
        spender: billAddress ?? '',
      })
      return trx.wait()
    })
    return tx
  }, [billAddress, addTransaction, tokenAddress, tokenContract])
  return { onApprove: handleApprove }
}

export default useApproveBill
