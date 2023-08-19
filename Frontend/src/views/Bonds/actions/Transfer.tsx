import React, { useState } from 'react'
import { getEtherscanLink } from 'utils'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { useTranslation } from 'contexts/Localization'
import { TransferProps } from './types'
import useTransferBill from '../hooks/useTransferBill'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import { StyledButton } from '../components/styles'

const Transfer: React.FC<TransferProps> = ({ billNftAddress, billId, toAddress, disabled }) => {
  const { onTransfer } = useTransferBill(billNftAddress, billId, toAddress)
  const { chainId, account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { t } = useTranslation()

  const handleTransfer = async () => {
    if (!chainId || !account) return
    setPendingTrx(true)
    await onTransfer()
      .then(() => {})
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }
  return (
    <StyledButton onClick={handleTransfer} endIcon={pendingTrx} disabled={pendingTrx || disabled}>
      {t('CONFIRM')}
    </StyledButton>
  )
}

export default React.memo(Transfer)
