import { ChainId } from './chains'

export const RPC_URLS: Record<ChainId, string[]> = {
  [ChainId.BSC]: [
    'https://bnb.apeswap.dev',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
    'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
  ],
  [ChainId.ARBITRUM_ONE]: ['https://arb1.arbitrum.io/rpc'],
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [ChainId.POLYGON]: [
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
  ],
  [ChainId.POLYGON_MUMBAI]: ['https://matic-mumbai.chainstacklabs.com'],
  [ChainId.MAINNET]: ['https://rpc.ankr.com/eth', 'https://eth-mainnet.public.blastapi.io'],
  [ChainId.TLOS]: ['https://mainnet.telos.net/evm'],
  [ChainId.AVALANCHE]: ['https://api.avax.network/ext/bc/C/rpc'],
  [ChainId.OPTIMISM]: ['https://rpc.ankr.com/optimism', 'https://optimism.publicnode.com'],
  [ChainId.FANTOM]: ['https://rpc.ftm.tools/', 'https://rpcapi.fantom.network'],
  [ChainId.CRONOS]: ['https://evm-cronos.crypto.org'],
  [ChainId.POLYGON_ZK]: ['https://zkevm-rpc.com'],
  [ChainId.CELO]: ['https://forno.celo.org'],
  [ChainId.GNOSIS]: ['https://rpc.gnosischain.com/', 'https://rpc.ankr.com/gnosis'],
  [ChainId.OKX]: ['https://exchainrpc.okex.org'],
}

export const PUBLIC_RPC_URLS: Record<ChainId, string[]> = {
  [ChainId.BSC]: [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
    'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
  ],
  [ChainId.ARBITRUM_ONE]: ['https://arb1.arbitrum.io/rpc'],
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [ChainId.POLYGON]: [
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
  ],
  [ChainId.POLYGON_MUMBAI]: ['https://matic-mumbai.chainstacklabs.com'],
  [ChainId.MAINNET]: ['https://rpc.ankr.com/eth', 'https://eth-mainnet.public.blastapi.io'],
  [ChainId.TLOS]: ['https://mainnet.telos.net/evm'],
  [ChainId.AVALANCHE]: ['https://api.avax.network/ext/bc/C/rpc'],
  [ChainId.OPTIMISM]: ['https://rpc.ankr.com/optimism', 'https://optimism.publicnode.com'],
  [ChainId.FANTOM]: ['https://rpc.ftm.tools/', 'https://rpcapi.fantom.network'],
  [ChainId.CRONOS]: ['https://evm-cronos.crypto.org'],
  [ChainId.POLYGON_ZK]: ['https://zkevm-rpc.com'],
  [ChainId.CELO]: ['https://forno.celo.org'],
  [ChainId.GNOSIS]: ['https://rpc.gnosischain.com/', 'https://rpc.ankr.com/gnosis'],
  [ChainId.OKX]: ['https://exchainrpc.okex.org'],
}
