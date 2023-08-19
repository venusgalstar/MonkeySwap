import { Percent } from '@ape.swap/sdk-core'
import { Position } from '@ape.swap/v3-sdk'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Flex, Skeleton, Text } from 'components/uikit'
import { AnimatePresence, motion } from 'framer-motion'
import { useToken } from 'hooks/Tokens'
import useIsTickAtLimit from 'hooks/useIsTickAtLimit'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import { usePool } from 'hooks/usePools'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { PositionDetails } from 'lib/types/position'
import { useMemo, useState } from 'react'
import { Bound } from 'state/mint/v3/actions'
import { formatTickPrice } from 'utils/formatTickPrice'
import { unwrappedToken } from 'utils/unwrappedToken'
import { getPriceOrderingFromPosition } from '../helpers'
import MobileLiquidityDetails from './MobileLiquidityDetails'
import RangeTag from './RangeTag'
import styles from './styles'

const PositionCard = ({
  positionItem,
  selectedTokenId,
  handleSelectedTokenId,
}: {
  positionItem: PositionDetails
  selectedTokenId?: string
  handleSelectedTokenId: (tokenId: string) => void
}) => {
  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
    tokenId,
  } = positionItem
  // For mobile positions
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const token0 = useToken(token0Address)
  const token1 = useToken(token1Address)
  const currency0 = token0 ? unwrappedToken(token0) : undefined
  const currency1 = token1 ? unwrappedToken(token1) : undefined
  const [, pool] = usePool(currency0 ?? undefined, currency1 ?? undefined, feeAmount)
  const position = useMemo(() => {
    if (pool) {
      return new Position({ pool, liquidity: liquidity.toString(), tickLower, tickUpper })
    }
    return undefined
  }, [liquidity, pool, tickLower, tickUpper])

  const tickAtLimit = useIsTickAtLimit(feeAmount, tickLower, tickUpper)

  // prices
  const { priceLower, priceUpper, quote, base } = getPriceOrderingFromPosition(position)

  const currencyQuote = quote && unwrappedToken(quote)
  const currencyBase = base && unwrappedToken(base)

  // check if price is within range
  const outOfRange: boolean = pool ? pool.tickCurrent < tickLower || pool.tickCurrent >= tickUpper : false

  const removed = liquidity?.eq(0)

  const inRange = !outOfRange

  const isSelected = tokenId.toString() === selectedTokenId

  const [token0PriceUsd, token0PriceUsdLoading] = useTokenPriceUsd(token0)
  const [token1PriceUsd, token1PriceUsdLoading] = useTokenPriceUsd(token1)

  const liquidityUsdAmount = useMemo(() => {
    if (!position || !token0PriceUsd || !token1PriceUsd) return null
    const amount0 = token0PriceUsd * parseFloat(position.amount0.toSignificant(6))
    const amount1 = token1PriceUsd * parseFloat(position.amount1.toSignificant(6))
    return amount0 + amount1
  }, [position, token0PriceUsd, token1PriceUsd])

  const valuesLoading = token0PriceUsdLoading || token1PriceUsdLoading || !position

  // Since we dont want to mount the mobile details on desktop we can condition it
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()

  return (
    <Flex sx={{ ...styles.positionCardContainer, boxShadow: isSelected && isDesktop && '0px 0px 8px' }}>
      <Flex
        sx={{ padding: '10px', flexDirection: 'column', cursor: 'pointer' }}
        onClick={() => {
          handleSelectedTokenId(tokenId.toString()), setIsOpen((prev) => !prev)
        }}
      >
        <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <DoubleCurrencyLogo currency0={currencyQuote} currency1={currencyBase} />
            <Text weight={600}>
              &nbsp;{currencyQuote?.symbol}&nbsp;/&nbsp;{currencyBase?.symbol}
            </Text>
            <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
              <Text size="10px" sx={{ lineHeight: '9px' }}>
                {new Percent(feeAmount, 1_000_000).toSignificant()}%
              </Text>
            </Flex>
          </Flex>
          <RangeTag removed={removed} inRange={inRange} />
        </Flex>
        <Flex sx={{ alignItems: 'flex-end', height: '30px', justifyContent: 'space-between' }}>
          <Flex>
            {valuesLoading ? (
              <Skeleton width={200} height={20} animation="waves" />
            ) : (
              <>
                <Text size="12px" sx={{ lineHeight: '12px' }}>
                  {formatTickPrice(priceLower, tickAtLimit, Bound.LOWER)}
                </Text>
                <Text size="12px" sx={{ lineHeight: '12px' }} margin="0px 2.5px">
                  {' '}
                  -{' '}
                </Text>
                <Text size="12px" sx={{ lineHeight: '12px' }}>
                  {formatTickPrice(priceUpper, tickAtLimit, Bound.UPPER)}
                </Text>
                <Text size="12px" sx={{ lineHeight: '12px' }} ml="5px">
                  {currencyQuote?.symbol}
                </Text>
              </>
            )}
          </Flex>
          <Flex>
            <Text size="14px" weight={700} sx={{ lineHeight: '18px' }} ml="10px">
              {valuesLoading ? (
                <Skeleton width={50} height={20} animation="waves" />
              ) : (
                `$${liquidityUsdAmount?.toFixed(2)}`
              )}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'fit-content' }}
              transition={{ opacity: { duration: 0.2 } }}
              exit={{ height: 0 }}
              sx={{ overflow: 'hidden', width: '100%' }}
            >
              {(isMobile || isTablet) && tokenId.toString() === selectedTokenId && (
                <MobileLiquidityDetails selectedTokenId={selectedTokenId} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
    </Flex>
  )
}

export default PositionCard
