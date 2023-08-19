import { MixedRouteSDK, Protocol, Trade } from '@ape.swap/router-sdk'
import { Currency, CurrencyAmount, SupportedChainId, Token, TradeType } from '@ape.swap/sdk-core'
import { Route as V2Route } from '@ape.swap/v2-sdk'
import { Route as V3Route } from '@ape.swap/v3-sdk'
import { ChainId } from '@ape.swap/smart-order-router'
import { RouterPreference } from './slice'
import { Route } from '@lifi/sdk'

export enum TradeState {
  LOADING,
  INVALID,
  NO_ROUTE_FOUND,
  VALID,
  SYNCING,
}

// from https://github.com/Uniswap/routing-api/blob/main/lib/handlers/schema.ts

type TokenInRoute = Pick<Token, 'address' | 'chainId' | 'symbol' | 'decimals'>

export type V3PoolInRoute = {
  type: 'v3-pool'
  tokenIn: TokenInRoute
  tokenOut: TokenInRoute
  sqrtRatioX96: string
  liquidity: string
  tickCurrent: string
  fee: string
  amountIn?: string
  amountOut?: string

  // not used in the interface
  address?: string
}

type V2Reserve = {
  token: TokenInRoute
  quotient: string
}

export type V2PoolInRoute = {
  type: 'v2-pool'
  tokenIn: TokenInRoute
  tokenOut: TokenInRoute
  reserve0: V2Reserve
  reserve1: V2Reserve
  amountIn?: string
  amountOut?: string

  // not used in the interface
  // avoid returning it from the client-side smart-order-router
  address?: string
}

export interface GetQuoteResult {
  quoteId?: string
  blockNumber: string
  amount: string
  amountDecimals: string
  gasPriceWei: string
  gasUseEstimate: string
  gasUseEstimateQuote: string
  gasUseEstimateQuoteDecimals: string
  gasUseEstimateUSD: string
  methodParameters?: { calldata: string; value: string }
  quote: string
  quoteDecimals: string
  quoteGasAdjusted: string
  quoteGasAdjustedDecimals: string
  route: Array<(V3PoolInRoute | V2PoolInRoute)[]>
  routeString: string
}

export interface GetQuoteParams {
  tokenInAddress: string
  tokenInChainId: ChainId
  tokenInDecimals: number
  tokenInSymbol?: string
  tokenOutAddress: string
  tokenOutChainId: ChainId
  tokenOutDecimals: number
  tokenOutSymbol?: string
  protocols?: Protocol[]
  amount: string
  type: 'exactIn' | 'exactOut'
  useApeRPC?: boolean
}

export interface RoutesRequest {
  fromChainId: number
  fromAmount: string
  fromTokenAddress: string
  fromAddress?: string
  toChainId: number
  toTokenAddress: string
  toAddress?: string
  options?: RouteOptions
}

interface RouteOptions {
  order?: 'RECOMMENDED' | 'FASTEST' | 'CHEAPEST' | 'SAFEST'
  slippage?: number // expressed as decimal proportion: 0.03 represents 3%
  infiniteApproval?: boolean
  allowSwitchChain?: boolean // Whether chain switches should be allowed in the routes
  integrator?: string // string telling us who you are
  referrer?: string // string telling us who referred you to us
  fee?: number // expressed as decimal proportion: 0.03 represents 3%
  bridges?: AllowDenyPrefer
  exchanges?: AllowDenyPrefer
}

interface AllowDenyPrefer {
  allow?: string[]
  deny?: string[]
  prefer?: string[]
}

export interface GetRoutesResult {
  routes: Route[]
  feeStructure: {
    fee: number
    tier: string
  }
}

export interface GetRoutesParams {
  fromAmount: string
  fromTokenAddress: string
  fromChain: SupportedChainId //change type
  fromTokenSymbol: string
  fromTokenDecimals: number
  toTokenAddress: string
  toChain: SupportedChainId // change type
  toTokenSymbol: string
  slippage: number
}

export class InterfaceTrade<
  TInput extends Currency,
  TOutput extends Currency,
  TTradeType extends TradeType,
> extends Trade<TInput, TOutput, TTradeType> {
  gasUseEstimateUSD: CurrencyAmount<Token> | null | undefined
  blockNumber: string | null | undefined

  constructor({
    gasUseEstimateUSD,
    blockNumber,
    ...routes
  }: {
    gasUseEstimateUSD?: CurrencyAmount<Token> | undefined | null
    blockNumber?: string | null | undefined
    v2Routes: {
      routev2: V2Route<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
    v3Routes: {
      routev3: V3Route<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
    tradeType: TTradeType
    mixedRoutes?: {
      mixedRoute: MixedRouteSDK<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
  }) {
    super(routes)
    this.blockNumber = blockNumber
    this.gasUseEstimateUSD = gasUseEstimateUSD
  }
}
