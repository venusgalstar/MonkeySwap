import sousChefABI from 'config/abi/sousChef.json'
import masterChefABI from 'config/abi/masterchef.json'
import masterChefV2ABI from 'config/abi/masterChefV2.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import { MASTER_CHEF, MASTER_CHEF_V2 } from 'config/constants/addresses'
import { getContract } from 'utils'
import { ethers } from 'ethers'
import { PUBLIC_RPC_URLS } from 'config/constants/networks'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { Pool } from './types'

export const fetchPoolsAllowance = async (chainId: number, account: string, poolsConfig: Pool[]) => {
  const calls = poolsConfig.map((p) => ({
    address: p.stakingToken.address?.[chainId as SupportedChainId] ?? '',
    name: 'allowance',
    params: [account, p.contractAddress[chainId as SupportedChainId]],
  }))

  const allowances = await multicall(chainId, erc20ABI, calls)
  return poolsConfig.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (chainId: number, account: string, poolsConfig: Pool[]) => {
  // Non BNB pools
  const calls = poolsConfig.map((p) => ({
    address: p.stakingToken.address?.[chainId as SupportedChainId] ?? '',
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(chainId, erc20ABI, calls)
  const tokenBalances = poolsConfig.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (chainId: number, account: string, poolsConfig: Pool[]) => {
  const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0 && p.sousId !== 999)
  const provider = new ethers.providers.JsonRpcProvider(PUBLIC_RPC_URLS[chainId as SupportedChainId][0], chainId)
  const masterChefAddress = MASTER_CHEF[chainId]
  const masterChefContract = getContract(masterChefAddress, masterChefABI, provider)
  const masterChefV2Address = MASTER_CHEF_V2[chainId]
  const masterChefV2Contract = getContract(masterChefV2Address, masterChefV2ABI, provider)
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[chainId as SupportedChainId] ?? '',
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(chainId, sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)
  const { amount: masterV2PoolAmount } = await masterChefV2Contract.userInfo('0', account)

  return {
    ...stakedBalances,
    0: new BigNumber(masterV2PoolAmount.toString()).toJSON(),
    999: new BigNumber(masterPoolAmount.toString()).toJSON(),
  }
}

export const fetchUserPendingRewards = async (chainId: number, account: string, poolsConfig: Pool[]) => {
  const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0 && p.sousId !== 999)
  const provider = new ethers.providers.JsonRpcProvider(PUBLIC_RPC_URLS[chainId as SupportedChainId][0], chainId)
  const masterChefAddress = MASTER_CHEF[chainId]
  const masterChefContract = getContract(masterChefAddress, masterChefABI, provider)
  const masterChefV2Address = MASTER_CHEF_V2[chainId]
  const masterChefV2Contract = getContract(masterChefV2Address, masterChefV2ABI, provider)
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[chainId as SupportedChainId] ?? '',
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(chainId, sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  const pendingReward = await masterChefContract.pendingCake('0', account)
  const pendingV2Reward = await masterChefV2Contract.pendingBanana('0', account)

  return {
    ...pendingRewards,
    0: new BigNumber(pendingV2Reward.toString()).toJSON(),
    999: new BigNumber(pendingReward.toString()).toJSON(),
  }
}
