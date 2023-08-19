import { Currency } from '@ape.swap/sdk-core'
import { Button, Flex } from 'components/uikit'
import { ApprovalState } from 'hooks/useApproveCallback'

const Approval = ({
  approvalA,
  approvalB,
  showApprovalA,
  showApprovalB,
  baseCurrency,
  quoteCurrency,
  approveACallback,
  approveBCallback,
}: {
  approvalA: ApprovalState
  approvalB: ApprovalState
  showApprovalA: boolean
  showApprovalB: boolean
  baseCurrency: Currency | null | undefined
  quoteCurrency: Currency | null | undefined
  approveACallback: () => void
  approveBCallback: () => void
}) => {
  return (
    <Flex sx={{ width: '100%', flexDirection: 'column' }}>
      {showApprovalA && (
        <Button
          fullWidth
          onClick={approveACallback}
          disabled={approvalA === ApprovalState.PENDING}
          load={approvalA === ApprovalState.PENDING}
        >
          {approvalA === ApprovalState.PENDING
            ? `Approving ${baseCurrency?.symbol}`
            : `Approve ${baseCurrency?.symbol}`}
        </Button>
      )}
      {showApprovalB && showApprovalA && <Flex sx={{ margin: '5px 0px' }} />}
      {showApprovalB && (
        <Button
          fullWidth
          onClick={approveBCallback}
          disabled={approvalB === ApprovalState.PENDING}
          load={approvalB === ApprovalState.PENDING}
        >
          {approvalB === ApprovalState.PENDING
            ? `Approving ${quoteCurrency?.symbol}`
            : `Approve ${quoteCurrency?.symbol}`}
        </Button>
      )}
    </Flex>
  )
}

export default Approval
