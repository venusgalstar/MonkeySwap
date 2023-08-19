import React from 'react'
import { useTranslation } from 'contexts/Localization'

import { Description } from './styles'
import { Button, Modal } from 'components/uikit'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  amount: number
}

const ConfirmModal: React.FC<ApyCalculatorModalProps> = ({ onDismiss, amount }) => {
  const { t } = useTranslation()

  return (
    <Modal title={t('CONFIRM')} onDismiss={onDismiss}>
      <Description fontSize="12px" color="gray">
        {t('Buying Golden Banana has a 30% cost.')}
      </Description>
      <Description fontSize="12px" color="gray">
        {t('Pay %amount$ for %foramount%', { amount, foramount: amount * 0.7 })}
      </Description>
      <Button>{t('Confirm')}</Button>
    </Modal>
  )
}

export default ConfirmModal
