import { ChainId, MAINNET_CHAINS, DEX_ONLY_CHAINS, NETWORK_LABEL } from 'config/constants/chains'

export const DEX_CHAINS: { chain: ChainId; name: string }[] = [...MAINNET_CHAINS, ...DEX_ONLY_CHAINS].map((chain) => ({
  chain,
  name: NETWORK_LABEL[chain] || 'Unknown',
}))
