import { Button } from 'components/uikit'
import { ApprovalState } from 'hooks/useApproveCallback'
import { UseERC20PermitState } from 'hooks/useERC20Permit'
import { useCallback, useState } from 'react'

const Approval = ({
  signatureState,
  approvalState,
  gatherPermitSignature,
  approveCallback,
}: {
  signatureState: UseERC20PermitState
  approvalState: ApprovalState
  gatherPermitSignature: (() => Promise<void>) | null
  approveCallback: () => Promise<void>
}) => {
  const [approvalPending, setApprovalPending] = useState<boolean>(false)

  const handleApprove = useCallback(async () => {
    setApprovalPending(true)
    try {
      if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
        try {
          await gatherPermitSignature()
        } catch (error: any) {
          // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
          if (error?.code !== 4001) {
            await approveCallback()
          }
        }
      } else {
        await approveCallback()
      }
    } finally {
      setApprovalPending(false)
    }
  }, [signatureState, gatherPermitSignature, approveCallback])

  return (
    <Button
      fullWidth
      onClick={handleApprove}
      load={approvalPending || approvalState === ApprovalState.PENDING}
      disabled={approvalPending || approvalState === ApprovalState.PENDING}
    >
      Approve
    </Button>
  )
}

export default Approval
