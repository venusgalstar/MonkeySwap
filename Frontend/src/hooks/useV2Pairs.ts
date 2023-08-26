import { Interface } from '@ethersproject/abi'
import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { computePairAddress, Pair } from '@ape.swap/v2-sdk'
import { useMultipleContractSingleData } from 'lib/hooks/multicall'
import { useMemo } from 'react'
import { V2_FACTORY_ADDRESSES } from 'config/constants/addresses'

const PAIR_INTERFACE = new Interface(IUniswapV2Pair.abi)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function useV2Pairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const tokens = useMemo(
    () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
    [currencies],
  )

  console.log('useV2Pairs');
  console.log('-------------------------------------');
  console.log(tokens);
  tokens.map(([tokenA, tokenB]) => {
    console.log('tokenA', tokenA);
    console.log('tokenB', tokenB);
  })
  console.log('-------------------------------------');

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {

        console.log('tokenA', tokenA);
        console.log('tokenB', tokenB);

        return tokenA &&
          tokenB &&
          tokenA.chainId === tokenB.chainId &&
          !tokenA.equals(tokenB) &&
          V2_FACTORY_ADDRESSES[tokenA.chainId]
          ? computePairAddress({ factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB })
          : undefined
      }),
    [tokens],
  )

  console.log('pairAddresses', pairAddresses);

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(
          CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
        ),
      ]
    })
  }, [results, tokens])
}

export function useV2Pair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  const inputs: [[Currency | undefined, Currency | undefined]] = useMemo(() => [[tokenA, tokenB]], [tokenA, tokenB])
  return useV2Pairs(inputs)[0]
}
