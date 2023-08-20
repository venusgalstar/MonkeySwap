import { Button, Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'
import useActivate from 'utils/connection/activate'
import { localStorageKey } from '../config'
import { Login, Config } from '../types'
import styles from './styles'

interface Props {
  walletConfig: Config
  onDismiss: () => void
}

const WalletCard: React.FC<Props> = ({ walletConfig, onDismiss }) => {
  const { label: title, icon, connection } = walletConfig
  const activate = useActivate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  return (
    <Button
      variant="tertiary"
      onClick={() => (activate(connection), dispatch(updateSelectedWallet({ wallet: connection.type })), onDismiss())}
      sx={styles.button}
      id={`wallet-connect-${t(title)?.toLocaleLowerCase()}`}
    >
      <Flex sx={styles.iconContainer}>
        <Svg icon={icon} />
      </Flex>
      <Flex sx={{ height: ['39px', '39px', '39px', '49px'], alignItems: 'center' }}>
        <Text sx={styles.walletName}>{t(title)}</Text>
      </Flex>
    </Button>
  )
}

export default WalletCard
