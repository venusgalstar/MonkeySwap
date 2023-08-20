import React, { MutableRefObject, useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import SearcherDisplay from './SearcherDisplay'
import { DualCurrencySelector } from 'views/Bonds/actions/types'
import { Flex } from 'components/uikit'
import styled from '@emotion/styled'

export default function CurrencyList({
  currenciesList,
  onCurrencySelect,
  fixedListRef,
}: {
  currenciesList: DualCurrencySelector[]
  onCurrencySelect: (currency: DualCurrencySelector, index: number) => void
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
}) {
  const itemData: (DualCurrencySelector | undefined)[] = currenciesList

  const Row = useCallback(
    ({ data, index, style }: any) => {
      const currency: DualCurrencySelector = data[index]
      const handleSelect = () => onCurrencySelect(currency, index)
      const key = index

      return (
        <Flex sx={style} key={`token-item-${key}`} className={`token-item-${key}`} onClick={handleSelect}>
          <SearcherDisplay item={currency} />
        </Flex>
      )
    },
    [onCurrencySelect],
  )

  const itemKey = useCallback((index: number, data: any) => index, [])

  return (
    <CustomFixedList
      height={300}
      width="100%"
      ref={fixedListRef as any}
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </CustomFixedList>
  )
}

const CustomFixedList = styled(FixedSizeList)`
  border-radius: 10px 0px 0px 10px;
`
