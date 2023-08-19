import React, { useState } from 'react'
import { getEtherscanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { CurrencyAmount, Currency, Token, SupportedChainId } from '@ape.swap/sdk-core'
import { ethers } from 'ethers'

interface ApprovalActionProps {
  lpToApprove: string
  contractAddress: string
}

const ApproveJungle: React.FC<ApprovalActionProps> = ({ lpToApprove, contractAddress }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTrx, setPendingTrx] = useState(false)
  // const { toastSuccess } = useToast()
  const currency = new Token(chainId as SupportedChainId, lpToApprove, 18)
  const amountToApprove = CurrencyAmount.fromRawAmount(currency, ethers.constants.MaxInt256.toString())

  const [, onApprove] = useApproveCallback(amountToApprove, contractAddress)

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
          .catch((e) => {
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

export default React.memo(ApproveJungle)
