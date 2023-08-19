import { Modal } from 'components/uikit'
import React, { useEffect } from 'react'
import {
  ConfirmationPendingContent,
  TransactionErrorContent,
  TransactionSubmittedContent,
} from 'components/TransactionConfirmationModal'
import { useTranslation } from 'contexts/Localization'
import { ChainId, getChainInfo } from 'config/constants/chains'
import { useZapState } from 'state/zap/hooks'
import { useWeb3React } from '@web3-react/core'
import { MergedZap } from 'state/zap/actions'

export interface ZapConfirmationModalProps {
  title?: string
  onDismiss: () => void
  txHash?: string
  zap: MergedZap
  zapErrorMessage?: string
}

const ZapConfirmationModal: React.FC<ZapConfirmationModalProps> = ({
  zap,
  title,
  onDismiss,
  txHash,
  zapErrorMessage,
}) => {
  const { currencyIn, pairOut } = zap
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const { typedValue } = useZapState()
  const chainParams = getChainInfo(chainId as ChainId)
  const currencyInputSymbol =
    currencyIn?.currency?.symbol === 'ETH' ? chainParams?.nativeCurrency.symbol : currencyIn?.currency?.symbol

  const pendingText = `Zapping ${typedValue} ${currencyInputSymbol}
   into ${pairOut?.liquidityMinted?.toSignificant(4)} ${pairOut?.pair?.token0?.wrapped?.symbol}-${
    pairOut?.pair?.token1?.wrapped?.symbol
  } LP`

  return (
    <Modal
      title={title}
      onDismiss={onDismiss}
      sx={{
        zIndex: 120,
        overflowY: 'auto',
        maxHeight: 'calc(100% - 30px)',
        width: '380px',
      }}
    >
      {zapErrorMessage ? (
        <TransactionErrorContent
          onDismiss={onDismiss}
          message={
            zapErrorMessage.includes('INSUFFICIENT')
              ? t('Slippage Error: Please check your slippage using the ⚙️ icon & try again!')
              : zapErrorMessage.includes('user rejected transaction')
              ? t('Transaction rejected')
              : zapErrorMessage
          }
        />
      ) : !txHash ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : (
        <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} LpToAdd={pairOut?.pair ?? undefined} />
      )}
    </Modal>
  )
}

export default React.memo(ZapConfirmationModal)
