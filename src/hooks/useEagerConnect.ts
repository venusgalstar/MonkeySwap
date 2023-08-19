import { Connector } from '@web3-react/types'
import { gnosisSafeConnection, networkConnection } from 'utils/connection'
import { Connection } from 'utils/connection/types'
import { getConnection } from 'utils/connection/utils'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'
import { SupportedChainId } from '@ape.swap/sdk-core'

async function connect(connector: Connector, chainId: SupportedChainId) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly(chainId)
    } else {
      await connector.activate(chainId)
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function useEagerConnect() {
  const dispatch = useAppDispatch()

  const selectedWallet = useAppSelector((state) => state.user.selectedWallet)
  const selectedChainId = useAppSelector((state) => state.user.selectedNetwork)

  let selectedConnection: Connection | undefined
  if (selectedWallet) {
    try {
      selectedConnection = getConnection(selectedWallet)
    } catch {
      dispatch(updateSelectedWallet({ wallet: undefined }))
    }
  }

  useEffect(() => {
    connect(gnosisSafeConnection.connector, selectedChainId)
    connect(networkConnection.connector, selectedChainId)

    if (selectedConnection) {
      connect(selectedConnection.connector, selectedChainId)
    } // The dependency list is empty so this is only run once on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
