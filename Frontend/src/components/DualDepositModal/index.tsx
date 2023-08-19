import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import DualCurrencyPanel from 'components/DualCurrencyPanel/DualCurrencyPanel'
import { Field } from 'state/swap/actions'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { useCurrency } from 'hooks/Tokens'
import { Box } from 'theme-ui'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import DualActions from './DualActions'
import UpdateSlippage from './UpdateSlippage'
import { PRODUCT } from 'config/constants/misc'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { DualCurrencySelector } from 'views/Bonds/actions/types'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { useWeb3React } from '@web3-react/core'
import useDualDeposit from './hooks'
import { useV2Pair } from 'hooks/useV2Pairs'
import { Flex, Modal } from 'components/uikit'
import DistributionPanel from 'views/V2/Zap/components/DistributionPanel/DistributionPanel'
import { ZapType } from '@ape.swap/v2-zap-sdk'
import { Percent } from '@ape.swap/sdk-core'
import ModalProvider from 'contexts/ModalContext'

interface DualDepositModalProps {
  onDismiss: () => void
  setPendingDepositTrx: (value: boolean) => void
  pendingTx: boolean
  pid?: number
  allowance?: string
  token0?: string
  token1?: string
  lpAddress: string
  poolAddress: string
  onStakeLp?: any // (value: string) => void
  enableZap?: boolean
  product: PRODUCT
}

const modalProps = {
  sx: {
    zIndex: 11,
    maxHeight: 'calc(100% - 30px)',
    minWidth: ['90%', '420px'],
    width: '200px',
    maxWidth: '425px',
  },
}

const DualDepositModal: React.FC<DualDepositModalProps> = ({
  onDismiss,
  setPendingDepositTrx,
  pendingTx,
  pid,
  allowance,
  token0,
  token1,
  lpAddress,
  poolAddress,
  onStakeLp,
  enableZap,
  product,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { typedValue } = useZapState()
  const showApproveContract = !new BigNumber(allowance ?? 0).gt(0)
  const { onCurrencySelection, onUserInput, onSetZapType } = useZapActionHandlers()
  const lpCurrencies: any = {
    currencyA: useCurrency(token1),
    currencyB: useCurrency(token0),
  }
  const [currencyA, setCurrencyA] = useState(lpCurrencies.currencyA)
  const [currencyB, setCurrencyB] = useState(lpCurrencies.currencyB)
  const inputCurrencies = [currencyA, currencyB]
  const [, pair] = useV2Pair(inputCurrencies[0], inputCurrencies[1])
  const selectedCurrencyBalance = useCurrencyBalance(
    account ?? undefined,
    pair?.liquidityToken ?? currencyA ?? undefined,
  )
  const { zap } = useDerivedZapInfo()
  const [zapSlippage, setZapSlippage] = useUserZapSlippageTolerance()
  const priceImpact = new BigNumber(zap?.totalPriceImpact?.toFixed(2)).times(100).toNumber()
  const handleDeposit = useDualDeposit(!!currencyB, onStakeLp, pid ?? 0, setPendingDepositTrx, poolAddress, onDismiss)

  const onHandleValueChange = useCallback(
    (val: string) => {
      onUserInput(Field.INPUT, val)
    },
    [onUserInput],
  )

  const handleCurrencySelect = useCallback(
    (currency: DualCurrencySelector) => {
      setCurrencyA(currency?.currencyA)
      setCurrencyB(currency?.currencyB)
      onHandleValueChange('')
      if (!currency?.currencyB) {
        // if there's no currencyB use zap logic
        onCurrencySelection(Field.INPUT, [currency.currencyA])
        onCurrencySelection(Field.OUTPUT, [lpCurrencies.currencyA, lpCurrencies.currencyB])
      }
    },
    [lpCurrencies.currencyA, lpCurrencies.currencyB, onCurrencySelection, onHandleValueChange],
  )

  const handleMaxInput = useCallback(() => {
    onHandleValueChange(maxAmountSpend(selectedCurrencyBalance)?.toExact() ?? '0')
  }, [onHandleValueChange, selectedCurrencyBalance])

  const updateSlippage = useCallback(() => {
    if (zapSlippage.lessThan(priceImpact)) {
      const newZapSlippage = Math.round(priceImpact + 5)
      setZapSlippage(new Percent(newZapSlippage))
    }
  }, [priceImpact, setZapSlippage, zapSlippage])

  const showUpdateSlippage =
    zapSlippage.lessThan(priceImpact) &&
    !currencyB &&
    parseFloat(selectedCurrencyBalance?.toExact() ?? '0') >= parseFloat(typedValue)

  // reset input value to zero on first render
  useEffect(() => {
    onUserInput(Field.INPUT, '')
    onSetZapType(product === PRODUCT.DUAL_FARM ? ZapType.ZAP_MINI_APE : ZapType.ZAP_LP_POOL)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return (
    <ModalProvider>
      <Modal title={t('Stake LP tokens')} onDismiss={onDismiss} {...modalProps}>
        <Box sx={{ margin: '15px 0' }}>
          <DualCurrencyPanel
            handleMaxInput={handleMaxInput}
            onUserInput={onHandleValueChange}
            value={typedValue}
            onCurrencySelect={handleCurrencySelect}
            inputCurrencies={inputCurrencies}
            principalToken={pair?.liquidityToken ?? currencyA}
            lpList={[lpCurrencies]}
            enableZap={enableZap}
          />
        </Box>
        {!currencyB && typedValue && parseFloat(typedValue) > 0 && zap?.pairOut?.liquidityMinted && (
          <Flex sx={{ margin: '15px 0', fontWeight: 600 }}>
            <DistributionPanel zap={zap} hideTitle />
          </Flex>
        )}
        {showUpdateSlippage && <UpdateSlippage priceImpact={priceImpact} updateSlippage={updateSlippage} />}
        <DualActions
          lpToApprove={lpAddress}
          showApproveLpFlow={showApproveContract}
          pid={pid?.toString()}
          isZapSelected={!currencyB}
          inputError={
            parseFloat(typedValue) === 0 || !typedValue
              ? 'Enter an amount'
              : parseFloat(selectedCurrencyBalance?.toExact() ?? '0') < parseFloat(typedValue)
              ? 'Insufficient balance'
              : zapSlippage.lessThan(priceImpact) && !currencyB
              ? 'Change Slippage'
              : undefined
          }
          disabled={pendingTx || selectedCurrencyBalance?.toExact() === '0'}
          pendingTrx={pendingTx}
          handleAction={handleDeposit}
          product={product}
        />
      </Modal>
    </ModalProvider>
  )
}

export default React.memo(DualDepositModal)
