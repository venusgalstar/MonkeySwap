import useHttpLocations from 'hooks/useHttpLocations'
import { useMemo } from 'react'
import { isAddress } from 'utils'
import { NATIVE_CHAIN_ID } from 'config/constants/tokens'
import { SupportedChainId } from '@ape.swap/sdk-core'

type Network = 'ethereum' | 'arbitrum' | 'optimism' | 'polygon'

export function chainIdToNetworkName(networkId: SupportedChainId): Network {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.POLYGON:
      return 'polygon'
    default:
      return 'ethereum'
  }
}

export function getNativeLogoURI(chainId: SupportedChainId = SupportedChainId.MAINNET): string {
  switch (chainId) {
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0000000000000000000000000000000000001010/logo.png'

    case SupportedChainId.BSC:
    case SupportedChainId.BSC_TESTNET:
      return 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/WBNB.svg'
    default:
      return 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/ETH.svg'
  }
}

function getTokenLogoURI(address: string, chainId: SupportedChainId = SupportedChainId.MAINNET): string | void {
  const networkName = chainIdToNetworkName(chainId)
  const networksWithUrls = [SupportedChainId.MAINNET]
  if (networksWithUrls.includes(chainId)) {
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
  }
}

export default function useCurrencyLogoURIs(
  currency:
    | {
        isNative?: boolean
        isToken?: boolean
        address?: string
        chainId: number
        logoURI?: string | null
      }
    | null
    | undefined,
): string[] {
  const locations = useHttpLocations(currency?.logoURI)
  return useMemo(() => {
    const logoURIs = [...locations]
    if (currency) {
      if (currency.isNative || currency.address === NATIVE_CHAIN_ID) {
        logoURIs.push(getNativeLogoURI(currency.chainId))
      } else if (currency.isToken || currency.address) {
        const checksummedAddress = isAddress(currency.address)
        const logoURI = checksummedAddress && getTokenLogoURI(checksummedAddress, currency.chainId)
        if (logoURI) {
          logoURIs.push(logoURI)
        }
      }
    }
    return logoURIs
  }, [currency, locations])
}
