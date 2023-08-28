import { Interface } from '@ethersproject/abi'
import { Currency, CurrencyAmount, NativeCurrency, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import ERC20ABI from 'config/abi/erc20.json'

import JSBI from 'jsbi'
import { useMultipleContractSingleData, useSingleCallResult } from 'lib/hooks/multicall'
import { useEffect, useMemo, useState } from 'react'

import { isAddress } from '../../utils'
import { Erc20Interface } from 'config/abi/types/Erc20'
import { ChainId } from '../../config/constants/chains'
import multicall from '../../utils/multicall'
import BigNumber from 'bignumber.js'
import useNativeCurrency from './useNativeCurrency'
import multicallV2Abi from '../../config/abi/multicallv2.json'
import { MULTICALL_V2 } from '../../config/constants/addresses'

import { useTokenContract } from 'hooks/useContract'
import ReturnCard from 'views/Gnana/components/ReturnCard'

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useNativeCurrencyBalances(
  chain?: ChainId,
): [CurrencyAmount<NativeCurrency | Token> | undefined, boolean] {
  const { account, provider } = useWeb3React()
  const [result, setResult] = useState<[string | undefined]>([] as any)
  const [loading, setLoading] = useState(false)

  const calls = useMemo(() => {
    if (!account || !chain) return []
    return [
      {
        address: MULTICALL_V2[chain],
        name: 'getEthBalance',
        params: [account],
      },
    ]
  }, [account, chain])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (!chain || calls?.length === 0 || !account) return
      try {
        const data = await multicall(chain, multicallV2Abi, calls)
        setResult([data])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [chain, account])

  const native = useNativeCurrency(chain)

  const value = new BigNumber(result[0] ?? 0).toString()
  const amount = value ? JSBI.BigInt(value) : undefined

  return useMemo(
    () => [
      account && result?.length > 0 && value && amount ? CurrencyAmount.fromRawAmount(native, amount) : undefined,
      loading,
    ],
    [account, amount, loading, native, result?.length, value],
  )
}

const ERC20Interface = new Interface(ERC20ABI) as Erc20Interface
const tokenBalancesGasRequirement = { gasRequired: 500_000 }

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[],
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const { chainId } = useWeb3React() // we cannot fetch balances cross-chain
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false && t?.chainId === chainId) ?? [],
    [chainId, tokens],
  )
  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens])

  console.log('use: validatedTokenAddr', validatedTokenAddresses);

  // if (chainId != 97) {
    const balances = useMultipleContractSingleData(
      validatedTokenAddresses,
      ERC20Interface,
      'balanceOf',
      useMemo(() => [address], [address]),
      tokenBalancesGasRequirement,
    )
    console.log("use: balances=", balances)

    const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances])

    return useMemo(
      () => [
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
              }
              return memo
            }, {})
          : {},
        anyLoading,
      ],
      [address, validatedTokens, anyLoading, balances],
    )
  // } else {
    // BSC testnet
    // return [{}, false];
    // if (validatedTokenAddresses.length == 0) {
    //   return [{}, false];
    // }

    // const tokenContract = useTokenContract(validatedTokenAddresses?.[0], true);
    // if (!tokenContract) {
    //   return [{}, false];
    // }

    // const amount = tokenContract?.balanceOf?.(address ? address : '');
    // let value = JSBI.BigInt('0');
    // amount?.then((val) => {
    //   if (val != undefined) {
    //     value = JSBI.BigInt(val.toString());
    //   }
    // });
    // console.log('use: token Balance', value);

    // return [{[address]: CurrencyAmount.fromRawAmount(validatedTokens[0], value)}, true];
  // }
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[],
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): CurrencyAmount<Token> | undefined {
  const tokenBalances = useTokenBalances(
    account,
    useMemo(() => [token], [token]),
  )
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[],
): (CurrencyAmount<Currency> | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies],
  )

  console.log('use: account', account);
  console.log('use: currency', currencies?.[0]);

  const tokenBalances = useTokenBalances(account, tokens)
  const [ethBalance, loadingNativeBalance] = useNativeCurrencyBalances(currencies?.[0]?.chainId)

  console.log('use: tokenBalance', tokenBalances);
  console.log('use: ethBalance', ethBalance);
  console.log('use: loadingNativeBalance', loadingNativeBalance);

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined
        if (currency.isToken) return tokenBalances[currency.address]
        if (currency.isNative && !loadingNativeBalance) return ethBalance
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, loadingNativeBalance, tokenBalances],
  )
}

export default function useCurrencyBalance(
  account?: string,
  currency?: Currency,
): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalances(
    account,
    useMemo(() => [currency], [currency]),
  )[0]
}

export function useCurrencyBalanceString(chainId: ChainId): string {
  return useNativeCurrencyBalances(chainId)[0]?.toSignificant(5) ?? ''
}
