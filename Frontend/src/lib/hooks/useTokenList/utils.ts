import { TokenInfo, TokenList } from '@uniswap/token-lists'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'

type TokenMap = Readonly<{ [tokenAddress: string]: { token: WrappedTokenInfo; list?: TokenList } }>
export type ChainTokenMap = Readonly<{ [chainId: number]: TokenMap }>

type Mutable<T> = {
  -readonly [P in keyof T]: Mutable<T[P]>
}

const mapCache = typeof WeakMap !== 'undefined' ? new WeakMap<TokenList | TokenInfo[], ChainTokenMap>() : null

export function tokensToChainTokenMap(tokens: TokenList, isLiFi: boolean): ChainTokenMap {
  const cached = mapCache?.get(tokens)
  if (cached) return cached

  // TODO: Review types
  let map: { [chainId: string]: any } = {}

  if (isLiFi) {
    Object.keys(tokens.tokens).forEach((key) => {
      let array = tokens.tokens[Number(key)] as any
      array.map((tokenInfo: TokenInfo) => {
        const token = new WrappedTokenInfo(tokenInfo)
        if (map[token.chainId]?.[token.address] !== undefined) return
        if (!map[token.chainId]) {
          map[token.chainId] = {}
        }
        map[token.chainId][token.address] = { token }
      })
    })
  } else {
    map = tokens.tokens.reduce<Mutable<ChainTokenMap>>((map, info) => {
      try {
        const token = new WrappedTokenInfo(info)
        if (map[token.chainId]?.[token.address] !== undefined) {
          console.warn(`Duplicate token skipped: ${token.address}`)
          return map
        }
        if (!map[token.chainId]) {
          map[token.chainId] = {}
        }
        map[token.chainId][token.address] = { token }
        return map
      } catch {
        return map
      }
    }, {}) as ChainTokenMap
  }
  mapCache?.set(tokens, map)
  return map
}
