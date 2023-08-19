import React, { useState } from 'react'
import { getEtherscanLink } from 'utils'
// import { useToast } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'

interface ApprovalActionProps {
  action: () => Promise<any>
  zapApprovalState?: ApprovalState
}

const ApproveZap: React.FC<ApprovalActionProps> = ({ action, zapApprovalState }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTrx, setPendingTrx] = useState(false)
  // const { toastSuccess } = useToast()
  const zapPendingApproval = zapApprovalState ? zapApprovalState !== ApprovalState.NOT_APPROVED : false

  return (
    <Button
      disabled={pendingTrx || zapPendingApproval}
      onClick={async () => {
        setPendingTrx(true)
        await action()
          .then((resp) => {
            const trxHash = resp !== false ? resp.transactionHash : ''
            // toastSuccess(t('Approve Successful'), {
            //   text: t('View Transaction'),
            //   url: getEtherscanLink(trxHash, 'transaction', chainId),
            // })
          })
          .catch((e) => {
            console.error(e)
            setPendingTrx(false)
          })
        setPendingTrx(false)
      }}
      load={zapApprovalState === ApprovalState.PENDING}
      fullWidth
    >
      {t('ENABLE')}
    </Button>
  )
}

export default React.memo(ApproveZap)
