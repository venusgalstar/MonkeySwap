import { Button, Flex, Link, ListTag, Svg, Text } from 'components/uikit'
import { useRouter } from 'next/router'
import StatCard from './StatCard'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import useModal from '../../../../hooks/useModal'
import FilterModal from '../SearchBar/FilterModal'

// Hooks
import useGetIndustryStats from 'state/lhd/hooks/useGetIndustryStats'
import useGetHistoricalIndustryStats from 'state/lhd/hooks/useGetHistoricalIndustryStats'

// Types
import { Filters } from 'state/lhd/types'

const TitleCards = ({
  appliedFilters,
  handleFiltersChange,
}: {
  appliedFilters: Filters
  handleFiltersChange: ({ filters, query }: { filters: Filters; query?: string }) => void
}) => {
  const [onFilterModal] = useModal(
    <FilterModal appliedFilters={appliedFilters} handleFiltersChange={handleFiltersChange} openChains={true} />,
  )
  const { push } = useRouter()
  const { t } = useTranslation()
  const { data: industryStats } = useGetIndustryStats()
  const { data: historicalIndustryStats } = useGetHistoricalIndustryStats()

  const { chainsSupported, averageTotalScore, tokensTracked } = industryStats ?? {
    chainsSupported: 0,
    averageTotalScore: 0,
    tokensTracked: 0,
  }

  const { averageTotalScore: historicalAverageTotalScore } = historicalIndustryStats ?? { averageTotalScore: 0 }

  const industryAverageChange =
    Math.round(((historicalAverageTotalScore - averageTotalScore) / historicalAverageTotalScore) * 10000) / 100

  const openTutorialModal = () => {
    push({ search: 'modal=tutorial' })
  }

  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.titleContainer}>
        <Flex sx={{ width: '100%', alignItems: 'center' }}>
          <Flex sx={{ mr: '5px', width: ['18px', '18px', '18px', '30px'] }}>
            <Svg icon="liquidity" color={'primaryBright'} />
          </Flex>
          <Text sx={{ ...styles.titleText, width: '100%', display: 'flex', alignItems: 'center' }}>
            {t('Liquidity Health Dashboard')}
            <Flex sx={{ ml: '10px' }}>
              <ListTag variant="beta" />
            </Flex>
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', mt: '5px' }}>
          <Text sx={{ color: 'textDisabled', fontSize: '12px', fontWeight: 400 }}>{t('In collaboration with')}</Text>
          <Flex sx={{ ml: '10px' }}>
            <Svg icon="polygonNew" />
          </Flex>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Text sx={styles.detailText}>
            {t(
              'Our data visualization tool provides insights into the decentralized liquidity profile and sustainability of crypto projects.',
            )}
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Text onClick={() => openTutorialModal()} sx={styles.btnText}>
            {t('Tutorial')}
          </Text>
          <Text onClick={() => window.open('https://apeswap.click/LHD-Tutorials', '_blank')} sx={styles.btnText}>
            {t('Video Walkthroughs')}
          </Text>
          <Text
            onClick={() => window.open('https://github.com/ApeSwapFinance/lhd-config', '_blank')}
            sx={styles.btnText}
          >
            {t('Submit data update')}
          </Text>
        </Flex>
      </Flex>
      <Flex sx={styles.cardsContainer}>
        <StatCard
          title="Industry Average"
          value={Math.round(averageTotalScore * 100)}
          footerInfo={
            <>{`${industryAverageChange > 0 ? `+ ${industryAverageChange}` : industryAverageChange}% in last 7 days`}</>
          }
        />
        <StatCard
          title="Chains Supported"
          value={chainsSupported}
          footerInfo={
            <Button variant="text" size="sm" onClick={onFilterModal} target="_blank" sx={styles.cardBtnText}>
              See which chains
            </Button>
          }
        />
        <StatCard
          title="Supported Tokens"
          value={tokensTracked}
          footerInfo={
            <Link href="https://github.com/ApeSwapFinance/lhd-config" target="_blank" sx={{ color: 'yellow' }}>
              Verify Your Project?
            </Link>
          }
        />
      </Flex>
    </Flex>
  )
}

export default TitleCards
