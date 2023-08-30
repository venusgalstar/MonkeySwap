export const getFees = (fromTokenSymbol: string, toTokenSymbol: string): { fee: number; tier: string } => {
  const stableCoins = ['FRAX', 'USDC', 'USDT', 'DAI', 'BUSD', 'TUSD', 'USDD']

  const isFromStable = stableCoins.includes(fromTokenSymbol)
  const isToStable = stableCoins.includes(toTokenSymbol)
  const isStableSwap = isFromStable && isToStable

  const stableTiers: { [key: string]: number } = {
    // ['0']: 0, // 0% - stable-0
    // ['1']: 0.0005, // 0.05% - stable-1
    ['2']: 0.001, // 0.1% - stable-2
    // ['3']: 0.002, // 0.2% - stable-3
  }

  const bluechipTiers: { [key: string]: number } = {
    // ['0']: 0, // 0% - bluechip-0
    // ['1']: 0.001, // 0.1% - bluechip-1
    // ['2']: 0.002, // 0.2% - bluechip-2
    ['3']: 0.003, // 0.3% - bluechip-3
  }

  //const key = (Math.floor(Math.random() * 3) + 1).toString()
  const key = isStableSwap ? '2' : '3'

  return {
    fee: isStableSwap ? stableTiers[key] : bluechipTiers[key],
    tier: `${isStableSwap ? 'stable' : 'bluechip'}-${key}`,
  }
}
