import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Farm, FarmTypes } from 'state/farms/types'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView/ListView'
import { Button, Flex, Svg, Text } from 'components/uikit'
import ListViewContent from 'components/ListView/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { ListTagVariants } from 'components/uikit/Tag/types'
import { styles } from './styles'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import Tooltip from 'components/Tooltip/Tooltip'
import Harvest from '../actions/Harvest'
import CardActions from '../actions'
import CalcButton from 'components/RoiCalculator/CalcButton'
import DualLiquidityModal from 'components/DualAddLiquidity/DualLiquidityModal'
import useModal from 'hooks/useModal'
import { useAppDispatch } from 'state/hooks'
import { selectOutputCurrency } from 'state/zap/actions'
import { Field, selectCurrency } from 'state/swap/actions'

// Components
import NetworkModal from 'components/NetworkSelector/NetworkModal'

const DisplayFarms = ({
  farms,
  openPid,
  farmTags,
  isActive,
}: {
  farms: Farm[]
  openPid?: string | null
  farmTags?: any[]
  isActive: boolean
}) => {
  const { query, replace } = useRouter()
  //const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [onPresentAddLiquidityModal] = useModal(<DualLiquidityModal />, true, true, 'liquidityWidgetModal')
  const [onPresentWalletConnectModal] = useModal(
    <NetworkModal displayAll={false} onDismiss={() => null} />,
    true,
    true,
    'NetworkModal',
  )

  const { switchChain = false } = query

  useEffect(() => {
    if (switchChain) {
      onPresentWalletConnectModal()
      replace('/farms', undefined, { shallow: true })
    }
  }, [])

  const showLiquidity = (token: any, quoteToken: any, farm: Farm) => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: token,
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: quoteToken,
      }),
    )
    dispatch(
      selectOutputCurrency({
        currency1: farm.tokenAddress,
        currency2: farm.quoteTokenAddress,
      }),
    )
    onPresentAddLiquidityModal()
  }

  const farmsListView = farms.map((farm) => {
    const token0 = farm.tokenSymbol
    const token1 = farm.quoteTokenSymbol
    const userAllowance = farm?.userData?.allowance
    const userEarnings = getBalanceNumber(new BigNumber(farm?.userData?.rewards ?? 0))?.toFixed(3)
    //const userSecondEarnings = getBalanceNumber(new BigNumber(farm?.userData?.secondRewards ?? 0))?.toFixed(2)
    const userEarningsUsd = `$${(farm.farmType === FarmTypes.DUAL_FARM
      ? getBalanceNumber(new BigNumber(farm?.userData?.rewards ?? 0)) * farm.earnTokenPrice +
        getBalanceNumber(new BigNumber(farm?.userData?.secondRewards ?? 0)) * (farm?.secondEarnTokenPrice ?? 0)
      : getBalanceNumber(new BigNumber(farm?.userData?.rewards ?? 0)) * farm.earnTokenPrice
    ).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(new BigNumber(farm?.userData?.tokenBalance ?? 0))?.toFixed(6)} LP`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(new BigNumber(farm?.userData?.tokenBalance ?? 0) || new BigNumber(0)) * (farm?.lpValueUsd ?? 0)
    ).toFixed(2)}`
    const fTag = farmTags?.find((tag) => tag.pid === farm.pid)
    return {
      tokenDisplayProps: {
        token1: farm.pid === 184 ? 'NFTY2' : token0,
        token2: token1,
        token3:
          farm.farmType === FarmTypes.MASTER_CHEF_V1 || farm.farmType === FarmTypes.MASTER_CHEF_V2
            ? 'BANANA'
            : farm.rewardToken.symbol,
        token4:
          farm.farmType === FarmTypes.DUAL_FARM
            ? farm?.dualImage !== false
              ? farm.pid === 11
                ? 'NFTY2'
                : farm?.secondRewardToken?.symbol
              : undefined
            : undefined,
        stakeLp: true,
      },
      listProps: {
        id: farm.id,
        open: openPid ? farm.pid === parseInt(openPid) : false,
        title: (
          <ListViewContent
            // @ts-ignore
            tag={fTag?.pid === farm.pid ? (fTag?.text.toLowerCase() as ListTagVariants) : null}
            value={farm?.lpStakeTokenSymbol}
            style={{ maxWidth: '170px' }}
          />
        ),
        titleWidth: '290px',
        infoContent: (
          <Tooltip
            valueTitle={t('Multiplier')}
            valueContent={farm?.multiplier ?? '0X'}
            secondURL={farm?.projectLink}
            secondURLTitle={t('Learn More')}
            tokenContract={farm?.lpStakeTokenAddress}
            jungleFarm={farm}
          />
        ),
        cardContent: (
          <Flex sx={styles.cardContent}>
            <ListViewContent
              title={t('APY')}
              value={parseFloat(farm?.apy ?? '0') > 1000000 ? `>1,000,000%` : `${farm?.apy}%`}
              toolTip={t(
                'APY includes annualized BANANA rewards and rewards for providing liquidity (DEX swap fees), compounded daily.',
              )}
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(8%, 0%)"
              aprCalculator={
                farm.farmType !== FarmTypes.JUNLGE_FARM && (
                  <CalcButton
                    label={farm.lpStakeTokenSymbol}
                    rewardTokenName="BANANA"
                    rewardTokenPrice={farm.earnTokenPrice}
                    apr={parseFloat(farm?.apr ?? '0')}
                    lpApr={parseFloat(farm?.lpApr ?? '0')}
                    apy={parseFloat(farm?.apy ?? '0')}
                    lpAddress={farm.lpStakeTokenAddress}
                    isLp
                    tokenAddress={farm.tokenAddress}
                    quoteTokenAddress={farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAddress}
                    lpCurr1={farm?.tokenAddress}
                    lpCurr2={farm?.quoteTokenAddress}
                  />
                )
              }
              style={styles.apyInfo}
            />
            <Flex sx={{ ...styles.onlyDesktop, maxWidth: '180px', width: '100%' }}>
              <ListViewContent
                title={t('APR')}
                value={`${isActive ? farm?.apr : 0}%`}
                value2={`${farm?.lpApr ?? 0}%`}
                value2Icon={
                  <span style={{ marginRight: '7px', transform: 'rotate(45deg)' }}>
                    <Svg icon="swapArrows" width={13} color="text" />
                  </span>
                }
                valueIcon={
                  <span style={{ marginRight: '5px' }}>
                    <ServiceTokenDisplay token1={farm.rewardToken.symbol} size={12} />
                  </span>
                }
                toolTip={t(
                  'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(8%, 0%)"
                value2Direction="column"
                style={styles.farmInfo}
              />
            </Flex>
            <Flex sx={{ ...styles.onlyDesktop, maxWidth: '180px', width: '100%' }}>
              <ListViewContent
                title={t('Liquidity')}
                value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
                toolTip={t('The total value of the LP tokens currently staked in this farm.')}
                toolTipPlacement={'bottomLeft'}
                toolTipTransform={'translate(23%, 0%)'}
                style={styles.farmInfo}
              />
            </Flex>
            <ListViewContent title={t('Earned')} value={userEarningsUsd} style={styles.earnedInfo} />
          </Flex>
        ),
        expandedContent: (
          <Flex sx={styles.expandedContent}>
            <Flex sx={{ ...styles.onlyMobile, width: '100%' }}>
              <ListViewContent
                title={t('APR')}
                value={`${farm?.lpApr}%`}
                valueIcon={
                  <span style={{ marginRight: '7px', transform: 'rotate(45deg)' }}>
                    <Svg icon="swapArrows" width={13} color="text" />
                  </span>
                }
                value2={`${farm?.apr}%`}
                value2Icon={
                  <span style={{ marginRight: '5px' }}>
                    <Svg icon="banana_token" width={15} color="text" />
                  </span>
                }
                toolTip={t(
                  'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(8%, 0%)"
                style={styles.farmInfo}
              />
              <ListViewContent
                title={t('Liquidity')}
                value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
                toolTip={t('The total value of the LP tokens currently staked in this farm.')}
                toolTipPlacement={'bottomLeft'}
                toolTipTransform={'translate(23%, 0%)'}
                style={styles.farmInfo}
              />
            </Flex>
            <Flex sx={styles.actionContainer}>
              <ListViewContent
                title={t('Available')}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                value2Direction="column"
                style={{ maxWidth: '50%', flexDirection: 'column' }}
              />
              <Flex
                sx={{
                  width: '100%',
                  maxWidth: ['130px', '130px', '130px', '140px'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={() =>
                    showLiquidity(
                      farm.tokenAddress,
                      farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAddress,
                      farm,
                    )
                  }
                  sx={{ ...styles.styledBtn, alignItems: 'flex-start' }}
                >
                  <Text sx={{ lineHeight: '18px', mr: '5px' }} color="primaryBright">
                    {t('GET LP')}
                  </Text>
                  <span sx={{ ml: '5px' }}>
                    <Svg icon="ZapIcon" color="primaryBright" />
                  </span>
                </Button>
              </Flex>
            </Flex>
            <Flex sx={{ ...styles.onlyDesktop, mx: '10px' }}>
              <Svg icon="caret" direction="right" width="20px" />
            </Flex>
            <CardActions
              allowance={userAllowance?.toString() ?? ''}
              stakedBalance={farm?.userData?.stakedBalance?.toString() ?? ''}
              stakingTokenBalance={farm?.userData?.tokenBalance?.toString() ?? ''}
              stakeLpAddress={farm.lpStakeTokenAddress}
              lpValueUsd={farm.lpValueUsd ?? 0}
              pid={farm.pid}
              id={farm.id}
              farmTypes={farm.farmType}
              contractAddress={farm?.contractAddress}
            />
            <Flex sx={{ ...styles.onlyDesktop, mx: '10px' }}>
              <Svg icon="caret" direction="right" width="20px" />
            </Flex>
            <Harvest
              id={farm.id}
              pid={farm.pid}
              disabled={userEarnings === '0.000'}
              userEarnings={userEarnings}
              userEarningsUsd={userEarningsUsd}
              farmType={farm.farmType}
              contractAddress={farm?.contractAddress}
              earnTokenSymbol={farm?.rewardToken?.symbol}
            />
          </Flex>
        ),
      },
    }
  })

  return (
    <Flex mt="20px">
      <ListView listViews={farmsListView} />
    </Flex>
  )
}

export default DisplayFarms
