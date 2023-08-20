import { Token as Token_ApeSwapLists, LiquidityDex, Protocols, dexFactories, defaultDexFactories } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { ZERO_ADDRESS } from 'config/constants/misc'
import { usePriceGetter } from 'hooks/useContract'
import { useSingleContractMultipleData } from 'lib/hooks/multicall'
import { useMemo } from 'react'

type TokenRecord = { [k: string]: Token_ApeSwapLists }

/**
 * Custom hook to get LP token price getter data.
 *
 * @param tokensToCall - The LP tokens to obtain prices for.
 * @param supportedChainId - The supported chain ID.
 * @param priceGetterContract - The price getter contract.
 */
export function useLpTokenPricesFromPriceGetter(
  tokensToCall: TokenRecord
) {
  const { chainId } = useWeb3React()
  const tokenCalls = usePriceGetterData(tokensToCall, chainId as SupportedChainId, true);

  let getLPPriceFunction = 'getLPPriceFromFactory';
  if (chainId == SupportedChainId.MAINNET) {
    // NOTE: Mainnet price getter is not upgraded yet
    getLPPriceFunction = 'getLPPrice';
  }

  const priceGetterContract = usePriceGetter()
  const lpTokenPrices = useSingleContractMultipleData(priceGetterContract, getLPPriceFunction, tokenCalls);

  return lpTokenPrices;
}

/**
 * Custom hook to get LP token price getter data.
 *
 * @param tokensToCall - The tokens to obtain prices for
 * @param supportedChainId - The supported chain ID.
 * @param priceGetterContract - The price getter contract.
 */
export function useTokenPricesFromPriceGetter(
  tokensToCall: TokenRecord, 
) {
  const { chainId } = useWeb3React()
  const tokenCalls = usePriceGetterData(tokensToCall, chainId as SupportedChainId, false)

  let getPriceFunction = 'getPriceFromFactory';
  if (chainId == SupportedChainId.MAINNET) {
    // NOTE: Mainnet price getter is not upgraded yet
    getPriceFunction = 'getPrice';
  }

  const priceGetterContract = usePriceGetter()
  const tokenResults = useSingleContractMultipleData(priceGetterContract, getPriceFunction, tokenCalls);

  return tokenResults;
}



/**
 * Custom hook to get price getter data.
 *
 * @param tokens - Tokens to build tx data for.
 * @param supportedChainId - The chain ID.
 * @returns The token price calls.
 */
export function usePriceGetterData(
  tokensToCall: TokenRecord, // replace 'any' with the actual type
  supportedChainId: SupportedChainId,
  lpTokens: boolean
) {
  return useMemo(
    () =>
      Object.values(tokensToCall).map((token) => {
        if (supportedChainId == SupportedChainId.MAINNET) {
          // NOTE: Mainnet price getter is not upgraded yet
          return [token.address[supportedChainId], 18]
        } else {
          const liquidityDex = token.liquidityDex?.[supportedChainId]
          let dexFactory
          let protocol = 2
          let factoryV2 = defaultDexFactories?.[supportedChainId]?.[2] ?? ZERO_ADDRESS
          let factoryV3 = defaultDexFactories?.[supportedChainId]?.[3] ?? ZERO_ADDRESS
          let factoryAlgebra = defaultDexFactories?.[supportedChainId]?.[4] ?? ZERO_ADDRESS
          if (liquidityDex) {
            dexFactory = dexFactories[supportedChainId]?.[liquidityDex as LiquidityDex]
            protocol = dexFactory?.protocol ?? Protocols.V2
            switch (protocol) {
              case Protocols.V2:
                factoryV2 = dexFactory?.factory ?? factoryV2
                break
              case Protocols.V3:
                factoryV3 = dexFactory?.factory ?? factoryV3
                break
              case Protocols.Algebra:
                factoryAlgebra = dexFactory?.factory ?? factoryAlgebra
                break
            }
          }

          const errMsg = `No default dex factory found for retrieving price. For Protocol: ${protocol}.`
          switch (protocol as Protocols) {
            case Protocols.Both:
              if (factoryV2 === ZERO_ADDRESS || factoryV3 === ZERO_ADDRESS) {
                throw new Error(errMsg)
              }
              break
            case Protocols.V2:
              if (factoryV2 === ZERO_ADDRESS) {
                throw new Error(errMsg)
              }
              break
            case Protocols.V3:
              if (factoryV3 === ZERO_ADDRESS) {
                throw new Error(errMsg)
              }
              break
            case Protocols.Algebra:
              if (factoryAlgebra === ZERO_ADDRESS) {
                throw new Error(errMsg)
              }
              break
          }
          // TODO: Not sure if this is the best way to handle this. It requires all tokens to be either LP or not
          if (lpTokens && protocol == Protocols.Algebra) {
            protocol = Protocols.Gamma
          }
          return [token.address[supportedChainId as SupportedChainId], protocol, factoryV2, factoryV3, factoryAlgebra]
        }
      }),
    [tokensToCall, supportedChainId, lpTokens],
  )
}
