import { BillsConfig } from '@ape.swap/apeswap-lists'

export interface UserBillNft {
  image: string
  tokenId: string
  attributes: {
    trait_type: string
    value: string
  }[]
}

export interface UserBill {
  address: string
  id: string
  vesting: string
  payout: string
  truePricePaid: string
  lastBlockTimestamp: string
  pendingRewards: string
  billNftAddress: string
  nftData?: UserBillNft
}

export interface Bills extends BillsConfig {
  price?: string
  priceUsd?: string
  vestingTime?: string
  discount?: string
  currentDebt?: string
  currentFee?: string
  debtDecay?: string
  debtRatio?: string
  totalDebt?: string
  totalPayoutGiven?: string
  totalPrincipleBilled?: string
  controlVariable?: string
  minimumPrice?: string
  maxPayout?: string
  maxDebt?: string
  lpPriceUsd?: number
  earnTokenPrice?: number
  billNftAddress?: string
  userData?: {
    allowance: string
    stakingTokenBalance: string
    bills?: UserBill[]
  }
  userOwnedBillsData?: UserBill[]
  userOwnedBillsNftData?: UserBillNft[]
  maxTotalPayOut?: string
  lpPrice?: number
  maxPayoutTokens?: string
}
