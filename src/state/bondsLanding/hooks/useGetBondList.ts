import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Constants
import { apiV2BaseUrl } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

// Types
import { BondsLandingMap } from '../types'

export const getBondsLandingList = async (): Promise<BondsLandingMap> => {
  const { data } = await axios.get(`${apiV2BaseUrl}/stats?product=bonds`)
  return data
}

export default function useGetBondsLandingList() {
  return useQuery({
    queryKey: [QUERY_KEYS.BONDS_LANDING],
    queryFn: getBondsLandingList,
  })
}
