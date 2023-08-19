import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Erc20 } from 'config/abi/types'
import { MASTER_CHEF_V1_ADDRESS, MASTER_CHEF_V2_ADDRESS, MINI_APE_ADDRESS } from 'config/constants/addresses'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import { FarmTypes } from 'state/farms/types'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import track from 'utils/track'

// Approve a Farm
export const useApprove = (lpContract: Erc20 | null, farmTypes: FarmTypes, contractAddress?: string) => {
  const { chainId } = useWeb3React()
  const addTransaction = useTransactionAdder()
  const addressToApprove =
    farmTypes === FarmTypes.JUNLGE_FARM
      ? contractAddress
      : farmTypes === FarmTypes.MASTER_CHEF_V1
      ? MASTER_CHEF_V1_ADDRESS[chainId as SupportedChainId]
      : farmTypes === FarmTypes.MASTER_CHEF_V2
      ? MASTER_CHEF_V2_ADDRESS[chainId as SupportedChainId]
      : MINI_APE_ADDRESS[chainId as SupportedChainId]

  const handleApprove = useCallback(async () => {
    const tx = await lpContract?.approve(addressToApprove ?? '', ethers.constants.MaxUint256).then((trx) => {
      addTransaction(trx, {
        type: TransactionType.APPROVAL,
        tokenAddress: lpContract.address ?? '',
        spender: addressToApprove ?? '',
      })
      return trx.wait()
    })
    track({
      event: 'farm',
      chain: chainId,
      data: {
        token: tx?.to,
        id: addressToApprove,
        cat: 'enable',
      },
    })
    return tx
  }, [lpContract, addressToApprove, addTransaction, chainId])

  return { onApprove: handleApprove }
}
