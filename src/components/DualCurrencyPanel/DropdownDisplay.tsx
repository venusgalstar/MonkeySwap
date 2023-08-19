import React from 'react'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { styles } from './styles'
import { Box, Spinner } from 'theme-ui'
import styled from '@emotion/styled'
import { Flex, Svg, Text } from 'components/uikit'
import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { useV2Pair } from 'hooks/useV2Pairs'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { useWeb3React } from '@web3-react/core'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 10px;
  text-overflow: ellipsis;
  weight: 400;
  font-size: 12px;
  line-height: 30px;
`

export function Balance({ balance }: { balance: CurrencyAmount<Currency> }) {
  const bal = parseFloat(balance.toExact())
  return (
    <StyledBalanceText title={balance?.toExact()}>{bal > 0.0001 ? balance?.toSignificant(4) : '0'}</StyledBalanceText>
  )
}

const DropdownDisplay: React.FC<{ principalToken: Currency | null, inputCurrencies: Currency[]; active?: boolean }> = ({ principalToken, inputCurrencies, active }) => {
  const { account } = useWeb3React()
  const [, pair] = useV2Pair(inputCurrencies[0], inputCurrencies[1])
  const balance = useCurrencyBalance(account ?? undefined, inputCurrencies[1] ? (principalToken ?? inputCurrencies[0]) : inputCurrencies[0])

  return (
    <Flex sx={{ alignItems: 'center', width: active ? '100%' : '170px' }}>
      <Flex sx={{ minWidth: inputCurrencies[1] ? '30px' : '35px', marginRight: '5px', alignItems: 'center' }}>
        {!inputCurrencies[1] && !active && (
          <span sx={{ marginRight: '5px' }}>
            <Svg icon="ZapIcon" color={'gray'} width="8px" />
          </span>
        )}
        <ServiceTokenDisplay
          token1={inputCurrencies[0]?.symbol}
          token2={inputCurrencies[1]?.symbol}
          noEarnToken={!!inputCurrencies[1]}
          size={active ? 28 : 20}
        />
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', width: active ? null : '100%' }}>
        <Text sx={styles.tokenText}>
          {inputCurrencies[1]
            ? `${inputCurrencies[0]?.wrapped.symbol}-${inputCurrencies[1]?.wrapped.symbol}`
            : inputCurrencies[0]?.symbol}
        </Text>
        <Text>
          {!active ? (
            balance ? (
              <Balance balance={balance} />
            ) : account ? (
              <Spinner width="20px" height="20px" />
            ) : null
          ) : null}
        </Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(DropdownDisplay)
