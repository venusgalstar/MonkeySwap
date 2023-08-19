import React, { useState } from 'react'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { useTranslation } from 'contexts/Localization'
import { ClaimProps } from './types'
import useClaimBill from '../hooks/useClaimBill'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import { Button } from 'components/uikit'
import { useToastError } from 'state/application/hooks'

const Claim: React.FC<ClaimProps> = ({ billAddress, billIds, pendingRewards, mt, earnToken, hasDarkBg }) => {
  const { onClaimBill } = useClaimBill(billAddress, billIds, earnToken)
  const { chainId, account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const toastError = useToastError()
  const { t } = useTranslation()

  const handleClaim = async () => {
    if (!chainId || !account) return
    setPendingTrx(true)
    await onClaimBill().catch((e) => {
      console.error(e)
      toastError(e)
      setPendingTrx(false)
    })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }
  return (
    <Button
      onClick={handleClaim}
      load={pendingTrx}
      disabled={pendingTrx || parseFloat(pendingRewards) === 0}
      sx={{
        lineHeight: '20px',
        minWidth: '109px',
        width: ['240px', '240px', '240px', '100%'],
        mt: mt ?? ['10px', '10px', '10px', '0px'],
        '&:disabled': {
          background: hasDarkBg ? 'white4' : 'white3',
        },
      }}
    >
      {t('CLAIM')}
    </Button>
  )
}

export default React.memo(Claim)
