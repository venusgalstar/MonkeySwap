import React, { useMemo, useState } from 'react'
import { Percent } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { Text, Flex, Button, Svg, Skeleton, Link } from 'components/uikit'
import { Divider } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { unwrappedToken } from 'utils/unwrappedToken'
import { useTokenBalance } from 'lib/hooks/useCurrencyBalance'
import { useTotalSupply } from 'hooks/useTotalSupply'
import JSBI from 'jsbi'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import Dots from 'components/Dots'
import { useWeb3React } from '@web3-react/core'
import CurrencyLogo from 'components/CurrencyLogo'
import { currencyId } from 'utils/currencyId'
import { BIG_INT_ZERO } from 'config/constants/misc'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'

export function MinimalPositionCard({
  pair,
  showUnwrapped = false,
}: {
  pair: Pair
  showUnwrapped?: boolean
  border?: string
}) {
  const { account } = useWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, JSBI.BigInt(0)) ? (
        <Flex sx={{ flexDirection: 'column' }}>
          <Flex sx={{ flexDirection: 'column' }}>
            <Flex sx={{ flexDirection: 'column' }}>
              <Flex sx={{ alignItems: 'center', justifyContent: 'center', mb: '5px' }}>
                <Text weight={500} size="18px">
                  Your position
                </Text>
              </Flex>
            </Flex>
            <Flex onClick={() => setShowMore(!showMore)} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Flex>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
                <Text fontWeight={500} fontSize={20} ml="10px">
                  {currency0.symbol}/{currency1.symbol}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight={500} fontSize={20}>
                  {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
                </Text>
              </Flex>
            </Flex>
            <Flex sx={{ flexDirection: 'column' }}>
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Text fontSize={16} fontWeight={500}>
                  Your pool share:
                </Text>
                <Text fontSize={16} fontWeight={500}>
                  {poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-'}
                </Text>
              </Flex>
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Text fontSize={16} fontWeight={500}>
                  {currency0.symbol}:
                </Text>
                {token0Deposited ? (
                  <Flex>
                    <Text fontSize={16} fontWeight={500} marginLeft="6px">
                      {token0Deposited?.toSignificant(6)}
                    </Text>
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Text fontSize={16} fontWeight={500}>
                  {currency1.symbol}:
                </Text>
                {token1Deposited ? (
                  <Flex>
                    <Text fontSize={16} fontWeight={500} marginLeft="6px">
                      {token1Deposited?.toSignificant(6)}
                    </Text>
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex>
          <Flex>
            <span role="img" aria-label="wizard-icon">
              ⭐️
            </span>{' '}
            <Text>
              By adding liquidity you&apos;ll earn 0.3% of all trades on this pair proportional to your share of the
              pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default function FullPositionCard({ pair, mb }: { pair: Pair; showUnwrapped?: boolean; mb?: string }) {
  const { account } = useWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [currency0PriceUsd, currency0PriceUsdLoading] = useTokenPriceUsd(currency0)
  const [currency1PriceUsd, currency1PriceUsdLoading] = useTokenPriceUsd(currency1)

  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation()

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  const usdPrice = useMemo(() => {
    if (!currency0PriceUsd || !currency1PriceUsd || !token0Deposited || !token1Deposited) return null
    const currency0TotalPrice = parseFloat(token0Deposited.toSignificant(6)) * currency0PriceUsd
    const currency1TotalPrice = parseFloat(token1Deposited.toSignificant(6)) * currency1PriceUsd
    return currency0TotalPrice + currency1TotalPrice
  }, [currency0PriceUsd, currency1PriceUsd, token0Deposited, token1Deposited])

  const valueLoading = currency0PriceUsdLoading || currency1PriceUsdLoading || !token0Deposited || !token1Deposited

  return (
    <Flex sx={{ ...styles.poolContainer, mb: mb }} onClick={() => setShowMore((prev) => !prev)}>
      <Flex sx={styles.innerContainer}>
        <Flex sx={styles.titleContainer}>
          <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={28} />
          <Text size="14px" weight={700} ml="5px">
            {!currency0 || !currency1 ? (
              <>
                Loading <Dots />
              </>
            ) : (
              `${currency0.symbol} - ${currency1.symbol}`
            )}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <Text mr="10px" weight={700}>
            {valueLoading ? <Skeleton width="50px" animation="waves" /> : `$${usdPrice?.toFixed(2)}`}
          </Text>
          <Svg icon="caret" width="8px" direction={showMore ? 'up' : 'down'} />
        </Flex>
      </Flex>
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ overflow: 'hidden', position: 'relative', width: '100%' }}
          >
            <Divider />
            <Flex sx={{ width: '100%', flexDirection: 'column' }}>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Total pooled tokens')}
                </Text>
                {userPoolBalance ? (
                  <Text size="14px" weight={700}>
                    {userPoolBalance?.toSignificant(4)}
                  </Text>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Pooled')} {currency0.symbol}
                </Text>
                {token0Deposited ? (
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text size="14px" weight={700} mr="8px">
                      {token0Deposited?.toSignificant(6)}
                    </Text>
                    <CurrencyLogo size={20} currency={currency0} />
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Pooled')} {currency1.symbol}
                </Text>
                {token1Deposited ? (
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text size="14px" weight={700} mr="8px">
                      {token1Deposited?.toSignificant(6)}
                    </Text>
                    <CurrencyLogo size={20} currency={currency1} />
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Share of pool')}
                </Text>
                <Text size="14px" weight={700}>
                  {poolTokenPercentage
                    ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                    : '-'}
                </Text>
              </Flex>
              {userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, BIG_INT_ZERO) && (
                <Flex mt="10px">
                  <Button
                    as={Link}
                    href={`/add-liquidity/${currencyId(currency0)}/${currencyId(currency1)}`}
                    fullWidth
                    mb="8px"
                    mr="10px"
                  >
                    {t('Add')}
                  </Button>
                  <Button
                    as={Link}
                    href={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
                    mb="8px"
                    fullWidth
                  >
                    {t('Remove')}
                  </Button>
                </Flex>
              )}
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}
