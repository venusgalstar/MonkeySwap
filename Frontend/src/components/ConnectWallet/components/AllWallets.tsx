import config from '../config'
import WalletCard from './WalletCard'
import styles from './styles'
import { Flex } from 'components/uikit'

interface Props {
  onDismiss: () => void
}

const AllWallets = ({ onDismiss }: Props) => {
  return (
    <Flex sx={styles.allWalletsContainer}>
      <Flex sx={styles.cardsContainer}>
        {config.map((entry) => (
          <WalletCard key={entry.label} walletConfig={entry} onDismiss={onDismiss} />
        ))}
      </Flex>
    </Flex>
  )
}

export default AllWallets
