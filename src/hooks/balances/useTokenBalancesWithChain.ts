import { CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useTokenBalancesWithLoadingIndicatorAndChain } from './useTokenBalancesWithLoadingIndicatorAndChain'
import { ChainId } from 'config/constants/chains'

export function useTokenBalancesWithChain(
  address?: string,
  tokens?: Token | undefined,
  chain?: ChainId,
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  return useTokenBalancesWithLoadingIndicatorAndChain([tokens], chain)[0]
}
