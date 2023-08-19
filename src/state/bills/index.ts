import { Dispatch, createSlice } from '@reduxjs/toolkit'
import {
  fetchBillsAllowance,
  fetchUserBalances,
  fetchUserOwnedBills,
  fetchUserOwnedBillNftData,
} from './fetchBillsUser'
import fetchBills from './fetchBills'
import { getNewBillNftData } from './getBillNftData'
import { BillsConfig, bills } from '@ape.swap/apeswap-lists'
import { ChainId, MAINNET_CHAINS } from 'config/constants/chains'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { Bills } from 'views/Bonds/types'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import { AppThunk } from 'state'

const filterByChainId = (chainId: ChainId) => {
  return bills.filter(
    (bill) =>
      bill.contractAddress?.[chainId as unknown as SupportedChainId] !== '' &&
      bill.contractAddress?.[chainId as unknown as SupportedChainId] !== null &&
      bill.contractAddress?.[chainId as unknown as SupportedChainId] !== undefined,
  )
}

export interface BillsState {
  data: Partial<Record<ChainId, Bills[]>>
}

const initialBillsState: any = {}
MAINNET_CHAINS.forEach((chainId: ChainId) => {
  initialBillsState[chainId] = filterByChainId(chainId)
})

const initialState: BillsState = {
  data: initialBillsState,
}

export const billsSlice = createSlice({
  name: 'Bills',
  initialState,
  reducers: {
    setBillsPublicData: (state: any, action) => {
      const { value: liveBillsData, chainId } = action.payload
      state.data[chainId] = state.data[chainId].map((bill: any) => {
        const liveBillData = liveBillsData.find((entry: any) => entry.index === bill.index)
        return { ...bill, ...liveBillData }
      })
    },
    setBillsUserData: (state: any, action) => {
      const { value: userData, chainId } = action.payload
      state.data[chainId] = state.data[chainId].map((bill: any) => {
        const userBillData = userData.find((entry: any) => entry.index === bill.index)
        return { ...bill, userData: userBillData }
      })
    },
    setUserOwnedBillsData: (state: any, action) => {
      const { value: userData, chainId } = action.payload
      state.data[chainId] = state.data[chainId].map((bill: any) => {
        const userOwnedBillsData = userData.find((entry: any) => entry.index === bill.index)
        return { ...bill, userOwnedBillsData: userOwnedBillsData?.userOwnedBills }
      })
    },
    setUserOwnedBillsNftData: (state: any, action) => {
      const { value: userData, chainId } = action.payload
      state.data[chainId] = state.data[chainId].map((bill: any) => {
        const userOwnedBillsNftData = userData.find((entry: any) => entry.index === bill.index)
        return { ...bill, userOwnedBillsNftData: userOwnedBillsNftData?.userOwnedBillsNfts }
      })
    },
    updateBillsUserData: (state: any, action) => {
      const { field, value, index, chainId } = action.payload
      const i = state.data[chainId].findIndex((bill: any) => bill.index === index)
      state.data[chainId][i] = {
        ...state.data[chainId][i],
        userData: { ...state.data[chainId][i].userData, [field]: value },
      }
    },
    updateBillsUserNftData: (state: any, action) => {
      const { value, index, chainId } = action.payload
      const i = state.data[chainId].findIndex((bill: any) => bill.index === index)
      state.data[chainId][i] = {
        ...state.data[chainId][i],
        userOwnedBillsNftData: { ...state.data[chainId][i].userOwnedBillsNftData, ...value },
      }
    },
  },
})

// Actions
export const {
  setBillsPublicData,
  setBillsUserData,
  setUserOwnedBillsData,
  setUserOwnedBillsNftData,
  updateBillsUserData,
} = billsSlice.actions

// Thunks

// TODO: When swapping between chain the state will reset sometimes when the multicall fetch is null
export const fetchBillsPublicDataAsync =
  (chainId: SupportedChainId, tokenPrices: TokenPrices[]): AppThunk =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const bills = getState().bills.data[chainId]
      const returnedBills = await fetchBills(chainId, tokenPrices, bills)
      dispatch(setBillsPublicData({ value: returnedBills, chainId }))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchBillsUserDataAsync =
  (chainId: SupportedChainId, account: string): AppThunk =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const bills = getState().bills.data[chainId]
      // fetch and set user bill interaction data
      const allowances = await fetchBillsAllowance(chainId, account, bills)
      const stakingTokenBalances = await fetchUserBalances(chainId, account, bills)
      const userData = bills.map((bill: BillsConfig) => ({
        index: bill.index,
        //@ts-ignore
        allowance: allowances[bill.index],
        //@ts-ignore
        stakingTokenBalance: stakingTokenBalances[bill.index],
      }))
      dispatch(setBillsUserData({ value: userData, chainId }))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchUserOwnedBillsDataAsync =
  (chainId: SupportedChainId, account: string): AppThunk =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const bills: Bills[] = getState().bills.data[chainId]
      // Fetch and set user owned bill data without NFT Data
      const userOwnedBills = await fetchUserOwnedBills(chainId, account, bills)
      const mapUserOwnedBills = bills.map((bill: Bills) =>
        userOwnedBills.filter((b) => b.address === bill.contractAddress[chainId]),
      )
      const userOwnedBillsData = bills.map((bill: Bills, i: number) => ({
        index: bill.index,
        userOwnedBills: mapUserOwnedBills[i],
      }))
      dispatch(setUserOwnedBillsData({ value: userOwnedBillsData, chainId }))

      // Fetch owned bill NFT data
      const ownedBillsData = mapUserOwnedBills.flatMap((bs) => {
        return bs.map((b) => {
          return { id: b.id, billNftAddress: b.billNftAddress, contractAddress: b.address }
        })
      })
      const userBillNftData = await fetchUserOwnedBillNftData(ownedBillsData, chainId, bills)
      const ownedBillsWithNftData = mapUserOwnedBills.map((bs: any, index: number) => {
        return {
          index: bills[index].index,
          userOwnedBillsNfts: [
            ...bs.map((b: any) => {
              return userBillNftData.find((nftB) => parseInt(nftB.id) === parseInt(b.id))?.data
            }),
          ],
        }
      })
      dispatch(setUserOwnedBillsNftData({ value: ownedBillsWithNftData, chainId }))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateUserAllowance =
  (chainId: SupportedChainId, index: number, account: string): AppThunk =>
  async (dispatch: Dispatch, getState: any) => {
    const bills = getState().bills.data[chainId]
    const allowances = await fetchBillsAllowance(chainId, account, bills)
    //@ts-ignore
    dispatch(updateBillsUserData({ index, field: 'allowance', value: allowances[index], chainId }))
  }

export const updateUserBalance =
  (chainId: SupportedChainId, index: string, account: string): AppThunk =>
  async (dispatch: Dispatch, getState: any) => {
    const bills = getState().bills.data[chainId]
    const tokenBalances = await fetchUserBalances(chainId, account, bills)
    //@ts-ignore
    dispatch(updateBillsUserData({ index, field: 'stakingTokenBalance', value: tokenBalances[index], chainId }))
  }

/**
 * @deprecated since multiple NFT contracts
 */
export const updateUserNftData =
  (index: SupportedChainId, billNftId: string, transactionHash: string, chainId: number): AppThunk =>
  async (dispatch: Dispatch) => {
    const fetchedBillNftData = await getNewBillNftData(billNftId, transactionHash, chainId)
    dispatch(updateBillsUserData({ index, value: fetchedBillNftData, chainId }))
  }

export default billsSlice.reducer
