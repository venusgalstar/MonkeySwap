import { ChainTokenMap, tokensToChainTokenMap } from 'lib/hooks/useTokenList/utils'
import { useMemo } from 'react'
import { useAppSelector } from 'state/hooks'

import { AppState } from '../../index'
import { DEFAULT_ACTIVE_LIST_URLS, LIFI, UNSUPPORTED_LIST_URLS } from 'config/constants/lists'

export type TokenAddressMap = ChainTokenMap

type Mutable<T> = {
  -readonly [P in keyof T]: Mutable<T[P]>
}

export function useAllLists(): AppState['lists']['byUrl'] {
  return useAppSelector((state) => state.lists.byUrl)
}

/**
 * Combine the tokens in map2 with the tokens on map1, where tokens on map1 take precedence
 * @param map1 the base token map
 * @param map2 the map of additioanl tokens to add to the base map
 */
export function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
  const chainIds = Object.keys(
    Object.keys(map1)
      .concat(Object.keys(map2))
      .reduce<{ [chainId: string]: true }>((memo, value) => {
        memo[value] = true
        return memo
      }, {}),
  ).map((id) => parseInt(id))

  return chainIds.reduce<Mutable<TokenAddressMap>>((memo, chainId) => {
    memo[chainId] = {
      ...map2[chainId],
      // map1 takes precedence
      ...map1[chainId],
    }
    return memo
  }, {}) as TokenAddressMap
}

// merge tokens contained within lists from urls
export function useCombinedTokenMapFromUrls(urls: string[] | undefined): TokenAddressMap {
  const lists = useAllLists()
  return useMemo(() => {
    if (!urls) return {}

    return urls.reduce((allTokens, currentUrl) => {
      const current = lists[currentUrl]?.current
      if (!current) return allTokens
      try {
        return combineMaps(allTokens, tokensToChainTokenMap(current, currentUrl === LIFI))
      } catch (error) {
        console.log('Could not show token list due to error', error, urls[0])
        return allTokens
      }
    }, {})
  }, [lists, urls])
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  return useCombinedTokenMapFromUrls(DEFAULT_ACTIVE_LIST_URLS)
}

// list of tokens not supported on interface for various reasons, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList(): TokenAddressMap {
  // get hard-coded broken tokens

  // get dynamic list of unsupported tokens
  const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS)

  // format into one token address map
  return useMemo(() => loadedUnsupportedListMap, [loadedUnsupportedListMap])
}
