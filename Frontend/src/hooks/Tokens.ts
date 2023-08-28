import { Currency, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_INACTIVE_LIST_URLS } from 'config/constants/lists'
import { useCurrencyFromMap, useTokenFromMapOrNetwork } from 'lib/hooks/useCurrency'
import { getTokenFilter } from 'lib/hooks/useTokenList/filtering'
import { useMemo } from 'react'
import { TokenAddressMap, useAllLists, useCombinedActiveList, useUnsupportedTokenList } from 'state/lists/hooks/hooks'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { TokenInfo } from '@uniswap/token-lists'
import { useUserAddedTokens } from 'state/user/hooks'
import { ChainId } from '../config/constants/chains'

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap: TokenAddressMap, chain?: SupportedChainId): { [address: string]: Token } {
  const { chainId } = useWeb3React()

  const selectedChain = chain ?? chainId

  return useMemo(() => {
    if (!selectedChain) return {}

    // reduce to just tokens
    return Object.keys(tokenMap[selectedChain] ?? {}).reduce<{ [address: string]: Token }>((newMap, address) => {
      newMap[address] = tokenMap[selectedChain][address].token
      return newMap
    }, {})
  }, [selectedChain, tokenMap])
}

export function useAllTokens(chain?: ChainId): { [address: string]: Token } {
  const allTokens = useCombinedActiveList()
  const { chainId } = useWeb3React()
  const selectedChain = chain ? chain : chainId
  const tokensFromMap = useTokensFromMap(allTokens, selectedChain)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap, token) => {
            tokenMap[token.address] = token
            return tokenMap
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          { ...tokensFromMap },
        )
    )
  }, [tokensFromMap, userAddedTokens])
}

export function useUnsupportedTokens(): { [address: string]: Token } {
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useTokensFromMap(unsupportedTokensMap)
}

export function useSearchInactiveTokenLists(search: string | undefined, minResults = 10): WrappedTokenInfo[] {
  const lists = useAllLists()
  const inactiveUrls = DEFAULT_INACTIVE_LIST_URLS
  const { chainId } = useWeb3React()
  const activeTokens = useAllTokens()
  return useMemo(() => {
    if (!search || search.trim().length === 0) return []
    const tokenFilter = getTokenFilter(search)
    const result: WrappedTokenInfo[] = []
    const addressSet: { [address: string]: true } = {}
    for (const url of inactiveUrls) {
      const list = lists[url].current
      if (!list) continue
      for (const tokenInfo of list.tokens) {
        if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
          try {
            const wrapped: WrappedTokenInfo = new WrappedTokenInfo(tokenInfo, list)
            if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
              addressSet[wrapped.address] = true
              result.push(wrapped)
              if (result.length >= minResults) return result
            }
          } catch {
            continue
          }
        }
      }
    }
    return result
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search])
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency | undefined | null): boolean {
  const userAddedTokens = useUserAddedTokens()
  if (!currency) {
    return false
  }
  return !!userAddedTokens.find((token: Token) => currency.equals(token))
}

// undefined if invalid or does not exist
// null if loading or null was passed
// otherwise returns the token
export function useToken(tokenAddress?: string | null): Token | null | undefined {
  let tokens = useAllTokens()
  return useTokenFromMapOrNetwork(tokens, tokenAddress)
}

export function useCurrency(currencyId?: string | null, chain?: ChainId): Currency | null {
  const tokens = useAllTokens(chain)
  return useCurrencyFromMap(tokens, currencyId, chain)
}
