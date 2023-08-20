import { Currency, CurrencyAmount, Percent, Price, Token } from '@ape.swap/sdk-core'
// import { DoubleCurrencyLogo } from 'components/Logo'
import { Flex, Text } from 'components/uikit'
import { ONE_BIPS } from 'config/constants/misc'
import { useTranslation } from 'contexts/Localization'
import { Field } from 'state/mint/v2/actions'
import styles  from './styles'

const PoolInfo = ({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
  liquidityMinted,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price<Currency, Currency>
  chainId?: number
  liquidityMinted?: CurrencyAmount<Token>
}) => {
  const { t } = useTranslation()
  return (
    <Flex sx={{ ...styles.poolInfoContainer }}>
      <Flex sx={{ justifyContent: 'space-between', margin: '4px 0px' }}>
        <Text size="12px" weight="light" sx={styles.textWrap}>
          {`${currencies[Field.CURRENCY_A]?.symbol || ''} - 
            ${currencies[Field.CURRENCY_B]?.symbol || ''} LP`}
        </Text>
        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text size="12px" weight={700} mr="5px" sx={styles.textWrap}>
            {liquidityMinted?.toSignificant(6)}
          </Text>
          {/* <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={16}
          /> */}
        </Flex>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '4px 0px' }}>
        <Text size="12px" weight="light" sx={styles.textWrap}>
          {t('Share of Pool')}
        </Text>
        <Text size="12px" weight={700} sx={styles.textWrap}>
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          %
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '4px 0px' }}>
        <Text size="12px" weight="light" sx={styles.textWrap}>
          {t('%currencyA% per %currencyB%', {
            currencyA: currencies[Field.CURRENCY_A]?.symbol || '',
            currencyB: currencies[Field.CURRENCY_B]?.symbol || '',
          })}
        </Text>
        <Text size="12px" weight={700} sx={styles.textWrap}>
          {price?.invert()?.toSignificant(6) ?? '-'}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '4px 0px' }}>
        <Text size="12px" weight="light" sx={styles.textWrap}>
          {t('%currencyB% per %currencyA%', {
            currencyB: currencies[Field.CURRENCY_B]?.symbol || '',
            currencyA: currencies[Field.CURRENCY_A]?.symbol || '',
          })}
        </Text>
        <Text size="12px" weight={700} sx={styles.textWrap}>
          {price?.toSignificant(6) ?? '-'}
        </Text>
      </Flex>
    </Flex>
  )
}

export default PoolInfo
