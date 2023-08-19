import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import masterchefV2ABI from 'config/abi/masterChefV2.json'
import miniComplexABI from 'config/abi/miniComplexRewarder.json'
import miniApeABI from 'config/abi/miniApeV2.json'
import jungleChefABI from 'config/abi/jungleChef.json'

import { MASTER_CHEF_V1_ADDRESS, MASTER_CHEF_V2_ADDRESS, MINI_APE_ADDRESS } from 'config/constants/addresses'
import { Farm, FarmTypes } from './types'
import multicall from 'utils/multicall'

export const fetchFarmUserAllowances = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const returnObj: Record<string, string> = {}
  const calls = farmsConfig.map((farm) => {
    const contractAddress =
      farm.farmType === FarmTypes.MASTER_CHEF_V1
        ? MASTER_CHEF_V1_ADDRESS[chainId]
        : farm.farmType === FarmTypes.MASTER_CHEF_V2
        ? MASTER_CHEF_V2_ADDRESS[chainId]
        : farm.farmType === FarmTypes.DUAL_FARM
        ? MINI_APE_ADDRESS[chainId]
        : farm.contractAddress
    const lpContractAddress = farm.lpStakeTokenAddress
    return { address: lpContractAddress, name: 'allowance', params: [account, contractAddress] }
  })

  const rawLpAllowances = await multicall(chainId, erc20ABI, calls)
  rawLpAllowances.forEach((lpBalance: any, i: number) => {
    returnObj[farmsConfig[i].id] = new BigNumber(lpBalance).toJSON()
  })
  return returnObj
}

export const fetchFarmUserTokenBalances = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const returnObj: Record<string, string> = {}
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.lpStakeTokenAddress
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(chainId, erc20ABI, calls)
  rawTokenBalances.forEach((tokenBalance: any, i: number) => {
    returnObj[farmsConfig[i].id] = new BigNumber(tokenBalance).toJSON()
  })
  return returnObj
}

export const fetchFarmUserStakedBalances = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const returnObj: Record<string, string> = {}
  const jungleFarmCalls: any = []
  const jungleFarmsOrder: Farm[] = []
  const farmCalls: any = []
  const farmsOrder: Farm[] = []
  farmsConfig.forEach((farm) => {
    const contractAddress =
      farm.farmType === FarmTypes.MASTER_CHEF_V1
        ? MASTER_CHEF_V1_ADDRESS[chainId]
        : farm.farmType === FarmTypes.MASTER_CHEF_V2
        ? MASTER_CHEF_V2_ADDRESS[chainId]
        : farm.farmType === FarmTypes.DUAL_FARM
        ? MINI_APE_ADDRESS[chainId]
        : farm.contractAddress

    farm.farmType === FarmTypes.JUNLGE_FARM
      ? (jungleFarmCalls.push({
          address: contractAddress,
          name: 'userInfo',
          params: [account],
        }),
        jungleFarmsOrder.push(farm))
      : (farmCalls.push({
          address: contractAddress,
          name: 'userInfo',
          params: [farm.pid, account],
        }),
        farmsOrder.push(farm))
  })

  const jfRawStakedBalances = await multicall(chainId, jungleChefABI, jungleFarmCalls)
  const farmRawStakedBalances: any = await multicall(chainId, masterchefABI, farmCalls)

  jfRawStakedBalances.forEach((amount: any, i: number) => {
    returnObj[jungleFarmsOrder[i].id] = new BigNumber(amount[0]._hex).toString()
  })

  farmRawStakedBalances.forEach((stakedBalance: any, i: number) => {
    returnObj[farmsOrder[i].id] = new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return returnObj
}

export const fetchFarmUserEarnings = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const returnObj: Record<string, string> = {}
  const secondReturnObj: Record<string, string> = {}

  // Multitple list to keep things organized
  const farmCalls: any = []
  const farmsOrder: Farm[] = []
  const farmV2Calls: any = []
  const farmsV2Order: Farm[] = []
  const jungleFarmCalls: any = []
  const jungleFarmsOrder: Farm[] = []
  const dualFarm1Calls: any = []
  const dualFarm2Calls: any = []
  const dualFarmsOrder: Farm[] = []

  farmsConfig.forEach((farm) => {
    farm.farmType === FarmTypes.MASTER_CHEF_V1
      ? (farmCalls.push({
          address: MASTER_CHEF_V1_ADDRESS[chainId],
          name: 'pendingCake',
          params: [farm.pid, account],
        }),
        farmsOrder.push(farm))
      : farm.farmType === FarmTypes.MASTER_CHEF_V2
      ? (farmV2Calls.push({
          address: MASTER_CHEF_V2_ADDRESS[chainId],
          name: 'pendingBanana',
          params: [farm.pid, account],
        }),
        farmsV2Order.push(farm))
      : farm.farmType === FarmTypes.DUAL_FARM
      ? (dualFarm1Calls.push({
          address: MINI_APE_ADDRESS[chainId],
          name: 'pendingBanana',
          params: [farm.pid, account],
        }),
        dualFarm2Calls.push({
          address: farm.contractAddress,
          name: 'pendingToken',
          params: [farm.pid, account],
        }),
        dualFarmsOrder.push(farm))
      : (jungleFarmCalls.push({
          address: farm.contractAddress,
          name: 'pendingReward',
          params: [account],
        }),
        jungleFarmsOrder.push(farm))
  })

  const jfRawRewards = await multicall(chainId, jungleChefABI, jungleFarmCalls)
  const farmV1RawRewards = await multicall(chainId, masterchefABI, farmCalls)
  const farmV2RawRewards = await multicall(chainId, masterchefV2ABI, farmV2Calls)
  const dualFarm1RawRewards = await multicall(chainId, miniApeABI, dualFarm1Calls)
  const dualFarm2RawRewards = await multicall(chainId, miniComplexABI, dualFarm2Calls)

  jfRawRewards.forEach((earnings: any, i: number) => {
    returnObj[jungleFarmsOrder[i].id] = new BigNumber(earnings).toJSON()
  })
  farmV1RawRewards.forEach((earnings: any, i: number) => {
    returnObj[farmsOrder[i].id] = new BigNumber(earnings).toJSON()
  })
  farmV2RawRewards.forEach((earnings: any, i: number) => {
    returnObj[farmsV2Order[i].id] = new BigNumber(earnings).toJSON()
  })
  dualFarm1RawRewards.forEach((earnings: any, i: number) => {
    returnObj[dualFarmsOrder[i].id] = new BigNumber(earnings).toJSON()
  })
  dualFarm2RawRewards.forEach((earnings: any, i: number) => {
    secondReturnObj[dualFarmsOrder[i].id] = new BigNumber(earnings).toJSON()
  })
  return [returnObj, secondReturnObj]
}
