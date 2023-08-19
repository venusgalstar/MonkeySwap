import { useCallback } from 'react'
import track from 'utils/track'
import { useBillType } from './useBillType'
import { useWeb3React } from '@web3-react/core'
import { useBondNftContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

// Transfer a bill
const useTransferBill = (billNftAddress: string, billId: string, toAddress: string) => {
  const { account, chainId } = useWeb3React()
  const bondNftContract = useBondNftContract(billNftAddress)
  const billType = useBillType(billNftAddress)
  const addTransaction = useTransactionAdder()

  // TODO: Add handlers
  const handleTransfer = useCallback(async () => {
    try {
      const tx = await bondNftContract['safeTransferFrom(address,address,uint256)'](account ?? '', toAddress, billId)
      track({
        event: 'bond',
        chain: chainId,
        data: {
          cat: 'transfer',
          type: billType ?? '',
          id: billId,
          from: account,
          to: toAddress,
        },
      })
      addTransaction(tx, { type: TransactionType.TRANSFER })
      return tx
    } catch (e) {
      console.error(e)
      return null
    }
  }, [billId, toAddress, addTransaction, chainId, bondNftContract, account, billType])
  return { onTransfer: handleTransfer }
}

export default useTransferBill
