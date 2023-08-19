// enum to corresponding url
import { ChainId } from './chains'

export enum LIST_VIEW_PRODUCTS {
  BILLS = 'treasury-bills',
  MAXIMIZERS = 'maximizers',
  JUNGLE_FARMS = 'jungle-farms',
  POOLS = 'pools',
  FARMS = 'farms',
}

export enum OTHER_PRODUCTS {
  GNANA = 'gnana',
  MIGRATE = 'migrate',
  ZAP = 'zap',
  IAO = 'iao',
  NFA_COLLECTION = 'nft',
  NFA_AUCTION = 'auction',
  NFA_STAKING = 'staking',
  V3 = 'v3',
}

// Products on different chains and their available chains

// These products are list view components that have a specific chain redirect component
export const AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS: Record<LIST_VIEW_PRODUCTS, ChainId[]> = {
  [LIST_VIEW_PRODUCTS.BILLS]: [ChainId.BSC, ChainId.POLYGON, ChainId.ARBITRUM_ONE],
  [LIST_VIEW_PRODUCTS.FARMS]: [ChainId.BSC, ChainId.POLYGON],
  [LIST_VIEW_PRODUCTS.MAXIMIZERS]: [ChainId.BSC],
  [LIST_VIEW_PRODUCTS.JUNGLE_FARMS]: [ChainId.BSC],
  [LIST_VIEW_PRODUCTS.POOLS]: [ChainId.BSC],
}

// Full product names for readability
export const FULL_PRODUCT_NAMES: Record<LIST_VIEW_PRODUCTS | OTHER_PRODUCTS, string> = {
  [LIST_VIEW_PRODUCTS.BILLS]: 'Treasury Bills',
  [LIST_VIEW_PRODUCTS.MAXIMIZERS]: 'Banana Maximizers',
  [LIST_VIEW_PRODUCTS.JUNGLE_FARMS]: 'Jungle Farms',
  [LIST_VIEW_PRODUCTS.POOLS]: 'Pools',
  [LIST_VIEW_PRODUCTS.FARMS]: 'Farms',
  [OTHER_PRODUCTS.GNANA]: 'Golden Banana',
  [OTHER_PRODUCTS.MIGRATE]: 'Migrate',
  [OTHER_PRODUCTS.ZAP]: 'Zap',
  [OTHER_PRODUCTS.IAO]: 'Official IAO',
  [OTHER_PRODUCTS.NFA_COLLECTION]: 'Nfa Collection',
  [OTHER_PRODUCTS.NFA_AUCTION]: 'Nfa Auction',
  [OTHER_PRODUCTS.NFA_STAKING]: 'Nfa Staking',
  [OTHER_PRODUCTS.V3]: 'V3 Concentrated Liquidity',
}
