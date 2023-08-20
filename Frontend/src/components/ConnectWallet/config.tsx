import { icons } from 'components/uikit/Svg/types'
import { coinbaseWalletConnection, injectedConnection, walletConnectConnection } from 'utils/connection'
import { Config } from './types'

const connectors: Config[] = [
  {
    label: 'Metamask',
    icon: icons.METAMASK,
    connection: injectedConnection,
  },
  {
    label: 'TrustWallet',
    icon: icons.TRUST_WALLET,
    connection: injectedConnection,
  },
  {
    label: 'Wallet Connect',
    icon: icons.WALLET_CONNECT,
    connection: walletConnectConnection,
  },
  {
    label: 'Bitkeep',
    icon: icons.BITKEEP,
    connection: injectedConnection,
  },
  {
    label: 'TokenPocket',
    icon: icons.TOKEN_POCKET,
    connection: injectedConnection,
  },
  {
    label: 'SafePal Wallet',
    icon: icons.SAFE_PAL_WALLET,
    connection: injectedConnection,
  },
  {
    label: 'Brave Wallet',
    icon: icons.BRAVE,
    connection: injectedConnection,
  },
  {
    label: 'Coinbase Wallet',
    icon: icons.COINBASE,
    connection: coinbaseWalletConnection,
  },
  {
    label: 'NABOX Wallet',
    icon: icons.NABOX,
    connection: injectedConnection,
  },
  {
    label: 'ONTO Wallet',
    icon: icons.ONTO_WALLET,
    connection: injectedConnection,
  },
  {
    label: 'MathWallet',
    icon: icons.MATH_WALLET,
    connection: injectedConnection,
  },
  {
    label: 'OKX Wallet',
    icon: icons.OKX,
    connection: injectedConnection,
  },
  {
    label: 'Madwallet',
    icon: icons.MAD_WALLET,
    connection: injectedConnection,
  },
]

export default connectors
export const localStorageKey = 'accountStatus'
