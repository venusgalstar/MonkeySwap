import { Position } from '@ape.swap/v3-sdk'
import CurrencyLogo from 'components/CurrencyLogo'
import { Button, Flex, Skeleton, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'ethers'
import { useToken } from 'hooks/Tokens'
import useIsTickAtLimit from 'hooks/useIsTickAtLimit'
import useModal from 'hooks/useModal'
import { usePool } from 'hooks/usePools'
import { usePositionTokenURI } from 'hooks/usePositionTokenURI'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { useV3PositionFees } from 'hooks/useV3PositionFees'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import { useCallback, useMemo, useState } from 'react'
import { Image, Switch } from 'theme-ui'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { unwrappedToken } from 'utils/unwrappedToken'
import IncreaseLiquidity from 'views/IncreaseLiquidity'
import RemoveLiquidity from 'views/RemoveLiquidity'
import Claim from '../actions/Claim'
import { getPriceOrderingFromPosition, getRatio, positionInverter } from '../helpers'
import PriceRangeSection from './PriceRangeSection'
import styles from './styles'

const MobileLiquidityDetails = ({ selectedTokenId }: { selectedTokenId: string | undefined }) => {
  const parsedTokenId = selectedTokenId ? BigNumber.from(selectedTokenId) : undefined
  const { position: positionDetails } = useV3PositionFromTokenId(parsedTokenId)
  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
    tokenId,
  } = positionDetails || {}

  const removed = liquidity?.eq(0)

  const { t } = useTranslation()

  const metadata = usePositionTokenURI(parsedTokenId)

  const token0 = useToken(token0Address)
  const token1 = useToken(token1Address)

  const [token0PriceUsd, token0PriceUsdLoading] = useTokenPriceUsd(token0)
  const [token1PriceUsd, token1PriceUsdLoading] = useTokenPriceUsd(token1)

  const currency0 = token0 ? unwrappedToken(token0) : undefined
  const currency1 = token1 ? unwrappedToken(token1) : undefined

  // flag for receiving WETH
  const [receiveWETH, setReceiveWETH] = useState(false)
  const nativeCurrency = useNativeCurrency()
  const nativeWrappedSymbol = nativeCurrency.wrapped.symbol

  const [, pool] = usePool(token0 ?? undefined, token1 ?? undefined, feeAmount)

  const position = useMemo(() => {
    if (pool && liquidity && typeof tickLower === 'number' && typeof tickUpper === 'number') {
      return new Position({ pool, liquidity: liquidity.toString(), tickLower, tickUpper })
    }
    return undefined
  }, [liquidity, pool, tickLower, tickUpper])

  const pricesFromPosition = getPriceOrderingFromPosition(position)

  const [manuallyInverted, setManuallyInverted] = useState(false)

  const onHandleSetManuallyInverted = useCallback(() => {
    setManuallyInverted((prev) => !prev)
  }, [])

  // handle manual inversion
  const { priceLower, priceUpper, base } = positionInverter({
    priceLower: pricesFromPosition.priceLower,
    priceUpper: pricesFromPosition.priceUpper,
    quote: pricesFromPosition.quote,
    base: pricesFromPosition.base,
    invert: manuallyInverted,
  })

  const inverted = token1 ? base?.equals(token1) : undefined
  const currencyQuote = inverted ? currency0 : currency1
  const currencyBase = inverted ? currency1 : currency0

  const ratio = useMemo(() => {
    return priceLower && pool && priceUpper
      ? getRatio(
          inverted ? priceUpper.invert() : priceLower,
          pool.token0Price,
          inverted ? priceLower.invert() : priceUpper,
        )
      : undefined
  }, [inverted, pool, priceLower, priceUpper])

  const showCollectAsWeth = currency0?.isNative || currency1?.isNative

  const tickAtLimit = useIsTickAtLimit(feeAmount, tickLower, tickUpper)

  // check if price is within range
  const below = pool && typeof tickLower === 'number' ? pool.tickCurrent < tickLower : undefined
  const above = pool && typeof tickUpper === 'number' ? pool.tickCurrent >= tickUpper : undefined
  const inRange: boolean = typeof below === 'boolean' && typeof above === 'boolean' ? !below && !above : false

  // these currencies will match the feeValue{0,1} currencies for the purposes of fee collection
  const currency0ForFeeCollectionPurposes = pool ? (receiveWETH ? pool.token0 : unwrappedToken(pool.token0)) : undefined
  const currency1ForFeeCollectionPurposes = pool ? (receiveWETH ? pool.token1 : unwrappedToken(pool.token1)) : undefined

  const [feeValue0, feeValue1] = useV3PositionFees(pool ?? undefined, positionDetails?.tokenId, receiveWETH)

  const feeValueUpper = inverted ? feeValue0 : feeValue1
  const feeValueLower = inverted ? feeValue1 : feeValue0

  const feesUsdAmount = useMemo(() => {
    if (!feeValue0 || !feeValue1 || !token0PriceUsd || !token1PriceUsd) return null
    const amount0 = token0PriceUsd * parseFloat(feeValue0.toSignificant(6))
    const amount1 = token1PriceUsd * parseFloat(feeValue1.toSignificant(6))
    return amount0 + amount1
  }, [feeValue0, feeValue1, token0PriceUsd, token1PriceUsd])

  const liquidityUsdAmount = useMemo(() => {
    if (!position || !token0PriceUsd || !token1PriceUsd) return null
    const amount0 = token0PriceUsd * parseFloat(position.amount0.toSignificant(6))
    const amount1 = token1PriceUsd * parseFloat(position.amount1.toSignificant(6))
    return amount0 + amount1
  }, [position, token0PriceUsd, token1PriceUsd])

  const [onPresentRemoveLiquidityModal] = useModal(
    <RemoveLiquidity
      tokenId={tokenId?.toString()}
      token0Address={token0Address}
      token1Address={token1Address}
      feeAmount={feeAmount}
      inRange={inRange}
      onDismiss={() => null}
    />,
    true,
    true,
    'RemoveLiquidityModal',
  )

  const [onPresentIncreaseLiquidityModal] = useModal(
    <IncreaseLiquidity
      quoteCurrency={currencyQuote}
      baseCurrency={currencyBase}
      removed={removed}
      inRange={inRange}
      inverted={inverted}
      manuallyInverted={manuallyInverted}
      priceUpper={priceUpper}
      priceLower={priceLower}
      currentPosition={position}
      tickAtLimit={tickAtLimit}
      feeAmount={feeAmount}
      tokenId={tokenId}
      setManuallyInverted={onHandleSetManuallyInverted}
      onDismiss={() => null}
    />,
    true,
    true,
    'IncreaseLiquidityModal',
  )

  const valuesLoading = token0PriceUsdLoading || token1PriceUsdLoading || !position || !feeValue0 || !feeValue1
  return (
    <Flex
      sx={{
        height: 'fit-content',
        flexDirection: 'column',
        background: 'white4',
        width: '100%',
        padding: '15px',
        borderRadius: '0px 0px 10px 10px',
      }}
    >
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', padding: '5px 0px' }}>
        <Text>Liquidity</Text>
        <Text>
          {!valuesLoading ? `$${liquidityUsdAmount?.toFixed(2)}` : <Skeleton width="80px" animation="waves" />}
        </Text>
      </Flex>
      <Flex sx={{ ...styles.subContainer, padding: '5px 0px' }}>
        <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <CurrencyLogo currency={currencyQuote} size={18} />
            <Text ml="5px" size="14px">
              {currencyQuote?.symbol}
            </Text>
          </Flex>
          <Flex>
            {valuesLoading ? (
              <Skeleton width={100} animation="waves" />
            ) : (
              <>
                <Text size="14px" mr="10px">
                  {inverted ? position?.amount0.toSignificant(6) : position?.amount1.toSignificant(6)}
                </Text>
                <Text size="12px" opacity={0.7}>
                  {typeof ratio === 'number' && !removed ? <Text>{inverted ? ratio : 100 - ratio}%</Text> : null}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
        <Flex
          sx={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '25px',
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <CurrencyLogo currency={currencyBase} size={18} />
            <Text size="14px" ml="5px">
              {currencyBase?.symbol}
            </Text>
          </Flex>
          <Flex>
            {valuesLoading ? (
              <Skeleton width={100} animation="waves" />
            ) : (
              <>
                <Text size="14px" mr="10px">
                  {inverted ? position?.amount1.toSignificant(6) : position?.amount0.toSignificant(6)}
                </Text>
                <Text size="12px" opacity={0.7}>
                  {typeof ratio === 'number' && !removed ? <Text>{inverted ? 100 - ratio : ratio}%</Text> : null}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={{ padding: '10px 0px' }}>
        <Button size="sm" fullWidth mr="10px" onClick={onPresentIncreaseLiquidityModal} disabled={removed}>
          Add
        </Button>
        <Button size="sm" fullWidth onClick={onPresentRemoveLiquidityModal} disabled={removed}>
          Remove
        </Button>
      </Flex>
      <Flex
        sx={{
          height: '55%',
          mt: '10px',
          borderRadius: '10px',
          flexDirection: 'column',
          justifyContent: showCollectAsWeth ? 'space-between' : 'space-around',
        }}
      >
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Text size="16px">{t('Unclaimed Fees')}</Text>
          <Text>{valuesLoading ? <Skeleton width={80} animation="waves" /> : `$${feesUsdAmount?.toFixed(2)}`}</Text>
        </Flex>
        <Flex sx={{ ...styles.subContainer, padding: '10px 0px' }}>
          <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
            <Flex sx={{ alignItems: 'center' }}>
              <CurrencyLogo currency={feeValueUpper?.currency} size={18} />
              <Text ml="5px" size="14px">
                {feeValueUpper?.currency?.symbol}
              </Text>
            </Flex>
            <Flex>
              <Text size="14px" mr="10px">
                {valuesLoading ? (
                  <Skeleton width={80} animation="waves" />
                ) : feeValueUpper ? (
                  formatCurrencyAmount(feeValueUpper, 4)
                ) : (
                  '-'
                )}
              </Text>
            </Flex>
          </Flex>
          <Flex
            sx={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '25px',
            }}
          >
            <Flex sx={{ alignItems: 'center' }}>
              <CurrencyLogo currency={feeValueLower?.currency} size={18} />
              <Text ml="5px" size="14px">
                {feeValueLower?.currency?.symbol}
              </Text>
            </Flex>
            <Flex>
              <Text size="14px" mr="10px">
                {valuesLoading ? (
                  <Skeleton width={80} animation="waves" />
                ) : feeValueLower ? (
                  formatCurrencyAmount(feeValueLower, 4)
                ) : (
                  '-'
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {showCollectAsWeth && (
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Text size="14px">
              {t('Claim as ')}
              {nativeWrappedSymbol}
            </Text>
            <Flex>
              <Switch
                onChange={() => setReceiveWETH((receiveWETH) => !receiveWETH)}
                sx={{ background: 'navMenuLogo' }}
              />
            </Flex>
          </Flex>
        )}
        <Flex sx={{ margin: '10px 0px' }}>
          <Claim
            currency0ForFeeCollectionPurposes={currency0ForFeeCollectionPurposes}
            currency1ForFeeCollectionPurposes={currency1ForFeeCollectionPurposes}
            tokenId={tokenId}
            feeValue0={feeValue0}
            feeValue1={feeValue1}
            fullWidth
          />
        </Flex>
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '20px' }}>
        {'result' in metadata ? (
          <Image
            src={metadata.result.image || ''}
            alt={selectedTokenId || ''}
            height={100}
            width={100}
            sx={{ width: '90%' }}
          />
        ) : (
          <Skeleton sx={{ height: '100%', width: '100%' }} animation="waves" />
        )}
      </Flex>
      <PriceRangeSection
        currencyQuote={currencyQuote}
        currencyBase={currencyBase}
        removed={removed}
        inRange={inRange}
        inverted={inverted}
        manuallyInverted={manuallyInverted}
        pool={pool}
        priceUpper={priceUpper}
        priceLower={priceLower}
        tickAtLimit={tickAtLimit}
        setManuallyInverted={onHandleSetManuallyInverted}
      />
    </Flex>
  )
}

export default MobileLiquidityDetails
