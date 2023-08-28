import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import VestedTimer from '../VestedTimer'
import { Bills } from 'views/Bonds/types'
import { CheckBox, Flex, Input, Modal, Text } from 'components/uikit'
import Transfer from 'views/Bonds/actions/Transfer'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import { SupportedChainId } from '@ape.swap/sdk-core'

interface TransferBillModalProps {
  onDismiss?: () => void
  bill: Bills
  billId: string
  chainId?: SupportedChainId
}

const TransferBillModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill, billId, chainId }) => {
  const { t } = useTranslation()
  const [confirmSend, setConfirmSend] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const { earnToken, lpToken, billNftAddress, userOwnedBillsData } = bill
  const userOwnedBill = userOwnedBillsData?.find((b) => parseInt(b.id) === parseInt(billId))
  const pending =
    chainId &&
    getBalanceNumber(new BigNumber(userOwnedBill?.payout ?? 0), bill?.earnToken?.decimals?.[chainId] ?? 18)?.toFixed(4)
  return (
    <Modal onDismiss={onDismiss} title="Transfer Bond" zIndex={130}>
      <Flex sx={{ mt: '20px' }}>
        <Text sx={{ fontWeight: 700 }}> {t('Transferring')}: </Text>
      </Flex>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: '30px', mr: '10px' }}>
        <Text sx={{ fontWeight: 700, fontSize: '25px' }}>
          {lpToken.symbol} #{userOwnedBill?.id}
        </Text>
        <Flex sx={{ mt: '5px' }}>
          <Flex sx={{ flexDirection: 'column', mr: '20px' }}>
            <Text sx={{ textAlign: 'center', width: '100%', fontSize: '12px', opacity: 0.6 }}>{t('Vesting time')}</Text>
            <VestedTimer
              lastBlockTimestamp={userOwnedBill?.lastBlockTimestamp ?? '0'}
              vesting={userOwnedBill?.vesting ?? '0'}
              transferModalFlag
            />
          </Flex>
          <Flex sx={{ flexDirection: 'column', ml: '20px' }}>
            <Text sx={{ textAlign: 'center', width: '100%', fontSize: '12px', opacity: 0.6 }}>{t('Pending')}</Text>
            <Flex>
              <ServiceTokenDisplay token1={earnToken.symbol} size={20} />
              <Text sx={{ fontWeight: 700, ml: '5px' }}>{pending}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={{ flexDirection: 'column', mt: '30px' }}>
        <Text sx={{ fontWeight: 700 }}>{t('Receiving Address')}:</Text>
        <Input
          mt="10px"
          size="lg"
          placeholder={t('Paste the address here')}
          value={toAddress}
          onChange={(e: any) => setToAddress(e.target.value)}
          style={{ width: '345px', border: 'none' }}
        />
      </Flex>
      <Flex sx={{ mt: '15px' }}>
        <Text sx={{ lineHeight: '18px', fontSize: '12px', color: 'rgba(223, 65, 65, 1)' }}>
          <Text
            sx={{ display: 'block', width: '100%', fontWeight: 700, fontSize: '13px', color: 'rgba(223, 65, 65, 1)' }}
          >
            {t('WARNING')}
          </Text>
          {t('When transfering the NFT all pending rewards will also be transfered to the receiver address.')}
        </Text>
      </Flex>
      <Flex
        onClick={() => setConfirmSend((prev) => !prev)}
        sx={{ mt: '20px', cursor: 'pointer', alignItems: 'center' }}
      >
        <CheckBox checked={confirmSend} />
        <Text sx={{ ml: '10px', fontSize: '12px', fontWeight: 500, lineHeight: '18px' }}>
          {t('I understand the new wallet gains ownership of all unclaimed assets.')}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'center', mt: '15px' }}>
        <Transfer billNftAddress={billNftAddress ?? ''} billId={billId} toAddress={toAddress} disabled={!confirmSend} />
      </Flex>
    </Modal>
  )
}

export default React.memo(TransferBillModal)
