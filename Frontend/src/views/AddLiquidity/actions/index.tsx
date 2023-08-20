import { Button, Flex, Svg, Text } from 'components/uikit'
import Add from './Add'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { AddInterface } from './types'
import { Field } from 'state/mint/v3/actions'
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from 'config/constants/addresses'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import Approval from './Approval'

interface ActionsInterface extends AddInterface {}

const Actions = (props: ActionsInterface) => {
  const { chainId, account } = useWeb3React()
  const { parsedAmounts, errorMessage, invalidRange, outOfRange } = props

  const isValid = !errorMessage && !invalidRange

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined,
  )
  const [approvalB, approveBCallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_B],
    chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined,
  )
  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = approvalA !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_A]
  const showApprovalB = approvalB !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_B]

  return (
    <Flex sx={{ mt: '10px', flexDirection: 'column' }}>
      {(outOfRange || invalidRange) && (
        <Flex sx={{ borderRadius: '10px', background: 'opacityBadge', padding: '5px 10px', mb: '10px' }}>
          <Svg icon="info" color="primaryBright" />
          {invalidRange && (
            <Text size="14px" sx={{ lineHeight: '20px', ml: '15px' }}>
              Invalid range selected. The min price must be lower than the max price.
            </Text>
          )}
          {outOfRange && (
            <Text size="14px" color="primaryBright" sx={{ lineHeight: '20px', ml: '15px' }}>
              Your position will not earn fees or be used in trades until the market price moves into your range.
            </Text>
          )}
        </Flex>
      )}
      {!account ? (
        <ConnectWalletButton />
      ) : errorMessage || invalidRange ? (
        <Button fullWidth disabled>
          {invalidRange ? 'ADD' : errorMessage}
        </Button>
      ) : (approvalA === ApprovalState.NOT_APPROVED ||
          approvalA === ApprovalState.PENDING ||
          approvalB === ApprovalState.NOT_APPROVED ||
          approvalB === ApprovalState.PENDING) &&
        isValid ? (
        <Approval
          approvalA={approvalA}
          approvalB={approvalB}
          showApprovalA={showApprovalA}
          showApprovalB={showApprovalB}
          approveACallback={approveACallback}
          approveBCallback={approveBCallback}
          {...props}
        />
      ) : (
        <Add {...props} />
      )}
    </Flex>
  )
}

export default Actions
