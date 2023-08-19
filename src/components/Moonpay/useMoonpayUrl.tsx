import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { apiBaseUrl, moonPayBaseUrl } from 'config/constants/api'
import { useEffect, useState } from 'react'

const getDefaultCurrencies = (chainId: SupportedChainId | undefined) => {
  switch (chainId) {
    case SupportedChainId.BSC:
      return 'bnb_bsc'
    case SupportedChainId.MAINNET:
      return 'eth'
    case SupportedChainId.POLYGON:
      return 'matic_polygon'
    default:
      return 'bnb_bsc'
  }
}

export const useMoonPayUrl = (manualChainId?: SupportedChainId) => {
  const { account, chainId } = useWeb3React()
  const chainIdToUse = manualChainId || chainId
  const defaultCurrency = getDefaultCurrencies(chainIdToUse)
  const baseMoonPayUrl = `${moonPayBaseUrl}&defaultCurrencyCode=${defaultCurrency}`
  const [url, setUrl] = useState<string>(baseMoonPayUrl)

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/user/sign/${account}?${new URLSearchParams({
            url: baseMoonPayUrl,
          })}`,
        )
        if (response.ok) {
          const text = await response.text()
          setUrl(text)
        } else {
          console.warn('Unable to load signed moonpay url data:', response.statusText)
        }
      } catch (error) {
        console.warn('Unable to load signed moonpay url data:', error)
      }
    }

    if (account) fetchUrl()
  }, [account, baseMoonPayUrl])

  return url
}
