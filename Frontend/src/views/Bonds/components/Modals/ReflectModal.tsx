/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import BuyBillModalView from './BuyBillModalView'
import useModal from '../../../../hooks/useModal'
import { Button, Flex, IconButton, Modal, Svg, Text } from '../../../../components/uikit'
import Checkbox from '../../../../components/uikit/Checkbox'

interface ReflectModalProps {
  billIndex: number
  billSymbol: string
  onDismiss?: () => void
}

const ReflectModal: React.FC<ReflectModalProps> = ({ billIndex, billSymbol, onDismiss }) => {
  const [confirmBuy, setConfirmBuy] = useState(false)
  const { t } = useTranslation()
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView billIndex={billIndex} />,
    true,
    false,
    `billsModal${billIndex}`,
    true,
  )

  return (
    <Modal onDismiss={onDismiss}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '10px' }}>
        <IconButton
          icon="close"
          color="text"
          variant="transparent"
          onClick={onDismiss}
          sx={{ position: 'absolute', right: '20px', top: '25px' }}
        />
        <Svg icon="error" width="25px" color="error" />
        <Text sx={{ fontSize: '35px', fontWeight: 700, mx: '5px' }}>{t('WARNING')}</Text>
        <Svg icon="error" width="25px" color="error" />
      </Flex>
      <Flex sx={{ my: '30px', flexDirection: 'column', alignItems: 'center' }}>
        <Text style={{ fontWeight: 600 }}>
          Please note, this ApeSwap Bond includes a reflect token which cannot be whitelisted on our smart contracts.
          This means the reflect mechanic will impact your purchases & claims of this bond, and you will receive less
          than expected.
        </Text>
      </Flex>
      <Flex sx={{ alignItems: 'center' }} onClick={() => setConfirmBuy((prev) => !prev)} style={{ cursor: 'pointer' }}>
        <Checkbox checked={confirmBuy} />
        <Text sx={{ ml: '10px', fontSize: '12px' }}>
          {t(
            'I understand that my purchases of this %billToken% bond will be deducted by the reflect mechanics of the token.',
            { billToken: billSymbol },
          )}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'center', mt: '5px' }}>
        <Button onClick={onPresentBuyBillsModal} disabled={!confirmBuy}>
          {t('Continue')}
        </Button>
      </Flex>
    </Modal>
  )
}

export default React.memo(ReflectModal)
