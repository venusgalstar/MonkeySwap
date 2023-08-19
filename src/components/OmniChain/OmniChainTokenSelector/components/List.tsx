import { Currency, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex } from 'components/uikit'
import { useAllTokens, useIsUserAddedToken, useSearchInactiveTokenLists, useToken } from 'hooks/Tokens'
import useDebounce from 'hooks/useDebounce'
import { useAllTokenBalances } from 'lib/hooks/useAllTokenBalances'
import { getTokenFilter } from 'lib/hooks/useTokenList/filtering'
import { tokenComparator, useSortTokensByQuery } from 'lib/hooks/useTokenList/sorting'
import { FixedSizeList } from 'react-window'
import { useCallback, useMemo } from 'react'
import { UserAddedToken } from 'state/user/types'
import ListRow from './ListRow'
import { CSSProperties } from 'theme-ui'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { isAddress } from 'utils'
import { CHAIN_PARAMS, ChainId } from 'config/constants/chains'

const List = ({
  searchQuery,
  selectedCurrency,
  onCurrencySelect,
  onDismiss,
  selectedChain,
}: {
  searchQuery: string
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency, chain: ChainId) => void
  onDismiss?: () => void
  selectedChain?: ChainId
}) => {
  const { account, chainId } = useWeb3React()
  const debouncedQuery = useDebounce(searchQuery, 300)

  const defaultTokens = useAllTokens(selectedChain)
  const [balances] = useAllTokenBalances(selectedChain)

  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)
  const isAddressSearch = isAddress(debouncedQuery)

  const tokensArray = Object.values(defaultTokens)
  const filteredTokens: Token[] = useMemo(() => {
    return tokensArray.filter(getTokenFilter(debouncedQuery))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokensArray.length, debouncedQuery])

  const sortedTokens: Token[] = useMemo(
    () =>
      filteredTokens
        .filter((token) => {
          // If there is no query, filter out unselected user-added tokens with no balance.
          if (!debouncedQuery && token instanceof UserAddedToken) {
            if (selectedCurrency?.equals(token)) return true
            return balances[token.address]?.greaterThan(0)
          }
          if (token?.address?.toLowerCase() === '0xbb9bc244d798123fde783fcc1c72d3bb8c189413'.toLowerCase()) return false
          return true
        })
        .sort(tokenComparator.bind(null, balances)),
    [balances, debouncedQuery, filteredTokens, selectedCurrency],
  )

  const filteredSortedTokens = useSortTokensByQuery(debouncedQuery, sortedTokens)

  const native = useNativeCurrency(selectedChain)
  const nativeBalance = useCurrencyBalance(account, native)
  let wrapped = native.wrapped
  //@ts-ignore
  wrapped.logoURI = CHAIN_PARAMS?.[selectedChain]?.logoURI ?? ''

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(
    filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined,
  )

  const searchCurrencies: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    const natives = (native.equals(wrapped) ? [wrapped] : [native, wrapped]).filter(
      (n) => n.symbol?.toLowerCase()?.indexOf(s) !== -1 || n.name?.toLowerCase()?.indexOf(s) !== -1,
    )
    const tokens = filteredSortedTokens?.filter((t) => !(t?.equals(wrapped) || t?.isNative))
    return searchToken ? [searchToken, ...natives, ...tokens] : [...natives, ...tokens]
  }, [debouncedQuery, filteredSortedTokens, native, wrapped, searchToken])

  const Row = useCallback(
    ({ data, index, style }: { data: Currency[]; index: number; style: CSSProperties }) => {
      const row: Currency = data[index]
      const currency = row
      const isSelected = Boolean(currency && selectedCurrency && selectedCurrency.equals(currency))
      const currencyIsImported = !!filteredInactiveTokens.find(
        (token) => token.address.toLowerCase() === currency.wrapped.address.toLowerCase(),
      )

      return (
        <ListRow
          currency={row}
          isSelected={isSelected}
          searchTokenIsAdded={(searchToken ? searchTokenIsAdded : true) && !currencyIsImported}
          userBalance={
            currency.isToken ? balances[currency.address]?.toSignificant(6) : nativeBalance?.toSignificant(6)
          }
          style={style}
          key={currency.isToken ? currency.address : 'ETHER'}
          onSelect={() => {
            onCurrencySelect(row, row.chainId)
            onDismiss && onDismiss()
          }}
          onDismiss={onDismiss}
          showAddToMeta={selectedChain === chainId}
        />
      )
    },
    [
      selectedCurrency,
      filteredInactiveTokens,
      searchToken,
      searchTokenIsAdded,
      balances,
      nativeBalance,
      onDismiss,
      selectedChain,
      chainId,
      onCurrencySelect,
    ],
  )

  const itemKey = useCallback((index: number, data: Currency[]) => {
    const currency = data[index] as Token
    return currency.isToken ? currency.address : 'ETHER'
  }, [])

  return (
    <Flex sx={{ height: '300px', width: '100%', flexDirection: 'column', background: 'white3', borderRadius: '10px' }}>
      <FixedSizeList
        height={500}
        itemSize={55}
        width="100%"
        itemCount={searchCurrencies.length + filteredInactiveTokens.length}
        itemData={[...searchCurrencies, ...filteredInactiveTokens]}
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
