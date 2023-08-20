import React, { useCallback, useState } from 'react'
import { Box } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import RegularLiquidity from './RegularLiquidity'
import ZapLiquidity from './ZapLiquidity'
import ZapSwitch from './components/ZapSwitch'
import { TransactionSubmittedContent } from '../TransactionConfirmationModal'
import { Modal } from 'components/uikit'
import { ZapType } from '@ape.swap/v2-zap-sdk'
import { Pair } from '@ape.swap/v2-sdk'

interface DualLiquidityModalProps {
  onDismiss?: () => void
  poolAddress?: string
  pid?: string
  zapIntoProductType?: ZapType
  zapable?: boolean
}

const DualLiquidityModal: React.FC<DualLiquidityModalProps> = ({
  onDismiss = () => null,
  poolAddress,
  pid,
  zapIntoProductType,
  zapable,
}) => {
  const { t } = useTranslation()
  const [goZap, setGoZap] = useState(true)
  const [{ txHash, pairOut }, setTxHash]: any = useState({
    txHash: '',
    pairOut: null,
  })

  const handleConfirmedTx = useCallback((hash: string, pair?: Pair) => {
    setTxHash({ txHash: hash, pairOut: pair })
  }, [])

  const handleZapSwitch = useCallback(() => {
    setGoZap(!goZap)
  }, [goZap])

  return (
    <>
      {txHash ? (
        <Modal title={t('Confirm ZAP')} onDismiss={onDismiss}>
          <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} LpToAdd={pairOut ?? undefined} />
        </Modal>
      ) : (
        <Modal title={t('Liquidity')} onDismiss={onDismiss}>
          <Box>
            <ZapSwitch goZap={goZap} handleZapSwitch={handleZapSwitch} />
            {goZap ? (
              <ZapLiquidity
                handleConfirmedTx={handleConfirmedTx}
                poolAddress={poolAddress ?? ''}
                pid={pid ?? ''}
                zapIntoProductType={zapIntoProductType ?? ZapType.ZAP}
                zapable={zapable ?? false}
              />
            ) : (
              <RegularLiquidity handleConfirmedTx={handleConfirmedTx} />
            )}
          </Box>
        </Modal>
      )}
    </>
  )
}

export default React.memo(DualLiquidityModal)
