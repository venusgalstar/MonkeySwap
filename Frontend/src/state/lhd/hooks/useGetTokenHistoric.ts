import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { SimpleTokenProfile } from 'state/lhd/types'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

interface IGetTokenHistoric {
  chainID: string
  address: string
}

export const getTokenHistoric = async ({ chainID, address }: IGetTokenHistoric): Promise<SimpleTokenProfile[]> => {
  const { data } = await axios.get(`${LHD_API}/liquidity-health-dashboard/historic/${chainID}/${address}`)
  return data
}

export default function useGetTokenHistoric({ chainID, address }: IGetTokenHistoric) {
  return useQuery({
    queryKey: [QUERY_KEYS.TOKEN_HISTORIC, chainID, address],
    queryFn: () => getTokenHistoric({ chainID, address }),
  })
}
