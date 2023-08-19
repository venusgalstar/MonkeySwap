import { createSlice, nanoid } from '@reduxjs/toolkit'
import { DEFAULT_TXN_DISMISS_MS } from 'config/constants/misc'

export type PopupContent = {
  txHash?: string
  text: string
  url?: string
  urlLabel: string
  errorText?: string
  type: 'success' | 'error'
}

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  readonly chainId: number | null
  readonly fiatOnramp: { available: boolean; availabilityChecked: boolean }
  readonly popupList: PopupList
  readonly bananaPrice: string | null
  readonly profileImage?: string
}

const initialState: ApplicationState = {
  fiatOnramp: { available: false, availabilityChecked: false },
  chainId: null,
  popupList: [],
  bananaPrice: null,
  profileImage: undefined,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setFiatOnrampAvailability(state, { payload: available }) {
      state.fiatOnramp = { available, availabilityChecked: true }
    },
    updateChainId(state, action) {
      const { chainId } = action.payload
      state.chainId = chainId
    },
    updateProfileImage(state, { payload: { profileImage } }) {
      state.profileImage = profileImage
    },
    setBananaPrice(state, action) {
      state.bananaPrice = action.payload
    },
    addPopup(state, { payload: { content, key, removeAfterMs = DEFAULT_TXN_DISMISS_MS } }) {
      state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    },
    removePopup(state, { payload: { key } }) {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    },
  },
})

export const { updateChainId, setFiatOnrampAvailability, setBananaPrice, addPopup, updateProfileImage, removePopup } =
  applicationSlice.actions
export default applicationSlice.reducer
