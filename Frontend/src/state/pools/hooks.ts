import { ChainId } from '@ape.swap/sdk'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from '.'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import useAllTokenPrices from 'hooks/useAllTokenPrices'
import { Pool } from './types'
import { AppState } from 'state'

export const usePollPools = () => {
  const { chainId } = useWeb3React()
  const tokenPrices = useAllTokenPrices()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chainId === ChainId.BSC) {
      // @ts-ignore
      dispatch(fetchPoolsPublicDataAsync(chainId, tokenPrices))
    }
  }, [dispatch, tokenPrices, chainId])
}

export const usePools = (account: string): Pool[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useWeb3React()
  const pools = useSelector((state: AppState) => state.pools.data)
  useEffect(() => {
    if (account && (chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET)) {
      dispatch(fetchPoolsUserDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
  return pools
}

export const usePoolFromPid = (sousId: string): Pool | undefined => {
  const pool = useSelector((state: AppState) => state.pools.data.find((p: any) => p.sousId === sousId))
  return pool
}

export const useGnanaPools = (account: string): Pool[] => {
  const pools = usePools(account).filter((pool) => pool.stakingToken.symbol === 'GNANA')
  return pools
}

export const useAllPools = (): Pool[] => {
  const pools = useSelector((state: AppState) => state.pools.data)
  return pools
}

export const usePoolTags = (chainId: number) => {
  const { Tags } = useSelector((state: AppState) => state.stats)
  const poolTags = Tags?.[`${chainId}`]?.pools

  return { poolTags }
}

// ORDERING
export const usePoolOrderings = (chainId: number) => {
  const { Ordering } = useSelector((state: AppState) => state.stats)
  const poolOrderings = Ordering?.[`${chainId}`]?.pools

  return { poolOrderings }
}
