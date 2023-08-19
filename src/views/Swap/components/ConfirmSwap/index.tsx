import {
  ConfirmationPendingContent,
  TransactionErrorContent,
  TransactionSubmittedContent,
} from 'components/TransactionConfirmationModal'
import { Flex, Modal } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { ExchangeRateUpdateParams, Route } from '@lifi/sdk'
import { humanOutputAmount } from '../../utils'
import ConfirmTxPanel from './ConfirmTxPanel'

const ConfirmSwap = ({
  selectedRoute,
  attemptingTxn,
  txHash,
  swapErrorMessage,
  onConfirm,
  onDismiss,
  fee,
  newRates,
  confirmNewRates,
}: {
  selectedRoute: Route
  attemptingTxn: boolean
  txHash: string | undefined
  swapErrorMessage: string | undefined
  onConfirm?: () => void
  onDismiss: () => void
  fee: number
  newRates: ExchangeRateUpdateParams | null
  confirmNewRates: ((value: boolean) => void) | null
}) => {
  const { t } = useTranslation()

  const shortInputAmount = humanOutputAmount(selectedRoute?.fromAmount, selectedRoute?.fromToken?.decimals)
  const shortExpectedOutputAmount = humanOutputAmount(
    newRates?.newToAmount ?? selectedRoute?.toAmount,
    selectedRoute?.toToken?.decimals,
  )

  // text to show while loading
  const pendingText = `${t('Swapping')} ${shortInputAmount ?? ''} ${selectedRoute?.fromToken?.symbol ?? ''} for ${
    shortExpectedOutputAmount ?? ''
  } ${selectedRoute?.toToken?.symbol ?? ''}`
  const errorText = swapErrorMessage?.includes('INSUFFICIENT_OUTPUT_AMOUNT')
    ? t('Slippage Error: Please check your slippage using the ⚙️ icon & try again!')
    : swapErrorMessage?.includes('user rejected transaction')
    ? t('Did you reject the transaction? I thought you were an Ape!')
    : swapErrorMessage?.includes('transaction failed')
    ? t('It seems your transaction failed. Please check your tokens, amounts and slippage, then try again')
    : swapErrorMessage

  const modalTitle = swapErrorMessage?.includes('user rejected transaction')
    ? 'Transaction Rejected'
    : swapErrorMessage?.includes('Exchange rate has changed!')
    ? 'Rate Changed'
    : swapErrorMessage?.includes('transaction failed')
    ? 'Transaction failed'
    : selectedRoute?.fromToken?.chainId !== selectedRoute?.toToken?.chainId
    ? 'Confirm Bridge'
    : 'Confirm Swap'

  return (
    <Modal title={modalTitle}>
      <Flex sx={{ width: '420px', maxWidth: '100%', flexDirection: 'column' }}>
        {swapErrorMessage && errorText ? (
          <TransactionErrorContent
            onDismiss={onDismiss}
            message={errorText}
            newRates={newRates}
            confirmNewRates={confirmNewRates}
          />
        ) : attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : txHash ? (
          <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} />
        ) : (
          <ConfirmTxPanel selectedRoute={selectedRoute} fee={fee} onConfirm={onConfirm} />
        )}
      </Flex>
    </Modal>
  )
}

export default ConfirmSwap
