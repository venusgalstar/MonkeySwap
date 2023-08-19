import { NativeCurrency, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { nativeOnChain } from 'config/constants/tokens'
import { useMemo } from 'react'
import { ChainId } from 'config/constants/chains'

export default function useNativeCurrency(chain?: ChainId): NativeCurrency | Token {
  const { chainId } = useWeb3React()
  const selectedChain = chain && chainId ? chain : chainId
  return useMemo(() => (selectedChain ? nativeOnChain(selectedChain) : nativeOnChain(ChainId.BSC)), [selectedChain])
}
