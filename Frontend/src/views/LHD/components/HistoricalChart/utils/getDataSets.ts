// Types
import { SimpleTokenProfile } from 'state/lhd/types'
import { DatasetNames, HistoricalDataType } from '../types'
import type { ChartData } from 'chart.js'

// Helpers
import { parseHistoricalData } from './parseHistoricalData'

export const getDataSets = (tokenHistoricalData: SimpleTokenProfile[]): ChartData<'line'> => {
  const {
    mcap,
    ownershipScore,
    concentrationScore,
    totalScore,
    totalExtractableLiquidity,
    healthScore,
    ownedExtractableLiquidity,
    liquidityDebt,
  } = parseHistoricalData(tokenHistoricalData)

  const marketCapSet = {
    label: DatasetNames.MarketCap,
    data: mcap,
    borderColor: '#FF7691',
    backgroundColor: '#FF7691',
    yAxisID: DatasetNames.MarketCap,
  }

  const ownershipScoreSet = {
    label: DatasetNames.OwnershipScore,
    data: ownershipScore,
    borderColor: '#6F5E53',
    backgroundColor: '#6F5E53',
    yAxisID: HistoricalDataType.Score,
  }

  const concentrationScoreSet = {
    label: DatasetNames.ConcentrationScore,
    data: concentrationScore,
    borderColor: '#BAABBD',
    backgroundColor: '#BAABBD',
    yAxisID: HistoricalDataType.Score,
  }

  const extractableLiquiditySet = {
    label: DatasetNames.TotalExtractableLiquidity,
    data: totalExtractableLiquidity,
    borderColor: '#1179A6',
    backgroundColor: '#1179A6',
    yAxisID: HistoricalDataType.Liquidity,
  }

  const totalScoreSet = {
    label: DatasetNames.TotalScore,
    data: totalScore,
    borderColor: '#964B00',
    backgroundColor: '#964B00',
    yAxisID: HistoricalDataType.Score,
  }

  const healthScoreSet = {
    label: DatasetNames.HealthScore,
    data: healthScore,
    borderColor: 'rgb(255, 172, 28)',
    backgroundColor: 'rgba(255, 172, 28, 1)',
    yAxisID: HistoricalDataType.Score,
  }

  const ownedLiquiditySet = {
    label: DatasetNames.OwnedLiquidity,
    data: ownedExtractableLiquidity,
    borderColor: '#904DC4',
    backgroundColor: '#904DC4',
    yAxisID: HistoricalDataType.Liquidity,
  }

  const liquidityDebtSet = {
    label: DatasetNames.LiquidityDebt,
    data: liquidityDebt,
    borderColor: '#DF4141',
    backgroundColor: '#DF4141',
    yAxisID: HistoricalDataType.Liquidity,
  }

  const labels = tokenHistoricalData.map((x) => x.createdAt)

  const datasets = [
    marketCapSet,
    ownershipScoreSet,
    concentrationScoreSet,
    extractableLiquiditySet,
    totalScoreSet,
    healthScoreSet,
    ownedLiquiditySet,
    liquidityDebtSet,
  ]

  return {
    labels: labels,
    datasets: datasets,
  }
}
