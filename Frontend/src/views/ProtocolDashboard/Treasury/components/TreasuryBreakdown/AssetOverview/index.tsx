import { Flex, Text } from 'components/uikit'
import React, { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import CountUp from 'react-countup'
import { useFetchTreasuryAssetOverview } from 'state/protocolDashboard/hooks'
import { orderBy } from 'lodash'
import { TreasuryAssetOverviewInterface } from 'state/protocolDashboard/types'
import { useThemeUI } from 'theme-ui'

const COLORS = [
  'rgba(244, 190, 55, 1)',
  'rgba(84, 141, 225, 1)',
  'rgba(231, 79, 79, 1)',
  'rgba(144, 51, 246, 1)',
  'rgba(105, 165, 136, 1)',
  '#7FDBFF',
  'grey',
]

const setData = (assets: (TreasuryAssetOverviewInterface | { symbol: string; value: number })[]) => {
  return {
    labels: assets?.map((data) => data.symbol),
    datasets: [
      {
        data: assets?.map((data) => data.value),
        backgroundColor: assets?.map((_, i) => COLORS[i]),
        hoverOffset: 4,
      },
    ],
  }
}

const sortAndAddAssets = (assets: TreasuryAssetOverviewInterface[]) => {
  const sortedAssets = orderBy(assets, (asset) => asset.value, 'desc')
  const topSix = sortedAssets.length > 6 ? sortedAssets.slice(0, 6) : sortedAssets
  const otherAssets = sortedAssets.length > 6 ? sortedAssets.slice(6) : []
  const otherAssetsSum = otherAssets.reduce((a, b) => a + b.value, 0)
  if (sortedAssets.length === 0) return null
  return [...topSix, { symbol: 'Other', value: otherAssetsSum }]
}

const getMergedAssets = (assets: TreasuryAssetOverviewInterface[]) => {
  const assetTracker: TreasuryAssetOverviewInterface[] = []
  const mergedAssets = assets?.map((asset: TreasuryAssetOverviewInterface) => {
    const searchAsset = assetTracker.find((searchAsset) => asset.symbol === searchAsset.symbol)
    if (searchAsset) {
      const newAsset = {
        symbol: asset.symbol,
        value: asset.value + searchAsset.value,
      }
      assetTracker.push(newAsset as TreasuryAssetOverviewInterface)
      return newAsset as TreasuryAssetOverviewInterface
    } else {
      return asset as TreasuryAssetOverviewInterface
    }
  })
  return mergedAssets
}

const AssetOverview: React.FC<{ activeView: number }> = ({ activeView }) => {
  const assets = useFetchTreasuryAssetOverview()
  const treasuryAssets = assets?.filter((asset) => asset.location === 'Operational Funds')
  const polAssets = assets?.filter((asset) => asset.location === 'POL')
  const mergedAssets = getMergedAssets(assets)
  const { theme } = useThemeUI()

  const cleanedAssets = sortAndAddAssets([mergedAssets, treasuryAssets, polAssets][activeView])
  const data = useMemo(() => setData(cleanedAssets ?? []), [cleanedAssets])
  const { t } = useTranslation()
  const total = cleanedAssets?.reduce((a, b) => a + b.value, 0)
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', mb: '5px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Assets Overview')}
        </Text>
      </Flex>
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      >
        <Flex sx={{ margin: '10px 0px' }}>
          <Flex sx={{ width: '300px' }}>
            <Doughnut
              data={data}
              options={{
                layout: {
                  padding: 15,
                },
                elements: {
                  arc: {
                    borderWidth: 1.5,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                    mode: 'nearest',
                    callbacks: {
                      label: (context) => {
                        return `${context.label}: ${context.parsed.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}`
                      },
                    },
                    titleFont: { family: 'poppins', weight: '700', size: 16 },
                    bodyFont: { family: 'poppins', weight: '500', size: 14 },
                    titleColor: theme.rawColors?.text?.toString(),
                    backgroundColor: theme.rawColors?.white2?.toString(),
                    boxPadding: 5,
                    bodyColor: theme.rawColors?.text?.toString(),
                    borderColor: theme.rawColors?.white2?.toString(),
                    bodySpacing: 20,
                    borderWidth: 1,
                    caretSize: 8,
                    cornerRadius: 10,
                    padding: 15,
                  },
                },
                cutout: 85,
              }}
            />
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: 'column', maxWidth: '300px', width: '100%', margin: '10px 0px' }}>
          {cleanedAssets &&
            cleanedAssets.map((asset, i) => {
              return (
                <Flex
                  key={asset.symbol}
                  sx={{ alignItems: 'center', justifyContent: 'space-between', margin: '5px 0px' }}
                >
                  <Flex sx={{ alignItems: 'center' }}>
                    <Flex sx={{ background: COLORS[i], width: '8px', height: '8px', borderRadius: '4px' }} />
                    <Text ml="10px" weight={500}>
                      {asset.symbol}
                    </Text>
                  </Flex>
                  <Flex
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      maxWidth: '150px',
                      width: '100%',
                    }}
                  >
                    <Text weight={700} mr="10px">
                      $<CountUp end={asset.value} decimals={0} duration={1} separator="," />
                    </Text>
                    <Text weight={500} sx={{ opacity: 0.5 }}>
                      <CountUp end={(asset.value / (total ?? 0)) * 100} decimals={2} duration={1} separator="," />%
                    </Text>
                  </Flex>
                </Flex>
              )
            })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(AssetOverview)
