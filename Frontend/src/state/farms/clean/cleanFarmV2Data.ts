import BigNumber from 'bignumber.js'
import { LpTokenPrices } from 'hooks/useAllLPPrices'
import { FarmLpAprsType } from 'state/stats/types'
import { Farm } from '../types'
import { getFarmV2Apr } from 'utils/apr'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'

const cleanFarmV2Data = (
  farmIds: string[],
  chunkedFarms: any[],
  lpPrices: LpTokenPrices[],
  bananaPrice: string,
  farmLpAprs: FarmLpAprsType | undefined,
  farmsConfig: Farm[],
  chainId: number,
  bananaPerYear: BigNumber,
) => {
  const data = chunkedFarms.map((chunk, index) => {
    const farmConfig = farmsConfig?.find((farm) => farm.id === farmIds[index])
    const filteredLpPrice = lpPrices?.find(
      (lp) => lp.address?.toLowerCase() === farmConfig?.lpStakeTokenAddress?.toLowerCase(),
    )
    const [
      tokenBalanceLP,
      quoteTokenBlanceLP,
      lpTokenBalanceMC,
      lpTotalSupply,
      tokenDecimals,
      quoteTokenDecimals,
      info,
      totalAllocPoint,
    ] = chunk

    // Ratio in % a LP tokens that are in staking, vs the total number in circulation
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
    const totalLpStaked = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(18))

    // Total value in staking in quote token value
    const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
      .div(new BigNumber(10).pow(18))
      .times(new BigNumber(2))
      .times(lpTokenRatio)
    // Total value in pool in quote token value
    const totalInQuoteToken = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(18)).times(new BigNumber(2))

    // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
    const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
    const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
      .div(new BigNumber(10).pow(quoteTokenDecimals))
      .times(lpTokenRatio)

    let alloc = null
    let multiplier = 'unset'
    const allocPoint = new BigNumber(info.allocPoint._hex)
    const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
    alloc = poolWeight.toJSON()
    multiplier = `${allocPoint.div(100).toString()}X`
    const totalLpStakedUsd = totalLpStaked.times(filteredLpPrice?.price ?? 0)
    const apr = getFarmV2Apr(poolWeight, new BigNumber(bananaPrice), totalLpStakedUsd, bananaPerYear)
    const lpApr =
      (farmLpAprs?.lpAprs?.find((lp) => lp.lpAddress?.toLowerCase() === farmConfig?.lpStakeTokenAddress?.toLowerCase())
        ?.lpApr ?? 0) * 100
    const amountEarned = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: lpApr ? (apr ?? 0) + lpApr : apr,
      tokenPrice: bananaPrice,
    })

    const apy = getRoi({ amountEarned, amountInvested: 1000 / parseFloat(bananaPrice) })

    return {
      ...farmConfig,
      tokenAmount: tokenAmount.toJSON(),
      quoteTokenAmount: quoteTokenAmount.toJSON(),
      totalInQuoteToken: totalInQuoteToken.toJSON(),
      lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
      tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
      totalLpStakedUsd: totalLpStakedUsd?.toFixed(0),
      apr: apr?.toFixed(2),
      apy: apy?.toFixed(2),
      lpApr: lpApr?.toFixed(2),
      lpValueUsd: filteredLpPrice?.price,
      earnTokenPrice: bananaPrice,
      poolWeight: alloc,
      multiplier,
    }
  })
  return data
}

export default cleanFarmV2Data
