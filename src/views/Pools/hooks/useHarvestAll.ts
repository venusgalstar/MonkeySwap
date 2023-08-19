import { pools } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { SousChef } from 'config/abi/types'
import { useMasterChefV2Contract } from 'hooks/useContract'
import SOUS_CHEF_ABI from 'config/abi/sousChef.json'
import { useCallback } from 'react'
import { getContract } from 'utils'

export const useSousHarvestAll = (sousIds: number[]) => {
  const { account, provider, chainId } = useWeb3React()
  const masterChefContract = useMasterChefV2Contract()

  const handleHarvestAll = useCallback(async () => {
    const harvestPromises = sousIds.map((sousId) => {
      if (!provider) return null
      const config = pools.find((pool) => pool.sousId === sousId)
      const sousChefContract = getContract(
        config?.contractAddress[chainId as SupportedChainId] ?? '',
        SOUS_CHEF_ABI,
        provider,
        account,
      ) as SousChef
      return sousId === 0 ? masterChefContract?.deposit(0, 0) : sousChefContract.deposit(0)
    })
    return Promise.all(harvestPromises)
  }, [account, sousIds, provider, masterChefContract, chainId])
  return { onHarvestAll: handleHarvestAll }
}
