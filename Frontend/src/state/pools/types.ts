import { PoolConfig } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'

export interface Token {
  symbol: string
  address?: string
  decimals?: Partial<Record<SupportedChainId, number | null>>
  dontFetch?: boolean
  lpToken?: boolean
  price?: number
  active?: boolean
}

export interface Pool extends PoolConfig {
  totalStaked?: string
  startBlock?: number
  endBlock?: string
  apr?: number
  userData?: {
    allowance: string
    stakingTokenBalance: string
    stakedBalance: string
    pendingReward: string
  }
  lpData?: any
}

export interface PoolsState {
  data: Pool[]
}

export interface Tag {
  pid: number
  text: string
  color: string
}
