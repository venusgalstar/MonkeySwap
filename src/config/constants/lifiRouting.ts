export const NATIVE = '0x0000000000000000000000000000000000000000'
export const parseCurrency = (currencyId: string) => {
  if (currencyId === NATIVE) return 'ETH'
  return currencyId
}