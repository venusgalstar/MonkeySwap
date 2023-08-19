import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { ExchangeRateUpdateParams, LiFi, Route } from '@lifi/sdk'

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export const useSwapCallback = (
  selectedRoute: Route | undefined,
): ((
  updateRouteHook: (route: Route) => void,
  acceptExchangeRateUpdateHook: (params: ExchangeRateUpdateParams) => Promise<boolean>,
) => Promise<Route | undefined>) => {
  const { provider } = useWeb3React()
  const signer = provider?.getSigner()

  return useCallback(
    async (
      updateRouteHook: (route: Route) => void,
      acceptExchangeRateUpdateHook: (params: ExchangeRateUpdateParams) => Promise<boolean>,
    ) => {
      console.log('Initiate swap callback') // Debugging log
      const lifi = new LiFi({
        //make this a const
        integrator: 'apeswap',
      })
      if (!signer || !selectedRoute) return
      return await lifi
        .executeRoute(signer, selectedRoute, { updateRouteHook, acceptExchangeRateUpdateHook })
        .then((response) => {
          console.log('Executed route:', response)
          return response
        })
        .catch((error) => {
          console.error('An error occurred while executing the route:', error)
          throw error
        })
    },
    [selectedRoute, signer],
  )
}
