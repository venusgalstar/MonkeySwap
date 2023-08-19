import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Box, Grid } from 'theme-ui'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

// Components
import { Flex, Text, CheckBox, Spinner } from 'components/uikit'

// Hooks
import useIsMobile from 'hooks/useIsMobile'
import { useTranslation } from 'contexts/Localization'

// Helpers
import { getChartOptions } from './utils/getChartOptions'
import { getDataSets } from './utils/getDataSets'

// Types
import { SimpleTokenProfile } from 'state/lhd/types'
import { DatasetNames } from './types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const HistoricalChart = ({
  tokenHistoric,
  isLoading,
  selectedHistoricalRef,
}: {
  tokenHistoric: SimpleTokenProfile[] | never[]
  isLoading: boolean
  selectedHistoricalRef: React.MutableRefObject<string[]>
}) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const data = useMemo(() => getDataSets(tokenHistoric), [tokenHistoric])

  const [chartData, setChartData] = useState(data)
  const [toggledData, setToggledData] = useState(() => {
    let initialState: Record<DatasetNames, boolean> = {
      [DatasetNames.LiquidityDebt]: false,
      [DatasetNames.MarketCap]: false,
      [DatasetNames.OwnedLiquidity]: false,
      [DatasetNames.TotalExtractableLiquidity]: false,
      [DatasetNames.ConcentrationScore]: false,
      [DatasetNames.HealthScore]: false,
      [DatasetNames.OwnershipScore]: false,
      [DatasetNames.TotalScore]: false,
    }

    selectedHistoricalRef.current.forEach((datasetName) => {
      // @ts-ignore
      if (initialState[datasetName] !== undefined) {
        // @ts-ignore
        initialState[datasetName] = true
      }
    })

    if (selectedHistoricalRef.current.length === 0) {
      initialState['Market Cap'] = true
    }

    return initialState
  })

  useEffect(() => {
    const filteredData = data.datasets.filter((set) => toggledData[set.label as DatasetNames])
    setChartData({ ...data, datasets: filteredData })
  }, [data])

  const options = getChartOptions(toggledData, isMobile)

  const handleDataToggle = ({ datasetName }: { datasetName: DatasetNames }): void => {
    setToggledData((prevState) => {
      const updatedToggledData = { ...prevState, [datasetName]: !prevState[datasetName] }

      const newChartData = data.datasets.filter((set) => {
        if (set.label === datasetName) {
          return updatedToggledData[datasetName]
        }
        return updatedToggledData[set.label as DatasetNames]
      })

      //If market cap isn't the one being selected (so unselected) and the current list = 0, add market cap to the list so
      //it sticks
      if (selectedHistoricalRef.current.length === 0 && datasetName !== 'Market Cap') {
        selectedHistoricalRef.current = [...selectedHistoricalRef.current, 'Market Cap']
      }

      setChartData({ ...chartData, datasets: newChartData })

      if (updatedToggledData[datasetName]) {
        selectedHistoricalRef.current = [...selectedHistoricalRef.current, datasetName]
      } else {
        // @ts-ignore
        // @ts-ignore
        selectedHistoricalRef.current = selectedHistoricalRef.current.filter(
          (item: string) => (item as DatasetNames) !== datasetName,
        )
      }

      return updatedToggledData
    })
  }

  if (isLoading && !tokenHistoric.length) {
    return (
      <Flex sx={{ flex: 1, alignItems: 'center' }}>
        <Spinner size={200} />
      </Flex>
    )
  }

  return (
    <Box sx={{ width: '100%', height: '100%', flexDirection: 'column', p: '20px' }}>
      <Line options={options} data={chartData} />
      <Grid
        sx={{
          gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '0.7fr 1fr 1fr 1fr'],
          mt: '10px',
        }}
      >
        {Object.values(DatasetNames).map((datasetName) => (
          <Flex
            key={datasetName}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleDataToggle({ datasetName })}
          >
            <CheckBox checked={toggledData[datasetName]} />
            <Text ml="5px" sx={{ fontSize: ['9px', '9px', '12px'], fontWeight: '500' }}>
              {t(datasetName)}
              <Flex
                sx={{
                  float: 'right',
                  width: '8px',
                  height: '8px',
                  borderRadius: '15px',
                  background: data.datasets.filter((x) => x.label === datasetName)[0].backgroundColor,
                  ml: '4px',
                  mt: '8px',
                }}
              />
            </Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  )
}

export default HistoricalChart
