import { useCallback } from 'react'
import track from 'utils/track'
import { useBillType } from './useBillType'
import { useWeb3React } from '@web3-react/core'
import { useBondContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

const DEFAULT_SLIPPAGE = 102 // Maximum of 2% slippage when buying Bill
// Buy a Bill
const useBuyBill = (
  billAddress: string,
  amount: string,
  lpPrice: number,
  price: string,
  principalTokenDecimals: number | null | undefined = 18,
  slippage = DEFAULT_SLIPPAGE,
) => {
  const { chainId, account } = useWeb3React()
  const bondContract = useBondContract(billAddress)
  const billType: string | undefined = useBillType(billAddress)
  const usdAmount: number = parseFloat(amount) * lpPrice
  const maxPrice = new BigNumber(price).times(slippage).div(100)
  const addTransaction = useTransactionAdder()
  const handleBuyBill = useCallback(async () => {
    const tx = await bondContract.deposit(
      new BigNumber(amount).times(new BigNumber(10).pow(principalTokenDecimals ?? 18)).toString(),
      maxPrice.toFixed(0),
      account ?? '',
    )
    track({
      event: 'bond',
      chain: chainId,
      data: {
        cat: 'buy',
        type: billType ?? '',
        address: bondContract?.address,
        amount,
        usdAmount,
      },
    })
    addTransaction(tx, {
      type: TransactionType.BUY,
    })
    return tx.wait()
  }, [bondContract, amount, account, chainId, billType, usdAmount, addTransaction, maxPrice])

  return { onBuyBill: handleBuyBill }
}

export default useBuyBill
