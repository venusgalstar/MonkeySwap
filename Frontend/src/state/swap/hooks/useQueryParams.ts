import { Currency, Token } from '@ape.swap/sdk-core'
import BigNumber from 'bignumber.js'

export const useQueryParams = (
  typedValue: string | undefined,
  inputCurrency: Currency | null,
  outputCurrency: Currency | null,
  slippageParsed: number | null,
) => {
  //return null if any of the required params is missing
  if (
    !typedValue ||
    !slippageParsed ||
    !inputCurrency ||
    !outputCurrency ||
    !inputCurrency.symbol ||
    !outputCurrency.symbol
  ) {
    return null
  } else {
    const inputToken = inputCurrency as Token
    const outputToken = outputCurrency as Token
    return {
      //improve this
      fromAmount: new BigNumber(typedValue)
        .times(new BigNumber(10).pow(inputCurrency.decimals))
        .toFixed(0, BigNumber.ROUND_DOWN),
      fromTokenAddress: inputCurrency.isNative ? '0x0000000000000000000000000000000000000000' : inputToken.address,
      fromChain: inputToken.chainId,
      fromTokenSymbol: inputCurrency.symbol,
      fromTokenDecimals: inputCurrency.decimals,
      toTokenAddress: outputCurrency.isNative ? '0x0000000000000000000000000000000000000000' : outputToken.address,
      toChain: outputToken.chainId,
      toTokenSymbol: outputCurrency.symbol,
      slippage: slippageParsed,
    }
  }
}
