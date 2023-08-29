import { Currency, Token } from '@ape.swap/sdk-core'
import BigNumber from 'bignumber.js'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { useContract, usePriceGetter } from './useContract'
import store from '../state'
import multicall from 'utils/multicall'
import { useWeb3React } from '@web3-react/core'
import PRICE_GETTER_ABI from 'config/abi/price-getter.json'
import { PRICE_GETTER_ADDRESSES } from 'config/constants/addresses'

const useTokenPriceUsd = (token: Currency | undefined | null, lpFlag?: boolean): [number, boolean] => {
  const priceGetterContract = usePriceGetter()
  const address = token ? (token as Token).address : undefined
  const isNative = token ? token.isNative : undefined

  console.log('>>>5 priceGetterContract.addr=', priceGetterContract?.address)

  // const {chainId} = useWeb3React();
  // if (chainId != 97) {

    const { result, loading } = useSingleCallResult(
      priceGetterContract,
      // TODO: Typecheck these calls to ensure they are correct
      // NOTE: Having to use 'getETHPrice()' due to function overloading
      lpFlag ? 'getLPPrice' : isNative ? 'getETHPrice()' : 'getPrice',
      lpFlag ? [address, 18] : isNative ? [] : [address, 0],
    )

    if (token?.symbol === 'GNANA') {
      return [parseFloat(store?.getState()?.application?.bananaPrice ?? '0') * 1.3889, false]
    }
    const bigNumberResponse = new BigNumber(result?.toString() || 0)
    const value = getBalanceNumber(bigNumberResponse, 18)
    return [value, loading]

  // } else {

  //   const calls:any = []
  //   calls.push({
  //     address: PRICE_GETTER_ADDRESSES[chainId],
  //     name: lpFlag ? 'getLPPrice' : isNative ? 'getETHPrice()' : 'getPrice',
  //     params: lpFlag ? [address, 18] : isNative ? [] : [address, 0],
  //   })
  //   if (chainId == undefined) {
  //     return [0, false]
  //   }
  //   const res = (async() => {return await multicall(chainId ?? 0, PRICE_GETTER_ABI, calls)}) ();

  //   console.log('>>>5 res=', res)

  //   if (token?.symbol === 'GNANA') {
  //     return [parseFloat(store?.getState()?.application?.bananaPrice ?? '0') * 1.3889, false]
  //   }
  //   const bigNumberResponse = new BigNumber(res?.toString() || 0)
  //   const value = getBalanceNumber(bigNumberResponse, 18)
  //   return [value, false]

  // }
}

export default useTokenPriceUsd
