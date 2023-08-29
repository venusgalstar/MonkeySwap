import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import DexNav from 'components/DexNav'
import { V2LiquiditySubNav } from 'components/DexNav/LiquiditySubNav'
import DexPanel from 'components/DexPanel'
import { Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/mint/v2/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/v2/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Actions from './components/Actions'
import AddLiquiditySign from './components/AddLiquiditySign'
import PoolInfo from './components/PoolInfo'
import { useHandleCurrencyASelect, useHandleCurrencyBSelect } from './hooks'
import styles from './styles'
import { Pricing } from '../../../components/DexPanel/types'

const AddLiquidityV2 = ({ currencyIdA, currencyIdB }: { currencyIdA: string; currencyIdB: string }) => {
  const { t } = useTranslation()
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  // Mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  // Navigation
  const handleCurrencyASelect = useHandleCurrencyASelect({ currencyIdB, currencyIdA })
  const handleCurrencyBSelect = useHandleCurrencyBSelect({ currencyIdA, currencyIdB })

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }
  console.log('>>>1 formattedAmounts=', formattedAmounts)

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  // Action handlers

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  return (
    <Flex variant="flex.dexContainer">
      <DexNav />
      <V2LiquiditySubNav />

      {noLiquidity && (
        <Flex sx={styles.warningMessageContainer}>
          <Text size="14px" weight={700} mb="10px" color="primaryBright">
            {t('You are the first liquidity provider.')}
          </Text>
          <Text size="12px" weight={500} color="primaryBright" sx={{ textAlign: 'center' }}>
            {t(
              'The ratio of tokens you add will set the price of this pool. Once you are happy with the rate click supply to review.',
            )}
          </Text>
        </Flex>
      )}
      <Flex sx={{ mb: '30px' }} />
      <DexPanel
        panelText="Token 1"
        onCurrencySelect={handleCurrencyASelect}
        onUserInput={onFieldAInput}
        handleMaxInput={() => {
          onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
        }}
        value={formattedAmounts[Field.CURRENCY_A]}
        currency={currencyA}
        otherCurrency={currencyB}
        pricing={Pricing.PRICEGETTER}
      />
      <AddLiquiditySign />
      <DexPanel
        panelText="Token 2"
        onCurrencySelect={handleCurrencyBSelect}
        onUserInput={onFieldBInput}
        handleMaxInput={() => {
          onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
        }}
        value={formattedAmounts[Field.CURRENCY_B]}
        currency={currencyB}
        otherCurrency={currencyA}
        pricing={Pricing.PRICEGETTER}
      />
      <PoolInfo
        currencies={currencies}
        poolTokenPercentage={poolTokenPercentage}
        noLiquidity={noLiquidity}
        price={price}
        liquidityMinted={liquidityMinted}
      />
      <Actions
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        error={error}
        noLiquidity={noLiquidity}
        price={price}
        poolTokenPercentage={poolTokenPercentage}
        liquidityMinted={liquidityMinted}
      />
    </Flex>
  )
}

export default AddLiquidityV2
