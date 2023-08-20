/* eslint-disable no-param-reassign */
import { createSlice, Dispatch } from '@reduxjs/toolkit'
import getFarmLpAprs from './getFarmLpAprs'
import fetchTagsFromApi from './fetchTagsFromApi'
import fetchOrderingFromApi from './fetchOrderingFromApi'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { StatsState } from './types'

const initialState: StatsState = {
  FarmLpAprs: undefined,
  Tags: undefined,
  Ordering: undefined,
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setFarmLpAprs: (state, action) => {
      state.FarmLpAprs = action.payload
    },
    fetchTags: (state, action) => {
      state.Tags = action.payload
    },
    fetchOrdering: (state, action) => {
      state.Ordering = action.payload
    },
  },
})

// Actions
export const { setFarmLpAprs, fetchTags, fetchOrdering } = statsSlice.actions

// Thunks

export const fetchFarmLpAprs = (chainId: number) => async (dispatch: Dispatch) => {
  const farmLpAprs = await getFarmLpAprs(chainId)
  dispatch(setFarmLpAprs(farmLpAprs))
}

export const fetchLiveTags = () => async (dispatch: Dispatch) => {
  const tags = await fetchTagsFromApi()
  dispatch(fetchTags(tags))
}

export const fetchLiveOrdering = () => async (dispatch: Dispatch) => {
  const ordering = await fetchOrderingFromApi()
  dispatch(fetchOrdering(ordering))
}

export default statsSlice.reducer
