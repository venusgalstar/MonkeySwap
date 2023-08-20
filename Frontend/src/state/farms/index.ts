import { createSlice } from '@reduxjs/toolkit'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import fetchFarms from './fetchFarms'
import mergeFarmConfigs from './mergeFarmConfigs'
import { Farm, FarmState, FarmTypes } from './types'
import { AppThunk } from 'state'
import { LpTokenPrices } from 'hooks/useAllLPPrices'
import { FarmLpAprsType } from 'state/stats/types'
import { SupportedChainId } from '@ape.swap/sdk-core'

const initialState: FarmState = {
  // @ts-ignore
  data: mergeFarmConfigs(),
}

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const { value: liveFarmsData, chainId } = action.payload
      //@ts-ignore
      state.data[chainId] = state.data[chainId]?.map((farm: Farm) => {
        const liveFarmData = liveFarmsData.find((f: any) => f.id === farm.id)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { value: arrayOfUserDataObjects, chainId } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl: any) => {
        const { index } = userDataEl
        //@ts-ignore
        state.data[chainId][index] = { ...state.data[chainId][index], userData: userDataEl }
      })
    },
    updateFarmUserData: (state, action) => {
      const { field, value, id, chainId } = action.payload
      //@ts-ignore
      const index = state.data[chainId].findIndex((p: any) => p.id === id)
      //@ts-ignore
      state.data[chainId][index] = {
        //@ts-ignore
        ...state.data[chainId][index],
        //@ts-ignore
        userData: { ...state.data[chainId][index].userData, [field]: value },
      }
    },
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData, updateFarmUserData } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync =
  (
    chainId: SupportedChainId,
    tokenPrices: any[],
    lpPrices: LpTokenPrices[],
    bananaPrice: string | null,
    farmLpAprs: FarmLpAprsType | undefined,
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      const farmsConfig = getState().farms.data
      const farms = await fetchFarms(
        chainId,
        tokenPrices,
        lpPrices,
        bananaPrice ?? '0',
        farmLpAprs,
        farmsConfig[chainId] ?? [],
      )
      dispatch(setFarmsPublicData({ value: farms, chainId }))
    } catch (error) {
      console.warn(error)
    }
  }
export const fetchFarmUserDataAsync =
  (chainId: SupportedChainId, account: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const farms = getState().farms.data?.[chainId] ?? []
      const userFarmAllowances = await fetchFarmUserAllowances(chainId, account, farms)
      const userFarmTokenBalances = await fetchFarmUserTokenBalances(chainId, account, farms)
      const userStakedBalances = await fetchFarmUserStakedBalances(chainId, account, farms)
      const [userFarmEarnings, secondFarmEarnings] = await fetchFarmUserEarnings(chainId, account, farms)

      const arrayOfUserDataObjects = farms.map(({ id, farmType }, index) => {
        return {
          index,
          allowance: userFarmAllowances[id],
          tokenBalance: userFarmTokenBalances[id],
          stakedBalance: userStakedBalances[id],
          rewards: userFarmEarnings[id],
          secondRewards: farmType === FarmTypes.DUAL_FARM ? secondFarmEarnings[id] : '0',
        }
      })
      dispatch(setFarmUserData({ value: arrayOfUserDataObjects, chainId }))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateFarmUserAllowances =
  (chainId: SupportedChainId, id: string, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farms.data?.[chainId] ?? []
    const allowances = await fetchFarmUserAllowances(chainId, account, farms)
    dispatch(updateFarmUserData({ id, field: 'allowance', value: allowances[id], chainId }))
  }

export const updateFarmUserTokenBalances =
  (chainId: SupportedChainId, id: string, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farms.data?.[chainId] ?? []
    const tokenBalances = await fetchFarmUserTokenBalances(chainId, account, farms)
    dispatch(updateFarmUserData({ id, field: 'tokenBalance', value: tokenBalances[id], chainId }))
  }

export const updateFarmUserStakedBalances =
  (chainId: SupportedChainId, id: string, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farms.data?.[chainId] ?? []
    const stakedBalances = await fetchFarmUserStakedBalances(chainId, account, farms)
    dispatch(updateFarmUserData({ id, field: 'stakedBalance', value: stakedBalances[id], chainId }))
  }

export const updateFarmUserEarnings =
  (chainId: SupportedChainId, id: string, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farms.data?.[chainId] ?? []
    const [userFarmEarnings, secondFarmEarnings] = await fetchFarmUserEarnings(chainId, account, farms)
    dispatch(updateFarmUserData({ id, field: 'rewards', value: userFarmEarnings[id], chainId }))
    secondFarmEarnings &&
      dispatch(updateFarmUserData({ id, field: 'secondRewards', value: secondFarmEarnings[id], chainId }))
  }

export default farmsSlice.reducer
