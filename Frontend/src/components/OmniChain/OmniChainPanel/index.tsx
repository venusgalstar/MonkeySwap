import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Spinner } from 'theme-ui'
import styles from './styles'
import { OmniChainPanelProps } from './types'
import { Flex, NumericInput, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import TokenSelector from 'components/TokenSelector'
import Dots from 'components/Dots'
import { Field } from 'state/swap/actions'
import { useCurrencyBalanceWithChain } from 'hooks/balances/useCurrencyBalanceWithChain'

const OmniChainPanel = ({
  panelText,
  value,
  currency,
  currencyChain,
  onCurrencySelect,
  onUserInput,
  handleMaxInput,
  disabled,
  apiPrice,
}: OmniChainPanelProps) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const selectedCurrencyBalance = useCurrencyBalanceWithChain(
    account ?? undefined,
    currency ?? undefined,
    currencyChain ?? undefined,
  )

  const currencyBalance = selectedCurrencyBalance?.toSignificant(6) || '0'
  const hideDust = currencyBalance === '0.000000000000000001' ? '0' : currencyBalance

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{panelText}</Text>
        <NumericInput disabled={disabled} onUserInput={onUserInput} value={value} />
        <TokenSelector currency={currency} onCurrencySelect={onCurrencySelect} isOmniChain />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled && 0.4,
          }}
        >
          {value && (
            <>
              {!apiPrice ? (
                <Spinner width="15px" height="15px" />
              ) : (
                <Text size="12px" sx={styles.panelBottomText}>
                  {value !== '.' && value && `$${apiPrice}`}
                </Text>
              )}
            </>
          )}
        </Flex>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: hideDust || 'loading' })}
            </Text>
            {!hideDust && <Dots />}
            {parseFloat(hideDust) > 0 && handleMaxInput && (
              <Flex sx={styles.maxButton} size="sm" onClick={() => handleMaxInput(Field.INPUT)}>
                <Text color="primaryBright" sx={{ lineHeight: '0px' }}>
                  {t('MAX')}
                </Text>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default OmniChainPanel
