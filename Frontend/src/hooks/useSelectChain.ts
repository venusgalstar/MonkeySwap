import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { switchChain } from 'utils/switchChain'
import { ChainId } from 'config/constants/chains'

export default function useSelectChain() {
  const { connector } = useWeb3React()

  return useCallback(
    async (targetChain: ChainId) => {
      if (!connector) return
      try {
        await switchChain(connector, targetChain)
      } catch (error) {
        console.error('Failed to switch networks', error)
        throw error
      }
    },
    [connector],
  )
}
