import { ChainId } from '../../config/constants/chains'

export interface BondLanding {
  index?: number
  chainId: ChainId
  showcaseToken: string
  showcaseTokenName: string
  type?: string
  billAddress?: string
  principalToken?: string
  principalTokenName?: string
  principalTokenType?: string
  payoutToken?: string
  payoutTokenName?: string
  discount?: number
  link?: string
  billNftAddress?: string
  initTime?: number
  inactive?: boolean
  soldOut?: boolean
  maxTotalPayout?: number
  totalPayoutGiven?: number
  tokensRemaining?: number
}

export type BondsLandingMap = Record<string, { bonds: BondLanding[] }>
