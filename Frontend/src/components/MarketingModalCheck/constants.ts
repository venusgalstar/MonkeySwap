// DEFAULT MODAL CONSTANTS
export const SHOW_DEFAULT_MODAL_KEY = 'SHOW_DEFAULT_MODAL'
export const SET_DEFAULT_MODAL_KEY = 'SET_DEFAULT_MODAL'
export const SET_DEF_MOD_KEY = 'SET_DEF_MOD_KEY'
export const SHOW_DEF_MOD_KEY = 'SHOW_DEF_MOD_KEY'

// MODALS CONSTANTS
export const MODAL_INFO = {
  'circular-sell': {
    title: 'Selling BANANA?',
    supporting: 'Before You Sell...',
    description: 'Have you tried these products?',
  },
  'circular-buy': {
    title: "You've Got BANANA!",
    supporting: "Now You're Ready...",
    description: 'Put your new BANANA to work!',
  },
  'circular-gh': {
    title: "You've Earned BANANA!",
    supporting: 'Did You Know?',
    description: 'You can use your BANANA to earn more rewards:',
  },
  'circular-ph': {
    title: "You've Earned BANANA!",
    supporting: 'Did You Know?',
    description: 'You can use your BANANA to earn more rewards:',
  },
}

// CTA CARDS INFO
export const CTA_CARD_INFO = {
  maximizers: {
    title: 'Maximizers',
    description: 'Maximize your yields automatically',
    destination: 'https://legacy.apeswap.finance/maximizers',
  },
  pools: {
    title: 'Pools',
    description: 'Discover the next gem',
    destination: 'https://apeswap.finance/pools',
  },
  lending: {
    title: 'Lending',
    description: 'Supply, borrow, and earn',
    destination: 'https://lending.apeswap.finance',
  },
  gnana: {
    title: 'Gnana',
    description: 'Unlock exclusive utility',
    destination: 'https://apeswap.finance/gnana',
  },
  compound: {
    title: 'Compound',
    description: 'Stake your rewards to earn more',
    destination: 'https://apeswap.finance/pools',
  },
}

// CTA TYPES ENUM
export enum CTA_TYPE {
  MAXIMIZERS = 'maximizers',
  LENDING = 'lending',
  POOLS = 'pools',
  GNANA = 'gnana',
  COMPOUND = 'compound',
}

// MODAL TYPES ENUM
export enum MODAL_TYPE {
  SELLING = 'sellModal',
  BUYING = 'buyModal',
  GENERAL_HARVEST = 'generalHarvestModal',
  POOL_HARVEST = 'poolHarvestModal',
}

// SHOW MODAL TYPES IN STATE
export enum SHOW_MODAL_TYPES {
  sellModal = 'showSellModal',
  buyModal = 'showBuyModal',
  poolHarvestModal = 'showPoolHarvestModal',
  generalHarvestModal = 'showGeneralHarvestModal',
}
