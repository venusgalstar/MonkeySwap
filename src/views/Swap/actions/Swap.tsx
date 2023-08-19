import { useCallback, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import useModal from 'hooks/useModal'
import { WrapErrorText, WrapInputError, WrapType } from 'hooks/useWrapCallback'
import { TradeState } from 'state/routing/types'
import ConfirmSwap from '../components/ConfirmSwap'
import { useRouter } from 'next/router'
import { useHideCircular } from 'hooks/useHideCircular'
import { ExchangeRateUpdateParams, Route } from '@lifi/sdk'
import track from 'utils/track'
import { getTxHashFromRoute, humanOutputAmount } from '../utils'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useERC20PermitFromTrade } from 'hooks/useERC20Permit'
import { Currency, CurrencyAmount, TradeType } from '@ape.swap/sdk-core'
import Approval from './Approval'
import { TransactionType } from 'state/transactions/types'
import { useAddTxFromHash } from 'state/transactions/hooks'
import { parseCurrency } from 'config/constants/lifiRouting'
import useSelectChain from 'hooks/useSelectChain'
import { ChainId, NETWORK_LABEL } from 'config/constants/chains'
import { useSwapCallback } from 'hooks/swap/useSwapCallback'

const Swap = ({
  routingState,
  selectedRoute,
  wrapType,
  showWrap,
  wrapInputError,
  onWrap,
  inputError,
  inputCurrencyAmount,
  feeStructure,
}: {
  routingState?: TradeState
  selectedRoute: Route | undefined
  showWrap: boolean | undefined
  wrapInputError: WrapInputError | undefined
  wrapType: WrapType | undefined
  onWrap: (() => Promise<void>) | undefined
  inputError?: string
  inputCurrencyAmount: CurrencyAmount<Currency> | undefined
  feeStructure: {
    fee: number
    tier: string
  }
}) => {
  const onSelectChain = useSelectChain()
  const { chainId } = useWeb3React()
  const [{ swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const transactionDeadline = useTransactionDeadline()
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(inputCurrencyAmount)

  const { state: signatureState, gatherPermitSignature } = useERC20PermitFromTrade(
    inputCurrencyAmount,
    transactionDeadline,
  )

  const showApproveFlow =
    (!inputError && approvalState === ApprovalState.NOT_APPROVED) || approvalState === ApprovalState.PENDING

  const router = useRouter()
  const hideCircular = useHideCircular()
  const addTransaction = useAddTxFromHash()

  const callback = useSwapCallback(selectedRoute)

  const [newRates, setNewRates] = useState<ExchangeRateUpdateParams | null>(null)
  const [confirmNewRates, setConfirmNewRates] = useState<((value: boolean) => void) | null>(null)

  const onAcceptExchangeRateUpdate = useCallback(
    (resolver: (value: boolean) => void, data: ExchangeRateUpdateParams) => {
      setSwapState({ attemptingTxn: true, swapErrorMessage: 'Exchange rate has changed!', txHash: undefined })
      setNewRates(data)
      setConfirmNewRates(() => (value: boolean) => {
        setSwapState({ attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined })
        resolver(value)
      })
    },
    [],
  )

  const acceptExchangeRateUpdateHook = useCallback(
    async (params: ExchangeRateUpdateParams) => {
      if (!onAcceptExchangeRateUpdate) {
        return false
      }
      return await new Promise<boolean>((resolve) => {
        onAcceptExchangeRateUpdate(resolve, params)
      })
    },
    [onAcceptExchangeRateUpdate],
  )

  const hasSetSwapStateRef = useRef(false)

  const updateRouteHook = useCallback(
    (route: Route) => {
      const foundTxHash = getTxHashFromRoute(route, true)
      if (foundTxHash && !txHash && !hasSetSwapStateRef.current) {
        setSwapState({
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: foundTxHash,
        })
        addTransaction(foundTxHash, {
          type: TransactionType.SWAP,
          tradeType: TradeType.EXACT_INPUT,
          inputCurrencyId: parseCurrency(route.fromToken.address),
          inputCurrencyAmountRaw: route.fromAmount,
          expectedOutputCurrencyAmountRaw: route.toAmount,
          outputCurrencyId: parseCurrency(route.toToken.address),
          minimumOutputCurrencyAmountRaw: route.toAmountMin,
        })
        hasSetSwapStateRef.current = true
      }
    },
    [addTransaction, txHash],
  )

  const handleSwap = useCallback(() => {
    if (!callback || !selectedRoute) return
    setSwapState({ attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined })
    callback(updateRouteHook, acceptExchangeRateUpdateHook)
      .then((res) => {
        if (!res) return
        setNewRates(null)
        setConfirmNewRates(null)
        track({
          event: 'Swap',
          chain: chainId,
          data: {
            inputToken: res?.fromToken.symbol,
            inputChain: res?.fromToken.chainId,
            outputToken: res?.toToken.symbol,
            outputChain: res?.toToken.chainId,
            inputValue: humanOutputAmount(res?.fromAmount, res?.fromToken?.decimals),
            outputValue: humanOutputAmount(res?.toAmount, res?.toToken?.decimals),
            inputUsdValue: res?.fromAmountUSD,
            outputUsdValue: res?.toAmountUSD,
            fee: feeStructure.fee,
            feeTier: feeStructure.tier,
            dex: res?.steps?.[0]?.toolDetails?.name,
          },
        })
        if (res?.toToken?.symbol?.toUpperCase() === 'BANANA' && !hideCircular) router.push('?modal=circular-buy')
      })
      .catch((error) => {
        setNewRates(null)
        setConfirmNewRates(null)
        setSwapState({
          attemptingTxn: false,
          swapErrorMessage: error.message ? error.message : error,
          txHash: undefined,
        })
      })
  }, [
    acceptExchangeRateUpdateHook,
    callback,
    chainId,
    feeStructure.fee,
    feeStructure.tier,
    hideCircular,
    router,
    selectedRoute,
    updateRouteHook,
  ])

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({
      attemptingTxn: false,
      swapErrorMessage: undefined,
      txHash: undefined,
    })
    setNewRates(null)
    setConfirmNewRates(null)
  }, [])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwap
      selectedRoute={selectedRoute!}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      onDismiss={handleConfirmDismiss}
      fee={feeStructure.fee}
      newRates={newRates}
      confirmNewRates={confirmNewRates}
    />,
    true,
    true,
    'swapConfirmModal',
  )

  const handleConfirmSwap = () => {
    //if (chainId === SupportedChainId.BSC && selectedRoute?.fromToken?.symbol?.toLowerCase() === 'banana' && !hideCircular) router.push('?modal=circular-sell')
    onPresentConfirmModal()
  }

  const shouldChangeChain = selectedRoute?.fromToken.chainId ? chainId !== selectedRoute?.fromToken.chainId : false
  const isCrossChain = selectedRoute?.fromToken?.chainId !== selectedRoute?.toToken?.chainId

  return (inputError || routingState === TradeState.NO_ROUTE_FOUND) && !showWrap ? (
    <Button fullWidth disabled>
      {routingState === TradeState.NO_ROUTE_FOUND ? 'No Route Found' : inputError}
    </Button>
  ) : shouldChangeChain ? (
    <Button
      fullWidth
      onClick={() => {
        if (selectedRoute?.fromToken?.chainId) {
          onSelectChain(selectedRoute?.fromToken?.chainId as unknown as ChainId)
        }
      }}
    >
      Switch to {NETWORK_LABEL[selectedRoute?.fromToken?.chainId as unknown as ChainId]}
    </Button>
  ) : showApproveFlow ? (
    <Approval
      signatureState={signatureState}
      approvalState={approvalState}
      gatherPermitSignature={gatherPermitSignature}
      approveCallback={approveCallback}
    />
  ) : showWrap ? (
    <Button disabled={Boolean(wrapInputError)} onClick={onWrap} fullWidth>
      {wrapInputError ? (
        <WrapErrorText wrapInputError={wrapInputError} />
      ) : wrapType === WrapType.WRAP ? (
        <>Wrap</>
      ) : wrapType === WrapType.UNWRAP ? (
        <>Unwrap</>
      ) : null}
    </Button>
  ) : (
    <Button
      fullWidth
      onClick={handleConfirmSwap}
      disabled={
        routingState === TradeState.LOADING ||
        routingState === TradeState.SYNCING ||
        routingState === TradeState.INVALID ||
        routingState === TradeState.NO_ROUTE_FOUND
      }
    >
      {isCrossChain ? 'Bridge' : 'Swap'}
    </Button>
  )
}

export default Swap
