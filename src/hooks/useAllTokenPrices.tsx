import { SupportedChainId } from '@ape.swap/sdk-core'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { tokens, } from '@ape.swap/apeswap-lists'
import { useWeb3React } from '@web3-react/core'
import { useLpTokenPricesFromPriceGetter, useTokenPricesFromPriceGetter } from './PriceGetter/usePricesFromPriceGetter'
export interface TokenPrices {
  symbol: string | undefined
  address: Record<SupportedChainId, string | undefined>
  price: number | undefined
  decimals: Record<SupportedChainId, number | undefined>
}
const useAllTokenPrices = () => {
  const { chainId } = useWeb3React()
  const filterTokensToCall = Object.fromEntries(
    Object.entries(tokens).filter(
      ([, values]) =>
        !values?.lpToken &&
        values.address[chainId as SupportedChainId] &&
        values.decimals?.[chainId as SupportedChainId],
    ),
  )

  const filterLpTokensToCall = Object.fromEntries(
    Object.entries(tokens).filter(
      ([, values]) =>
        values?.lpToken &&
        values.address[chainId as SupportedChainId] &&
        values.decimals?.[chainId as SupportedChainId],
    ),
  )

  const tokenResults = useTokenPricesFromPriceGetter(filterTokensToCall)
  const lpTokenResults = useLpTokenPricesFromPriceGetter(filterLpTokensToCall)

  const parsedTokenResults = Object.values(filterTokensToCall).map((token, i) => {
    return {
      symbol: token.symbol,
      address: token.address,
      price:
        token.symbol === 'GNANA'
          ? tokenResults?.[0]?.result?.[0]
            ? getBalanceNumber(tokenResults?.[0].result?.[0]?.toString(), 18) * 1.389
            : undefined
          : tokenResults?.[i]?.result?.[0]
          ? getBalanceNumber(tokenResults?.[i].result?.[0]?.toString(), 18)
          : undefined,
      decimals: token.decimals,
    }
  })

  const parsedLpTokenResults = Object.values(filterLpTokensToCall).map((token, i) => {
    return {
      symbol: token.symbol,
      address: token.address,
      price: lpTokenResults?.[i]?.result?.[0]
        ? getBalanceNumber(lpTokenResults?.[i].result?.[0]?.toString(), 18)
        : undefined,
      decimals: token.decimals,
    }
  })
  return [...parsedTokenResults, ...parsedLpTokenResults]
}

export default useAllTokenPrices
