import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks'
import { fetchFarmUserDataAsync, fetchFarmsPublicDataAsync } from '.'
import useAllLpPrices from 'hooks/useAllLPPrices'
import { useWeb3React } from '@web3-react/core'
import { useBananaPrice } from 'state/application/hooks'
import { Farm } from './types'
import { AppState } from 'state'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useFarmLpAprs, useFetchFarmLpAprs } from 'state/stats/hooks'
import { StatsState } from 'state/stats/types'
import useAllTokenPrices from 'hooks/useAllTokenPrices'

export const usePollFarms = () => {
  useFetchFarmLpAprs()
  const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const lpTokenPrices = useAllLpPrices()
  const tokenPrices = useAllTokenPrices()
  const { slowRefresh } = useRefresh()
  // Made a string because hooks will refresh bignumbers
  const bananaPrice = useBananaPrice()
  const farmLpAprs = useFarmLpAprs()

  const pricesLoaded = tokenPrices?.[0]?.price !== undefined && lpTokenPrices?.[0]?.price !== undefined

  useEffect(() => {
    if (chainId) {
      dispatch(fetchFarmsPublicDataAsync(chainId, tokenPrices, lpTokenPrices, bananaPrice, farmLpAprs))
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    dispatch,
    chainId,
    lpTokenPrices?.length,
    lpTokenPrices?.length,
    bananaPrice,
    pricesLoaded,
    farmLpAprs?.lpAprs?.length,
    slowRefresh,
  ])
}
export const useFarms = (account: string): Farm[] | undefined => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useWeb3React()
  const farms = useSelector((state: AppState) => state.farms.data[chainId as SupportedChainId])
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(chainId as SupportedChainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
  return farms
}

export const useFarmTags = (chainId: number) => {
  const { Tags }: StatsState = useSelector((state: AppState) => state.stats)
  const farmTags = Tags?.[`${chainId}`]?.farms
  return { farmTags }
}

export const useFarmOrderings = (chainId: number) => {
  const { Ordering }: StatsState = useSelector((state: AppState) => state.stats)
  const farmOrderings = Ordering?.[`${chainId}`]?.farms

  return { farmOrderings }
}
