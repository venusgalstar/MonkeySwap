import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { LiFiTransaction } from 'views/Swap/components/TransactionHistory/types'

const useFetchLifiTxHistory = (account: string) => {
  const { isLoading, error, data, refetch } = useQuery(
    ['fetchLifiTxHistory'],
    async () => {
      if (!account) return []
      const response = await axios.get(
        `https://li.quest/v1/analytics/wallets/${account}?integrator=apeswap&fromTimestamp=${Math.floor(
          Date.now() / 1000 - 86400 * 30,
        )}`,
      )
      const transactions: LiFiTransaction[] = await response?.data?.transactions

      return transactions
    },
    { refetchInterval: 30000 },
  )

  return { isLoading, error, data, refetch }
}

export default useFetchLifiTxHistory
