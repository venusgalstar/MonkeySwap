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
    label: 'Swap',
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
    ],
  },
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
    }
  ]
}

// Start of custom navs for each chain

export const BNB_NAV: NavItem[] = [
  ...DEFAULT_NAV,
  {
    label: 'Farm',
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
      }
    ]
  }
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
