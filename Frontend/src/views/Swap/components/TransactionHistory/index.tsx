// Components
import styles from './styles'
import { Flex, Modal, Spinner, Svg, Text } from 'components/uikit'
import TransactionContainer from './TransactionContainer'

// Hooks
import { useWeb3React } from '@web3-react/core'
import useFetchLifiTxHistory from 'state/swap/hooks/useFetchLifiTxHistory'

// Types, Constants, Utils
import { LiFiTransaction } from './types'
import ConnectWalletButton from 'components/ConnectWallet'

const TransactionHistory = ({ onDismiss }: { onDismiss?: () => void }) => {
  const { account } = useWeb3React()

  const { isLoading, data: rawTransactions } = useFetchLifiTxHistory(account || '')

  const transactions = (rawTransactions || []).sort((a, b) => {
    if (a.status === 'PENDING' && b.status !== 'PENDING') {
      return -1
    } else if (a.status !== 'PENDING' && b.status === 'PENDING') {
      return 1
    } else {
      // if both transactions have the same status, sort by timestamp
      return b.sending.timestamp - a.sending.timestamp
    }
  })

  return (
    <Modal sx={{ height: '540px', width: '380px' }}>
      {/* Header & Header Icons */}
      <Flex sx={{ justifyContent: 'space-between', mb: '20px' }}>
        <Flex sx={{ cursor: 'pointer' }} onClick={onDismiss}>
          <Svg width="10px" icon="arrow" direction="left" />
        </Flex>
        <Text sx={{ fontSize: '16px', fontWeight: '300' }}>Transaction History</Text>
      </Flex>

      {/* Transaction History */}
      {isLoading ? (
        <Flex sx={styles.emptyHistoryContainer}>
          <Spinner size={200} />
          <Text sx={{ fontSize: '20px' }}>Loading Transactions...</Text>
        </Flex>
      ) : transactions.length > 0 ? (
        <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
          {transactions.map((transaction: LiFiTransaction) => {
            return <TransactionContainer key={transaction?.transactionId} transaction={transaction} />
          })}
        </Flex>
      ) : (
        <Flex sx={styles.emptyHistoryContainer}>
          {account ? (
            <>
              <Svg width="220px" height="50px" icon="placeholderMonkey" />
              <Text sx={{ fontSize: '20px' }}>No Recent Transactions</Text>
              <Text sx={{ fontSize: '14px', fontWeight: '300', textAlign: 'center' }}>
                Transaction history only shows transactions over the previous 30 days. Please check a block explorer
                directly for older transactions.
              </Text>
            </>
          ) : (
            <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
              <Text>Connect Wallet to View History</Text>
              <ConnectWalletButton />
            </Flex>
          )}
        </Flex>
      )}
    </Modal>
  )
}
export default TransactionHistory
