import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'contexts/Localization'
import { StyledButton } from '../styles'
import BuyBillModalView from './BuyBillModalView'
import useModal from 'hooks/useModal'
import { CheckBox, Flex, IconButton, Modal, Svg, Text } from 'components/uikit'
import { Bills } from 'views/Bonds/types'

interface TransferBillModalProps {
  onDismiss?: () => void
  bill: Bills
}

const WarningModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill }) => {
  const [confirmBuy, setConfirmBuy] = useState(false)
  const { replace } = useRouter()
  const { t } = useTranslation()
  const { index } = bill
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView billIndex={index} onDismiss={() => null} />,
    true,
    false,
    `billsModal${index}`,
    true,
  )

  const handleDismiss = (): void => {
    onDismiss && onDismiss()
    replace('/bonds', undefined, { shallow: true })
  }

  return (
    <Modal onDismiss={handleDismiss}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'center' }} mt="10px">
        <IconButton
          icon="close"
          color="text"
          variant="transparent"
          onClick={handleDismiss}
          sx={{ position: 'absolute', right: '20px', top: '25px' }}
        />
        <Text sx={{ fontSize: '35px', fontWeight: 700 }}>
          <Svg icon="error" width="25px" color="error" />
          <span sx={{ margin: '0px 10px' }}>{t('WARNING')}</span>
          <Svg icon="error" width="25px" color="error" />
        </Text>
      </Flex>
      <Flex mt="30px" mb="30px" sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Flex>
            <Text style={{ fontWeight: 600 }}>
              The {bill.earnToken.symbol} you recieve from this {bill.token.symbol}-{bill.quoteToken.symbol} ApeSwap
              Bond at a <span style={{ color: 'rgba(223, 65, 65, 1)' }}>{bill.discount}%</span> discount rate is priced
              at <span style={{ textDecoration: 'underline' }}>${bill?.priceUsd}</span>, which is higher than the
              current market rate of{' '}
              <span style={{ textDecoration: 'underline' }}>${bill?.earnTokenPrice?.toFixed(3)} </span>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex onClick={() => setConfirmBuy((prev) => !prev)} sx={{ cursor: 'pointer', alignItems: 'center', mt: '20px' }}>
        <CheckBox checked={confirmBuy} onChange={() => setConfirmBuy(!confirmBuy)} />
        <Text sx={{ ml: '10px', fontSize: '12px', fontWeight: 500, lineHeight: '18px' }}>
          {t(
            'I understand that I am purchasing %billToken% at a price above the current market rate, and would like to continue.',
            { billToken: bill.earnToken.symbol },
          )}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'center', mt: '15px' }}>
        <StyledButton onClick={onPresentBuyBillsModal} disabled={!confirmBuy}>
          {t('Continue')}
        </StyledButton>
      </Flex>
    </Modal>
  )
}

export default React.memo(WarningModal)
