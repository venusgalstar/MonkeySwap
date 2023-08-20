import React, { CSSProperties } from 'react'
import { styles } from '../styles'
import { Spinner } from 'theme-ui'
import styled from '@emotion/styled'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { Flex, Text } from 'components/uikit'
import { Currency, CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { PairState, useV2Pair } from 'hooks/useV2Pairs'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
  weight: 400;
  font-size: 14px;
  line-height: 35px;
  margin-right: 5px;
`

export function Balance({ balance }: { balance: CurrencyAmount<Currency> }) {
  return <StyledBalanceText title={balance?.toExact()}>{balance?.toSignificant(6)}</StyledBalanceText>
}

interface LPRowProps {
  tokens?: { currencyA: Token; currencyB: Token } | undefined
  onLpSelect?: (currencyA: Token, currencyB: Token) => void
  style: CSSProperties
}

const LPRow: React.FC<LPRowProps> = ({ tokens, onLpSelect, style }) => {
  const { account } = useWeb3React()
  const currencyA = tokens?.currencyA
  const currencyB = tokens?.currencyB
  const [pairState, pair] = useV2Pair(currencyA, currencyB)
  const balance = useCurrencyBalance(account ?? undefined, pair?.liquidityToken)
  const key = pair?.liquidityToken.address
  if (pairState === PairState.INVALID) return null
  return (
    <Flex sx={styles.LpRowContainer} onClick={onLpSelect} style={style} key={`lp-item-${key}`}>
      <Flex sx={{ alignItems: 'center' }}>
        <ServiceTokenDisplay token1={currencyA?.wrapped.symbol} token2={currencyB?.wrapped.symbol} noEarnToken />
        <Text weight={700} sx={{ lineHeight: '22px', marginLeft: '5px' }}>
          {currencyA?.wrapped.symbol}-{currencyB?.wrapped.symbol}
        </Text>
      </Flex>
      {balance ? <Balance balance={balance} /> : account ? <Spinner width="20px" height="20px" /> : null}
    </Flex>
  )
}

export default React.memo(LPRow)
