import { useCallback } from 'react'
import bondAbi from 'config/abi/bond.json'
import { getContract } from 'utils'
import track from 'utils/track'
import { useBillTypes } from './useBillType'
import { Bond } from 'config/abi/types'
import { useWeb3React } from '@web3-react/core'

// Claim a Bill
const useClaimBill = (billMap: { billAddress: string; billIds: string[] }[]) => {
  const { account, provider, chainId } = useWeb3React()
  const billAddresses = billMap.map((b) => {
    return b.billAddress
  })
  const billTypes = useBillTypes(billAddresses)
  // TODO: add responses and stuff
  const handleClaimBill = useCallback(async () => {
    const billTrxs = billMap.map(async (bm, i) => {
      const bondContract = provider && (getContract(bm.billAddress, bondAbi, provider, account) as Bond)
      track({
        event: 'bond',
        chain: chainId,
        data: {
          cat: 'claimAll',
          type: billTypes[i] ?? '',
          address: bm.billAddress,
          billIds: bm.billIds,
          bills: billMap,
        },
      })
      return bondContract?.batchRedeem(bm.billIds)
    })
    return Promise.all(billTrxs)
  }, [billMap, billTypes, provider, chainId, account])

  return { onClaimBill: handleClaimBill }
}

export default useClaimBill
