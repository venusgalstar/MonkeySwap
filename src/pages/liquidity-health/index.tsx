import PageContainer from 'components/PageContainer'
import LHD from 'views/LHD'

// Hooks
import { getIndustryStats } from 'state/lhd/hooks/useGetIndustryStats'
import { getHistoricalIndustryStats } from 'state/lhd/hooks/useGetHistoricalIndustryStats'
import { getLHDProfiles } from 'state/lhd/hooks/useGetLHDProfiles'
import { getFilterDiff } from 'views/LHD/components/SearchBar/helpers'

// Constants
import { INITIAL_FILTER_VALUES } from 'views/LHD/utils/config'

const LHDPage = () => {
  return (
    <PageContainer variant="lhd">
      <LHD />
    </PageContainer>
  )
}

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from 'config/constants/queryKeys'
import { queryStringToObject } from 'views/LHD/components/SearchBar/helpers'
import { GetServerSideProps } from 'next'

export default LHDPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const { query: filters } = ctx
  const parsedFilters = queryStringToObject(filters as unknown as string)
  const appliedFiltersDiff = getFilterDiff({ ...INITIAL_FILTER_VALUES, ...parsedFilters })
  await queryClient.prefetchQuery([QUERY_KEYS.INDUSTRY_STATS], getIndustryStats)
  await queryClient.prefetchQuery([QUERY_KEYS.HISTORICAL_INDUSTRY_STATS], getHistoricalIndustryStats)
  await queryClient.prefetchQuery([QUERY_KEYS.LHD_PROFILES, appliedFiltersDiff], () =>
    getLHDProfiles({ filters: appliedFiltersDiff }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
