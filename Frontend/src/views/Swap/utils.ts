import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { InterfaceTrade } from 'state/routing/types'
import { RoutingDiagramEntry } from './types'
import { ALLOWED_PRICE_IMPACT_HIGH, PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN } from 'config/constants/misc'
import { getBNWithDecimals } from '../../utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import { Route } from '@lifi/sdk'

const V2_DEFAULT_FEE_TIER = 2000

/**
 * Loops through all routes on a trade and returns an array of diagram entries.
 */
export function getTokenPath(trade: InterfaceTrade<Currency, Currency, TradeType>): RoutingDiagramEntry[] {
  return trade.swaps.map(({ route: { path: tokenPath, pools, protocol }, inputAmount, outputAmount }) => {
    const portion =
      trade.tradeType === TradeType.EXACT_INPUT
        ? inputAmount.divide(trade.inputAmount)
        : outputAmount.divide(trade.outputAmount)
    const percent = new Percent(portion.numerator, portion.denominator)
    const path: RoutingDiagramEntry['path'] = []
    for (let i = 0; i < pools.length; i++) {
      const nextPool = pools[i]
      const tokenIn = tokenPath[i]
      const tokenOut = tokenPath[i + 1]
      const entry: RoutingDiagramEntry['path'][0] = [
        tokenIn,
        tokenOut,
        nextPool instanceof Pair ? V2_DEFAULT_FEE_TIER : nextPool.fee,
      ]
      path.push(entry)
    }
    return {
      percent,
      path,
      protocol,
    }
  })
}

export const formatPriceImpact = (priceImpact: Percent) => `${priceImpact?.multiply(-1).toFixed(2)}%`

/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 */
export function confirmPriceImpactWithoutFee(priceImpactWithoutFee: Percent): boolean {
  if (!priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    return (
      window.prompt(
        `This swap has a price impact of at least ${PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(
          0,
        )}%. Please type the word "confirm" to continue with this swap.`,
      ) === 'confirm'
    )
  } else if (!priceImpactWithoutFee.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
    return window.confirm(
      `This swap has a price impact of at least ${ALLOWED_PRICE_IMPACT_HIGH.toFixed(
        0,
      )}%. Please confirm that you would like to continue with this swap.`,
    )
  }
  return true
}

export const parseOutputAmount = (amount: string, decimals: number) => {
  return getBNWithDecimals(amount, decimals)?.toFixed() ?? ''
}

export const toPrecisionAvoidExponential = (number: BigNumber, precision: number = 5): string => {
  let output: string
  if (number.isLessThan(9999)) {
    output = number.toPrecision(precision)
    // Check if the output is in exponential format
    if (output.indexOf('e') !== -1) {
      output = number.toFixed(precision)
    }
  } else {
    output = number.integerValue(BigNumber.ROUND_DOWN).toString()
  }
  return output
}

export const humanOutputAmount = (amount: string, decimals: number, precision?: number) => {
  return toPrecisionAvoidExponential(getBNWithDecimals(amount, decimals) ?? new BigNumber(0), precision)
}

export const getTxHashFromRoute = (route: Route | undefined, allowBridge: boolean = false) => {
  return route?.steps?.[0]?.execution?.process?.find(
    (tx) => tx?.type === 'SWAP' || (allowBridge ? tx?.type === 'CROSS_CHAIN' : false),
  )?.txHash
}
