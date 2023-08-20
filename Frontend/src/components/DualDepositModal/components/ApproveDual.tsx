import React, { useState } from 'react'
import { getEtherscanLink } from 'utils'
// import { useToast } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { MINI_APE_ADDRESS } from 'config/constants/addresses'
import { CurrencyAmount, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { ethers } from 'ethers'
import { Button } from 'components/uikit'

interface ApprovalActionProps {
  lpToApprove: string
  pid: string | undefined
}

const ApproveDual: React.FC<ApprovalActionProps> = ({ lpToApprove, pid }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTrx, setPendingTrx] = useState(false)
  // const { toastSuccess } = useToast()
  const currency = new Token(chainId as SupportedChainId, lpToApprove, 18)
  const amountToApprove = CurrencyAmount.fromRawAmount(currency, ethers.constants.MaxInt256.toString())

  const [, onApprove] = useApproveCallback(amountToApprove, MINI_APE_ADDRESS[chainId as SupportedChainId])

  return (
    <Button
      disabled={pendingTrx}
      onClick={async () => {
        setPendingTrx(true)
        await onApprove()
          .then((resp: any) => {
            const trxHash = resp.transactionHash
            // toastSuccess(t('Approve Successful'), {
            //   text: t('View Transaction'),
            //   url: getEtherscanLink(trxHash, 'transaction', chainId),
            // })
          })
          .catch((e: any) => {
            console.error(e)
            setPendingTrx(false)
          })
        setPendingTrx(false)
      }}
      load={pendingTrx}
      fullWidth
    >
      {t('ENABLE')}
    </Button>
  )
}

export default React.memo(ApproveDual)
