import { SupportedChainId } from '@ape.swap/sdk-core'
import { FeeAmount } from '@ape.swap/v3-sdk'

const supportedChains = [SupportedChainId.BSC, SupportedChainId.POLYGON]

export const FEE_AMOUNT_DETAIL: Record<
  FeeAmount,
  { label: string; description: string; supportedChains: SupportedChainId[] }
> = {
  [FeeAmount.LOWEST]: {
    label: '0.01',
    description: 'Best for very stable pairs',
    supportedChains: supportedChains,
  },
  [FeeAmount.LOW]: {
    label: '0.05',
    description: 'Best for stable pairs',
    supportedChains: supportedChains,
  },
  [FeeAmount.MEDIUM]: {
    label: '0.3',
    description: 'Best for most pairs',
    supportedChains: supportedChains,
  },
  [FeeAmount.HIGH]: {
    label: '1',
    description: 'Best for exotic pairs',
    supportedChains: supportedChains,
  },
}
