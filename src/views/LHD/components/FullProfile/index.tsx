import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Flex, Spinner, Svg, Text } from 'components/uikit'
import Chart from '../Chart'
import { useTranslation } from 'contexts/Localization'
import InfoCards from './components/InfoCards'
import LiquidityConcentration from './components/LiquidityConcentration'
import { styles } from './styles'
import TopSectionCards from './components/TopSectionCards'
import AreYouContributor from '../AreYouContributor'
import ExemptAssetNotice from './components/ExemptAssetNotice'
import TooltipBubble from 'components/uikit/Tooltip'

// Components
import HistoricalChart from '../HistoricalChart'
import TabNavigation from 'components/TabNavigation'

// Hooks
import useGetLHDProfile from 'state/lhd/hooks/useGetLHDProfile'
import useGetTokenHistoric from 'state/lhd/hooks/useGetTokenHistoric'

// Types
import { chartExtras } from 'state/lhd/types'

enum TabNames {
  Liquidity = 'Strength',
  Historic = 'Historic Data',
}

const FullProfile = ({ chainID, address }: { chainID: string; address: string }) => {
  const [queryString, setQueryString] = useState('')
  const [activeTab, setActiveTab] = useState<TabNames>(TabNames.Liquidity)
  const { data: fullProfile } = useGetLHDProfile({ chainID, address })
  const { data: tokenHistoric = [], isLoading: isHistoricLoading } = useGetTokenHistoric({ chainID, address })
  const { t } = useTranslation()
  const router = useRouter()
  const DEX_MISSING_ASSETS = ['CRV']

  const [chartPassBackData, setChartPassBackData] = useState<chartExtras>({
    sustainabilityLower: 0,
    sustainabilityUpper: 0,
    liquidityDebt: 0,
  })

  const [sevenDaysScoreDifference, setSevenDaysScoreDifference] = useState(0)

  useEffect(() => {
    if (tokenHistoric.length > 0) {
      const now = Math.floor(Date.now())
      const sevenDaysAgo = now - 5 * 24 * 60 * 60 * 1000
      const eightDaysAgo = now - 8 * 24 * 60 * 60 * 1000

      const filteredAndSorted = tokenHistoric
        .filter((obj) => {
          const createdAt = parseInt(obj.createdAt, 10)
          return createdAt > eightDaysAgo && createdAt < sevenDaysAgo
        })
        .sort((a, b) => parseInt(b.createdAt, 10) - parseInt(a.createdAt, 10))

      const mostRecent = filteredAndSorted[0]

      if (mostRecent === null) return

      let currentScore = fullProfile?.totalScore || 0 // Use optional chaining and default to 0 if undefined
      let previousScore = mostRecent.totalScore
      let percentageDifference = (Math.abs(currentScore - previousScore) / ((currentScore + previousScore) / 2)) * 100

      setSevenDaysScoreDifference(percentageDifference)
    }
  }, [tokenHistoric])

  const selectedHistoricalRef = useRef<string[]>([])

  useEffect(() => {
    const qs = router.asPath.split('?')[1] !== undefined ? router.asPath.split('?')[1] : ''

    if (queryString === '') {
      setQueryString(qs)
    }

    if (qs) {
      router.replace(router.asPath.split('?')[0], router.asPath.split('?')[0])
    }
  }, [])

  let handleChartCallback = (chartData: chartExtras) => {
    setChartPassBackData(chartData)
  }

  const handleBackButton = () => {
    router.push(
      { pathname: `/liquidity-health?${queryString ? queryString : Math.random() * 10}` },
      `/liquidity-health${queryString.replace('modal=card', '') ? '?' + queryString.replace('modal=card', '') : ''}`,
    )
  }

  if (fullProfile) {
    return (
      <Flex sx={styles.mainContainer}>
        <Flex sx={styles.topContainer}>
          <Text onClick={handleBackButton} sx={styles.back}>
            <Flex sx={{ mr: '5px' }}>
              <Svg icon="caret" direction="left" width={7} />
            </Flex>
            {t('Back To List View')}
          </Text>
          <Text sx={styles.lastUpdated}>
            {t('Last updated')} {Math.round((Date.now() - parseInt(fullProfile?.createdAt)) / 36000) / 100}
            {t(' hours ago')}
          </Text>
        </Flex>
        {DEX_MISSING_ASSETS.includes(fullProfile?.addressMapping?.tokenSymbol) ? (
          <ExemptAssetNotice phraseCondition="dex" />
        ) : fullProfile?.mcap[0]?.amount > 100000000 ? (
          <ExemptAssetNotice phraseCondition="mcap" />
        ) : (
          <></>
        )}
        <TopSectionCards fullProfile={fullProfile} scoreDifference={sevenDaysScoreDifference} />
        <Flex sx={styles.lowerContainer}>
          <Flex sx={styles.layout}>
            <Flex sx={styles.chartCont}>
              <Flex sx={{ alignSelf: 'start', pl: '20px', pt: '20px' }}>
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={Object.values(TabNames)} />
              </Flex>
              <Flex sx={styles.titleContainer}>
                <Text sx={styles.titleText}>
                  {t(activeTab === TabNames.Liquidity ? 'Liquidity Strength Chart ' : 'Historical Data Chart ')}
                  <TooltipBubble
                    style={{ zIndex: 1000 }}
                    placement="bottomRight"
                    transformTip="translate(8%, -6%)"
                    width="300px"
                    body={
                      activeTab === TabNames.Liquidity
                        ? `This chart plots a project's total and owned extractable liquidity by MCAP. Additionally it shows the project's liquidity debt, where the token sits in relationship to the sustainability range, and plots other tokens' total extractable liquidity.`
                        : "This chart shows the token's historical data used to determine its health. Select which data to show by clicking the checkboxes below. \n"
                    }
                  >
                    <Svg icon="question" width="12px" />
                  </TooltipBubble>
                </Text>
              </Flex>
              {activeTab === TabNames.Liquidity ? (
                <Chart chartData={fullProfile?.healthChartData} passBackData={handleChartCallback} />
              ) : (
                <HistoricalChart
                  tokenHistoric={tokenHistoric}
                  isLoading={isHistoricLoading}
                  selectedHistoricalRef={selectedHistoricalRef}
                />
              )}
            </Flex>
            <Flex sx={styles.infoCardMobile}>
              <InfoCards fullProfile={fullProfile} chartExtras={chartPassBackData} />
            </Flex>
            <Flex sx={styles.liquidityConCont}>
              <LiquidityConcentration fullProfile={fullProfile} />
            </Flex>
          </Flex>
          <Flex sx={styles.infoCardDesktop}>
            <InfoCards fullProfile={fullProfile} chartExtras={chartPassBackData} />
          </Flex>
        </Flex>
        <AreYouContributor />
        <Text sx={styles.formula}>Formula version: {fullProfile.formulaVersion}</Text>
      </Flex>
    )
  }
  return (
    <Flex sx={styles.loadingSpinner}>
      <Spinner size={200} />
    </Flex>
  )
}

export default FullProfile
