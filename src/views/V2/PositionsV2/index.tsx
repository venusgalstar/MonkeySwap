import React, { useMemo } from 'react'
import { Pair } from '@ape.swap/v2-sdk'
import { Text, Flex, Link, Spinner } from 'components/uikit'
import ConnectWalletButton from 'components/ConnectWallet'
import { useTranslation } from 'contexts/Localization'
import FullPositionCard from './components/PositionCard'
import { useV2Pairs } from 'hooks/useV2Pairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import DexNav from 'components/DexNav'
import { styles } from './styles'
import { useWeb3React } from '@web3-react/core'
import { useTokenBalancesWithLoadingIndicator } from 'lib/hooks/useCurrencyBalance'
import { V2LiquiditySubNav } from 'components/DexNav/LiquiditySubNav'

export default function Pool() {
  const { account } = useWeb3React()
  // const [recentTransactions] = useUserRecentTransactions()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = useV2Pairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))
  const { t } = useTranslation()

  const renderBody = () => {
    if (!account) {
      return <></>
    }
    if (v2IsLoading) {
      return (
        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Spinner size={200} />
        </Flex>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '10px' : '0px'}
        />
      ))
    }
    return (
      <Flex sx={{ justifyContent: 'center' }}>
        <Text textAlign="center">{t('No liquidity found.')}</Text>
      </Flex>
    )
  }

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex variant="flex.dexContainer">
        <DexNav />
        <V2LiquiditySubNav />
        <Flex sx={{ flexDirection: 'column', maxWidth: '100%', width: '420px' }}>
          <Flex sx={{ ...styles.topContainer }}>
            <Text weight={700} sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
              {t('Add liquidity to receive LP tokens')}
            </Text>
            {!account && (
              <Flex sx={{ mt: '10px' }}>
                <ConnectWalletButton />
              </Flex>
            )}
          </Flex>
          {renderBody()}
        </Flex>
        {account && !v2IsLoading && (
          <Flex sx={{ flexDirection: 'column', alignItems: 'center', margin: '20px 0px 10px 0px' }}>
            <Text mb="8px">{t('Missing LPs?')}</Text>
            <Text style={{ textDecoration: 'underline' }} mb="8px" as={Link} href="/find/v2">
              {t('Find other LP tokens')}
            </Text>
            <Text mb="8px">{t('or')}</Text>
            <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <Text style={{ textDecoration: 'underline' }} mb="8px" pr="5px" as={Link} href="/apestats">
                {t('Visit ApeStats')}
              </Text>
              <Text mb="8px">{t(' for an overview of your positions.')}</Text>
            </Flex>
          </Flex>
        )}
      </Flex>
      {/* {recentTransactions && <RecentTransactions />} */}
    </Flex>
  )
}
