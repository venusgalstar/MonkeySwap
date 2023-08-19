import React from 'react'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { styles } from './styles'
import { Box, Spinner } from 'theme-ui'
import styled from '@emotion/styled'
import { Flex, Svg, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import { useV2Pair } from 'hooks/useV2Pairs'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 10px;
  text-overflow: ellipsis;
  weight: 400;
  font-size: 14px;
  line-height: 30px;
`

export function Balance({ balance }: { balance: CurrencyAmount<Currency> }) {
  return <StyledBalanceText title={balance?.toExact()}>{balance?.toSignificant(5)}</StyledBalanceText>
}

const SearcherDisplay: React.FC<{ item: { currencyA: Currency; currencyB: Currency | undefined } }> = ({ item }) => {
  const { account } = useWeb3React()
  const { currencyA, currencyB } = item
  const [, pair] = useV2Pair(currencyA ?? undefined, currencyB ?? undefined)
  const balance = useCurrencyBalance(account ?? undefined, pair ? pair?.liquidityToken : currencyA)

  return (
    <Flex
      sx={{
        alignItems: 'center',
        width: '100%',
        padding: '10px',
        cursor: 'pointer',
        background: 'white3',
        ':hover': {
          background: 'white4',
        },
      }}
    >
      <Flex sx={{ minWidth: '50px', alignItems: 'center' }}>
        {!currencyB && (
          <Box sx={{ marginRight: '10px' }}>
            <Svg icon="ZapIcon" color={'gray'} width="8px" />
          </Box>
        )}
        <ServiceTokenDisplay
          token1={currencyA?.symbol}
          token2={currencyB?.symbol}
          noEarnToken={!!currencyB}
          size={30}
        />
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Flex sx={{ marginLeft: '10px', flexDirection: 'column' }}>
          <Text sx={styles.symbolText}>
            {currencyB ? `${currencyA?.wrapped?.symbol}-${currencyB?.wrapped?.symbol}` : currencyA?.symbol}
          </Text>
          <Text size="12px" weight={300} sx={{ lineHeight: '16px' }}>
            {pair ? pair?.liquidityToken?.name : currencyA?.name}
          </Text>
        </Flex>
        <Text>{balance ? <Balance balance={balance} /> : account ? <Spinner width="20px" height="20px" /> : null}</Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(SearcherDisplay)
