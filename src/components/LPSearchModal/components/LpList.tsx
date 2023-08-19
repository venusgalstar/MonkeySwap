import React, { useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import LpRow from './LPRow'
import { Token } from '@ape.swap/sdk-core';
import styled from '@emotion/styled';

interface LpListProps {
  tokens: { currencyA: Token; currencyB: Token }[] | undefined
  onSelect: (currencyA: Token, currencyB: Token) => void
}

const CustomFixedList = styled(FixedSizeList)`
  border-radius: 10px 0px 0px 10px;
`

const LpList: React.FC<LpListProps> = ({ tokens, onSelect }) => {
  const Row = useCallback(
    ({ data, index, style }: any) => {
      const tokens: { currencyA: Token; currencyB: Token } = data[index]
      const handleSelect = () => onSelect(tokens.currencyA, tokens.currencyB)
      return <LpRow style={style} tokens={tokens} onLpSelect={handleSelect} />
    },
    [onSelect],
  )

  return (
    <CustomFixedList height={300} width="100%" itemData={tokens} itemCount={tokens?.length || 0} itemSize={45}>
      {Row}
    </CustomFixedList>
  )
}

export default React.memo(LpList)
