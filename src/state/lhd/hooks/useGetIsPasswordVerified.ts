import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

interface IGetIsPasswordVerified {
  verified: boolean
  password: string
}

export const getIsPasswordVerified = async ({ password }: { password: string }): Promise<IGetIsPasswordVerified> => {
  const { data } = await axios.get(`${LHD_API}/verify/${password}`)
  return data
}

export default function useGetIsPasswordVerified({ password }: { password: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.LHD_PASSWORD_VERIFIED, password],
    queryFn: () => getIsPasswordVerified({ password }),
    enabled: !!password,
  })
}
