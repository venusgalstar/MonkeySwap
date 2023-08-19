import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { poolStyles } from './styles'
import Tooltip from 'components/Tooltip/Tooltip'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { Button, Flex, IconButton, Svg } from 'components/uikit'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { BASE_ADD_LIQUIDITY_URL } from 'config/constants/misc'
import ListViewContent from 'components/ListView/ListViewContent'
import ListView from 'components/ListView/ListView'
import { Pool, Tag } from 'state/pools/types'
import BigNumber from 'bignumber.js'
import CalcButton from 'components/RoiCalculator/CalcButton'
import Actions from '../Actions'
import HarvestAction from '../Actions/HarvestAction'

const DisplayPools: React.FC<{ pools: Pool[]; openId?: number; poolTags: Tag[] | null; isActive: boolean }> = ({
  pools,
  openId,
  poolTags,
  isActive,
}) => {
  const { chainId } = useWeb3React()
  const { asPath, push } = useRouter()
  const { t } = useTranslation()

  const poolsListView = pools.map((pool) => {
    const token1 = pool?.stakingToken?.symbol
    const token2 = pool?.rewardToken?.symbol
    const totalDollarAmountStaked = Math.round(
      getBalanceNumber(new BigNumber(pool?.totalStaked ?? 0)) * (pool?.stakingToken?.price ?? 0),
    )
    const liquidityUrl = !pool?.lpStaking
      ? pool?.stakingToken?.symbol === 'GNANA'
        ? 'https://apeswap.finance/gnana'
        : `/swap?outputCurrency=${
            pool?.stakingToken?.address?.[chainId as SupportedChainId]
          }`
      : `${BASE_ADD_LIQUIDITY_URL}/${pool?.lpTokens?.token?.address?.[chainId as SupportedChainId]}/${
          pool?.lpTokens?.quoteToken?.address?.[chainId as SupportedChainId]
        }`
    const userAllowance = pool?.userData?.allowance
    const userEarnings = getBalanceNumber(
      new BigNumber(pool?.userData?.pendingReward ?? 0) || new BigNumber(0),
      pool?.rewardToken?.decimals?.[chainId as SupportedChainId] ?? 18,
    )
    const userEarningsUsd = `$${(userEarnings * (pool.rewardToken?.price ?? 0)).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(
      new BigNumber(pool?.userData?.stakingTokenBalance ?? 0) ?? new BigNumber(0),
    )?.toFixed(2)}`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(new BigNumber(pool?.userData?.stakingTokenBalance ?? 0) || new BigNumber(0)) *
      (pool?.stakingToken?.price ?? 0)
    ).toFixed(2)}`

    const pTag = poolTags?.find((tag) => tag?.pid === pool?.sousId)
    const explorerLink = BLOCK_EXPLORER[chainId as SupportedChainId]
    const poolContractURL = `${explorerLink}/address/${pool?.contractAddress[chainId as SupportedChainId]}`

    const openLiquidityUrl = () =>
      pool?.stakingToken?.symbol === 'GNANA' ? push({ search: '?modal=gnana' }) : window.open(liquidityUrl, '_blank')

    // Token symbol logic is here temporarily for nfty
    return {
      tokenDisplayProps: {
        token1,
        token2: token2 === 'NFTY ' ? 'NFTY2' : token2 || pool?.tokenName,
      },
      listProps: {
        id: pool.sousId,
        title: (
          <ListViewContent
            //@ts-ignore
            tag={pTag?.pid === pool?.sousId ? pTag?.text.toLowerCase() : undefined}
            value={pool?.rewardToken?.symbol || pool?.tokenName}
            style={{ maxWidth: '150px' }}
          />
        ),
        titleWidth: '290px',
        iconsContainer: '94px',
        infoContent: (
          <Tooltip
            tokenContract={pool?.rewardToken?.address?.[chainId as SupportedChainId] ?? ''}
            secondURL={poolContractURL}
            secondURLTitle={t('View Pool Contract')}
            twitter={pool?.twitter}
            projectLink={pool?.projectLink}
            audit={pool?.audit ?? ''}
            pool={pool}
          />
        ),
        cardContent: (
          <Flex sx={poolStyles.cardContent}>
            <Flex sx={poolStyles.buttonsContainer}>
              <Flex sx={{ width: '90px', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href={pool.projectLink} target="_blank" rel="noreferrer">
                  <IconButton
                    icon="website"
                    color="primaryBright"
                    iconWidth={20}
                    sx={{ height: '40px', width: '40px' }}
                  />
                </a>
                <a href={pool?.twitter} target="_blank" rel="noreferrer">
                  <IconButton
                    icon="twitter"
                    color="primaryBright"
                    iconWidth={20}
                    sx={{ height: '40px', width: '40px', pt: '13px' }}
                  />
                </a>
              </Flex>
            </Flex>
            <ListViewContent
              title={t('APR')}
              value={`${isActive ? pool?.apr?.toFixed(2) : '0.00'}%`}
              toolTip={t('APRs are calculated based on current value of the token, reward rate, and share of pool.')}
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(10%, 0%)"
              aprCalculator={
                <CalcButton
                  label={pool?.stakingToken?.symbol}
                  rewardTokenName={pool?.rewardToken?.symbol}
                  rewardTokenPrice={pool?.rewardToken?.price}
                  apr={pool?.apr}
                  tokenAddress={pool.stakingToken.address[chainId as SupportedChainId]}
                />
              }
              style={poolStyles.aprInfo}
            />
            <Flex sx={{ ...poolStyles.onlyDesktop }}>
              <ListViewContent
                title={t('Total Staked')}
                value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                toolTip={t('The total value of the tokens currently staked in this pool.')}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(36%, 0%)"
                style={poolStyles.farmInfo}
              />
            </Flex>
            <ListViewContent title={t('Earned')} value={userEarningsUsd} style={poolStyles.earnedColumn} />
          </Flex>
        ),
        expandedContent: (
          <>
            <Flex sx={poolStyles.expandedContent}>
              <Flex sx={{ ...poolStyles.onlyMobile, width: '100%' }}>
                <ListViewContent
                  title={t('Total Staked')}
                  value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                  toolTip={t('The total value of the tokens currently staked in this pool.')}
                  toolTipPlacement="bottomLeft"
                  toolTipTransform="translate(36%, 0%)"
                  style={poolStyles.farmInfo}
                />
              </Flex>
              <Flex sx={{ ...poolStyles.actionContainer, minWidth: '220px' }}>
                <ListViewContent
                  title={t('Available')}
                  value={userTokenBalance}
                  value2={userTokenBalanceUsd}
                  value2Secondary
                  value2Direction="column"
                  style={poolStyles.columnView}
                />
                <Flex sx={{ width: '100%', maxWidth: ['130px', '130px', '130px', '140px'] }}>
                  <Button variant="primary" sx={poolStyles.styledBtn} onClick={openLiquidityUrl}>
                    {t('GET')} {pool?.stakingToken?.symbol}
                  </Button>
                </Flex>
              </Flex>
              <Flex sx={{ ...poolStyles.onlyBigScreen, mx: '10px' }}>
                <Svg icon="caret" direction="right" width="50px" />
              </Flex>
              <Actions
                allowance={userAllowance?.toString() ?? ''}
                stakedBalance={pool?.userData?.stakedBalance?.toString() ?? ''}
                stakedTokenSymbol={pool?.stakingToken?.symbol}
                stakingTokenBalance={pool?.userData?.stakingTokenBalance?.toString() ?? ''}
                stakeTokenAddress={pool?.stakingToken?.address[chainId as SupportedChainId] ?? ''}
                stakeTokenValueUsd={pool?.stakingToken?.price ?? 0}
                sousId={pool?.sousId}
              />
              <Flex sx={{ ...poolStyles.onlyBigScreen, mx: '10px' }}>
                <Svg icon="caret" direction="right" width="50px" />
              </Flex>
              <HarvestAction
                sousId={pool?.sousId}
                disabled={userEarnings <= 0}
                userEarnings={userEarnings}
                earnTokenSymbol={pool?.rewardToken?.symbol || pool?.tokenName}
                earnTokenValueUsd={pool?.rewardToken?.price ?? 0}
                rawAllowance={userAllowance?.toString() ?? ''}
                stakeTokenAddress={pool?.stakingToken?.address[chainId as SupportedChainId] ?? ''}
              />
            </Flex>
          </>
        ),
      },
    }
  })
  return <ListView listViews={poolsListView} />
}

export default React.memo(DisplayPools)
