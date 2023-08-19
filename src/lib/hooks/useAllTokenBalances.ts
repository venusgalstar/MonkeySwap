import { CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useAllTokens } from 'hooks/Tokens'
import { useMemo } from 'react'
import { useTokenBalancesWithLoadingIndicatorAndChain } from '../../hooks/balances/useTokenBalancesWithLoadingIndicatorAndChain'
import { ChainId } from 'config/constants/chains'

export function useAllTokenBalances(
  chain?: ChainId,
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const allTokens = useAllTokens(chain)
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])

  const [balances, balancesIsLoading] = useTokenBalancesWithLoadingIndicatorAndChain(allTokensArray, chain)
  return [balances ?? {}, balancesIsLoading]
}
