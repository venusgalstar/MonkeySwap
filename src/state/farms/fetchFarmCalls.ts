import { Call } from 'utils/multicall'
import { Farm, FarmTypes } from './types'
import { MASTER_CHEF_V1_ADDRESS, MASTER_CHEF_V2_ADDRESS, MINI_APE_ADDRESS } from 'config/constants/addresses'

export const fetchFarmCalls = (farm: Farm, farmType: FarmTypes, chainId: number): Call[] => {
  const masterChefAddress =
    farmType === FarmTypes.MASTER_CHEF_V1 ? MASTER_CHEF_V1_ADDRESS[chainId] : MASTER_CHEF_V2_ADDRESS[chainId]
  const lpAddress = farm.lpStakeTokenAddress
  const tokenAddress = farm.tokenAddress
  const quoteTokenAddress = farm.quoteTokenAddress

  const calls = [
    {
      address: tokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteTokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [masterChefAddress],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: tokenAddress,
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: quoteTokenAddress,
      name: 'decimals',
    },
    // poolInfo
    {
      address: masterChefAddress,
      name: 'poolInfo',
      params: [farm.pid],
    },
    // totalAllocPoint
    {
      address: masterChefAddress,
      name: 'totalAllocPoint',
    },
  ]
  return calls
}

export const fetchDualFarmCalls = (farm: Farm, chainId: number): Call[] => {
  const miniChefAddress = MINI_APE_ADDRESS[chainId]
  const lpAddress = farm.lpStakeTokenAddress
  const tokenAddress = farm.tokenAddress
  const quoteTokenAddress = farm.quoteTokenAddress
  const { contractAddress } = farm
  const calls = [
    // Balance of token in the LP contract
    {
      address: tokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteTokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [miniChefAddress],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    {
      address: miniChefAddress,
      name: 'poolInfo',
      params: [farm.pid],
    },
    {
      address: miniChefAddress,
      name: 'totalAllocPoint',
    },
    {
      address: miniChefAddress,
      name: 'bananaPerSecond',
    },
    {
      address: contractAddress ?? '',
      name: 'poolInfo',
      params: [farm.pid],
    },
    {
      address: contractAddress ?? '',
      name: 'rewardPerSecond',
    },
    {
      // This isn't ideal, but reward address will cause calls to fail with this address, minChef will go through and then can be ignored on cleanup.
      address:
        contractAddress !== '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf' ? contractAddress ?? '' : miniChefAddress,
      name: 'totalAllocPoint',
    },
  ]
  return calls
}

export const fetchJungleFarmCalls = (farm: Farm, chainId: number): Call[] => {
  const contractAddress = farm.contractAddress
  const perSecondCalls = [
    {
      address: contractAddress ?? '',
      name: 'startTime',
    },
    // Get end block
    {
      address: contractAddress ?? '',
      name: 'bonusEndTime',
    },
    {
      address: contractAddress ?? '',
      name: 'totalStaked',
    },
  ]

  // Calls if the jungle farm is a per block
  const perBlockCalls = [
    {
      address: contractAddress ?? '',
      name: 'startBlock',
    },
    // Get end block
    {
      address: contractAddress ?? '',
      name: 'bonusEndBlock',
    },
    {
      address: contractAddress ?? '',
      name: 'totalStaked',
    },
  ]

  return farm?.rewardsPerSecond ? perSecondCalls : perBlockCalls
}
