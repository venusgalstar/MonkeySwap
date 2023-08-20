import { Currency } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex, Modal, Text, Button, Svg } from 'components/uikit'
import { useAddUserToken } from 'state/user/hooks'
import { Link } from 'theme-ui'
import { getEtherscanLink } from 'utils'

const TokenImportWarning = ({
  currency,
  onDismiss,
  onSelect,
}: {
  currency: Currency
  onDismiss?: () => void
  onSelect: () => void
}) => {
  const { chainId } = useWeb3React()
  const addToken = useAddUserToken()

  return (
    <Modal title="Import Warning" onDismiss={onDismiss}>
      <Flex
        sx={{
          width: '450px',
          maxWidth: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text size="30px" weight={700} color="error" margin="15px 0px" sx={{ textAlign: 'center', lineHeight: '35px' }}>
          Trade at your own risk!
        </Text>
        <Text size="14px" sx={{ textAlign: 'center' }}>
          The ApeSwap DEX is decentralized, meaning that anyone can create or add liquidity for a token. Unlisted tokens
          have not been reviewed by ApeSwap or passed our due diligence process. Unlisted tokens may present scam risks,
          including the loss of funds.
        </Text>
        <Flex
          sx={{
            mt: '15px',
            flexDirection: 'column',
            cursor: 'pointer',
            ':active': { textDecoration: 'none' },
            ':hover': { textDecoration: 'none' },
            textDecoration: 'none',
          }}
          as={Link}
          href={getEtherscanLink(currency?.wrapped.address, 'token', chainId || 56)}
          target="_blank"
        >
          <Text weight={700}>
            {currency?.name} ({currency?.symbol})
          </Text>
          <Text weight={700}>
            {currency?.wrapped.address?.slice(0, 4)}...
            {currency?.wrapped.address?.slice(currency?.wrapped.address?.length - 4, currency?.wrapped.address?.length)}
            {'  '}View on explorer <Svg icon="external" />
          </Text>
        </Flex>
        <Button
          fullWidth
          mt="20px"
          onClick={() => {
            currency.isToken && addToken(currency)
            onSelect()
            onDismiss && onDismiss()
          }}
        >
          I Understand
        </Button>
      </Flex>
    </Modal>
  )
}

export default TokenImportWarning
