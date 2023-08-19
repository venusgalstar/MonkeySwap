import { Flex, Text } from 'components/uikit'
import { Currency, CurrencyAmount, Percent, Token } from '@ape.swap/sdk-core'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Field } from 'state/burn/v2/actions'
import { styles } from './styles'
import { Pair } from '@ape.swap/v2-sdk'
import { useTotalSupply } from 'hooks/useTotalSupply'
import CurrencyLogo from 'components/CurrencyLogo'
import JSBI from 'jsbi'

const PoolInfo: React.FC<{
  pair: Pair | undefined | null
  parsedAmounts: {
    LIQUIDITY_PERCENT: Percent
    LIQUIDITY?: CurrencyAmount<Token> | undefined
    CURRENCY_A?: CurrencyAmount<Currency> | undefined
    CURRENCY_B?: CurrencyAmount<Currency> | undefined
  }
}> = ({ pair, parsedAmounts }) => {
  const { t } = useTranslation()
  const totalPoolTokens = useTotalSupply(pair?.liquidityToken)
  const userPoolBalance = parsedAmounts[Field.LIQUIDITY]
  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined

  return (
    <Flex sx={{ ...styles.poolInfoContainer }}>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text size="12px" weight="light">
          {t('LPs To Remove')}
        </Text>
        <Text size="12px" weight={700}>
          {parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) || '-'}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text size="12px" weight="light">
          {t('Share of Pool')}
        </Text>
        <Text size="12px" weight={700}>
          {poolTokenPercentage ? `${poolTokenPercentage.toSignificant(2)}%` : '-'}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text size="12px" weight="light">
          {t('Pooled %currency%', {
            currency: pair?.token0?.symbol || '-',
          })}
        </Text>
        <Flex sx={{ alignItems: 'center' }}>
          <Text size="12px" weight={700} mr="5px">
            {parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) || '-'}
          </Text>
          <CurrencyLogo currency={pair?.token0} size={18} />
        </Flex>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text size="12px" weight="light">
          {t('Pooled %currency%', {
            currency: pair?.token1?.symbol || '-',
          })}
        </Text>
        <Flex sx={{ alignItems: 'center' }}>
          <Text size="12px" weight={700} mr="5px">
            {parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) || '-'}
          </Text>
          <CurrencyLogo currency={pair?.token1} size={16} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(PoolInfo)
