// Network chain ids
import { icons } from 'components/uikit/Svg/types'

export const AVERAGE_L1_BLOCK_TIME = 12000

//This is the list of supported EVM chains
export enum ChainId {
  MAINNET = 1,
  ARBITRUM_ONE = 42161,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  BSC = 56,
  BSC_TESTNET = 97,
  TLOS = 40,
  AVALANCHE = 43114,
  OPTIMISM = 10,
  FANTOM = 250,
  CRONOS = 25,
  POLYGON_ZK = 1101,
  CELO = 42220,
  GNOSIS = 100,
  OKX = 66,
}

// These are the lists we will display to the user
export const MAINNET_CHAINS = [ChainId.BSC, ChainId.POLYGON, ChainId.MAINNET, ChainId.ARBITRUM_ONE]
export const DEX_ONLY_CHAINS = [
  ChainId.AVALANCHE,
  ChainId.OPTIMISM,
  ChainId.FANTOM,
  //ChainId.CRONOS, temporarily disabled
  ChainId.POLYGON_ZK,
  ChainId.GNOSIS,
]

export const CHAIN_NAMES: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'mainnet',
  [ChainId.ARBITRUM_ONE]: 'arbitrum_one',
  [ChainId.POLYGON]: 'polygon',
  [ChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [ChainId.BSC]: 'bnb_chain',
  [ChainId.BSC_TESTNET]: 'bnb_chain_testnet',
  [ChainId.TLOS]: 'telos',
  [ChainId.AVALANCHE]: 'avalanche',
  [ChainId.OPTIMISM]: 'optimism',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.CRONOS]: 'cronos',
  [ChainId.POLYGON_ZK]: 'polygon_zk',
  [ChainId.CELO]: 'celo',
  [ChainId.GNOSIS]: 'gnosis',
  [ChainId.OKX]: 'okexchain',
}

// Network Icons
export const NETWORK_ICONS: Partial<Record<ChainId, icons>> = {
  [ChainId.BSC]: icons.BNB_TOKEN,
  [ChainId.POLYGON]: icons.POLYGON_TOKEN,
  [ChainId.MAINNET]: icons.ETH_TOKEN,
  [ChainId.TLOS]: icons.TLOS_TOKEN,
  [ChainId.ARBITRUM_ONE]: icons.ARBITRUM_TOKEN,
  [ChainId.AVALANCHE]: icons.AVAX_TOKEN,
  [ChainId.OPTIMISM]: icons.OPTIMISM_TOKEN,
  [ChainId.FANTOM]: icons.FANTOM_TOKEN,
  [ChainId.CRONOS]: icons.CRONOS_TOKEN,
  [ChainId.POLYGON_ZK]: icons.POLYGONZK_TOKEN,
  [ChainId.CELO]: icons.CELO_TOKEN,
  [ChainId.GNOSIS]: icons.GNOSIS_TOKEN,
  [ChainId.OKX]: icons.OKX_TOKEN,
}

// Network labels
export const NETWORK_LABEL: Partial<Record<ChainId, string>> = {
  [ChainId.BSC]: 'BNB',
  [ChainId.BSC_TESTNET]: 'BNB Testnet',
  [ChainId.POLYGON]: 'Polygon',
  [ChainId.POLYGON_MUMBAI]: 'Polygon Testnet',
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.TLOS]: 'Telos',
  [ChainId.ARBITRUM_ONE]: 'Arbitrum',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.OPTIMISM]: 'Optimism',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.CRONOS]: 'Cronos',
  [ChainId.POLYGON_ZK]: 'zkEVM',
  [ChainId.CELO]: 'Celo',
  [ChainId.GNOSIS]: 'Gnosis',
  [ChainId.OKX]: 'OKXChain',
}

// Network block explorers
export const BLOCK_EXPLORER: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'https://etherscan.io',
  [ChainId.ARBITRUM_ONE]: 'https://arbiscan.io',
  [ChainId.POLYGON]: 'https://polygonscan.com',
  [ChainId.POLYGON_MUMBAI]: 'https://mumbai.polygonscan.com',
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
  [ChainId.TLOS]: 'https://www.teloscan.io',
  [ChainId.AVALANCHE]: 'https://cchain.explorer.avax.network',
  [ChainId.OPTIMISM]: 'https://optimistic.etherscan.io',
  [ChainId.FANTOM]: 'https://ftmscan.com',
  [ChainId.CRONOS]: 'https://cronos.crypto.org/explorer',
  [ChainId.POLYGON_ZK]: 'https://zkevm.polygonscan.com',
  [ChainId.CELO]: 'https://explorer.celo.org',
  [ChainId.GNOSIS]: 'https://blockscout.com/xdai/mainnet',
  [ChainId.OKX]: 'https://www.oklink.com/en/okc',
}

interface ChainParamContent {
  chainId: string
  chainName: string
  nativeCurrency: { name: string; symbol: string; decimals: number; logo: string }
  blockExplorerUrls: string[]
  logoURI: string
}

export const CHAIN_PARAMS: Record<ChainId, ChainParamContent> = {
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/BNB.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.BSC]],
    logoURI: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/wbnb.png',
  },
  [ChainId.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/BNB.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.BSC_TESTNET]],
    logoURI: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/wbnb.png',
  },
  [ChainId.POLYGON]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/MATIC.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.POLYGON]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
  },
  [ChainId.POLYGON_MUMBAI]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/MATIC.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.POLYGON_MUMBAI]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
  },
  [ChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/ETH.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.MAINNET]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
  },
  [ChainId.TLOS]: {
    chainId: '0x28',
    chainName: 'Telos',
    nativeCurrency: {
      name: 'Telos',
      symbol: 'TLOS',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/TLOS.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.TLOS]],
    logoURI: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/wtlos.svg',
  },
  [ChainId.ARBITRUM_ONE]: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/ETH.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.ARBITRUM_ONE]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg',
  },
  [ChainId.AVALANCHE]: {
    chainId: '0xa86a',
    chainName: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/AVAX.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.AVALANCHE]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/avalanche.svg',
  },
  [ChainId.OPTIMISM]: {
    chainId: '0xa',
    chainName: 'Optimism',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/ETH.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.OPTIMISM]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/optimism.svg',
  },
  [ChainId.FANTOM]: {
    chainId: '0xfa',
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/FTM.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.FANTOM]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/fantom.svg',
  },
  [ChainId.CRONOS]: {
    chainId: '0x19',
    chainName: 'Cronos',
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/CRO.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.CRONOS]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/cronos.svg',
  },
  [ChainId.POLYGON_ZK]: {
    chainId: '0x44d',
    chainName: 'zkEVM',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/ETH.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.POLYGON_ZK]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
  },
  [ChainId.CELO]: {
    chainId: '0xa4ec',
    chainName: 'Celo Mainnet',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/CELO.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.CELO]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/celo.svg',
  },
  [ChainId.GNOSIS]: {
    chainId: '0x64',
    chainName: 'Gnosis',
    nativeCurrency: {
      name: 'xDai',
      symbol: 'xDai',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/XDAI.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.GNOSIS]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/gnosis.svg',
  },
  [ChainId.OKX]: {
    chainId: '0x42',
    chainName: 'OKXChain Mainnet',
    nativeCurrency: {
      name: 'OKT',
      symbol: 'OKT',
      decimals: 18,
      logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/OKT.svg',
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.GNOSIS]],
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/okx.svg',
  },
}

export const getChainInfo = (chainId: ChainId): any => {
  if (chainId) {
    return CHAIN_PARAMS[chainId] ?? undefined
  }
  return undefined
}
