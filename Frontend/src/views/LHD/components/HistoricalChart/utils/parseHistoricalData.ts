// types
import { SimpleTokenProfile } from 'state/lhd/types'

interface IParsedHistoricalData {
  mcap: number[]
  ownershipScore: number[]
  concentrationScore: number[]
  totalScore: number[]
  totalExtractableLiquidity: number[]
  healthScore: number[]
  ownedExtractableLiquidity: number[]
  liquidityDebt: number[]
}

export const parseHistoricalData = (tokenHistoricalData: SimpleTokenProfile[]): IParsedHistoricalData => {
  const initialHistoricalData: IParsedHistoricalData = {
    mcap: [],
    ownershipScore: [],
    concentrationScore: [],
    totalScore: [],
    totalExtractableLiquidity: [],
    healthScore: [],
    ownedExtractableLiquidity: [],
    liquidityDebt: [],
  }

  if (!tokenHistoricalData.length) {
    return initialHistoricalData
  }

  const historicalData = tokenHistoricalData.reduce((acc: IParsedHistoricalData, curr: SimpleTokenProfile) => {
    const {
      mcap,
      ownershipScore,
      totalScore,
      totalExtractableLiquidity,
      healthScore,
      ownedExtractableLiquidity,
      liquidityDebt,
    } = curr

    const [firstReport] = mcap

    acc.liquidityDebt.push(liquidityDebt || 0)
    acc.mcap.push(Math.trunc(firstReport.amount) || 0)
    acc.ownedExtractableLiquidity.push(Math.trunc(ownedExtractableLiquidity || 0))
    acc.totalExtractableLiquidity.push(Math.trunc(totalExtractableLiquidity))

    acc.concentrationScore.push(Number((healthScore * 100).toFixed(2)))
    acc.healthScore.push(Number((healthScore * 100).toFixed(2)))
    acc.ownershipScore.push(Number((ownershipScore * 100).toFixed(2)))
    acc.totalScore.push(Number((totalScore * 100).toFixed(2)))

    return acc
  }, initialHistoricalData)
  return historicalData
}
