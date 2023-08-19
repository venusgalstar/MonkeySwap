export const APESWAP =
  process.env.NEXT_PUBLIC_APESWAP_LIST ||
  'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/lists/apeswap.json'
export const LIFI = 'https://li.quest/v1/tokens'
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [APESWAP, LIFI]

// need to load unsupported tokens as well
export const DEFAULT_INACTIVE_LIST_URLS: string[] = UNSUPPORTED_LIST_URLS

export const DEFAULT_LIST_OF_LISTS: string[] = [...DEFAULT_ACTIVE_LIST_URLS, ...DEFAULT_INACTIVE_LIST_URLS]
