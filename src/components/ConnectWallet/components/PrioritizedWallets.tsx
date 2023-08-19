// import WalletImage from "../../../components/Svg/WalletsIcons/walletImage";
import WalletCard from './WalletCard'
import config from '../config'
import { Login } from '../types'
import { Button, Flex, Svg, Text } from 'components/uikit'
import styles from './styles'
import { Link } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'

interface Props {
  setOpen: (open: boolean) => void
  onDismiss: () => void
}

const PrioritizedWallets = ({ setOpen, onDismiss }: Props) => {
  const showWallets = config.slice(0, 3)
  const { t } = useTranslation()

  return (
    <Flex sx={styles.prioritizedContainer}>
      <Flex sx={{ flexWrap: 'wrap', width: '100%' }}>
        <Flex sx={{ display: ['none', 'none', 'none', 'flex'] }}>
          <Svg icon="walletImage" />
        </Flex>
        <Flex sx={styles.infoContainer}>
          <Flex sx={{ width: '100%' }}>
            <Text sx={styles.title}>{t('Connect Wallet')}</Text>
          </Flex>
          <Text sx={styles.firstStep}>
            {t(
              'Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.',
            )}
          </Text>
          <Text sx={{ fontSize: '12px', fontWeight: 300 }}>
            <Link
              href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/wallets/how-to-connect-your-wallet"
              target="_blank"
              color="text"
              sx={styles.learnHow}
            >
              <Text mr="5px">{t('Learn how to connect')}</Text>
              <Svg icon="external" />
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex sx={styles.buttonsContainer}>
        {showWallets.map((entry) => (
          <WalletCard key={entry.label} walletConfig={entry} onDismiss={onDismiss} />
        ))}
        <Button
          sx={{
            ...styles.button,
            background: 'white4',
            '&:hover': { background: 'white3' },
            border: 'none',
            '&:hover:not([disabled])': { background: 'white3' },
          }}
          onClick={() => setOpen(true)}
        >
          <Flex sx={{ height: ['45px', '45px', '45px', '65px'], alignItems: 'flex-end' }}>
            <Flex sx={styles.moreWallets}>
              <Flex sx={{ lineHeight: ['24px', '24px', '24px', '40px'], fontWeight: [700, 700, 700, 900] }}>. . .</Flex>
            </Flex>
          </Flex>
          <Flex sx={{ height: ['39px', '39px', '39px', '49px'], alignItems: 'center' }}>
            <Text sx={styles.walletName}>{t('MORE')}</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}

export default PrioritizedWallets
