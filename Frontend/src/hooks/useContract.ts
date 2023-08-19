import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'

import { useMemo } from 'react'
import { getContract } from 'utils'

// ABIS
import multicallV3Abi from 'config/abi/multicallv3.json'
import ERC20_ABI from 'config/abi/erc20.json'
import ERC20_BYTES32_ABI from 'config/abi/erc20_bytes32.json'
import ENS_ABI from 'config/abi/ens-registrar.json'
import EIP_2612 from 'config/abi/eip_2612.json'
import BOND_ABI from 'config/abi/bond.json'
import BOND_NFT_ABI from 'config/abi/bondNft.json'
import NFA_ABI from 'config/abi/nonFungibleApes.json'
import NFB_ABI from 'config/abi/nonFungibleBananas.json'
import ZAP_ABI from 'config/abi/zap.json'
import SOUS_CHEF_ABI from 'config/abi/sousChef.json'
import MASTER_CHEF_ABI from 'config/abi/masterchef.json'
import MASTER_CHEF_V2_ABI from 'config/abi/masterChefV2.json'
import TREASURY_ABI from 'config/abi/treasury.json'
import JUNGLE_CHEF_ABI from 'config/abi/jungleChef.json'
import MINI_CHEF_ABI from 'config/abi/miniApeV2.json'
import PRICE_GETTER_ABI from 'config/abi/price-getter.json'
import ENS_PUBLIC_RESOLVER_ABI from 'config/abi/ens-public-resolver.json'
import IUniswapV2PairJson from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import NonfungiblePositionManagerJson from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
import TickLensJson from '@uniswap/v3-periphery/artifacts/contracts/lens/TickLens.sol/TickLens.json'
import {
  Bond,
  BondNft,
  JungleChef,
  MasterChefV2,
  Masterchef,
  MiniApeV2,
  Multicallv3,
  SousChef,
  Treasury,
} from 'config/abi/types'
import { Erc20 } from 'config/abi/types/Erc20'
import { Erc20_bytes32 } from 'config/abi/types/Erc20_bytes32'
import { NonfungiblePositionManager, Quoter, QuoterV2, TickLens } from 'config/abi/types/v3'
import IUniswapV2Router02Json from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import {
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  TICK_LENS_ADDRESSES,
  QUOTER_ADDRESSES,
  PRICE_GETTER_ADDRESSES,
  V2_ROUTER_ADDRESSES,
  MULTICALL,
  MASTER_CHEF_V1_ADDRESS,
  MASTER_CHEF_V2_ADDRESS,
  MINI_APE_ADDRESS,
  TREASURY_ADDRESSES,
  GNANA_ADDRESSES,
} from 'config/constants/addresses'
import WETH_ABI from 'config/abi/weth.json'
import { SupportedChainId, Token } from '@ape.swap/sdk-core'
import { EnsRegistrar } from 'config/abi/types/EnsRegistrar'
import { EnsPublicResolver } from 'config/abi/types/EnsPublicResolver'
import QuoterV2Json from '@uniswap/swap-router-contracts/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
import QuoterJson from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { PriceGetter } from 'config/abi/types/PriceGetter'
import { WRAPPED_NATIVE_CURRENCY } from 'config/constants/tokens'
import { Weth } from 'config/abi/types/Weth'
import { Zap } from 'config/abi/types/Zap'
import { NonFungibleApes } from 'config/abi/types/NonFungibleApes'
import { ZAP_ADDRESS } from '@ape.swap/v2-zap-sdk'
import { NonFungibleBananas } from 'config/abi/types/NonFungibleBananas'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { pools } from '@ape.swap/apeswap-lists'

const { abi: IUniswapV2PairABI } = IUniswapV2PairJson
const { abi: NFTPositionManagerABI } = NonfungiblePositionManagerJson
const { abi: IUniswapV2Router02ABI } = IUniswapV2Router02Json
const { abi: TickLensABI } = TickLensJson
const { abi: QuoterABI } = QuoterJson
const { abi: QuoterV2ABI } = QuoterV2Json

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

export function useInterfaceMulticall() {
  return useContract<Multicallv3>(MULTICALL, multicallV3Abi, false)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20_bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React()
  let address: string | undefined
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case SupportedChainId.MAINNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract<EnsRegistrar>(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useV3NFTPositionManagerContract(withSignerIfPossible?: boolean): NonfungiblePositionManager | null {
  return useContract<NonfungiblePositionManager>(
    NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
    NFTPositionManagerABI,
    withSignerIfPossible,
  )
}

export function useTickLens(): TickLens | null {
  const { chainId } = useWeb3React()
  const address = chainId ? TICK_LENS_ADDRESSES[chainId] : undefined
  return useContract(address, TickLensABI) as TickLens | null
}

export function useQuoter(useQuoterV2: boolean) {
  return useContract<Quoter | QuoterV2>(QUOTER_ADDRESSES, useQuoterV2 ? QuoterV2ABI : QuoterABI)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function useV2RouterContract(): Contract | null {
  return useContract(V2_ROUTER_ADDRESSES, IUniswapV2Router02ABI, true)
}

export function usePriceGetter() {
  const { chainId } = useWeb3React()
  return useContract<PriceGetter>(chainId ? PRICE_GETTER_ADDRESSES[chainId] : undefined, PRICE_GETTER_ABI)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export const useBondContract = (address: string) => {
  return useContract(address, BOND_ABI) as Bond
}

export const useBondNftContract = (address: string) => {
  return useContract(address, BOND_NFT_ABI) as BondNft
}

export const useSousChef = (id: number) => {
  // Using selector to avoid circular dependecies
  const chainId = useSelector((state: AppState) => state.application.chainId)
  const config = pools.find((pool) => pool.sousId === id)

  return useContract(config ? config.contractAddress[chainId as SupportedChainId] : '', SOUS_CHEF_ABI) as SousChef
}

export const useMasterChefContract = () => {
  const { chainId } = useWeb3React()
  return useContract<Masterchef>(MASTER_CHEF_V1_ADDRESS[chainId as SupportedChainId], MASTER_CHEF_ABI)
}

export const useMasterChefV2Contract = () => {
  const { chainId } = useWeb3React()
  return useContract<MasterChefV2>(MASTER_CHEF_V2_ADDRESS[chainId as SupportedChainId], MASTER_CHEF_V2_ABI)
}

export const useJungleFarmContract = (address: string) => {
  return useContract<JungleChef>(address, JUNGLE_CHEF_ABI)
}

export const useDualFarmContract = () => {
  const { chainId } = useWeb3React()
  return useContract<MiniApeV2>(MINI_APE_ADDRESS[chainId as SupportedChainId], MINI_CHEF_ABI)
}

// Only on bnb chain
export function useNfaContract() {
  return useContract<NonFungibleApes>('0x6afC012783e3a6eF8C5f05F8EeE2eDeF6a052Ec4', NFA_ABI)
}

export function useNfbContract() {
  return useContract<NonFungibleBananas>('0x9f707A412302a3aD64028A9F73f354725C992081', NFB_ABI)
}

export const useTreasury = () => {
  const { chainId } = useWeb3React()
  return useContract<Treasury>(TREASURY_ADDRESSES[chainId as SupportedChainId], TREASURY_ABI)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React()
  return useContract<Weth>(
    chainId ? WRAPPED_NATIVE_CURRENCY[chainId]?.address : undefined,
    WETH_ABI,
    withSignerIfPossible,
  )
}

export function useZapContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React()
  return useContract<Zap>(chainId ? ZAP_ADDRESS[chainId as SupportedChainId] : undefined, ZAP_ABI, withSignerIfPossible)
}

export const useGnanaToken = () => {
  return new Token(SupportedChainId.BSC, GNANA_ADDRESSES[56], 18, 'GNANA', 'Golden Banana')
}
