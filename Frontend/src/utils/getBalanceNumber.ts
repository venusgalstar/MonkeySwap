import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  // use with caution. JS can only safely represent up to 15-17 digits of precision
  // so you will lose precision in decimals and really big numbers, for those cases use getBNWithDecimals
  const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const getBNWithDecimals = (balance: BigNumber | string | undefined, decimals = 18): undefined | BigNumber => {
  if (!balance) return undefined
  return new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
}
