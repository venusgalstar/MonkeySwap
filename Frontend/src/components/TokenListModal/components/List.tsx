import { Currency, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex, Skeleton } from 'components/uikit'
import { useAllTokens, useIsUserAddedToken, useSearchInactiveTokenLists, useToken } from 'hooks/Tokens'
import useDebounce from 'hooks/useDebounce'
import { useAllTokenBalances } from 'lib/hooks/useAllTokenBalances'
import { getTokenFilter } from 'lib/hooks/useTokenList/filtering'
import { tokenComparator, useSortTokensByQuery } from 'lib/hooks/useTokenList/sorting'
import { FixedSizeList } from 'react-window'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { UserAddedToken } from 'state/user/types'
import ListRow from './ListRow'
import { CSSProperties } from 'theme-ui'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { isAddress } from 'utils'
import { useZapInputList } from '../../../state/zap/hooks'
import { ChainId } from 'config/constants/chains'

const List = ({
  searchQuery,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases,
  disableNonToken,
  onCurrencySelect,
  onDismiss,
  isZapInput,
}: {
  searchQuery: string
  selectedCurrency?: Currency | null
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showCurrencyAmount?: boolean
  disableNonToken?: boolean
  onCurrencySelect: (currency: Currency, chain: ChainId) => void
  onDismiss: () => void
  isZapInput?: boolean
}) => {
  const { chainId, account } = useWeb3React()
  const [tokenLoaderTimerElapsed, setTokenLoaderTimerElapsed] = useState(false)
  const debouncedQuery = useDebounce(searchQuery, 200)
  const defaultTokens = useAllTokens()
  const zapInputTokens = useZapInputList()
  const [balances, balancesAreLoading] = useAllTokenBalances()
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)
  const isAddressSearch = isAddress(debouncedQuery)

  //this function takes the tokens of defaultToken object and filters the tokens we want users zap from.
  const inputList: Record<string, any> = useMemo(() => {
    if (!zapInputTokens) return {}
    let filteredObject: Record<string, any> = {}
    Object.keys(defaultTokens).forEach((key) => {
      Object.values(zapInputTokens[chainId as ChainId]).forEach((subObject) => {
        if (subObject.address && subObject.address[chainId as ChainId]?.toLowerCase() === key.toLowerCase()) {
          filteredObject[key] = defaultTokens[key]
        }
      })
    })
    return filteredObject
  }, [chainId, defaultTokens, zapInputTokens])

  const filteredTokens: Token[] = useMemo(() => {
    if (isZapInput) {
      if (!zapInputTokens) return []
      return Object.values(inputList).filter(getTokenFilter(debouncedQuery))
    }
    return Object.values(defaultTokens).filter(getTokenFilter(debouncedQuery))
  }, [isZapInput, defaultTokens, debouncedQuery, zapInputTokens, inputList])

  const sortedTokens: Token[] = useMemo(
    () =>
      filteredTokens
        .filter((token) => {
          // If there is no query, filter out unselected user-added tokens with no balance.
          if (!debouncedQuery && token instanceof UserAddedToken) {
            if (selectedCurrency?.equals(token) || otherSelectedCurrency?.equals(token)) return true
            return balances[token.address]?.greaterThan(0)
          }
          return true
        })
        .sort(tokenComparator.bind(null, balances)),
    [balances, debouncedQuery, filteredTokens, otherSelectedCurrency, selectedCurrency],
  )

  const filteredSortedTokens = useSortTokensByQuery(debouncedQuery, sortedTokens)

  const native = useNativeCurrency()
  const nativeBalance = useCurrencyBalance(account, native)
  const wrapped = native.wrapped

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(
    filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined,
  )

  const searchCurrencies: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()

    const zapTokens = filteredSortedTokens
    const natives = (disableNonToken || native.equals(wrapped) ? [wrapped] : [native, wrapped]).filter(
      (n) => n.symbol?.toLowerCase()?.indexOf(s) !== -1 || n.name?.toLowerCase()?.indexOf(s) !== -1,
    )
    if (isZapInput) return searchToken ? [searchToken, ...natives, ...zapTokens] : [...natives, ...zapTokens]
    const tokens = filteredSortedTokens?.filter((t) => !(t?.equals(wrapped) || (disableNonToken && t?.isNative)))
    return searchToken ? [searchToken, ...natives, ...tokens] : [...natives, ...tokens]
  }, [debouncedQuery, filteredSortedTokens, disableNonToken, native, wrapped, isZapInput, searchToken])

  // Timeout token loader after 0.5s
  useEffect(() => {
    const tokenLoaderTimer = setTimeout(() => {
      setTokenLoaderTimerElapsed(true)
    }, 500)
    return () => clearTimeout(tokenLoaderTimer)
  }, [])

  const Row = useCallback(
    ({ data, index, style }: { data: Currency[]; index: number; style: CSSProperties }) => {
      const row: Currency = data[index]
      const currency = row
      const isSelected = Boolean(currency && selectedCurrency && selectedCurrency.equals(currency))
      const otherSelected = Boolean(currency && otherSelectedCurrency && otherSelectedCurrency.equals(currency))
      const currencyIsImported = !!filteredInactiveTokens.find(
        (token) => token.address.toLowerCase() === currency.wrapped.address.toLowerCase(),
      )
      if (!tokenLoaderTimerElapsed)
        return (
          <Flex sx={{ ...style, flexDirection: 'column', height: '500px' }}>
            {[...Array(8)].map((i) => {
              return <Skeleton key={i} width="100%" height="100px" animation="waves" sx={{ margin: '2.5px 0px' }} />
            })}
          </Flex>
        )
      return (
        <ListRow
          currency={row}
          isSelected={isSelected}
          otherSelected={otherSelected}
          searchTokenIsAdded={(searchToken ? searchTokenIsAdded : true) && !currencyIsImported}
          userBalance={
            currency.isToken ? balances[currency.address]?.toSignificant(6) : nativeBalance?.toSignificant(6)
          }
          style={style}
          key={currency.isToken ? currency.address : 'ETHER'}
          onSelect={() => {
            //TODO: fix this, we should take redux chain of no chainId
            onCurrencySelect(row, chainId ?? 56)
            onDismiss()
          }}
          onDismiss={onDismiss}
        />
      )
    },
    [
      selectedCurrency,
      otherSelectedCurrency,
      filteredInactiveTokens,
      tokenLoaderTimerElapsed,
      searchToken,
      searchTokenIsAdded,
      balances,
      nativeBalance,
      onDismiss,
      onCurrencySelect,
      chainId,
    ],
  )

  const itemKey = useCallback((index: number, data: Currency[]) => {
    const currency = data[index] as Token
    return currency.isToken ? currency.address : 'ETHER'
  }, [])

  return (
    <Flex sx={{ height: '340px', width: '100%', flexDirection: 'column', background: 'white3', borderRadius: '10px' }}>
      <FixedSizeList
        height={500}
        itemSize={55}
        width="100%"
        itemCount={isZapInput ? searchCurrencies.length : searchCurrencies.length + filteredInactiveTokens.length}
        itemData={isZapInput ? searchCurrencies : [...searchCurrencies, ...filteredInactiveTokens]}
        itemKey={itemKey}
        sx={{
          '::-webkit-scrollbar': {
            width: '8px',
          },
          '::-webkit-scrollbar-thumb': {
            background: 'text',
            borderRadius: '8px',
          },
          '::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px',
            color: 'input',
            borderRadius: '10px',
          },
        }}
      >
        {Row}
      </FixedSizeList>
    </Flex>
  )
}

export default List
