import React, { useState } from 'react'
import { Currency } from '@ape.swap/sdk-core'
import TokenImportWarning from 'components/TokenImportWarning'
import { Flex, Svg, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { CSSProperties, Spinner } from 'theme-ui'
import { registerToken } from 'utils'
import OmniTokenImage from '../../OmniTokenImage'
import { useWeb3React } from '@web3-react/core'

const ListRow = ({
  currency,
  userBalance,
  isSelected,
  searchTokenIsAdded,
  style,
  onSelect,
  onDismiss,
  showAddToMeta,
}: {
  currency: Currency
  userBalance: string | undefined
  isSelected: boolean
  searchTokenIsAdded: boolean
  style: CSSProperties
  onSelect: () => void
  onDismiss?: () => void
  showAddToMeta?: boolean
}) => {
  const { account } = useWeb3React()
  const [isSuccessfulCopy, setIsSuccessfulCopy] = useState<boolean>(false)

  const [onImportWarningModal] = useModal(
    <TokenImportWarning currency={currency} onDismiss={onDismiss} onSelect={onSelect} />,
    true,
    true,
    'tokenImportWarningModal',
    true,
  )

  const addToMetaMask = (e: React.MouseEvent) => {
    e.stopPropagation()
    registerToken(
      currency?.wrapped?.address,
      currency?.wrapped?.symbol,
      currency?.decimals,
      currency instanceof WrappedTokenInfo ? currency?.tokenInfo?.logoURI : '',
    ).then(() => '')
  }

  const hideDust = userBalance === '0.000000000000000001' ? '0' : userBalance

  const handleCopy = (e: React.MouseEvent) => {
    setIsSuccessfulCopy(true)
    e.stopPropagation()
    navigator.clipboard.writeText(currency?.wrapped?.address)
    setTimeout(() => {
      setIsSuccessfulCopy(false)
    }, 1000)
  }

  return (
    <Flex
      sx={{
        ...style,
        padding: '10px 15px 10px 10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        opacity: isSelected && 0.5,
        ':hover': {
          backgroundColor: 'white4',
        },
      }}
      onClick={() => (searchTokenIsAdded ? onSelect() : onImportWarningModal())}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <OmniTokenImage currency={currency} size={30} />
        <Flex sx={{ flexDirection: 'column', ml: '15px' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Text weight={600}>{currency.symbol}</Text>
            {!searchTokenIsAdded && (
              <span sx={{ ml: '5px' }}>
                <Svg icon="error" width={13} color="yellow" />
              </span>
            )}
            {searchTokenIsAdded && showAddToMeta && (
              <>
                <Flex sx={{ ml: '5px', cursor: 'copy' }} onClick={addToMetaMask}>
                  <Svg icon="metamask" width={15} />
                </Flex>
              </>
            )}
            <Flex sx={{ ml: '5px', cursor: 'copy' }} onClick={handleCopy}>
              <Svg icon={isSuccessfulCopy ? 'success' : 'copy'} width={15} />
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
