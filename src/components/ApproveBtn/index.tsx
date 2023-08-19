import { Button } from 'components/uikit'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'

const ApproveBtn = ({
  approvalState,
  approveCallback,
  hasDarkBg,
}: {
  approvalState: ApprovalState
  approveCallback: () => Promise<void>
  hasDarkBg?: boolean
}) => {
  const { t } = useTranslation()
  const [approvalPending, setApprovalPending] = useState<boolean>(false)

  const handleApprove = useCallback(async () => {
    setApprovalPending(true)
    try {
      await approveCallback()
    } catch (e) {
      console.error(e)
    } finally {
      setApprovalPending(false)
    }
  }, [approveCallback])

  return (
    <Button
      sx={{
        width: '100%',
        '&:disabled': {
          background: hasDarkBg ? 'white4' : 'white3',
        },
      }}
      onClick={handleApprove}
      load={approvalPending || approvalState === ApprovalState.PENDING}
      disabled={approvalPending || approvalState === ApprovalState.PENDING}
    >
      {t('Approve')}
    </Button>
  )
}

export default ApproveBtn
