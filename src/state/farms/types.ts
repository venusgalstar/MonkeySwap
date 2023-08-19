import { FarmConfig, Token } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'

export const enum FarmTypes {
  MASTER_CHEF_V1 = 'masterChefV1',
  MASTER_CHEF_V2 = 'masterChefV2',
  DUAL_FARM = 'dualFarm',
  JUNLGE_FARM = 'jungleFarm',
}

// export interface Farm extends FarmConfig {
//   tokenAmount?: string
//   totalInQuoteToken?: string
//   quoteTokenAmount?: string
//   lpTotalInQuoteToken?: string
//   tokenPriceVsQuote?: string
//   poolWeight?: string
//   totalLpStakedUsd?: string
//   apr?: string
//   apy?: string
//   lpApr?: string
//   bananaPrice?: number
//   lpValueUsd?: number
//   userData?: {
//     allowance: string
//     tokenBalance: string
//     stakedBalance: string
//     earnings: string
//   }
// }

// export interface FarmConfig {
//     pid: number;
//     lpSymbol: string;
//     lpAddresses: Partial<Record<ChainId, string>>;
//     tokenSymbol: string;
//     style?: keyof FarmStyles;
//     image?: string;
//     disableApr?: boolean;
//     tokenAddresses: Partial<Record<ChainId, string>>;
//     quoteTokenSymbol: QuoteToken;
//     quoteTokenAdresses: Partial<Record<ChainId, string>>;
//     multiplier?: string;
//     isCommunity?: boolean;
//     dual?: {
//         rewardPerBlock: number;
//         earnLabel: string;
//         endBlock: number;
//     };
//     projectLink?: string;
// }

// export interface DualFarmConfig {
//     pid: number;
//     network: number;
//     stakeTokenAddress: string;
//     rewarderAddress: string;
//     dualImage?: boolean;
//     stakeTokens: {
//         token0: Token;
//         token1: Token;
//     };
//     rewardTokens: {
//         token0: Token;
//         token1?: Token;
//     };
// }
// export interface JungleFarmConfig {
//     jungleId: number;
//     image?: string;
//     tokenName: string;
//     stakingToken: Token;
//     stakingLimit?: number;
//     bonusEndBlock?: number;
//     rewardToken: Token;
//     contractAddress: Partial<Record<ChainId, string>>;
//     projectLink: string;
//     twitter?: string;
//     tokenPerBlock?: string;
//     sortOrder?: number;
//     harvest?: boolean;
//     reflect?: boolean;
//     isFinished?: boolean;
//     tokenDecimals: number;
//     displayDecimals?: number;
//     lpStaking?: boolean;
//     lpTokens?: {
//         token: Token;
//         quoteToken: Token;
//     };
//     forAdmins?: boolean;
//     emergencyWithdraw?: boolean;
//     isEarnTokenLp?: boolean;
//     network: number;
//     unZapable?: boolean;
//     rewardsPerSecond?: string;
//     audit?: string;
// }

export interface MixedFarmConfig {
  id: string
  pid: number
  farmType: FarmTypes
  lpStakeTokenAddress: string
  lpStakeTokenSymbol: string
  tokenAddress: string
  tokenSymbol: string
  quoteTokenAddress: string
  quoteTokenSymbol: string
  rewardToken: Token
  secondRewardToken: Token
  dualImage?: boolean | undefined
  bonusEndBlock?: number | undefined
  startBlock?: number | undefined
  contractAddress?: string | undefined
  tokensPerBlock?: string | undefined
  rewardsPerSecond?: string | undefined
  projectLink?: string | undefined
  twitter?: string | undefined
}

export interface Farm extends MixedFarmConfig {
  // Balance of token in the LP contract
  tokenBalance: string
  // Balance of quote token on LP contract
  quoteTokenBalance: string
  // Balance of LP tokens in the master chef contract
  lpTokenBalance: string
  // Total supply of LP tokens
  lpTokenTotalSupply: string
  // Token Decimals
  tokenDecimals: number
  // Quote Token Decimals
  quoteTokenDecimals: number
  // earn token price
  earnTokenPrice: number
  // dual earn token price
  secondEarnTokenPrice?: number
  // LP price
  lpValueUsd?: number
  // total LP value staked
  totalLpStakedUsd?: string
  // apr for the farm
  apr?: string
  // apy for the farm
  apy?: string
  // if the farm has a multiplier
  multiplier?: string
  // The lp apr
  lpApr?: string
  // endblock for jungle farms
  endBlock?: number
  // startblock for jungle farms
  startBlock?: number
  // Userdata
  userData?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    rewards: string
    secondRewards?: string
  }
}

export interface FarmState {
  data: Partial<Record<SupportedChainId, Farm[]>>
}

// const calls = [
//     // Balance of token in the LP contract
//     {
//       address: farm.tokenAddresses[chainId],
//       name: 'balanceOf',
//       params: [lpAdress],
//     },
//     // Balance of quote token on LP contract
//     {
//       address: farm.quoteTokenAdresses[chainId],
//       name: 'balanceOf',
//       params: [lpAdress],
//     },
//     // Balance of LP tokens in the master chef contract
//     {
//       address: lpAdress,
//       name: 'balanceOf',
//       params: [masterChefAddress],
//     },
//     // Total supply of LP tokens
//     {
//       address: lpAdress,
//       name: 'totalSupply',
//     },
//     // Token decimals
//     {
//       address: farm.tokenAddresses[chainId],
//       name: 'decimals',
//     },
//     // Quote token decimals
//     {
//       address: farm.quoteTokenAdresses[chainId],
//       name: 'decimals',
//     },
//     // poolInfo
//     {
//       address: masterChefAddress,
//       name: 'poolInfo',
//       params: [farm.pid],
//     },
//     // totalAllocPoint
//     {
//       address: masterChefAddress,
//       name: 'totalAllocPoint',
//     },
//   ]

//   const calls = [
//     // Balance of token in the LP contract
//     {
//       address: tokenAddress,
//       name: 'balanceOf',
//       params: [lpAddress],
//     },
//     // Balance of quote token on LP contract
//     {
//       address: quoteTokenAddress,
//       name: 'balanceOf',
//       params: [lpAddress],
//     },
//     // Balance of LP tokens in the master chef contract
//     {
//       address: lpAddress,
//       name: 'balanceOf',
//       params: [miniChefAddress],
//     },
//     // Total supply of LP tokens
//     {
//       address: lpAddress,
//       name: 'totalSupply',
//     },
//     {
//       address: miniChefAddress,
//       name: 'poolInfo',
//       params: [farm.pid],
//     },
//     {
//       address: miniChefAddress,
//       name: 'totalAllocPoint',
//     },
//     {
//       address: miniChefAddress,
//       name: 'bananaPerSecond',
//     },
//     {
//       address: rewarderAddress,
//       name: 'poolInfo',
//       params: [farm.pid],
//     },
//     {
//       address: rewarderAddress,
//       name: 'rewardPerSecond',
//     },
//     {
//       // This isn't ideal, but reward address will cause calls to fail with this address, minChef will go through and then can be ignored on cleanup.
//       address: rewarderAddress !== '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf' ? rewarderAddress : miniChefAddress,
//       name: 'totalAllocPoint',
//     },
//   ]

//   const perSecondCalls = [
//     {
//       address: farm.contractAddress[chainId],
//       name: 'startTime',
//     },
//     // Get end block
//     {
//       address: farm.contractAddress[chainId],
//       name: 'bonusEndTime',
//     },
//     {
//       address: farm.contractAddress[chainId],
//       name: 'totalStaked',
//     },
//   ]

//   // Calls if the jungle farm is a per block
//   const perBlockCalls = [
//     {
//       address: farm.contractAddress[chainId],
//       name: 'startBlock',
//     },
//     // Get end block
//     {
//       address: farm.contractAddress[chainId],
//       name: 'bonusEndBlock',
//     },
//     {
//       address: farm.contractAddress[chainId],
//       name: 'totalStaked',
//     },
//   ]
