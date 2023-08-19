import numbro from 'numbro'
import moment from 'moment'

// Types
import type { ChartOptions } from 'chart.js'
import { DatasetNames, HistoricalDataType } from '../types'

const SCORES = [
  DatasetNames.OwnershipScore,
  DatasetNames.ConcentrationScore,
  DatasetNames.TotalScore,
  DatasetNames.HealthScore,
]

const LIQUIDITY = [DatasetNames.OwnedLiquidity, DatasetNames.TotalExtractableLiquidity, DatasetNames.LiquidityDebt]

export const getChartOptions = (
  toggledData: Record<DatasetNames, boolean>,
  isMobile: boolean,
): ChartOptions<'line'> => {
  const scales = [DatasetNames.MarketCap, HistoricalDataType.Liquidity, HistoricalDataType.Score].reduce(
    (acc: any, value) => {
      const isScore = value === HistoricalDataType.Score
      const isLiquidity = value === HistoricalDataType.Liquidity
      const isAnyScoreToggled = SCORES.some((score) => toggledData[score])
      const isAnyLiquidityToggled = LIQUIDITY.some((liquidity) => toggledData[liquidity])

      let displayValue
      if (isScore) {
        displayValue = isAnyScoreToggled
      } else if (isLiquidity) {
        displayValue = isAnyLiquidityToggled
      } else {
        displayValue = toggledData[value as DatasetNames]
      }

      acc[value] = {
        type: 'linear' as const,
        display: displayValue,
        position: isScore ? 'right' : ('left' as const),
        grid: {
          display: true,
        },
        border: { dash: [4, 4] },
        title: {
          display: isMobile !== true,
          text: [value],
          color: '#A09F9C',
        },
        ticks: {
          suggestedMin: 0,
          callback: (tickValue: number | string) => {
            return isScore
              ? `${tickValue}`
              : numbro(Number(tickValue))
                  .formatCurrency({
                    average: true,
                    mantissa: Number(tickValue) < 1 ? 1 : 0,
                    abbreviations: {
                      million: 'M',
                      billion: 'B',
                    },
                  })
                  .toUpperCase()
          },
          font: {
            family: 'Poppins',
            size: 10,
            weight: '500',
          },
        },
      }

      return acc
    },
    {},
  )

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    tension: 0.3,
    elements: {
      point: {
        radius: 0,
      },
    },
    stacked: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (items: any) {
            return moment(Number(items[0].label)).format('DD-MMM-YY')
          },
          label: (context: any) => {
            const {
              dataset: { label },
              formattedValue,
              raw,
            } = context
            const isScore = SCORES.includes(label)
            if (isScore) {
              return `${label}: ${raw}%`
            }
            return `${label}: $${formattedValue}`
          },
        },
      },
    },
    scales: {
      ...scales,
      x: {
        display: true,
        grid: {
          display: true,
          drawTicks: true, // This is true by default but added for clarity
          tickLength: 10, // Length of the tick mark
        },
        border: { dash: [4, 4] },
        ticks: {
          display: true,
          maxTicksLimit: isMobile === true ? 2 : 4,
          callback: function (tickValue: string, index: number, array: []) {
            // @ts-ignore
            const unixTimestamp: number = this.getLabelForValue(tickValue)
            return moment(Number(unixTimestamp)).format('DD-MMM-YY')
          },
        },
        title: {
          display: true,
          text: 'Dates',
          color: '#A09F9C',
        },
      },
    },
  }

  return options
}
