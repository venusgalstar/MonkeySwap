import { useWeb3React } from '@web3-react/core'
import LibUpdater from 'lib/hooks/transactions/updater'
import { useCallback, useMemo } from 'react'
import { useAddPopup } from 'state/application/hooks'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { checkedTransaction, finalizeTransaction } from './reducer'
import { SerializableTransactionReceipt } from './types'

export default function Updater() {
  const { chainId } = useWeb3React()
  const addPopup = useAddPopup()
  const transactions = useAppSelector((state) => state.transactions)

  const dispatch = useAppDispatch()
  const onCheck = useCallback(
    ({ chainId, hash, blockNumber }: { chainId: number; hash: string; blockNumber: number }) =>
      dispatch(checkedTransaction({ chainId, hash, blockNumber })),
    [dispatch],
  )
  const onReceipt = useCallback(
    ({ chainId, hash, receipt }: { chainId: number; hash: string; receipt: SerializableTransactionReceipt }) => {
      dispatch(
        finalizeTransaction({
          chainId,
          hash,
          receipt: {
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber,
            contractAddress: receipt.contractAddress,
            from: receipt.from,
            status: receipt.status,
            to: receipt.to,
            transactionHash: receipt.transactionHash,
            transactionIndex: receipt.transactionIndex,
          },
        }),
      )

      const tx = transactions[chainId]?.[hash]
      addPopup({
        txHash: tx.hash,
        url: getEtherscanLink(tx.hash, 'transaction', chainId),
        urlLabel: 'View Transaction',
        text: 'Transaction Successful',
        type: 'success',
      })
    },
    [dispatch, addPopup, transactions],
  )

  const pendingTransactions = useMemo(() => (chainId ? transactions[chainId] ?? {} : {}), [chainId, transactions])

  return <LibUpdater pendingTransactions={pendingTransactions} onCheck={onCheck} onReceipt={onReceipt} />
}
