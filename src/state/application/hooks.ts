import { DEFAULT_TXN_DISMISS_MS } from 'config/constants/misc'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { AppState } from '../index'
import { addPopup, PopupContent, removePopup, setFiatOnrampAvailability } from './reducer'
import NFA_ABI from '../../config/abi/nonFungibleApes.json'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { getContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'
import NFB_ABI from '../../config/abi/nonFungibleBananas.json'
import { RPC_PROVIDERS } from '../../config/constants/providers'
import { BANANA_ADDRESSES, PRICE_GETTER_ADDRESSES } from 'config/constants/addresses'
import PRICE_GETTER_ABI from 'config/abi/price-getter.json'

/** @ref https://dashboard.moonpay.com/api_reference/client_side_api#ip_addresses */
interface MoonpayIPAddressesResponse {
  alpha3?: string
  isAllowed?: boolean
  isBuyAllowed?: boolean
  isSellAllowed?: boolean
}

async function getMoonpayAvailability(): Promise<boolean> {
  const moonpayPublishableKey = process.env.MOONPAY_PUBLISHABLE_KEY
  if (!moonpayPublishableKey) {
    throw new Error('Must provide a publishable key for moonpay.')
  }
  const moonpayApiURI = process.env.MOONPAY_API
  if (!moonpayApiURI) {
    throw new Error('Must provide an api endpoint for moonpay.')
  }
  const res = await fetch(`${moonpayApiURI}/v4/ip_address?apiKey=${moonpayPublishableKey}`)
  const data = await (res.json() as Promise<MoonpayIPAddressesResponse>)
  return data.isBuyAllowed ?? false
}

export function useFiatOnrampAvailability(shouldCheck: boolean, callback?: () => void) {
  const dispatch = useAppDispatch()
  const { available, availabilityChecked } = useAppSelector((state: AppState) => state.application.fiatOnramp)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function checkAvailability() {
      setError(null)
      setLoading(true)
      try {
        const result = await getMoonpayAvailability()
        // sendAnalyticsEvent(MoonpayEventName.MOONPAY_GEOCHECK_COMPLETED, { success: result })
        if (stale) return
        dispatch(setFiatOnrampAvailability(result))
        if (result && callback) {
          callback()
        }
      } catch (e: any) {
        console.error('Error checking onramp availability', e.toString())
        if (stale) return
        setError('Error, try again later.')
        dispatch(setFiatOnrampAvailability(false))
      } finally {
        if (!stale) setLoading(false)
      }
    }

    if (!availabilityChecked && shouldCheck) {
      checkAvailability()
    }

    let stale = false
    return () => {
      stale = true
    }
  }, [availabilityChecked, callback, dispatch, shouldCheck])

  return { available, availabilityChecked, loading, error }
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string, removeAfterMs?: number) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (content: PopupContent, key?: string, removeAfterMs?: number) => {
      dispatch(addPopup({ content, key, removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS }))
    },
    [dispatch],
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch],
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useAppSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter((item) => item.show), [list])
}

export function useBananaPrice(): AppState['application']['bananaPrice'] {
  const bananaPrice = useAppSelector((state: AppState) => state.application.bananaPrice)
  return bananaPrice
}

export function useToastError(): (content: PopupContent, key?: string, removeAfterMs?: number) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (error: any) => {
      const content = {
        type: 'error',
        text: 'Transaction Failed',
        errorText: error?.reason ? error.reason : error?.message,
      }
      dispatch(addPopup({ content }))
    },
    [dispatch],
  )
}

export const useBananaPriceOnBnb = (): string | undefined => {
  const [bananaPrice, setBananaPrice] = useState<string | undefined>()

  useEffect(() => {
    const fetchBananaPrice = async () => {
      try {
        const priceGetterContract = getContract(
          PRICE_GETTER_ADDRESSES[SupportedChainId.BSC],
          PRICE_GETTER_ABI,
          RPC_PROVIDERS[SupportedChainId.BSC],
        )
        const bananaPrice: number = await priceGetterContract?.getPrice(BANANA_ADDRESSES[SupportedChainId.BSC], 18)
        setBananaPrice(bananaPrice.toString())
      } catch (e) {
        console.error(e)
      }
    }
    fetchBananaPrice()
  }, [])

  return bananaPrice
}

export const useGetProfilePic = (): string | undefined => {
  const { account } = useWeb3React()
  const [profilePic, setProfilePic] = useState<string | undefined>()

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!account) return
      try {
        const nfaContract = getContract(
          '0x6afC012783e3a6eF8C5f05F8EeE2eDeF6a052Ec4',
          NFA_ABI,
          RPC_PROVIDERS[SupportedChainId.BSC],
          account,
        )
        const nfbContract = getContract(
          '0x9f707A412302a3aD64028A9F73f354725C992081',
          NFB_ABI,
          RPC_PROVIDERS[SupportedChainId.BSC],
          account,
        )
        const nfaBalance: number = await nfaContract?.balanceOf(account)
        const nfbBalance: number = await nfbContract?.balanceOf(account)
        if (nfaBalance.toString() !== '0') {
          const nfaNumber = await nfaContract?.tokenOfOwnerByIndex(account, 0)
          setProfilePic(
            `https://raw.githubusercontent.com/ApeSwapFinance/non-fungible-apes/main/images/${nfaNumber?.toString()}.png`,
          )
        } else if (nfbBalance.toString() !== '0') {
          const nfbNumber = await nfbContract?.tokenOfOwnerByIndex(account, 0)
          setProfilePic(
            `https://ipfs.io/ipfs/QmYhuJnr3GGUnDGtg6rmSXTgo7FzaWgrriqikfgn5SkXhZ/${nfbNumber?.toString()}.png`,
          )
        } else setProfilePic(undefined)
      } catch (e) {
        console.error(e)
      }
    }
    fetchProfilePic()
  }, [account])

  return profilePic
}
