import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { LHDProfiles, Filters } from '../types'

// Helpers
import { generateSearchParams } from 'views/LHD/components/SearchBar/helpers'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'
import { INITIAL_FILTER_VALUES } from 'views/LHD/utils/config'

interface FiltersWithSearch extends Filters {
  search?: string
}

export const getLHDProfiles = async ({ filters = {} }: { filters?: FiltersWithSearch }): Promise<LHDProfiles> => {
  let profilesUrl = `${LHD_API}/liquidity-health-dashboard/profiles`

  let parsedFilters = ''

  const { search, ...rest } = filters

  if (search) {
    parsedFilters = generateSearchParams({ ...INITIAL_FILTER_VALUES, ...rest })
    profilesUrl += `/search/${filters?.search}${parsedFilters ? `?${parsedFilters}` : ''}`
  } else if (Object.keys(filters).length > 0) {
    parsedFilters = generateSearchParams({ ...INITIAL_FILTER_VALUES, ...rest })
    profilesUrl += `?${parsedFilters}`
  }

  const { data } = await axios.get(profilesUrl)
  return data
}

export default function useGetLHDProfiles({ filters }: { filters?: FiltersWithSearch }) {
  return useQuery({
    queryKey: [QUERY_KEYS.LHD_PROFILES, filters],
    queryFn: () => getLHDProfiles({ filters }),
  })
}
