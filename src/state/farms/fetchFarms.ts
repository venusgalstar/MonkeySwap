import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import masterchefV2ABI from 'config/abi/masterChefV2.json'
import miniApeABI from 'config/abi/miniApeV2.json'
import jungleChefABI from 'config/abi/jungleChef.json'
import bananaABI from 'config/abi/banana.json'

import BigNumber from 'bignumber.js'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import { fetchDualFarmCalls, fetchFarmCalls, fetchJungleFarmCalls } from './fetchFarmCalls'
import { FarmLpAprsType } from 'state/stats/types'
import { LpTokenPrices } from 'hooks/useAllLPPrices'
import cleanFarmV2Data from './clean/cleanFarmV2Data'
import { MASTER_CHEF_V2_ADDRESS } from 'config/constants/addresses'
import { ethers } from 'ethers'
import { Farm, FarmTypes } from './types'
import cleanFarmData from './clean/cleanFarmData'
import cleanJungleFarmData from './clean/cleanJungleFarmData'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import cleanDualFarmData from './clean/cleanDualFarmData'
import { SupportedChainId } from '@ape.swap/sdk-core'

export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BSC_BLOCK_TIME = 3

const fetchFarms = async (
  chainId: number,
  tokenPrices: TokenPrices[],
  lpPrices: LpTokenPrices[],
  bananaPrice: string,
  farmLpAprs: FarmLpAprsType | undefined,
  farms: Farm[],
) => {
  // Different farm ids
  const farmV1Ids: string[] = []
  const farmV2Ids: string[] = []
  const jungleFarmsIds: string[] = []
  const dualFarmsIds: string[] = []

  // sort each farm for specific calls
  const farmsV1 = farms.filter((farm) => farm.farmType === FarmTypes.MASTER_CHEF_V1)
  const farmsV2 = farms.filter((farm) => farm.farmType === FarmTypes.MASTER_CHEF_V2)
  const jungleFarms = farms.filter((farm) => farm.farmType === FarmTypes.JUNLGE_FARM)
  const dualFarms = farms.filter((farm) => farm.farmType === FarmTypes.DUAL_FARM)

  // get specific calls for each farm type
  const farmV1Calls = farmsV1.flatMap((farm) => {
    farmV1Ids.push(farm.id)
    return fetchFarmCalls(farm, farm.farmType, chainId)
  })
  const farmV2Calls = farmsV2.flatMap((farm) => {
    farmV2Ids.push(farm.id)
    return fetchFarmCalls(farm, farm.farmType, chainId)
  })
  const jungleFarmsCalls = jungleFarms.flatMap((farm) => {
    jungleFarmsIds.push(farm.id)
    return fetchJungleFarmCalls(farm, chainId)
  })
  const dualFarmsCalls = dualFarms.flatMap((farm) => {
    dualFarmsIds.push(farm.id)
    return fetchDualFarmCalls(farm, chainId)
  })
  // Get call values and chunk the farms to correct sizes
  const farmV1Vals: any = await multicall(chainId, [...masterchefABI, ...erc20], farmV1Calls, true, 500)
  const farmV1ChunkSize = farmV1Calls.length / farmsV1.length
  const farmV1ChunkedFarms = chunk(farmV1Vals, farmV1ChunkSize)

  const farmV2Vals: any = await multicall(chainId, [...masterchefV2ABI, ...erc20], farmV2Calls)
  const farmV2ChunkSize = farmV2Calls.length / farmsV2.length
  const farmV2ChunkedFarms = chunk(farmV2Vals, farmV2ChunkSize)

  const jungleFarmsVals = await multicall(chainId, [...jungleChefABI, ...bananaABI], jungleFarmsCalls)
  const jungleFarmChunkSize = jungleFarmsCalls.length / jungleFarms.length
  const jungleFarmChunkedFarms = chunk(jungleFarmsVals, jungleFarmChunkSize)

  const dualFarmsVals = await multicall(chainId, [...miniApeABI, ...erc20], dualFarmsCalls)
  const dualFarmsChunkSize = dualFarmsCalls.length / dualFarms.length
  const dualFarmsChunkedFarms = chunk(dualFarmsVals, dualFarmsChunkSize)

  // Farm V2 helper calls
  let bananaPerSecond = 0
  if (chainId === SupportedChainId.BSC) {
    const [bananaPerSecondCall] = await multicall(chainId, masterchefV2ABI, [
      {
        address: MASTER_CHEF_V2_ADDRESS[chainId],
        name: 'bananaPerSecond',
      },
    ])
    bananaPerSecond = bananaPerSecondCall
  }

  const bananaPerYear = new BigNumber(ethers.utils.formatEther(bananaPerSecond.toString()))
    .times(BSC_BLOCK_TIME)
    .times(BLOCKS_PER_YEAR)

  // Now we need to clean each farm and keep the same type between each

  const cleanedFarms = cleanFarmData(farmV1Ids, farmV1ChunkedFarms, lpPrices, bananaPrice, farmLpAprs, farmsV1)
  const cleanedFarmsV2 = cleanFarmV2Data(
    farmV2Ids,
    farmV2ChunkedFarms,
    lpPrices,
    bananaPrice,
    farmLpAprs,
    farmsV2,
    chainId,
    bananaPerYear,
  )
  const cleanedJungleFarms = cleanJungleFarmData(
    jungleFarmsIds,
    jungleFarmChunkedFarms,
    tokenPrices,
    chainId,
    jungleFarms,
    farmLpAprs,
    lpPrices,
  )

  const cleanedDualFarms = cleanDualFarmData(
    dualFarmsIds,
    dualFarmsChunkedFarms,
    tokenPrices,
    bananaPrice,
    farmLpAprs,
    chainId,
    dualFarms,
    lpPrices,
  )

  const mergedFarms = [...cleanedFarms, ...cleanedFarmsV2, ...cleanedJungleFarms, ...cleanedDualFarms]

  return mergedFarms
}

export default fetchFarms
