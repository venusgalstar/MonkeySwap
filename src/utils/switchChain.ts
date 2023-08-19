import { Connector } from '@web3-react/types'
import { ChainId, getChainInfo } from 'config/constants/chains'
import { PUBLIC_RPC_URLS } from 'config/constants/networks'
import { isSupportedChain } from 'utils'
import { networkConnection, walletConnectConnection } from './connection'

export const switchChain = async (connector: Connector, chainId: ChainId) => {
  if (!isSupportedChain(chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`)
  } else if (connector === walletConnectConnection.connector || connector === networkConnection.connector) {
    await connector.activate(chainId)
  } else {
    const info = getChainInfo(chainId)
    const addChainParameter = {
      chainId,
      chainName: info.chainName,
      rpcUrls: [PUBLIC_RPC_URLS[chainId][0]],
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: info.blockExplorerUrls,
    }
    await connector.activate(addChainParameter)
  }
}
