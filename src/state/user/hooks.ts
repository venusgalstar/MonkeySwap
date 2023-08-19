import { Percent, Token } from '@ape.swap/sdk-core'
import { computePairAddress, Pair } from '@ape.swap/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import { V2_FACTORY_ADDRESSES } from 'config/constants/addresses'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from 'config/constants/routing'
import { useAllTokens } from 'hooks/Tokens'
import JSBI from 'jsbi'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import {
  INITIAL_ZAP_SLIPPAGE,
  addSerializedPair,
  addSerializedToken,
  updateHideClosedPositions,
  updateUserDeadline,
  updateUserFlipV3Layout,
  updateUserSlippageTolerance,
  updateUserZapSlippageTolerance,
} from './reducer'
import { SerializedPair, SerializedToken, UserAddedToken } from './types'

const serializeToken = (token: Token): SerializedToken => {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

const deserializeToken = (serializedToken: SerializedToken, Class: typeof Token = Token): Token => {
  return new Class(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name,
  )
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch],
  )
}

export function useUserAddedTokensOnChain(chainId: number | undefined | null): Token[] {
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    const tokenMap: Token[] = serializedTokensMap?.[chainId]
      ? Object.values(serializedTokensMap[chainId]).map((value) => deserializeToken(value, UserAddedToken))
      : []
    return tokenMap
  }, [serializedTokensMap, chainId])
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useWeb3React()
  return useUserAddedTokensOnChain(chainId)
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserSlippageTolerance(): [Percent | 'auto', (slippageTolerance: Percent | 'auto') => void] {
  const userSlippageToleranceRaw = useAppSelector((state) => {
    return state.user.userSlippageTolerance
  })
  const userSlippageTolerance = useMemo(() => new Percent(userSlippageToleranceRaw, 10_000), [userSlippageToleranceRaw])

  const dispatch = useAppDispatch()
  const setUserSlippageTolerance = useCallback(
    (userSlippageTolerance: Percent | 'auto') => {
      let value: 'auto' | number
      try {
        value =
          userSlippageTolerance === 'auto' ? 'auto' : JSBI.toNumber(userSlippageTolerance.multiply(10_000).quotient)
      } catch (error) {
        value = 'auto'
      }
      dispatch(
        updateUserSlippageTolerance({
          userSlippageTolerance: value,
        }),
      )
    },
    [dispatch],
  )

  return useMemo(
    () => [userSlippageTolerance, setUserSlippageTolerance],
    [setUserSlippageTolerance, userSlippageTolerance],
  )
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserZapSlippageTolerance(): [Percent, (slippageTolerance: Percent) => void] {
  const userSlippageToleranceRaw = useAppSelector((state) => {
    return state.user.userZapSlippage
  })
  const userSlippageTolerance = useMemo(
    () => (!userSlippageToleranceRaw ? new Percent(50, 10_000) : new Percent(userSlippageToleranceRaw, 10_000)),
    [userSlippageToleranceRaw],
  )

  const dispatch = useAppDispatch()
  const setUserSlippageTolerance = useCallback(
    (userSlippageTolerance: Percent) => {
      let value: number
      try {
        value = JSBI.toNumber(userSlippageTolerance.multiply(10_000).quotient)
      } catch (error) {
        value = INITIAL_ZAP_SLIPPAGE
      }
      dispatch(
        updateUserZapSlippageTolerance({
          userZapSlippage: value,
        }),
      )
    },
    [dispatch],
  )

  return useMemo(
    () => [userSlippageTolerance, setUserSlippageTolerance],
    [setUserSlippageTolerance, userSlippageTolerance],
  )
}

/**
 * Same as above but replaces the auto with a default value
 * @param defaultSlippageTolerance the default value to replace auto with
 */
export function useUserSlippageToleranceWithDefault(defaultSlippageTolerance: Percent): Percent {
  const allowedSlippage = useUserSlippageTolerance()[0]
  return useMemo(
    () => (allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage),
    [allowedSlippage, defaultSlippageTolerance],
  )
}

export function useUserHideClosedPositions(): [boolean, () => void] {
  const dispatch = useAppDispatch()

  const hideClosedPositions = useAppSelector((state) => state.user.userHideClosedPositions)

  const setHideClosedPositions = useCallback(() => {
    dispatch(updateHideClosedPositions({ userHideClosedPositions: !hideClosedPositions }))
  }, [dispatch, hideClosedPositions])

  return [hideClosedPositions, setHideClosedPositions]
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  if (tokenA.chainId !== tokenB.chainId) throw new Error('Not matching chain IDs')
  if (tokenA.equals(tokenB)) throw new Error('Tokens cannot be equal')
  if (!V2_FACTORY_ADDRESSES[tokenA.chainId]) throw new Error('No V2 factory address on this chain')

  return new Token(
    tokenA.chainId,
    computePairAddress({ factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB }),
    18,
    'APESWAP-V2',
    'Apeswap V2',
  )
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
  const { chainId } = useWeb3React()
  const tokens = useAllTokens()

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? Object.keys(tokens).flatMap((tokenAddress) => {
            const token = tokens[tokenAddress]
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null
                  } else {
                    return [base, token]
                  }
                })
                .filter((p): p is [Token, Token] => p !== null)
            )
          })
        : [],
    [tokens, chainId],
  )
  // pairs saved by users
  const savedSerializedPairs = useAppSelector(({ user: { pairs } }) => pairs)

  const userPairs: [Token, Token][] = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return []
    const forChain = savedSerializedPairs[chainId]
    if (!forChain) return []

    return Object.keys(forChain).map((pairId) => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
    })
  }, [savedSerializedPairs, chainId])

  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs],
  )

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
      const sorted = tokenA?.sortsBefore(tokenB)
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
      if (memo[key]) return memo
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
      return memo
    }, {})

    return Object.keys(keyed).map((key) => keyed[key])
  }, [combinedList])
}

export function useFlipV3LayoutManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const flipV3Layout = useAppSelector((state) => state.user.flipV3Layout)

  const toggleSetFlipV3Layout = useCallback(() => {
    dispatch(updateUserFlipV3Layout({ flipV3Layout: !flipV3Layout }))
  }, [flipV3Layout, dispatch])

  return [flipV3Layout, toggleSetFlipV3Layout]
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  }
}

export function usePairAdder(): (pair: Pair) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
    [dispatch],
  )
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
  const dispatch = useAppDispatch()
  const userDeadline = useAppSelector((state) => state.user.userDeadline)
  const deadline = userDeadline

  const setUserDeadline = useCallback(
    (userDeadline: number) => {
      dispatch(updateUserDeadline({ userDeadline }))
    },
    [dispatch],
  )

  return [deadline, setUserDeadline]
}
