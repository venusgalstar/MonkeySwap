export type PageMeta = {
  title: string
  description?: string
  image?: string
}

export const DEFAULT_META: PageMeta = {
  title: 'ApeSwap : Your One-Stop DeFi Hub',
  description:
    'ApeSwap is a DeFi Hub on BNB Chain, Polygon, & Ethereum. Swap, stake, and lend cryptocurrencies, from stablecoins to altcoins - all in one place.',
  image: 'https://apeswap.finance/logo.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home Page',
    description:
      'ApeSwap is a DeFi Hub on BNB Chain, Polygon, & Ethereum. Swap, stake, and lend cryptocurrencies, from stablecoins to altcoins - all in one place.',
  },
  '/swap': {
    title: 'Swap',
    description: 'Swap between hundreds of crypto tokens using our decentralized exchange.',
  },
  '/apestats': {
    title: 'ApeStats',
    description: 'Track your portfolio on ApeSwap using our custom dashboard.',
  },
  '/nft': {
    title: 'Non Fungible Apes',
    description: 'Buy and sell ApeSwap NFTs and join our NFT community.',
  },
  '/farms': {
    title: 'Farms',
    description: 'Stake your liquidity provider (LP) tokens in Farms to earn.',
  },
  '/jungle-farms': {
    title: 'Jungle Farms',
    description: 'Stake your liquidity provider (LP) tokens to earn partner project tokens.',
  },
  '/pools': {
    title: 'Staking Pools',
    description: 'Stake BANANA in Staking Pools to earn partner project tokens.',
  },
  '/liquidity': {
    title: 'Liquidity',
    description: 'Add liquidity to the ApeSwap decentralized exchange to create LPs and earn trading fees.',
  },
  '/add-liquidity': {
    title: 'Liquidity',
    description: 'Add liquidity to the ApeSwap decentralized exchange to create LPs and earn trading fees.',
  },
  '/iao': {
    title: 'Initial Ape Offerings',
    description: 'Launch your crypto project with ApeSwap, or commit into Initial Ape Offerings.',
  },
  '/gnana': {
    title: 'GNANA',
    description: 'Convert your BANANA to GNANA to gain exclusive access to governance, pools, and more.',
  },
  '/maximizers': {
    title: 'BANANA Maximizers',
    description: 'Stake your liquidity provider (LP) tokens in auto-compounding vaults to earn BANANA.',
  },
  '/auction': {
    title: 'Auction',
  },
  '/staking': {
    title: 'NFA Staking',
  },
  '/bonds': {
    title: 'ApeSwap Bonds',
    description: 'Get BANANA and partner project tokens at a discount using your liquidity provider (LP) tokens.',
  },
  '/limit-orders': {
    title: 'Limit Orders',
    description: 'Trade crypto tokens at the price you want using limit orders on the ApeSwap DEX.',
  },
  '/liquidity-health': {
    title: 'ApeSwap | Liquidity Health Dashboard',
    description: 'ApeSwap’s Liquidity Health Dashboard provides insights into the quality and sustainability of cryptocurrency projects based on different characteristics of their liquidity.',
    // image: 'https://i.imgur.com/g1sFeUS.png' 
  },
}
