import { BillsConfig } from '@ape.swap/apeswap-lists'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { getFirstNonZeroDigits } from 'utils/roundNumber'

const cleanBillsData = (
  billIds: number[],
  chunkedBills: any[],
  tokenPrices: TokenPrices[],
  chainId: number,
  bills: BillsConfig[],
) => {
  const data = chunkedBills.map((chunk, index) => {
    const billConfig = bills.find((bill) => bill.index === billIds[index])
    const lpPrice = tokenPrices?.find(
      // @ts-ignore
      (token) => token.address[chainId] === billConfig?.lpToken?.address?.[chainId],
    )?.price
    const earnTokenPrice = tokenPrices?.find(
      // @ts-ignore
      (token) => token.address[chainId] === billConfig.earnToken.address[chainId],
    )?.price
    const [
      trueBillPrice,
      currentDebt,
      currentFee,
      debtDecay,
      debtRatio,
      totalDebt,
      totalPayoutGiven,
      totalPrincipalBilled,
      billNft,
      terms,
      maxTotalPayout,
      maxPayoutTokens,
    ] = chunk
    const [controlVariable, vestingTerm, minimumPrice, maxPayout, maxDebt] = terms
    const priceUsd = lpPrice && trueBillPrice && getBalanceNumber(trueBillPrice?.toString()) * lpPrice
    const discount = earnTokenPrice && priceUsd && ((earnTokenPrice - priceUsd) / earnTokenPrice) * 100
    const formatedPrice = priceUsd ? getFirstNonZeroDigits(priceUsd) : undefined
    return {
      ...billConfig,
      price: trueBillPrice?.toString(),
      priceUsd: formatedPrice,
      vestingTime: vestingTerm?.toString(),
      discount: discount?.toFixed(2),
      trueBillPrice: trueBillPrice?.toString(),
      currentDebt: currentDebt?.toString(),
      currentFee: currentFee?.toString(),
      debtDecay: debtDecay?.toString(),
      debtRatio: debtRatio?.toString(),
      totalDebt: totalDebt?.toString(),
      totalPayoutGiven: totalPayoutGiven?.toString(),
      maxTotalPayOut: maxTotalPayout?.toString(),
      totalPrincipalBilled: totalPrincipalBilled?.toString(),
      controlVariable: controlVariable?.toString(),
      minimumPrice: minimumPrice?.toString(),
      maxPayout: maxPayout?.toString(),
      maxDebt: maxDebt?.toString(),
      billNftAddress: billNft?.toString(),
      earnTokenPrice,
      lpPrice,
      maxPayoutTokens: maxPayoutTokens?.toString(),
    }
  })
  return data
}

export default cleanBillsData
