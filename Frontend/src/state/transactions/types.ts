import { TradeType } from '@ape.swap/sdk-core'

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values are persisted in state and if you change the value it will cause errors
 */
export enum TransactionType {
  APPROVAL = 0,
  SWAP,
  DEPOSIT_LIQUIDITY_STAKING,
  WITHDRAW_LIQUIDITY_STAKING,
  CLAIM,
  WRAP,
  CREATE_V3_POOL,
  ADD_LIQUIDITY_V3_POOL,
  ADD_LIQUIDITY_V2_POOL,
  COLLECT_FEES,
  REMOVE_LIQUIDITY_V3,
  STAKE,
  WITHDRAW,
  HARVEST,
  BUY,
  TRANSFER,
  CLAIM_BILL,
  ZAP,
  GNANA_BUY,
  GNANA_SELL,
}

interface BaseTransactionInfo {
  type: TransactionType
}

export interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL
  tokenAddress: string
  spender: string
}

interface BaseSwapTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.SWAP
  tradeType: TradeType
  inputCurrencyId: string
  outputCurrencyId: string
}

export interface ExactInputSwapTransactionInfo extends BaseSwapTransactionInfo {
  tradeType: TradeType.EXACT_INPUT
  inputCurrencyAmountRaw: string
  expectedOutputCurrencyAmountRaw: string
  minimumOutputCurrencyAmountRaw: string
}
export interface ExactOutputSwapTransactionInfo extends BaseSwapTransactionInfo {
  tradeType: TradeType.EXACT_OUTPUT
  outputCurrencyAmountRaw: string
  expectedInputCurrencyAmountRaw: string
  maximumInputCurrencyAmountRaw: string
}

interface DepositLiquidityStakingTransactionInfo {
  type: TransactionType.DEPOSIT_LIQUIDITY_STAKING
  token0Address: string
  token1Address: string
}

interface WithdrawLiquidityStakingTransactionInfo {
  type: TransactionType.WITHDRAW_LIQUIDITY_STAKING
  token0Address: string
  token1Address: string
}

export interface WrapTransactionInfo {
  type: TransactionType.WRAP
  unwrapped: boolean
  currencyAmountRaw: string
  chainId?: number
}

export interface ClaimTransactionInfo {
  type: TransactionType.CLAIM
  recipient: string
  uniAmountRaw?: string
}

export interface CreateV3PoolTransactionInfo {
  type: TransactionType.CREATE_V3_POOL
  baseCurrencyId: string
  quoteCurrencyId: string
}

export interface AddLiquidityV3PoolTransactionInfo {
  type: TransactionType.ADD_LIQUIDITY_V3_POOL
  createPool: boolean
  baseCurrencyId: string
  quoteCurrencyId: string
  feeAmount: number
  expectedAmountBaseRaw: string
  expectedAmountQuoteRaw: string
}

export interface AddLiquidityV2PoolTransactionInfo {
  type: TransactionType.ADD_LIQUIDITY_V2_POOL
  baseCurrencyId: string
  quoteCurrencyId: string
  expectedAmountBaseRaw: string
  expectedAmountQuoteRaw: string
}

export interface CollectFeesTransactionInfo {
  type: TransactionType.COLLECT_FEES
  currencyId0: string
  currencyId1: string
  expectedCurrencyOwed0: string
  expectedCurrencyOwed1: string
}

export interface RemoveLiquidityV3TransactionInfo {
  type: TransactionType.REMOVE_LIQUIDITY_V3
  baseCurrencyId: string
  quoteCurrencyId: string
  expectedAmountBaseRaw: string
  expectedAmountQuoteRaw: string
}

// TODO: Expand on these to store more information for transaction history
export interface StakeTransactionInfo {
  type: TransactionType.STAKE
  uniAmountRaw?: string
}

export interface WithdrawTransactionInfo {
  type: TransactionType.WITHDRAW
  uniAmountRaw?: string
}

export interface HarvestTransactionInfo {
  type: TransactionType.HARVEST
  uniAmountRaw?: string
}

export interface BuyTransactionInfo {
  type: TransactionType.BUY
  uniAmountRaw?: string
}

export interface ClaimBillTransactionInfo {
  type: TransactionType.CLAIM_BILL
  uniAmountRaw?: string
}

export interface TransferTransactionInfo {
  type: TransactionType.TRANSFER
  uniAmountRaw?: string
}

export interface ZapTransactionInfo {
  type: TransactionType.ZAP
  uniAmountRaw?: string
}

export interface GnanaBuyInfo {
  type: TransactionType.GNANA_BUY
  uniAmountRaw?: string
}

export interface GnanaSellInfo {
  type: TransactionType.GNANA_SELL
  uniAmountRow?: string
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | ExactOutputSwapTransactionInfo
  | ExactInputSwapTransactionInfo
  | ClaimTransactionInfo
  | DepositLiquidityStakingTransactionInfo
  | WithdrawLiquidityStakingTransactionInfo
  | WrapTransactionInfo
  | CreateV3PoolTransactionInfo
  | AddLiquidityV3PoolTransactionInfo
  | AddLiquidityV2PoolTransactionInfo
  | CollectFeesTransactionInfo
  | RemoveLiquidityV3TransactionInfo
  | StakeTransactionInfo
  | WithdrawTransactionInfo
  | HarvestTransactionInfo
  | BuyTransactionInfo
  | ClaimBillTransactionInfo
  | TransferTransactionInfo
  | ZapTransactionInfo
  | GnanaBuyInfo
  | GnanaSellInfo

export interface TransactionDetails {
  hash: string
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
  info: TransactionInfo
}