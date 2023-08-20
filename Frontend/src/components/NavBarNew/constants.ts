// Types
import { ChainId, DEX_ONLY_CHAINS } from 'config/constants/chains'
import { NavItem } from './types'

// This function returns the nav list for a given chainId
export const getChainNavList = (chainId: ChainId): NavItem[] => {
  if (NAV_LISTS[chainId]) {
    return NAV_LISTS[chainId]
  } else if (DEX_ONLY_CHAINS.includes(chainId)) {
    return [DEX_ONLY_EXCHANGE_ITEMS, DEFAULT_NAV[1], DEFAULT_NAV[2], DEFAULT_NAV[3]]
  } else {
    return DEFAULT_NAV
  }
}

// This is the default minimum nav we assume each chain will have
const DEFAULT_NAV: NavItem[] = [
  {
    label: 'Exchange',
    order: 1,
    icon: '/images/navbar/trading',
    items: [
      {
        itemLabel: 'Swap',
        itemDesc: 'Trade any tokens across several chains.',
        href: '/swap',
        icon: '/images/navbar/swap',
      },
      {
        itemLabel: 'Liquidity',
        itemDesc: 'Provide liquidity to earn trading fees and stake.',
        href: '/zap',
        icon: '/images/navbar/liquidity',
      },
      {
        itemLabel: 'Pro Trading',
        itemDesc: 'Utilize Enhanced trading options & charting.',
        href: 'https://pro.apeswap.finance',
        icon: '/images/navbar/pro',
      },
    ],
  },
  /*{
    label: 'Bonds',
    order: 2,
    href: '/bonds-landing',
    icon: '/images/navbar/bonds',
    items: [
      {
        itemLabel: 'Buy a Bond',
        itemDesc: 'Purchase select tokens at a discount.',
        href: '/bonds',
        icon: '/images/navbar/bonds',
      },
      {
        itemLabel: 'Bond Markets',
        itemDesc: 'View all bonds, past & present.',
        href: '/bond-markets',
        icon: '/images/navbar/markets',
      },
      {
        itemLabel: 'Bonds for Partners',
        itemDesc: 'Learn about bonding use cases.',
        href: 'https://welcome.apeswap.finance/bonds',
        icon: '/images/navbar/bond-intro',
      },
    ],
  },
  {
    label: 'Liquidity Health',
    order: 3,
    href: '/liquidity-health',
    icon: '/images/navbar/lhd',
  },
  {
    label: 'More',
    order: 100,
    icon: '/images/navbar/more',
    items: [
      {
        itemLabel: 'ApeStats',
        itemDesc: 'View your ApeSwap stats.',
        href: 'https://legacy.apeswap.finance/apestats',
        icon: '/images/navbar/stats',
      },
      {
        itemLabel: 'Protocol Data',
        itemDesc: 'Uncover protocol insights.',
        href: '/protocol-dashboard',
        icon: '/images/navbar/protocol',
      },
      {
        itemLabel: 'Charts',
        itemDesc: 'View DEX information.',
        href: 'https://legacy.apeswap.finance/info',
        icon: '/images/navbar/charts',
      },
      {
        itemLabel: 'Lending',
        itemDesc: 'Borrow and supply assets.',
        href: 'https://lending.apeswap.finance',
        icon: '/images/navbar/lending',
      },
      {
        itemLabel: 'ApeSwap NFTs',
        itemDesc: 'Discover ApeSwap`s NFT Offerings.',
        href: '/nft',
        icon: '/images/navbar/nfts',
      },
      {
        itemLabel: 'Governance',
        itemDesc: 'Participate in DAO decisions.',
        href: 'https://Discuss.apeswap.finance',
        icon: '/images/navbar/governance',
      },
    ],
  },*/
]

const DEX_ONLY_EXCHANGE_ITEMS = {
  label: 'Exchange',
  order: 1,
  icon: '/images/navbar/trading',
  items: [
    {
      itemLabel: 'Swap',
      itemDesc: 'Trade any tokens across several chains.',
      href: '/swap',
      icon: '/images/navbar/swap',
    },
    {
      itemLabel: 'Pro Trading',
      itemDesc: 'Utilize Enhanced trading options & charting.',
      href: 'https://pro.apeswap.finance',
      icon: '/images/navbar/pro',
    },
  ],
}

// Start of custom navs for each chain

export const BNB_NAV: NavItem[] = [
  ...DEFAULT_NAV,
  /*{
    label: 'Staking',
    order: 4,
    icon: '/images/navbar/pools',
    items: [
      {
        itemLabel: 'Pools',
        itemDesc: 'Stake GNANA or BANANA to earn tokens.',
        href: '/pools',
        icon: '/images/navbar/pools',
      },
      {
        itemLabel: 'Farms',
        itemDesc: 'Stake LP Tokens to earn other tokens.',
        href: '/farms',
        icon: '/images/navbar/farms',
      },
      {
        itemLabel: 'GNANA',
        itemDesc: 'Unlock exclusive ecosystem capabilities.',
        href: '/gnana',
        icon: '/images/navbar/gnana',
      },
    ],
  },*/
].sort((a, b) => a.order - b.order)

const MATIC_NAV: NavItem[] = [
  ...DEFAULT_NAV,
  {
    label: 'Farms',
    order: 4,
    icon: '/images/navbar/farms',
    href: '/farms',
  },
].sort((a, b) => a.order - b.order)

const NAV_LISTS: { [key: number]: NavItem[] } = {
  56: BNB_NAV,
  137: MATIC_NAV,
}
