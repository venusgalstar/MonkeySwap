import { SupportedChainId } from '@ape.swap/sdk-core'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import type { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BLOCK_EXPLORER, ChainId } from 'config/constants/chains'

declare const window: Window & {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => void
  }
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

// account is not optional
function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked()
}

// account is optional
function getProviderOrSigner(provider: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider
}

// account is optional
export function getContract(address: string, ABI: any, provider: JsonRpcProvider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(provider, account) as any)
}

export function isSupportedChain(chainId: number | null | undefined): chainId is ChainId {
  return !!chainId && !!ChainId[chainId]
}

export function getEtherscanLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainId: ChainId,
): string {
  switch (type) {
    case 'transaction': {
      return `${BLOCK_EXPLORER[chainId]}/tx/${data}`
    }
    case 'token': {
      return `${BLOCK_EXPLORER[chainId]}/token/${data}`
    }
    case 'block': {
      return `${BLOCK_EXPLORER[chainId]}/block/${data}`
    }
    case 'countdown': {
      return `${BLOCK_EXPLORER[chainId]}/block/countdown/${data}`
    }
    default: {
      return `${BLOCK_EXPLORER[chainId]}/address/${data}`
    }
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string | undefined,
  tokenDecimals: number,
  tokenImage: string | undefined,
) => {
  const tokenAdded = window?.ethereum?.request
    ? await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      })
    : null

  return tokenAdded
}
