import { CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useMemo, useState, useEffect } from 'react'
import { isAddress } from '../../utils'
import JSBI from 'jsbi'
import multicall, { Call } from '../../utils/multicall'
import { useWeb3React } from '@web3-react/core'
import erc20ABI from '../../config/abi/erc20.json'
import BigNumber from 'bignumber.js'
import { ChainId } from '../../config/constants/chains'
import useRefresh from '../useRefresh'

export function useTokenBalancesWithLoadingIndicatorAndChain(
  tokens?: (Token | undefined)[],
  chain?: ChainId,
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const { chainId, account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  const selectedChain = chain ?? chainId

  const [result, setResult] = useState([])
  const [previousChain, setPreviousChain] = useState<ChainId | null>(null)
  const [loading, setLoading] = useState(false)

  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter((t?: Token): t is Token => {
        if (t?.address === '0x0000000000000000000000000000000000000000') return false
        return isAddress(t?.address) !== false && t?.chainId === selectedChain
      }) ?? [],

    [selectedChain, tokens],
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt?.address), [validatedTokens])

  //this is ussed to control the useEffect triggering the rpc calls
  const stringified = JSON.stringify(validatedTokenAddresses) + selectedChain

  const calls: Call[] = useMemo(
    () =>
      validatedTokenAddresses.map((token) => ({
        address: token,
        name: 'balanceOf',
        params: [account],
      })),
    /* eslint-disable react-hooks/exhaustive-deps */
    [stringified, account],
  )

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedChain || calls?.length === 0 || !account) return
      setLoading(true)
      try {
        if (previousChain !== selectedChain) setResult([])
        const data = await multicall(selectedChain, erc20ABI, calls)
        setResult(data)
        setPreviousChain(selectedChain)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedChain, calls, account, fastRefresh])

  return useMemo(
    () => [
      account && validatedTokens.length > 0 && result?.length > 0
        ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }>((memo, token, i) => {
            const value = new BigNumber(result[i] ?? 0).toJSON()
            const amount = value ? JSBI.BigInt(value.toString()) : undefined
            if (amount) {
              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
            }
            return memo
          }, {})
        : {},
      loading,
    ],
    [account, validatedTokens, result, loading],
  )
}
