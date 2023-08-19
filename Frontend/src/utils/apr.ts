import { SupportedChainId } from '@ape.swap/sdk-core'
import BigNumber from 'bignumber.js'

export const CHAIN_BLOCKS_PER_YEAR: any = {
  [SupportedChainId.BSC]: new BigNumber(10512000),
  [SupportedChainId.POLYGON]: new BigNumber(13711304),
  [SupportedChainId.MAINNET]: new BigNumber(2628000),
  [SupportedChainId.TLOS]: new BigNumber(63072000),
}
export const SECONDS_PER_YEAR = new BigNumber(31536000)
export const BANANA_PER_BLOCK = new BigNumber(10)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BANANA_PER_YEAR = BANANA_PER_BLOCK.times(BLOCKS_PER_YEAR)

export const getPoolApr = (
  chainId: number,
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: string,
) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
    .times(tokenPerBlock)
    .times(CHAIN_BLOCKS_PER_YEAR?.[chainId] ?? 0)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export const getPoolAprPerSecond = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  rewardsPerSecond: string,
) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(rewardsPerSecond).times(SECONDS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export const getDualFarmApr = (
  poolLiquidityUsd: number,
  miniChefRewardTokenPrice: number,
  miniChefTokensPerSecond: string,
  rewarerdTokenPrice: number,
  rewarderTokensPerSecond: string,
) => {
  const totalRewarderRewardPricePerYear = new BigNumber(rewarerdTokenPrice)
    .times(rewarderTokensPerSecond)
    .times(SECONDS_PER_YEAR)
  const totalMiniChefRewardPricePerYear = new BigNumber(miniChefRewardTokenPrice)
    .times(miniChefTokensPerSecond)
    .times(SECONDS_PER_YEAR)
  const totalRewardsPerYear = totalMiniChefRewardPricePerYear.plus(totalRewarderRewardPricePerYear)
  const apr = totalRewardsPerYear.div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export const getFarmApr = (poolWeight: BigNumber, bananaPriceUsd: BigNumber, poolLiquidityUsd: BigNumber) => {
  const yearlyBananaRewardAllocation = BANANA_PER_YEAR.times(poolWeight).times(bananaPriceUsd)
  const apr = yearlyBananaRewardAllocation.div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export const getFarmV2Apr = (
  poolWeight: BigNumber,
  bananaPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  bananaPerYear?: BigNumber,
) => {
  const yearlyBananaRewardAllocation = bananaPerYear?.times(poolWeight).times(bananaPriceUsd)
  const apr = yearlyBananaRewardAllocation?.div(poolLiquidityUsd).times(100)
  return apr?.isNaN() || !apr?.isFinite() ? null : apr.toNumber()
}
