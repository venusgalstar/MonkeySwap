import { SupportedChainId } from '@ape.swap/sdk-core'
import { useSingleContractMultipleData } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { usePriceGetter } from './useContract'
import { dualFarms, farms, farmsV2, jungleFarms } from '@ape.swap/apeswap-lists'
import { useWeb3React } from '@web3-react/core'

export interface LpTokenPrices {
  address: string | undefined
  price: number | undefined
}
const useAllLpPrices = () => {
  const priceGetterContract = usePriceGetter()
  const { chainId } = useWeb3React()

  const addresses: any[] = [
    ...[...farms, ...farmsV2].flatMap((farm) =>
      farm.lpAddresses?.[chainId as SupportedChainId] ? [[farm.lpAddresses[chainId as SupportedChainId], 18]] : [],
    ),
    ...jungleFarms.flatMap((jf) =>
      jf.stakingToken.address?.[chainId as SupportedChainId]
        ? [[jf.stakingToken.address[chainId as SupportedChainId], 18]]
        : [],
    ),
    ...dualFarms.flatMap((df) => (df.stakeTokenAddress ? [[df.stakeTokenAddress, 18]] : [])),
  ]

  const lpTokenResults = useSingleContractMultipleData(priceGetterContract, 'getLPPrice', addresses)

  const parsedLpTokenResults = addresses.map((address, i) => {
    return {
      address: address[0]?.toLowerCase(),
      price: lpTokenResults?.[i]?.result?.[0]
        ? getBalanceNumber(lpTokenResults?.[i].result?.[0]?.toString(), 18)
        : undefined,
    }
  })
  return parsedLpTokenResults
}

export default useAllLpPrices
