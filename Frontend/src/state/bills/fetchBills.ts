import billsABI from 'config/abi/bond.json'
import { chunk } from 'lodash'
import fetchBillsCalls from './fetchBillsCalls'
import cleanBillsData from './cleanBillsData'
import { BillsConfig } from '@ape.swap/apeswap-lists'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import multicall from 'utils/multicall'

const fetchBills = async (chainId: number, tokenPrices: TokenPrices[], bills: BillsConfig[]) => {
  const billIds: number[] = []
  const billCalls = bills.flatMap((bill) => {
    billIds.push(bill.index)
    return fetchBillsCalls(bill, chainId)
  })
  const vals = await multicall(chainId, billsABI, billCalls)
  const chunkSize = vals.length / bills.length
  const chunkedBills = chunk(vals, chunkSize)
  return cleanBillsData(billIds, chunkedBills, tokenPrices, chainId, bills)
}

export default fetchBills
