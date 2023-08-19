import { SupportedChainId } from '@ape.swap/sdk-core'

export const getMetamaskLinks = (chainId: SupportedChainId) => {
  switch (chainId) {
    case SupportedChainId.BSC:
      return 'https://docs.bnbchain.org/docs/wallet/metamask/'
    case SupportedChainId.POLYGON:
      return 'https://wiki.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
    case SupportedChainId.MAINNET:
      return 'https://metamask.io/faqs/'
    case SupportedChainId.TLOS:
      return 'https://decentralizedcreator.com/add-telos-evm-network-to-metamask/'
    case SupportedChainId.ARBITRUM_ONE:
      return 'https://academy.binance.com/en/articles/how-to-add-arbitrum-to-metamask'
    default:
      return 'https://docs.bnbchain.org/docs/wallet/metamask/'
  }
}

export const ROUTE_NAMES: Record<string, string> = {
  '/': 'HOME',
  '/jungle-farms': 'JUNGLE_FARMS',
  '/farms': 'FARMS',
  '/swap': 'SWAP',
  '/pools': 'POOLS',
  '/maximizers': 'MAXIMIZERS_VAULTS',
  '/add': 'ADD_LIQUIDITY',
  //'/v3-add-liquidity': 'ADD_LIQUIDITY',
  '/add-liquidity': 'ADD_LIQUIDITY_V2',
  '/liquidity': 'ADD_LIQUIDITY_V2',
  '/zap': 'ADD_LIQUIDITY_V2',
  '/migrate': 'ADD_LIQUIDITY_V2',
  '/find': 'ADD_LIQUIDITY_V2',
  '/remove': 'ADD_LIQUIDITY_V2',
  '/limit-orders': 'ORDERS',
  '/iao': 'IAO',
  '/gnana': 'GNANA',
  '/bonds': 'TREASURY_BILL',
  '/nft': 'NFT',
  '/auction': 'AUCTION',
  '/staking': 'STAKING',
  '/apestats': 'APESTATS',
  '/protocol-dashboard': 'PROTOCOL_DASHBOARD',
  '/the-migration': 'THE_MIGRATION',
  '/liquidity-health': 'LIQUIDITY_HEALTH',
}

export const FARMS: Record<string, string> = {
  BNB: 'bnb-chain-farms',
  Polygon: 'polygon-farms',
  Ethereum: '',
  Telos: 'telos-farms',
}

export const DOC_LINKS: Record<string, string> = {
  HOME: 'https://apeswap.gitbook.io/apeswap-finance/welcome/master',
  JUNGLE_FARMS: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms/',
  FARMS: `https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms/`,
  SWAP: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/swap',
  POOLS: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/pools',
  MAXIMIZERS_VAULTS: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/vaults',
  ADD_LIQUIDITY:
    'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity/how-to-add-liquidity-v3',
  ADD_LIQUIDITY_V2:
    'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity/how-to-add-liquidity-v2',
  LIQUIDITY:
    'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity/how-to-add-liquidity-v3',
  ORDERS: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/limit-orders',
  IAO: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/initial-ape-offerings-iaos',
  GNANA: 'https://apeswap.gitbook.io/apeswap-finance/welcome/apeswap-tokens/gnana',
  TREASURY_BILL: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills',
  NFT: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/collect/non-fungible-apes-nfas',
  AUCTION:
    'https://apeswap.gitbook.io/apeswap-finance/product-and-features/collect/non-fungible-apes-nfas/nfa-auction-house',
  STAKING: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake',
  APESTATS: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/apestats',
  PROTOCOL_DASHBOARD: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/protocol-dashboard',
  THE_MIGRATION: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/hard-cap-migration-masterapev2',
  LIQUIDITY_HEALTH: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/liquidity-health-dashboard',
}
