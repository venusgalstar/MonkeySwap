import { createSlice } from '@reduxjs/toolkit'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import fetchPools from './fetchPools'
import { pools } from '@ape.swap/apeswap-lists'
import { Pool, PoolsState } from './types'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import { AppThunk } from 'state'

const initialState: PoolsState = {
  // @ts-ignore
  data: pools,
}

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool: any) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool: any) => {
        const userPoolData = userData.find((entry: any) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p: any) => p.sousId === sousId)
      //@ts-ignore
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks

export const fetchPoolsPublicDataAsync =
  (chainId: number, tokenPrices: TokenPrices[]): AppThunk =>
  async (dispatch, getState) => {
    try {
      const poolsConfig = getState().pools.data
      const pools = await fetchPools(chainId, tokenPrices, poolsConfig)
      dispatch(setPoolsPublicData(pools))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchPoolsUserDataAsync =
  (chainId: number, account: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const pools = getState().pools.data
      const allowances: any = await fetchPoolsAllowance(chainId, account, pools)
      const stakingTokenBalances: any = await fetchUserBalances(chainId, account, pools)
      const stakedBalances: any = await fetchUserStakeBalances(chainId, account, pools)
      const pendingRewards: any = await fetchUserPendingRewards(chainId, account, pools)
      const userData = pools.map((pool: any) => ({
        sousId: pool.sousId,
        allowance: allowances[pool.sousId],
        stakingTokenBalance: stakingTokenBalances[pool.sousId],
        stakedBalance: stakedBalances[pool.sousId],
        pendingReward: pendingRewards[pool.sousId],
      }))
      dispatch(setPoolsUserData(userData))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateUserAllowance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch, getState) => {
    const pools = getState().pools.data
    const allowances: any = await fetchPoolsAllowance(chainId, account, pools)
    dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  }

export const updateUserBalance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch, getState) => {
    const pools = getState().pools.data
    const tokenBalances: any = await fetchUserBalances(chainId, account, pools)
    dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

export const updateUserStakedBalance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch, getState) => {
    const pools = getState().pools.data
    const stakedBalances: any = await fetchUserStakeBalances(chainId, account, pools)
    dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
  }

export const updateUserPendingReward =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch, getState) => {
    const pools = getState().pools.data
    const pendingRewards: any = await fetchUserPendingRewards(chainId, account, pools)
    dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
  }

export default PoolsSlice.reducer
