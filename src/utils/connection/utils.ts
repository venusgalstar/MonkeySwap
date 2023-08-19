import { Connector } from '@web3-react/types'
import {
  coinbaseWalletConnection,
  gnosisSafeConnection,
  injectedConnection,
  listOfConnections,
  networkConnection,
  walletConnectConnection,
} from '.'
import { Connection, ConnectionType } from './types'

/**
 * @param connection Connection to get the type
 * @returns The string name of the connection
 */
export const getConnectionName = (connection: Connection): string => {
  const connectionType = connection.type
  switch (connectionType) {
    // There is other types of injected wallets so additional checks will need to be placed for them
    case ConnectionType.INJECTED:
      return 'MetaMask'
    case ConnectionType.COINBASE_WALLET:
      return 'Coinbase Wallet'
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect'
    case ConnectionType.NETWORK:
      return 'Network'
    case ConnectionType.GNOSIS_SAFE:
      return 'Gnosis Safe'
  }
}

export function getConnection(c: Connector | ConnectionType): Connection {
  if (c instanceof Connector) {
    const connection = listOfConnections.find((connection) => connection.connector === c)
    if (!connection) {
      throw Error('unsupported connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection
      case ConnectionType.NETWORK:
        return networkConnection
      case ConnectionType.GNOSIS_SAFE:
        return gnosisSafeConnection
    }
  }
}
