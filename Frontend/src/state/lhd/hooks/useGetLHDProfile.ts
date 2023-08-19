import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { TokenProfile } from '../types'

// Constants
import { LHD_API_TEMP } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

interface IGetLHDProfile {
  chainID: string
  address: string
}

export const getLHDProfile = async ({ chainID, address }: IGetLHDProfile): Promise<TokenProfile> => {
  const { data } = await axios.get(`${LHD_API_TEMP}/liquidity-health-dashboard/profiles/${chainID}/${address}`)
  return data
}

export default function useGetLHDProfile({ chainID, address }: IGetLHDProfile) {
  return useQuery({
    queryKey: [QUERY_KEYS.LHD_PROFILE, chainID, address],
    queryFn: () => getLHDProfile({ chainID, address }),
  })
}
