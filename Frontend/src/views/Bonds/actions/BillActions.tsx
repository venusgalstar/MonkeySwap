import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useApproveBill from '../hooks/useApproveBill'
import { ApprovalState, useApproveCallbackFromZap } from 'hooks/useApproveCallback'
import { BillActionsProps } from './types'
import { useWeb3React } from '@web3-react/core'
import { BuyButton } from './styles'
import { Button } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import { TradeState } from 'state/routing/types'
import { getBNWithDecimals } from '../../../utils/getBalanceNumber'
import { useToastError } from '../../../state/application/hooks'
import { fetchBillsUserDataAsync } from '../../../state/bills'
import { useAppDispatch } from '../../../state/hooks'

const BillActions: React.FC<BillActionsProps> = ({
  bill,
  zap,
  currencyB,
  handleBuy,
  billValue,
  zapRouteState,
  value,
  purchaseLimit,
  balance,
  pendingTrx,
  errorMessage,
}) => {
  const { lpToken, contractAddress } = bill
  const [slippage] = useUserZapSlippageTolerance()
  const [approval, approveCallback] = useApproveCallbackFromZap(zap, slippage)
  const showApproveZapFlow = approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING
  const toastError = useToastError()
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()

  const { onApprove } = useApproveBill(
    lpToken?.address?.[chainId as SupportedChainId] ?? '',
    contractAddress[chainId as SupportedChainId] ?? '',
  )

  const showApproveLP = getBNWithDecimals(
    bill?.userData?.allowance,
    (bill?.lpToken?.decimals?.[chainId as SupportedChainId] as number) ?? 18,
  )?.lt(value)

  const [pendingApprove, setPendingApprove] = useState(false)
  const { t } = useTranslation()

  const handleLPApprove = async () => {
    setPendingApprove(true)
    await onApprove()
      .then(() => {
        dispatch(fetchBillsUserDataAsync(chainId as SupportedChainId, account as string))
      })
      .catch((e) => {
        console.error(e)
        toastError(e)
      })
      .finally(() => {
        setPendingApprove(false)
      })
  }

  return (
    <>
      {!currencyB && showApproveZapFlow ? (
        <Button
          onClick={approveCallback}
          disabled={approval !== ApprovalState.NOT_APPROVED}
          load={approval === ApprovalState.PENDING}
          fullWidth
        >
          {approval === ApprovalState.PENDING
            ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
            : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
        </Button>
      ) : currencyB && showApproveLP ? (
        <Button onClick={handleLPApprove} load={pendingApprove} disabled={pendingApprove} fullWidth>
          {t('Enable')}
        </Button>
      ) : (
        <BuyButton
          onClick={handleBuy}
          load={pendingTrx || zapRouteState === TradeState.LOADING}
          disabled={
            billValue === 'NaN' ||
            parseFloat(billValue) < 0.01 ||
            parseFloat(billValue) > parseFloat(purchaseLimit) ||
            parseFloat(balance) < parseFloat(value) ||
            pendingApprove ||
            pendingTrx ||
            !!errorMessage ||
            zapRouteState === TradeState.LOADING
          }
        >
          {errorMessage && !pendingTrx ? errorMessage : t('Buy')}
        </BuyButton>
      )}
    </>
  )
}

export default React.memo(BillActions)
