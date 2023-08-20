import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { BuyProps, DualCurrencySelector } from './types'
import { styles } from './styles'
import DualCurrencyPanel from 'components/DualCurrencyPanel/DualCurrencyPanel'
import { ZapType } from '@ape.swap/sdk'
import { useCurrency } from 'hooks/Tokens'
import { Box } from 'theme-ui'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import BillActions from './BillActions'
import track from 'utils/track'
import UpdateSlippage from 'components/DualDepositModal/UpdateSlippage'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import { Currency, Percent, SupportedChainId } from '@ape.swap/sdk-core'
import useBuyBill from '../hooks/useBuyBill'
import { Button, Flex, Svg, Text } from 'components/uikit'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { BillValueContainer, TextWrapper } from '../components/Modals/styles'
import { useBillType } from '../hooks/useBillType'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useV2Pair } from 'hooks/useV2Pairs'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { useZapCallback } from 'hooks/useZapCallback'
import BigNumber from 'bignumber.js'
import useAddLiquidityModal from 'components/DualAddLiquidity/hooks/useAddLiquidityModal'
import { useToastError } from 'state/application/hooks'
import { LiquidityDex, dexFactories, dexToZapMapping, ZapVersion, dexDisplayAttributes } from '@ape.swap/apeswap-lists'
import { useRouter } from 'next/router'

const Buy: React.FC<BuyProps> = ({ bill, onBillId, onTransactionSubmited }) => {
  const { push } = useRouter()

  const {
    token,
    quoteToken,
    lpToken,
    contractAddress,
    price,
    lpPrice,
    earnToken,
    earnTokenPrice,
    maxTotalPayOut,
    totalPayoutGiven,
    billNftAddress,
    maxPayoutTokens,
  } = bill
  const onAddLiquidityModal = useAddLiquidityModal(undefined, true)
  const { chainId, account, provider } = useWeb3React()
  const { recipient, typedValue } = useZapState()
  const billType = useBillType(contractAddress[chainId as SupportedChainId] ?? '')
  const { onBuyBill } = useBuyBill(
    contractAddress[chainId as SupportedChainId] ?? '',
    typedValue,
    lpPrice ?? 0,
    price ?? '',
    lpToken?.decimals?.[chainId as SupportedChainId],
  )
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { t } = useTranslation()
  const toastError = useToastError()

  const billsCurrencies = {
    currencyA: useCurrency(token.address[chainId as SupportedChainId]),
    currencyB: useCurrency(quoteToken.address[chainId as SupportedChainId]),
  }
  const [currencyA, setCurrencyA] = useState(billsCurrencies.currencyA)
  const [currencyB, setCurrencyB] = useState(billsCurrencies.currencyB)
  const inputCurrencies = [currencyA, currencyB]

  const liquidityDex = lpToken.liquidityDex?.[chainId as SupportedChainId] || LiquidityDex.ApeSwapV2;
  const dexData = dexFactories[chainId as SupportedChainId]?.[liquidityDex];
  const principalToken = useCurrency(lpToken.address[chainId as SupportedChainId]);

  const selectedCurrencyBalance = useCurrencyBalance(
    account ?? undefined,
    inputCurrencies[1] ? (principalToken ?? currencyA ?? undefined) : (currencyA ?? undefined),
  )

  //zapVersion ZapV1, ZapV2, Wido or External LP (no zap)
  const zapVersion = dexToZapMapping[liquidityDex]?.[chainId as SupportedChainId];
  const { zap, zapRouteState } = useDerivedZapInfo()
  const [zapSlippage, setZapSlippage] = useUserZapSlippageTolerance()

  const { onCurrencySelection, onUserInput } = useZapActionHandlers()
  const maxPrice = new BigNumber(price ?? 0).times(102).div(100).toFixed(0)
  const { callback: zapCallback } = useZapCallback(
    zap,
    ZapType.ZAP_T_BILL,
    zapSlippage,
    recipient,
    contractAddress[chainId as SupportedChainId] || '',
    maxPrice,
  )
  const rawPriceImpact = new BigNumber(zap?.totalPriceImpact?.toFixed(2) ?? '0').times(100).toNumber()
  const priceImpact = useMemo(() => new Percent(rawPriceImpact, 10_000), [rawPriceImpact])

  const showUpdateSlippage =
    zapSlippage.lessThan(priceImpact) &&
    !currencyB &&
    parseFloat(selectedCurrencyBalance?.toExact() ?? '0') >= parseFloat(typedValue)

  const updateSlippage = useCallback(() => {
    if (zapSlippage.lessThan(priceImpact)) {
      const newZapSlippage = Math.round(rawPriceImpact + 5)
      const newSlippagePercent = new Percent(newZapSlippage, 10_000)
      setZapSlippage(newSlippagePercent)
    }
  }, [priceImpact, rawPriceImpact, setZapSlippage, zapSlippage])

  const originalSlippage = useMemo(() => {
    return zapSlippage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // this logic prevents user to initiate a tx for a higher bill value than the available amount
  const consideredValue = currencyB ? typedValue : zap?.pairOut?.liquidityMinted?.toExact()
  const bigValue = new BigNumber(consideredValue).times(new BigNumber(10).pow(18))
  const billValue = bigValue.div(new BigNumber(price ?? 0))?.toString()
  const available = new BigNumber(maxTotalPayOut ?? 0)
    ?.minus(new BigNumber(totalPayoutGiven ?? 0))
    ?.div(new BigNumber(10).pow(earnToken?.decimals?.[chainId as SupportedChainId] ?? 18))
  // threshold equals to 10 usd in earned tokens (banana or jungle token)
  const thresholdToShow = new BigNumber(5).div(earnTokenPrice ?? 0)
  const safeAvailable = available.minus(thresholdToShow)
  const singlePurchaseLimit = new BigNumber(maxPayoutTokens ?? 0).div(
    new BigNumber(10).pow(earnToken?.decimals?.[chainId as SupportedChainId] ?? 18),
  )
  const displayAvailable = singlePurchaseLimit.lt(safeAvailable) ? singlePurchaseLimit : safeAvailable

  const sendToExternalLpUrl = () => {
    if (lpToken.getLpUrl?.[chainId as SupportedChainId]) {
      window.open(lpToken.getLpUrl?.[chainId as SupportedChainId]!, '_blank');
    } else {
      throw new Error('External lp url not found. Please contact support')
    }
  }

  const onHandleValueChange = useCallback(
    (val: string) => {
      onUserInput(Field.INPUT, val)
    },
    [onUserInput],
  )

  useEffect(() => {
    //reset zap state on mount
    onHandleValueChange('')
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  const searchForBillId = useCallback(
    (resp: any, billNftAddress: string) => {
      const { logs, transactionHash } = resp
      const findBillNftLog = logs.find((log: any) => log.address.toLowerCase() === billNftAddress.toLowerCase())
      const getBillNftIndex = findBillNftLog.topics[findBillNftLog.topics.length - 1]
      const convertHexId = parseInt(getBillNftIndex, 16)
      onBillId(convertHexId.toString(), transactionHash)
    },
    [onBillId],
  )

  const handleBuy = useCallback(async () => {
    if (!provider || !chainId || !billNftAddress || !account) return
    setPendingTrx(true)
    onTransactionSubmited(true)
    if (currencyB) {
      await onBuyBill()
        .then((resp: any) => {
          searchForBillId(resp, billNftAddress)
          dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
          dispatch(fetchBillsUserDataAsync(chainId, account))
        })
        .catch((e) => {
          console.error(e)
          toastError(e)
          setPendingTrx(false)
          onTransactionSubmited(false)
        })
    } else {
      await zapCallback()
        .then((hash: any) => {
          setPendingTrx(true)
          setZapSlippage(originalSlippage)
          provider
            ?.waitForTransaction(hash)
            .then((receipt) => {
              const { logs } = receipt
              const findBillNftLog = logs.find((log) => log.address.toLowerCase() === billNftAddress?.toLowerCase())
              const getBillNftIndex = findBillNftLog?.topics[findBillNftLog.topics.length - 1]
              const convertHexId = parseInt(getBillNftIndex ?? '', 16)
              onBillId(convertHexId.toString(), hash)
              dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
              dispatch(fetchBillsUserDataAsync(chainId, account))
            })
            .catch((e) => {
              console.error(e)
              setPendingTrx(false)
              onTransactionSubmited(false)
            })
          track({
            event: 'zap',
            chain: chainId,
            data: {
              cat: 'bill',
              token1: zap.currencyIn.currency.symbol,
              token2: `${zap.currencyOut1.outputCurrency.symbol}-${zap.currencyOut2.outputCurrency.symbol}`,
              amount: getBalanceNumber(new BigNumber(zap.currencyIn.inputAmount.toString())),
            },
          })
          track({
            event: 'bond',
            chain: chainId,
            data: {
              cat: 'buy',
              type: billType ?? '',
              address: contractAddress[chainId as SupportedChainId],
              typedValue,
              usdAmount: parseFloat(zap?.pairOut?.liquidityMinted?.toExact()) * (lpPrice ?? 0),
            },
          })
        })
        .catch((e: any) => {
          setZapSlippage(originalSlippage)
          console.error(e)
          toastError(e)
          setPendingTrx(false)
          onTransactionSubmited(false)
        })
    }
  }, [
    account,
    chainId,
    currencyB,
    provider,
    billNftAddress,
    onBillId,
    dispatch,
    onBuyBill,
    onTransactionSubmited,
    searchForBillId,
    zapCallback,
    zap,
    typedValue,
    billType,
    contractAddress,
    lpPrice,
    originalSlippage,
    setZapSlippage,
    toastError,
  ])

  const handleMaxInput = useCallback(() => {
    onHandleValueChange(maxAmountSpend(selectedCurrencyBalance)?.toExact() ?? '')
  }, [onHandleValueChange, selectedCurrencyBalance])

  const handleCurrencySelect = useCallback(
    (currency: DualCurrencySelector) => {
      setCurrencyA(currency?.currencyA)
      setCurrencyB(currency?.currencyB ?? null)
      onHandleValueChange('')
      if (!currency?.currencyB) {
        // if there's no currencyB use zap logic
        onCurrencySelection(Field.INPUT, [currency.currencyA])
        // @ts-ignore
        onCurrencySelection(Field.OUTPUT, [billsCurrencies?.currencyA, billsCurrencies?.currencyB])
      }
    },
    [billsCurrencies.currencyA, billsCurrencies.currencyB, onCurrencySelection, onHandleValueChange],
  )

  return (
    <Flex sx={styles.buyContainer}>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <DualCurrencyPanel
          handleMaxInput={handleMaxInput}
          onUserInput={onHandleValueChange}
          value={typedValue}
          onCurrencySelect={handleCurrencySelect}
          // @ts-ignore
          inputCurrencies={billType !== 'reserve' ? inputCurrencies : [inputCurrencies[0]]}
          // @ts-ignore
          lpList={[billsCurrencies]}
          principalToken={principalToken}
          enableZap={billType !== 'reserve' && zapVersion !== ZapVersion.External}
          lpUsdVal={lpPrice}
          dexData={dexData}
        />
      </Flex>
      <Flex sx={styles.detailsContainer}>
        <BillValueContainer>
          <TextWrapper>
            <Text size="12px" pr={1}>
              {t('Bond Value')}:{' '}
              <span style={{ fontWeight: 700 }}>
                {billValue === 'NaN' ? '0' : parseFloat(billValue)?.toLocaleString(undefined)} {earnToken?.symbol}
              </span>
            </Text>
          </TextWrapper>
          <TextWrapper>
            <Text size="12px">
              {t('Max per Bond')}:{' '}
              <span style={{ fontWeight: 700 }}>
                {!available ? '0' : parseFloat(displayAvailable.toString())?.toLocaleString(undefined)}{' '}
                {earnToken?.symbol}
              </span>
            </Text>
          </TextWrapper>
        </BillValueContainer>
        <Flex sx={styles.buttonsContainer}>
          {billType !== 'reserve' && (
            <Box sx={styles.getLpContainer}>
              <Button
                variant="secondary"
                onClick={() => zapVersion == ZapVersion.External ? sendToExternalLpUrl() : onAddLiquidityModal(token, quoteToken, '', '', false)}
                sx={{ width: '100%' }}
              >
                {t('Get LP')}
                <Flex sx={{ ml: '10px' }}>
                  {zapVersion !== ZapVersion.External
                    ?
                    <Svg icon="ZapIcon" color="yellow" />
                    :
                    <img src={dexDisplayAttributes[lpToken.liquidityDex?.[chainId as SupportedChainId] ?? LiquidityDex.ApeSwapV2].icon ?? ''} width={20}></img>}
                </Flex>
              </Button>
            </Box>
          )}
          <Box sx={billType !== 'reserve' ? styles.buyButtonContainer : styles.buyButtonContainerFull}>
            <BillActions
              bill={bill}
              zap={zap}
              zapRouteState={zapRouteState}
              currencyB={currencyB as Currency}
              handleBuy={handleBuy}
              billValue={billValue}
              value={typedValue}
              purchaseLimit={displayAvailable.toString()}
              balance={selectedCurrencyBalance?.toExact() ?? ''}
              pendingTrx={pendingTrx}
              errorMessage={
                zapSlippage && zapSlippage.lessThan(priceImpact ?? '0') && !currencyB ? 'Change Slippage' : null
              }
            />
          </Box>
          {showUpdateSlippage && !pendingTrx && (
            <Flex sx={styles.updateSlippage}>
              <UpdateSlippage priceImpact={rawPriceImpact} updateSlippage={updateSlippage} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(Buy)
