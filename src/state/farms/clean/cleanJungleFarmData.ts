import BigNumber from 'bignumber.js'
import { Farm } from '../types'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { getPoolApr, getPoolAprPerSecond } from 'utils/apr'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { FarmLpAprsType } from 'state/stats/types'
import { LpTokenPrices } from 'hooks/useAllLPPrices'

const cleanJungleFarmData = (
  farmIds: string[],
  chunkedFarms: any[],
  tokenPrices: TokenPrices[],
  chainId: number,
  jungleFarmsConfig: Farm[],
  farmLpAprs: FarmLpAprsType | undefined,
  lpPrices: LpTokenPrices[],
) => {
  const data = chunkedFarms.map((chunk, index) => {
    const farmConfig = jungleFarmsConfig.find((farm) => farm.id === farmIds[index])
    const [startBlock, endBlock, totalStaked] = chunk
    const lpApr = (farmLpAprs?.lpAprs?.find((lp) => lp.pid === farmConfig?.pid)?.lpApr ?? 0) * 100
    const filteredLpPrice = lpPrices?.find(
      (lp) => lp.address?.toLowerCase() === farmConfig?.lpStakeTokenAddress?.toLowerCase(),
    )
    const totalStakedFormatted = new BigNumber(totalStaked)
    const [stakingToken, rewardToken, apr]: any = fetchJungleFarmTokenStatsAndApr(
      farmConfig,
      tokenPrices,
      totalStakedFormatted,
      chainId,
    )

    return {
      ...farmConfig,
      startBlock: new BigNumber(startBlock).toNumber(),
      endBlock: farmConfig?.bonusEndBlock ?? new BigNumber(endBlock).toNumber(),
      totalStaked: getBalanceNumber(totalStakedFormatted)?.toString(),
      lpValueUsd: filteredLpPrice?.price,
      totalLpStakedUsd: (getBalanceNumber(totalStakedFormatted) * (filteredLpPrice?.price ?? 0))?.toFixed(2),
      earnTokenPrice: rewardToken?.price,
      stakingToken,
      rewardToken,
      apr: parseFloat(apr?.toString() ?? '0')?.toFixed(2),
      apy: parseFloat(apr?.toString() ?? '0')?.toFixed(2),
      lpApr: lpApr?.toFixed(2),
    }
  })
  return data
}

const fetchJungleFarmTokenStatsAndApr = (
  farm: Farm | undefined,
  tokenPrices: TokenPrices[],
  totalStaked: any,
  chainId: SupportedChainId,
) => {
  // Get values needed to calculate apr
  const curFarm = farm
  const rewardToken = tokenPrices
    ? tokenPrices.find(
        (token) => farm?.rewardToken && token?.address?.[chainId] === farm?.rewardToken?.address?.[chainId],
      )
    : farm?.rewardToken
  const stakingToken = tokenPrices
    ? tokenPrices.find((token) => token?.address?.[chainId] === farm?.lpStakeTokenAddress)
    : undefined
  // Calculate apr
  const apr = farm?.rewardsPerSecond
    ? getPoolAprPerSecond(
        stakingToken?.price ?? 0,
        rewardToken?.price ?? 0,
        getBalanceNumber(totalStaked),
        curFarm?.rewardsPerSecond ?? '0',
      )
    : getPoolApr(
        chainId,
        stakingToken?.price ?? 0,
        rewardToken?.price ?? 0,
        getBalanceNumber(totalStaked),
        curFarm?.tokensPerBlock ?? '0',
      )

  return [stakingToken, rewardToken, apr]
}

export default cleanJungleFarmData
