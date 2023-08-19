export interface ExternalDataOption {
  amount: number
  source: 'cmc' | 'cg' | 'self-reported-cmc'
}

export interface TokenAddress {
  address: string // SHOULD ALWAYS BE LOWERCASE
  chainId: string
}

export interface TokenProfileLinks {
  siteUrl: string
  twitterUrl: string
  telegramUrl: string
  discordUrl: string
  auditUrls: string[]
}
export interface AddressMapping {
  tokenSymbol: string
  tokenName: string
  tokenLogoUrl: string
  cloudinaryLogoUrl?: string
  tokenAddresses: TokenAddress[]
  knownOwners?: string[]
  tags?: string[]
  profileLinks?: TokenProfileLinks
  isHardAsset?: boolean
  isExempted?: boolean
  lastAddressMappingUpdate?: string // The last time the address mapping was changed (e.g., new address added, info updated)
  lastTokenProfileUpdate?: string // The last time the token had a profile refresh
  lastSuspectedOwnerSearch?: string // The last time we looked for suspected owners for this token
}
export interface SimpleTokenProfile {
  addressMapping: AddressMapping
  mcap: ExternalDataOption[]
  priceChange24hr: number
  totalLiquidity: number
  extractableLiquidity: number
  healthScore: number
  concentrationScore: number
  ownershipScore: number
  totalScore: number
  totalExtractableLiquidity: number
  ownedLiquidity: number
  ranking: number
  createdAt: string
  liquidityDebt?: number
  ownedExtractableLiquidity?: number
}
export interface LHDProfiles {
  count: number
  data: SimpleTokenProfile[]
}

export interface MinMax {
  min: number
  max: number
}

export interface Filters {
  totalScore?: MinMax
  health?: MinMax
  concentration?: MinMax
  ownership?: MinMax
  mcap?: MinMax
  extractable?: MinMax
  tags?: string[]
  chains?: string[]
  offset?: number
  search?: string
  sort?: string
}

export type DexScreenerToken = {
  address: string
  name: string
  symbol: string
  tokenLogoUrl: string
}

export interface LiquidityOwner {
  walletAddress: string
  amount?: number
  lpAddress?: string
  reason: string
  lpType: string
  chainId: string
}
export interface LiquidityPool {
  chainId: string
  chainName: string
  dex: string
  lpAddress: string
  baseToken: DexScreenerToken
  quoteToken: DexScreenerToken
  baseTokenPriceUsd?: number
  quoteTokenPriceUsd?: number
  pairTotalLiquidityUsd: number
  pairExtractableLiquidityUsd: number
  pairOwnedLiquidityUsd?: number
  isHardAssetPair?: boolean
  tags?: string[]
  nValue?: number
  liquidityOwners: LiquidityOwner[]
}

export interface ChartItem {
  x: number
  y: number
  r: number
  data: string
}
export interface LiquidityHealthChart {
  tokens: ChartItem[]
  healthTop: ChartItem[]
  healthBottom: ChartItem[]
}

export interface TokenProfile extends SimpleTokenProfile {
  totalValidLiquidity: number
  totalExtractableLiquidity: number
  ownedLiquidity: number
  ownedLiquidityPercentage: number
  validOwnedLiquidity: number
  circulatingSupply: ExternalDataOption[]
  currentPrice: ExternalDataOption[]
  totalSupply: ExternalDataOption[]
  liquidityPools: LiquidityPool[]
  formulaVersion: string
  createdAt: string
  unlockedSupply: number
  healthChartData: LiquidityHealthChart
}

export interface chartExtras {
  liquidityDebt: number
  sustainabilityLower: number
  sustainabilityUpper: number
}

export interface BlockExplorer {
  url: string
  type: string
  testToken: string
}

export interface ChainDetail {
  chainId: string
  chainName: string
  coingeckoId: string
  dexscreenerId?: string
  logoUrl?: string
  blockExplorer?: BlockExplorer
}

export interface Tag {
  value: string
  label: string
}

export interface IndustryStats {
  averageConcentrationScore: number
  averageHealthScore: number
  averageOwnershipScore: number
  averageTotalScore: number
  chainsSupported: number
  coefficients: {
    concentration: number
    health: number
    ownership: number
  }
  createdAt: string
  evmCoverage: string
  formulaVersion: string
  tokensTracked: number
  tokensVerified: number
}
