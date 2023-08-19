import { Flex, Svg, Text } from 'components/uikit'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './styles'
import TradePrice from './TradePrice'
import { toPrecisionAvoidExponential } from '../utils'
import { Divider } from 'theme-ui'
import { Route } from '@lifi/sdk'
import { getBNWithDecimals } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'

const RouteDetails = ({ route, fee }: { route: Route; fee: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { expectedOutputAmount, expectedOutputMin, priceImpact, routingFee } = useMemo(() => {
    return {
      expectedOutputAmount: toPrecisionAvoidExponential(
        getBNWithDecimals(route?.toAmount, route?.toToken?.decimals) ?? new BigNumber(0),
      ),
      expectedOutputMin: toPrecisionAvoidExponential(
        getBNWithDecimals(route?.toAmountMin, route?.toToken?.decimals) ?? new BigNumber(0),
      ),
      priceImpact:
        ((parseFloat(route?.fromAmountUSD) - parseFloat(route?.toAmountUSD) * ((fee ?? 0) + 1)) * 100) /
        parseFloat(route?.fromAmountUSD),
      routingFee: fee ? getBNWithDecimals(route?.fromAmount, route?.fromToken?.decimals)?.times(fee) : new BigNumber(0),
    }
  }, [
    fee,
    route?.fromAmount,
    route?.fromAmountUSD,
    route?.fromToken?.decimals,
    route?.toAmount,
    route?.toAmountMin,
    route?.toAmountUSD,
    route?.toToken?.decimals,
  ])

  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return 'success'
    if (priceImpact < 2) return 'success'
    if (priceImpact < 5) return 'yellow'
    if (priceImpact === 100) return 'text'
    return 'error'
  }, [priceImpact])

  const priceImpactString =
    isFinite(priceImpact) && priceImpact !== 100
      ? priceImpact && priceImpact > 0
        ? `${priceImpact.toFixed(2)} %`
        : '< 0.001%'
      : '-'

  return (
    <Flex sx={styles.dexTradeInfoContainer}>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <TradePrice
          fromAmount={route?.fromAmount}
          fromToken={route?.fromToken}
          toAmount={route?.toAmount}
          toToken={route?.toToken}
        />
        <Flex sx={{ width: '100%', justifyContent: 'flex-end' }} onClick={() => setIsOpen((prev) => !prev)}>
          <Svg icon="caret" direction={isOpen ? 'up' : 'down'} />
        </Flex>
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden', width: '100%' }}
          >
            <Divider backgroundColor="white4" />
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="12px">Price impact</Text>
              <Text size="12px" color={priceImpactColor}>
                {priceImpactString}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="12px"> Routing fee </Text>
              <Text size="12px">
                {' '}
                {routingFee ? toPrecisionAvoidExponential(routingFee, 3) : '-'}{' '}
                {route?.fromToken?.symbol?.toUpperCase()}{' '}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="12px">Expected output</Text>
              <Text size="12px">
                {expectedOutputAmount ? `${expectedOutputAmount}  ${route?.toToken?.symbol}` : '-'}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="12px">Minimum received</Text>
              <Text size="12px">{`${expectedOutputMin} ${route?.toToken?.symbol}`}</Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default RouteDetails
