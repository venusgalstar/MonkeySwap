import { bills } from '@ape.swap/apeswap-lists'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchBillsPublicDataAsync, fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from '.'
import { Bills } from 'views/Bonds/types'
import { useWeb3React } from '@web3-react/core'
import useAllTokenPrices from 'hooks/useAllTokenPrices'
import { useAppDispatch } from 'state/hooks'
import { AppState } from 'state'
import useRefresh from 'hooks/useRefresh'
import { SupportedChainId } from '@ape.swap/sdk-core'

export const usePollBills = () => {
  const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const tokenPrices: any = useAllTokenPrices()
  useEffect(() => {
    chainId && dispatch(fetchBillsPublicDataAsync(chainId, tokenPrices))
  }, [dispatch, tokenPrices, chainId])
}

export const usePollUserBills = (): Bills[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()
  useEffect(() => {
    if (account) {
      chainId && dispatch(fetchBillsUserDataAsync(chainId, account))
      chainId && dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
  return bills
}

export const useBills = (): Bills[] | undefined => {
  const { chainId } = useWeb3React()
  const bills = useSelector((state: AppState) => state.bills.data[chainId as SupportedChainId])
  return bills
}
