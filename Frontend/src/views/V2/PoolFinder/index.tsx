import React, { useCallback, useEffect, useState } from 'react'
import { Currency, CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { Text, Flex, Svg, Link } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { currencyId } from 'utils/currencyId'
import Dots from 'components/Dots'
import { styles } from './styles'
import DexNav from 'components/DexNav'
import { Box } from 'theme-ui'
import { useTokenBalance } from 'lib/hooks/useCurrencyBalance'
import JSBI from 'jsbi'
import { usePairAdder } from 'state/user/hooks'
import { useWeb3React } from '@web3-react/core'
import { PairState, useV2Pair } from 'hooks/useV2Pairs'
import { nativeOnChain } from 'config/constants/tokens'
import useModal from 'hooks/useModal'
import TokenListModal from 'components/TokenListModal'
import CurrencyLogo from 'components/CurrencyLogo'
import { MinimalPositionCard } from '../PositionsV2/components/PositionCard'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

export default function PoolFinder() {
  const { account, chainId } = useWeb3React()
  // const [recentTransactions] = useUserRecentTransactions()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(() => (chainId ? nativeOnChain(chainId) : null))
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = useV2Pair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  const { t } = useTranslation()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.quotient, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.quotient, JSBI.BigInt(0)),
    )

  const position: CurrencyAmount<Token> | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.quotient, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <Text textAlign="center">
      {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
    </Text>
  )

  const [onPresentCurrencyModal] = useModal(
    <TokenListModal
      onCurrencySelect={handleCurrencySelect}
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
      onDismiss={() => null}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  return (
    <Flex>
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex variant="flex.dexContainer">
          <DexNav />
          <Flex sx={{ margin: '20px 0px 5px 0px', justifyContent: 'center', maxWidth: '100%', width: '420px' }}>
            <Text weight={700}>{t('FIND YOUR LIQUIDITY')}</Text>
          </Flex>
          <Box sx={{ marginTop: '20px' }}>
            <Flex sx={styles.tokenContainer}>
              <Text sx={styles.swapDirectionText}>{t('Token 1')}</Text>
              <Flex
                sx={styles.primaryFlex}
                onClick={() => {
                  onPresentCurrencyModal()
                  setActiveField(Fields.TOKEN0)
                }}
              >
                <>
                  {currency0 ? (
                    <Flex>
                      <CurrencyLogo currency={currency0} size={30} />
                      <Text sx={styles.tokenText}>{currency0.symbol}</Text>
                    </Flex>
                  ) : (
                    <Text sx={styles.tokenText}>{t('Select a Token')}</Text>
                  )}
                  <Svg icon="caret" />
                </>
              </Flex>
            </Flex>
            <Flex sx={{ margin: '10px 0px', justifyContent: 'center' }}>
              <Flex
                sx={{
                  ...styles.addContainer,
                }}
              >
                <Text weight={700} sx={{ lineHeight: '0px' }}>
                  +
                </Text>
              </Flex>
            </Flex>
            <Flex sx={{ ...styles.tokenContainer }}>
              <Text sx={{ ...styles.swapDirectionText }}>{t('Token 2')}</Text>
              <Flex
                sx={{ ...styles.primaryFlex }}
                onClick={() => {
                  onPresentCurrencyModal()
                  setActiveField(Fields.TOKEN1)
                }}
              >
                <>
                  {currency1 ? (
                    <Flex>
                      <CurrencyLogo currency={currency1} size={30} />
                      <Text sx={{ ...styles.tokenText }}>{currency1.symbol}</Text>
                    </Flex>
                  ) : (
                    <Text sx={{ ...styles.tokenText }}>{t('Select a Token')}</Text>
                  )}
                  <Svg icon="caret" />
                </>
              </Flex>
            </Flex>
          </Box>
          {hasPosition && (
            <Flex
              style={{
                justifyItems: 'center',
                alignItems: 'center',
                margin: '20px 0px',
                borderRadius: '12px',
                flexDirection: 'column',
              }}
            >
              <Text textAlign="center">{t('Pool Found!')}</Text>
              <Link href="/liquidity">
                <Text textAlign="center" style={{ textDecoration: 'underline' }}>
                  {t('Manage this pool.')}
                </Text>
              </Link>
            </Flex>
          )}

          {currency0 && currency1 ? (
            pairState === PairState.EXISTS ? (
              hasPosition && pair ? (
                <MinimalPositionCard pair={pair} />
              ) : (
                <Flex style={{ margin: '20px 0px', alignItems: 'center', flexDirection: 'column' }}>
                  <Text textAlign="center">{t('You don’t have liquidity in this pool yet.')}</Text>
                  <Link href={`/add-liquidity/${currencyId(currency0)}/${currencyId(currency1)}`}>
                    <Text style={{ textDecoration: 'underline' }} textAlign="center">
                      {t('Add Liquidity')}
                    </Text>
                  </Link>
                </Flex>
              )
            ) : validPairNoLiquidity ? (
              <Flex style={{ margin: '20px 0px', alignItems: 'center', justifyContent: 'center' }}>
                <Text textAlign="center">No pool found.</Text>
                <Link
                  href={`/add-liquidity/${currencyId(currency0)}/${currencyId(currency1)}`}
                  sx={{ textDecoration: 'underline' }}
                >
                  {t('Create pool.')}
                </Link>
              </Flex>
            ) : pairState === PairState.INVALID ? (
              <Flex gap="sm" justify="center">
                <Text textAlign="center" fontWeight={500}>
                  {t('Invalid pair.')}
                </Text>
              </Flex>
            ) : pairState === PairState.LOADING ? (
              <Flex gap="sm" justify="center">
                <Text textAlign="center">
                  {t('Loading')}
                  <Dots />
                </Text>
              </Flex>
            ) : null
          ) : (
            <Flex sx={{ margin: '20px 0px', justifyContent: 'center' }}>{prerequisiteMessage}</Flex>
          )}
          {/* <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        /> */}
        </Flex>
        {/* {recentTransactions && <RecentTransactions />} */}
      </Flex>
    </Flex>
  )
}
