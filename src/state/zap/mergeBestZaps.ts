// @ts-nocheck
import { Currency, CurrencyAmount, Percent, SupportedChainId, Token, TradeType, WETH9 } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { PairState } from 'hooks/useV2Pairs'
import { MergedZap } from './actions'
import JSBI from 'jsbi'
import { InterfaceTrade } from 'state/routing/types'
// import { BIPS_BASE } from 'config/constants/misc'
import { computeZapPriceBreakdown } from 'utils/prices'
import { WRAPPED_NATIVE_CURRENCY } from 'config/constants/tokens'

// Since a best zap can be null when its the same token we have to check for each possibility
export function mergeBestZaps(
  bestZapOne: InterfaceTrade<Currency, Currency, TradeType> | undefined,
  bestZapTwo: InterfaceTrade<Currency, Currency, TradeType> | undefined,
  out1: Currency | undefined,
  out2: Currency | undefined,
  outputPair: [PairState, Pair | null],
  allowedSlippage: Percent | 'auto',
  totalPairSupply: CurrencyAmount<Token> | undefined,
  chainId: SupportedChainId,
): MergedZap {
  const currencyIn = bestZapOne?.inputAmount.currency || bestZapTwo?.inputAmount.currency
  const slippageTolerance = allowedSlippage

  // We need to check if a zap path will wrap to not estimate a route

  const inAndOutWrappedOne =
    (currencyIn?.isNative && out1?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId])) ||
    (currencyIn?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId]) && out1?.isNative)
  const inAndOutWrappedTwo =
    (currencyIn?.isNative && out2?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId])) ||
    (currencyIn?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId]) && out2?.isNative)

  // If the input token and output token are the same we need to handle values differently
  const inAndOutAreTheSame1Flag = currencyIn === out1 || inAndOutWrappedOne
  const inAndOutAreTheSame2Flag = currencyIn === out2 || inAndOutWrappedTwo

  // output currencies
  const outputCurrencyOne = out1?.wrapped
  const outputCurrencyTwo = out2?.wrapped

  const halfInput = bestZapOne?.inputAmount || bestZapTwo?.inputAmount
  // Since we divide the input by two for each route we add both inputs here
  const inputAmount =
    bestZapOne && bestZapTwo
      ? JSBI.add(bestZapOne.inputAmount.quotient, bestZapTwo.inputAmount.quotient)
      : bestZapOne
      ? JSBI.add(bestZapOne.inputAmount.quotient, bestZapOne.inputAmount.quotient)
      : bestZapTwo
      ? JSBI.add(bestZapTwo.inputAmount.quotient, bestZapTwo.inputAmount.quotient)
      : JSBI.BigInt(0)

  // get best paths for each
  const pathOne = bestZapOne ? bestZapOne.routes?.[0].path : []
  const pathTwo = bestZapTwo ? bestZapTwo.routes?.[0].path : []

  // get output amounts
  const outputOne = inAndOutAreTheSame1Flag ? halfInput : bestZapOne?.outputAmount
  const outputTwo = inAndOutAreTheSame2Flag ? halfInput : bestZapTwo?.outputAmount

  // output pairs
  const [pairState, pair] = outputPair

  const swapOutOne = outputOne
  const swapOutTwo = outputTwo

  const minSwapOutOne = inAndOutAreTheSame1Flag ? halfInput : bestZapOne?.minimumAmountOut(slippageTolerance)
  const minSwapOutTwo = inAndOutAreTheSame2Flag ? halfInput : bestZapTwo?.minimumAmountOut(slippageTolerance)

  // Wrap currencies to handle native
  const [wOutputOne, wOutputTwo, wMinSwapOutOne, wMinSwapOutTwo] = [
    outputOne?.wrapped,
    outputTwo?.wrapped,
    minSwapOutOne?.wrapped,
    minSwapOutTwo?.wrapped,
  ]

  const { priceImpactWithoutFee: priceImpactWithoutFeeOne, realizedLPFee: realizedLPFeeOne } =
    computeZapPriceBreakdown(bestZapOne)

  const { priceImpactWithoutFee: priceImpactWithoutFeeTwo, realizedLPFee: realizedLPFeeTwo } =
    computeZapPriceBreakdown(bestZapTwo)

  // Take the greater price impact as that will be used for the LP value
  const totalPriceImpact =
    priceImpactWithoutFeeOne && priceImpactWithoutFeeTwo
      ? priceImpactWithoutFeeOne.greaterThan(priceImpactWithoutFeeTwo)
        ? priceImpactWithoutFeeOne
        : priceImpactWithoutFeeTwo
      : priceImpactWithoutFeeOne
      ? priceImpactWithoutFeeOne
      : priceImpactWithoutFeeTwo

  // Add fees if swap occurs otherwise use swap
  const liquidityProviderFee =
    realizedLPFeeOne && realizedLPFeeTwo
      ? realizedLPFeeOne?.add(realizedLPFeeTwo)
      : realizedLPFeeOne
      ? realizedLPFeeOne
      : realizedLPFeeTwo

  let pairInAmount
  let minPairInAmount
  let liquidityMinted
  let poolTokenPercentage

  try {
    pairInAmount =
      outputCurrencyOne &&
      wOutputOne &&
      wOutputTwo &&
      outputCurrencyTwo &&
      pair
        ?.priceOf(inAndOutAreTheSame1Flag ? outputCurrencyTwo : outputCurrencyOne)
        ?.quote(inAndOutAreTheSame1Flag ? wOutputTwo : wOutputOne)

    minPairInAmount =
      outputCurrencyOne &&
      wMinSwapOutOne &&
      wMinSwapOutTwo &&
      outputCurrencyTwo &&
      pair
        ?.priceOf(inAndOutAreTheSame1Flag ? outputCurrencyTwo : outputCurrencyOne)
        ?.quote(inAndOutAreTheSame1Flag ? wMinSwapOutTwo : wMinSwapOutOne)
        ?.quotient.toString()

    liquidityMinted =
      wOutputOne && wOutputTwo && totalPairSupply && pair?.getLiquidityMinted(totalPairSupply, wOutputOne, wOutputTwo)

    poolTokenPercentage =
      liquidityMinted && totalPairSupply
        ? new Percent(liquidityMinted.quotient, totalPairSupply.add(liquidityMinted).quotient)
        : null
  } catch (e) {
    console.error(e)
  }

  return {
    currencyIn: {
      currency: currencyIn,
      inputAmount,
    },
    currencyOut1: {
      outputCurrency: outputCurrencyOne,
      outputAmount: outputOne,
      minOutputAmount: minSwapOutOne?.quotient.toString(),
      path: pathOne,
    },
    currencyOut2: {
      outputCurrency: outputCurrencyTwo,
      outputAmount: outputTwo,
      minOutputAmount: minSwapOutTwo?.quotient.toString(),
      path: pathTwo,
    },
    pairOut: {
      pair,
      pairState,
      totalPairSupply,
      liquidityMinted,
      inAmount: inAndOutAreTheSame1Flag
        ? { token1: pairInAmount, token2: swapOutTwo }
        : { token1: swapOutOne, token2: pairInAmount },
      minInAmount: inAndOutAreTheSame1Flag
        ? { token1: minPairInAmount, token2: minSwapOutTwo?.quotient.toString() }
        : { token1: minSwapOutOne?.quotient.toString(), token2: minPairInAmount },
      poolTokenPercentage,
    },
    liquidityProviderFee,
    totalPriceImpact,
    chainId,
  }
}
