import { Button, Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import useModal from 'hooks/useModal'
import ConnectWalletModal from './ConnectWalletModal'

const ConnectWalletButton = ({ navBarFlag }: { navBarFlag?: boolean }) => {
  const [onPresentWalletConnectModal] = useModal(
    <ConnectWalletModal onDismiss={() => null} />,
    true,
    true,
    'ConnectWalletModal',
  )
  const { t } = useTranslation()
  return (
    <Flex sx={{ height: '100%', width: navBarFlag ? 'auto' : '100%', alignItems: 'center' }}>
      <Button
        fullWidth
        onClick={onPresentWalletConnectModal}
        sx={{ height: navBarFlag ? '32.5px' : '45px', padding: '10px 10px', alignItems: 'center' }}
      >
        <Text
          color="primaryBright"
          size={navBarFlag ? '14px' : '16px'}
          weight={navBarFlag ? 600 : 700}
          sx={{ mt: '1px' }}
        >
          {t('Connect')}
        </Text>
      </Button>
    </Flex>
  )
}

export default ConnectWalletButton
