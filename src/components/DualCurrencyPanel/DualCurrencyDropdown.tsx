import React, { useCallback, useMemo, useState } from 'react'
import { Box, Spinner } from 'theme-ui'
import DualCurrencySearchModal from './DualCurrencySearchModal'
import { useAllTokens } from 'hooks/Tokens'
import { useSetZapInputList, useZapInputList } from 'state/zap/hooks'
import DropdownDisplay from './DropdownDisplay'
import { useTranslation } from 'contexts/Localization'
import { Currency, SupportedChainId, WETH9 } from '@ape.swap/sdk-core'
import { DualCurrencySelector } from 'views/Bonds/actions/types'
import { useWeb3React } from '@web3-react/core'
import { createFilterToken } from './filtering'
import useModal from 'hooks/useModal'
import { Dropdown, DropdownItem, Flex, Text } from 'components/uikit'
import { nativeOnChain } from 'config/constants/tokens'

const DualCurrencyDropdown: React.FC<{
  inputCurrencies: Currency[]
  onCurrencySelect: (currency: DualCurrencySelector) => void
  lpList: DualCurrencySelector[]
  principalToken: Currency | null,
  enableZap: boolean
  showNativeFirst?: boolean
}> = ({ inputCurrencies, onCurrencySelect, lpList, principalToken, enableZap, showNativeFirst }) => {
  useSetZapInputList()
  const allTokens = useAllTokens()
  const rawZapInputList = useZapInputList()
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearchQuery = useCallback((val: string) => {
    setSearchQuery(val)
  }, [])

  const zapInputList = useMemo(() => {
    const addresses: any = []
    if (rawZapInputList) {
      const listByChain = rawZapInputList[chainId as SupportedChainId]
      for (const res of Object?.values(listByChain ?? [])) {
        if (res.address[chainId as SupportedChainId]) {
          addresses.push(res.address[chainId as SupportedChainId].toLowerCase())
        }
      }
    }
    const filteredZapInputTokens = Object.entries(allTokens).filter((token) =>
      addresses.includes(token[0].toLowerCase()),
    )
    return Object.fromEntries(filteredZapInputTokens)
  }, [allTokens, chainId, rawZapInputList])

  const quickSorting = (token1: any, token2: any) => {
    // we might want to make this more involved. Sorting order is as follows: 1 WETH, 2 BUSD, 3 DAI, 4 USDC
    if (token1.symbol === 'WETH') {
      return -1
    }
    if (token1.symbol === 'BUSD') {
      if (token2.symbol === 'WETH') {
        return 1
      } else return -1
    }
    if (token1.symbol === 'DAI') {
      if (token2.symbol === 'WETH' || token2.symbol === 'BUSD') {
        return 1
      } else return -1
    }
    if (token1.symbol === 'USDC') {
      if (token2.symbol === 'WETH' || token2.symbol === 'BUSD' || token2.symbol === 'DAI') {
        return 1
      } else return -1
    }
    return 1
  }

  const currenciesList: any = useMemo(() => {
    const filterToken = createFilterToken(searchQuery)
    const parsedList = Object.values(zapInputList)
      .filter(filterToken)
      .sort(quickSorting)
      .map((token) => {
        return { currencyA: token, currencyB: null }
      })
    if (showNativeFirst) {
      return [{ currencyA: nativeOnChain(chainId as SupportedChainId), currencyB: null }, lpList[0], parsedList].flat()
    }
    return [lpList[0], { currencyA: nativeOnChain(chainId as SupportedChainId), currencyB: null }, parsedList].flat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zapInputList, searchQuery, showNativeFirst])

  const handleCurrencyDynamic = useCallback(
    (currency: DualCurrencySelector) => {
      onCurrencySelect(currency)
      setSearchQuery('')
    },
    [onCurrencySelect],
  )

  const [onPresentCurrencyModal] = useModal(
    //@ts-ignore
    <DualCurrencySearchModal
      onCurrencySelect={handleCurrencyDynamic}
      inputCurrencies={inputCurrencies}
      currenciesList={currenciesList}
      searchQuery={searchQuery}
      handleSearchQuery={handleSearchQuery}
    />,
    true,
    true,
    'DualCurrencySearch',
  )

  const Item = useCallback(
    (item: Currency[], index: number) => {
      return (
        <DropdownItem
          size="sm"
          key={index}
          onClick={() => handleCurrencyDynamic(currenciesList[index])}
          sx={{ width: '100%' }}
        >
          <DropdownDisplay principalToken={principalToken} inputCurrencies={item} />
        </DropdownItem>
      )
    },
    [currenciesList, handleCurrencyDynamic],
  )

  return (
    <Flex sx={{ minWidth: 'max-content' }}>
      {inputCurrencies[0] ? (
        <Flex>
          {enableZap ? (
            <Dropdown
              size="sm"
              component={<DropdownDisplay principalToken={principalToken} inputCurrencies={inputCurrencies} active />}
              sx={{ width: '190px', zIndex: 500, background: 'white4' }}
            >
              {currenciesList.slice(0, 4).map((item: any, index: number) => {
                return Item([item.currencyA, item.currencyB], index)
              })}
              <DropdownItem size="sm" sx={{ textAlign: 'center' }} onClick={onPresentCurrencyModal}>
                <Text sx={{ '&:hover': { textDecoration: 'underline' } }}>{t('See all')} &gt;</Text>
              </DropdownItem>
            </Dropdown>
          ) : (
            <Box
              sx={{
                background: 'white4',
                borderRadius: '10px',
                position: 'relative',
                width: '190px',
              }}
            >
              <Flex
                sx={{
                  padding: '5px 4px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  span: {
                    fontSize: 3,
                  },
                }}
              >
                <DropdownDisplay principalToken={principalToken} inputCurrencies={inputCurrencies} active />
              </Flex>
            </Box>
          )}
        </Flex>
      ) : (
        <Spinner width="15px" height="15px" sx={{ marginRight: '10px' }} />
      )}
    </Flex>
  )
}

export default React.memo(DualCurrencyDropdown)
