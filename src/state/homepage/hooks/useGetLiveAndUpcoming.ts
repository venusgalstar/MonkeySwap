import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { LiveAndUpcoming } from '../types'

// Constants
import { baseUrlStrapi } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getLiveAndUpcoming = async (): Promise<LiveAndUpcoming[]> => {
  const { data } = await axios.get(`${baseUrlStrapi}/home-live-and-upcomings`)
  return data
}

export default function useGetLiveAndUpcoming() {
  return useQuery({
    queryKey: [QUERY_KEYS.LIVE_AND_UPCOMING],
    queryFn: getLiveAndUpcoming,
  })
}
