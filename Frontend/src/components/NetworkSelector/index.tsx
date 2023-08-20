import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex, Svg, Text } from 'components/uikit'
import { NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import useModal from 'hooks/useModal'
import { useCallback, useState } from 'react'
import { Spinner } from 'theme-ui'
import { isSupportedChain } from 'utils'
import NetworkModal from './NetworkModal'

const NetworkSelector = ({ billsFlag }: { billsFlag?: boolean }) => {
  const { chainId } = useWeb3React()
  const [requestPending, setRequestPending] = useState<boolean>(false)
  const { t } = useTranslation()

  const onSetRequestPending = useCallback((reqFlag: boolean) => {
    setRequestPending(reqFlag)
  }, [])

  const [onPresentWalletConnectModal] = useModal(
    <NetworkModal displayAll={true} onDismiss={() => null} onSetRequestPending={onSetRequestPending} />,
    true,
    false,
    'NetworkModal',
  )

  const isSupported = isSupportedChain(chainId)

  return (
    <Flex
      variant="flex.navContainer"
      onClick={onPresentWalletConnectModal}
      sx={{ width: billsFlag ? '100%' : 'unset', justifyContent: billsFlag ? 'space-between' : 'flex-start' }}
    >
      <Flex sx={{ width: '100%', alignItems: 'center' }}>
        {requestPending ? (
          <Spinner size={22} />
        ) : (
          <Svg
            icon={!chainId ? NETWORK_ICONS[SupportedChainId.BSC] : isSupported ? NETWORK_ICONS[chainId] : 'error'}
            width="25px"
          />
        )}
        <Text margin="0px 7.5px" sx={{ lineHeight: '0px', fontSize: '14px' }}>
          {requestPending
            ? t('Requesting')
            : !chainId
            ? NETWORK_LABEL[SupportedChainId.BSC]
            : isSupported
            ? NETWORK_LABEL[chainId]?.toUpperCase()
            : t('Unsupported')}{' '}
        </Text>
      </Flex>
      <Svg icon="caret" />
    </Flex>
  )
}

export default NetworkSelector
