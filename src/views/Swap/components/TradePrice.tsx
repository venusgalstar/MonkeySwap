import { Flex, Text } from 'components/uikit'
import { useState } from 'react'
import { toPrecisionAvoidExponential } from '../utils'
import BigNumber from 'bignumber.js'
import { getBNWithDecimals } from '../../../utils/getBalanceNumber'
import { Token } from '@lifi/sdk'

const TradePrice = ({ fromAmount, fromToken, toAmount, toToken }: { fromAmount: string, fromToken: Token, toAmount: string, toToken: Token }) => {
  const [showInverted, setShowInverted] = useState<boolean>(false)

  const fromNumber: BigNumber = getBNWithDecimals(fromAmount, fromToken?.decimals) ?? new BigNumber(0);
  const toNumber: BigNumber = getBNWithDecimals(toAmount, toToken?.decimals) ?? new BigNumber(0);
  const price: BigNumber = fromNumber.div(toNumber);
  const invertedPrice: BigNumber = toNumber.div(fromNumber);

  const pricePrecision: string = toPrecisionAvoidExponential(price)
  const invertedPricePrecision: string = toPrecisionAvoidExponential(invertedPrice)

  const label = `1 ${toToken?.symbol.toUpperCase()} = ${pricePrecision} ${fromToken?.symbol.toUpperCase()}`
  const invertedLabel = `1 ${fromToken?.symbol.toUpperCase()} = ${invertedPricePrecision} ${toToken?.symbol.toUpperCase()}`

  return (
    <Flex onClick={() => setShowInverted((prev) => !prev)} sx={{ minWidth: 'fit-content', zIndex: 1 }}>
      <Text size="12px">{showInverted ? label : invertedLabel}</Text>
    </Flex>
  )
}

export default TradePrice
