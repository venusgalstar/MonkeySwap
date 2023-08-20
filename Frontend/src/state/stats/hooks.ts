import { useWeb3React } from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import { fetchFarmLpAprs, fetchLiveOrdering, fetchLiveTags } from '.'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { FarmLpAprsType, StatsState } from './types'
import { SupportedChainId } from '@ape.swap/sdk-core'

export const useFetchLiveTagsAndOrdering = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchLiveOrdering())
    dispatch(fetchLiveTags())
  }, [dispatch, slowRefresh])
}

// TAGS
export const usePoolTags = (chainId: number) => {
  const { Tags }: StatsState = useSelector((state: AppState) => state.stats)
  const poolTags = Tags?.[`${chainId}`]?.pools

  return { poolTags }
}

export const useFetchFarmLpAprs = () => {
  const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    chainId && dispatch(fetchFarmLpAprs(chainId))
  }, [slowRefresh, chainId, dispatch])
}

export const useFarmLpAprs = (): FarmLpAprsType | undefined => {
  const farmLpAprs = useSelector((state: AppState) => state.stats.FarmLpAprs)
  return farmLpAprs
}
