import { Route } from '@lifi/sdk'

export const filterRoutes2 = (route: Route[]) => {
  //first filter multihops
  //then prioritize aperoutes if usd output dif is less than 0.5%
}

export const filterRoutes = (routes: Route[]): Route[] => {
  // Filter out Routes with more than 1 step
  const filteredRoutes = routes.filter((route) => route.steps.length <= 1)

  // Sort Routes based on toAmountUSD
  return filteredRoutes.sort((a, b) => {
    let aValue = parseFloat(a.toAmountUSD)
    let bValue = parseFloat(b.toAmountUSD)
    const apePreference = 1.005 // i.e. 0.5% preference
    if (a.steps[0].tool.includes('apeswap')) {
      aValue *= apePreference
    }
    if (b.steps[0].tool.includes('apeswap')) {
      bValue *= apePreference
    }
    return bValue - aValue
  })
}
