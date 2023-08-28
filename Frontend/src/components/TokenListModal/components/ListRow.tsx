import { Currency, Token } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'
import TokenImportWarning from 'components/TokenImportWarning'
import { Flex, Svg, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { CSSProperties, Spinner } from 'theme-ui'
import { registerToken } from 'utils'
import React from 'react'
import { useWeb3React } from '@web3-react/core'

const ListRow = ({
  currency,
  userBalance,
  isSelected,
  otherSelected,
  searchTokenIsAdded,
  style,
  onSelect,
  onDismiss,
}: {
  currency: Currency
  userBalance: string | undefined
  isSelected: boolean
  otherSelected: boolean
  searchTokenIsAdded: boolean
  style: CSSProperties
  onSelect: () => void
  onDismiss: () => void
}) => {
  const { account } = useWeb3React()

  const [onImportWarningModal] = useModal(
    <TokenImportWarning currency={currency} onDismiss={onDismiss} onSelect={onSelect} />,
    true,
    true,
    'tokenImportWarningModal',
  )

  const addToMetaMask = () => {
    registerToken(
      currency?.wrapped?.address,
      currency?.wrapped?.symbol,
      currency?.decimals,
      currency instanceof WrappedTokenInfo ? currency?.tokenInfo?.logoURI : '',
    ).then(() => '')
  }

  const hideDust = userBalance === '0.000000000000000001' ? '0' : userBalance

  return (
    <Flex
      sx={{
        ...style,
        padding: '10px 15px 10px 10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        opacity: (isSelected || otherSelected) && 0.5,
        ':hover': {
          backgroundColor: 'white4',
        },
      }}
      onClick={() => (searchTokenIsAdded ? onSelect() : (onDismiss(), onImportWarningModal()))}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <CurrencyLogo currency={currency} size={30} />
        <Flex sx={{ flexDirection: 'column', ml: '15px' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Text weight={600}>{currency.symbol}</Text>
            {!searchTokenIsAdded && (
              <span sx={{ ml: '5px' }}>
                <Svg icon="error" width={13} color="yellow" />
              </span>
            )}
            {searchTokenIsAdded && (
              <>
                <Flex sx={{ ml: '5px', cursor: 'copy' }} onClick={addToMetaMask}>
                  <Svg icon="metamask" width={15} />
                </Flex>
              </>
            )}
            <Flex
              sx={{ ml: '5px', cursor: 'copy' }}
              onClick={() => navigator.clipboard.writeText(currency?.wrapped?.address)}
            >
              <Svg icon="copy" width={15} />
            </Flex>
          </Flex>
          <Text weight={400} size="10px" sx={{ lineHeight: '12px' }}>
            {currency.name}
          </Text>
        </Flex>
      </Flex>
      <Text size="14px" weight={600} sx={{ lineHeight: '0px' }}>
        {hideDust === undefined ? account ? <Spinner width="15px" height="15px" /> : '' : hideDust}
      </Text>
    </Flex>
  )
}

export default ListRow
