import { Filters, ChainDetail, Tag } from 'state/lhd/types'

export const INITIAL_FILTER_VALUES: Required<Filters> = {
  totalScore: { min: 0, max: 100 },
  health: { min: 0, max: 100 },
  ownership: { min: 0, max: 100 },
  concentration: { min: 0, max: 100 },
  mcap: { min: 500000, max: 1000000000 },
  extractable: { min: 4500, max: 100000000 },
  tags: [],
  chains: [],
  search: '',
  offset: 0,
  sort: '',
}

export const TAGS: Tag[] = [
  {
    value: 'Marketing_Solution',
    label: 'Marketing Solution',
  },
  {
    value: 'Infrastructure',
    label: 'Infrastructure',
  },
  {
    value: 'AI',
    label: 'AI',
  },
  {
    value: 'NFTs',
    label: 'NFTs',
  },
  {
    value: 'Bridge',
    label: 'Bridge',
  },
  {
    value: 'Launchpad',
    label: 'Launchpad',
  },
  {
    value: 'DEX',
    label: 'DEX',
  },
  {
    value: 'Bond',
    label: 'Bond',
  },
  {
    value: 'Lending',
    label: 'Lending',
  },
  {
    value: 'Liquid_Staking',
    label: 'Liquid Staking',
  },
  {
    value: 'DAO',
    label: 'DAO',
  },
  {
    value: 'Yield',
    label: 'Yield',
  },
  {
    value: 'Stablecoin',
    label: 'Stablecoin',
  },
  {
    value: 'Yield_Aggregator',
    label: 'Yield Aggregator',
  },
  {
    value: 'Derivatives',
    label: 'Derivatives',
  },
  {
    value: 'Synthetics',
    label: 'Synthetics',
  },
  {
    value: 'Insurance/Security',
    label: 'Insurance/Security',
  },
  {
    value: 'Metaverse',
    label: 'Metaverse',
  },
  {
    value: 'GameFi',
    label: 'GameFi',
  },
  {
    value: 'X-2-Earn',
    label: 'X-2-Earn',
  },
  {
    value: 'Wallet',
    label: 'Wallet',
  },
  {
    value: 'Index',
    label: 'Index',
  },
  {
    value: 'NFT_Marketplace',
    label: 'NFT Marketplace',
  },
  {
    value: 'Oracle',
    label: 'Oracle',
  },
  {
    value: 'Blockchain',
    label: 'Blockchain',
  },
  {
    value: 'Gambling',
    label: 'Gambling',
  },
  {
    value: 'Memecoin',
    label: 'Memecoin',
  },
]

export const CHAIN_DETAILS: ChainDetail[] = [
  // EVM Compatible Chains
  {
    chainId: '1',
    chainName: 'Ethereum',
    dexscreenerId: 'ethereum',
    coingeckoId: 'ethereum',
    logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    blockExplorer: {
      url: 'https://etherscan.io/',
      type: 'etherscan',
      testToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
  },
  {
    chainId: '56',
    chainName: 'BNB Chain',
    dexscreenerId: 'bsc',
    coingeckoId: 'binance-smart-chain',
    logoUrl: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/BNB.svg',
    blockExplorer: {
      url: 'https://bscscan.com/',
      type: 'standard',
      testToken: '0x55d398326f99059ff775485246999027b3197955',
    },
  },
  {
    chainId: '137',
    chainName: 'Polygon',
    dexscreenerId: 'polygon',
    coingeckoId: 'polygon-pos',
    logoUrl: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/MATIC.svg',
    blockExplorer: {
      url: 'https://polygonscan.com/',
      type: 'standard',
      testToken: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    },
  },
  {
    chainId: '369',
    chainName: 'Pulsechain',
    dexscreenerId: 'pulsechain',
    coingeckoId: 'pulsechain',
    blockExplorer: {
      url: 'https://scan.pulsechain.com/',
      type: 'blockscout',
      testToken: '0xbb366a397d7d4d2bedabd9139d4c32a8826605ed',
    },
  },
  {
    chainId: '1101',
    chainName: 'zkEVM',
    dexscreenerId: 'polygonzkevm',
    coingeckoId: 'polygon-zkevm',
    blockExplorer: {
      url: 'https://zkevm.polygonscan.com/',
      type: 'standard',
      testToken: '0x2548c94a3092494db3af864cc2cf781a72f55678',
    },
  },
  {
    chainId: '43114',
    chainName: 'Avalanche',
    dexscreenerId: 'avalanche',
    coingeckoId: 'avalanche',
    logoUrl: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/AVAX.svg',
    blockExplorer: {
      url: 'https://snowtrace.io/',
      type: 'standard',
      testToken: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    },
  },
  {
    chainId: '250',
    chainName: 'Fantom',
    dexscreenerId: 'fantom',
    coingeckoId: 'fantom',
    logoUrl: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/FTM.svg',
    blockExplorer: {
      url: 'https://ftmscan.com/',
      type: 'standard',
      testToken: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    },
  },
  {
    chainId: '128',
    chainName: 'Heco',
    dexscreenerId: 'heco',
    coingeckoId: 'huobi-token',
    logoUrl: 'https://pbs.twimg.com/profile_images/1479376443197263873/3Oeayev6_400x400.jpg',
    blockExplorer: {
      url: 'https://www.hecoinfo.com/en-us/',
      type: 'heco',
      testToken: '0xa71edc38d189767582c38a3145b5873052c3e47a',
    },
  },
  {
    chainId: '42161',
    chainName: 'Arbitrum',
    dexscreenerId: 'arbitrum',
    coingeckoId: 'arbitrum-one',
    logoUrl: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/ARB.png',
    blockExplorer: {
      url: 'https://arbiscan.io/',
      type: 'standard',
      testToken: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    },
  },
  {
    chainId: '10',
    chainName: 'Optimism',
    dexscreenerId: 'optimism',
    coingeckoId: 'optimistic-ethereum',
    logoUrl: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
    blockExplorer: {
      url: 'https://optimistic.etherscan.io/',
      type: 'standard',
      testToken: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    },
  },
  {
    chainId: '25',
    chainName: 'Cronos',
    dexscreenerId: 'cronos',
    coingeckoId: 'cronos',
    logoUrl: 'https://cryptologos.cc/logos/cronos-cro-logo.svg',
    blockExplorer: {
      url: 'https://cronoscan.com/',
      type: 'standard',
      testToken: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    },
  },
  {
    chainId: '1313161554',
    chainName: 'Aurora',
    dexscreenerId: 'aurora',
    coingeckoId: 'aurora',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/aurora.png',
    blockExplorer: {
      url: 'https://explorer.aurora.dev/',
      type: 'blockscout',
      testToken: '0xb12bfca5a55806aaf64e99521918a4bf0fc40802',
    },
  },
  {
    chainId: '1285',
    chainName: 'Moonriver',
    dexscreenerId: 'moonriver',
    coingeckoId: 'moonriver',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/moonriver.png',
    blockExplorer: {
      url: 'https://moonriver.moonscan.io/',
      type: 'standard',
      testToken: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    },
  },
  {
    chainId: '1284',
    chainName: 'Moonbeam',
    dexscreenerId: 'moonbeam',
    coingeckoId: 'moonbeam',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/moonbeam.png',
    blockExplorer: {
      url: 'https://moonbeam.moonscan.io/',
      type: 'standard',
      testToken: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
    },
  },
  {
    chainId: '1088',
    chainName: 'Metis',
    dexscreenerId: 'metis',
    coingeckoId: 'metis-andromeda',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/metis.png',
    blockExplorer: {
      url: 'https://andromeda-explorer.metis.io/',
      type: 'blockscout',
      testToken: '0xea32a96608495e54156ae48931a7c20f0dcc1a21',
    },
  },
  {
    chainId: '1666600000',
    chainName: 'Harmony',
    dexscreenerId: 'harmony',
    coingeckoId: 'harmony-shard-0',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/harmony.png',
    blockExplorer: {
      url: 'https://explorer.harmony.one/',
      type: 'harmony',
      testToken: '0x985458e523db3d53125813ed68c274899e9dfab4',
    },
  },
  {
    chainId: '42220',
    chainName: 'Celo',
    dexscreenerId: 'celo',
    coingeckoId: 'celo',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/celo.png',
    blockExplorer: {
      url: 'https://celoscan.io/',
      type: 'standard',
      testToken: '0xef4229c8c3250c675f21bcefa42f58efbff6002a',
    },
  },
  {
    chainId: '40',
    chainName: 'Telos',
    dexscreenerId: 'telos',
    coingeckoId: 'telos',
    logoUrl: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/TLOS.svg',
    blockExplorer: {
      url: 'https://www.teloscan.io/',
      type: 'telos',
      testToken: '0x667fd83e24ca1d935d36717d305d54fa0cac991c',
    },
  },
  {
    chainId: '288',
    chainName: 'Boba',
    dexscreenerId: 'boba',
    coingeckoId: 'boba',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/boba.png',
    blockExplorer: {
      url: 'https://bobascan.com/',
      type: 'standard',
      testToken: '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc',
    },
  },
  {
    chainId: '100',
    chainName: 'Gnosis Chain',
    dexscreenerId: 'gnosis',
    coingeckoId: 'xdai',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/gnosischain.png',
    blockExplorer: {
      url: 'https://gnosisscan.io/',
      type: 'standard',
      testToken: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    },
  },
  {
    chainId: '1116',
    chainName: 'core',
    dexscreenerId: 'core',
    coingeckoId: 'core',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/core.png',
    blockExplorer: {
      url: 'https://scan.coredao.org/',
      type: 'core',
      testToken: '0x9Ebab27608bD64AFf36f027049aECC69102a0D1e',
    },
  },
  {
    chainId: '324',
    chainName: 'zkSync',
    dexscreenerId: 'zksync',
    coingeckoId: 'zksync',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/zksync.png',
    blockExplorer: {
      url: 'https://explorer.zksync.io/',
      type: 'zksync',
      testToken: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    },
  },
  {
    chainId: '592',
    chainName: 'Astar',
    dexscreenerId: 'astar',
    coingeckoId: 'astar',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/astar.png',
    blockExplorer: {
      url: 'https://blockscout.com/astar/',
      type: 'blockscout',
      testToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  {
    chainId: '106',
    chainName: 'Velas',
    dexscreenerId: 'velas',
    coingeckoId: 'velas',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/velas.png',
    blockExplorer: {
      url: 'https://evmexplorer.velas.com/',
      type: 'blockscout',
      testToken: '0xc111c29A988AE0C0087D97b33C6E6766808A3BD3',
    },
  },
  {
    chainId: '321',
    chainName: 'Kucoin',
    dexscreenerId: 'kcc',
    coingeckoId: 'kucoin-community-chain',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/kcc.png',
    blockExplorer: {
      url: 'https://explorer.kcc.io/',
      type: 'kcc',
      testToken: '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430',
    },
  },
  {
    chainId: '10000',
    chainName: 'Smart BCH',
    dexscreenerId: 'smartbch',
    coingeckoId: 'smartbch',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/smartbch.png',
    blockExplorer: {
      url: 'https://sonar.cash/',
      type: 'blockscout',
      testToken: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
    },
  },
  {
    chainId: '42170',
    chainName: 'Arbitrum Nova',
    dexscreenerId: 'arbitrumnova',
    coingeckoId: 'arbitrum-nova',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/arbitrumnova.png',
    blockExplorer: {
      url: 'https://nova.arbiscan.io/',
      type: 'standard',
      testToken: '0x750ba8b76187092B0D1E87E28daaf484d1b5273b',
    },
  },
  {
    chainId: '4689',
    chainName: 'IoTeX',
    dexscreenerId: 'iotex',
    coingeckoId: 'iotex',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/iotex.png',
    blockExplorer: {
      url: 'https://iotexscout.io/',
      type: 'iotex',
      testToken: '0xacEE9B11CD4B3f57e58880277aC72c8c41ABe4e4',
    },
  },
  {
    chainId: '2222',
    chainName: 'Kava',
    dexscreenerId: 'kava',
    coingeckoId: 'kava',
    logoUrl: 'https://dd.dexscreener.com/ds-data/chains/kava.png',
    blockExplorer: {
      url: 'https://explorer.kava.io/',
      type: 'blockscout',
      testToken: '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
    },
  },
]
