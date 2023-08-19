import { useTranslation } from 'contexts/Localization'
import { Spinner } from 'theme-ui'
import React from 'react'
import styles from './styles'
import { DexPanelProps, Pricing } from './types'
import { Flex, NumericInput, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import TokenSelector from 'components/TokenSelector'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import Dots from 'components/Dots'

const DexPanel = ({
                    value,
                    currency,
                    onCurrencySelect,
                    onUserInput,
                    handleMaxInput,
                    otherCurrency,
                    fieldType,
                    panelText,
                    disabled,
                    independentField,
                    disableTokenSelect,
                    userBalance,
                    locked,
                    isZapInput,
                    pricing,
                    apiPrice,
                  }: DexPanelProps) => {
  const { account } = useWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const currencyBalance = userBalance ? userBalance?.toFixed(6) : selectedCurrencyBalance?.toSignificant(6) || '0'
  const { t } = useTranslation()
  const [usdVal, loadingUsdValue] = useTokenPriceUsd(currency ?? undefined)

  return (
    <Flex sx={styles.dexPanelContainer}>
      {locked && (
        <Flex
          sx={{
            zIndex: 10,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'white3',
            opacity: 0.7,
            borderRadius: '10px',
            cursor: 'not-allowed',
          }}
        />
      )}
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{panelText}</Text>
        <NumericInput onUserInput={onUserInput} value={value} />
        <TokenSelector
          currency={currency}
          otherCurrency={otherCurrency}
          onCurrencySelect={onCurrencySelect}
          disableTokenSelect={disableTokenSelect}
          isZapInput={isZapInput}
        />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: independentField && independentField !== fieldType && disabled && 0.4,
          }}
        >
          {
            value && (
              <>
                {
                  pricing === Pricing.PRICEGETTER ? (
                    <>
                      {loadingUsdValue ? (
                        <Spinner width="15px" height="15px" />
                      ) : (
                        <Text size="12px" sx={styles.panelBottomText}>
                          {value !== '.' && value && `$${(usdVal * parseFloat(value.replace(/,/g, ''))).toFixed(2)}`}
                        </Text>
                      )}
                    </>
                  ) :
                    <>
                      {!apiPrice ? (
                        <Spinner width='15px' height='15px' />
                      ) : (
                        <Text size='12px' sx={styles.panelBottomText}>
                          {value !== '.' && value && apiPrice === '0.00' ? '$-' : `$${apiPrice}`}
                        </Text>
                      )}
                    </>
                }
              </>
            )
          }
        </Flex>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size='12px' sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
            </Text>
            {!currencyBalance && <Dots />}
            {parseFloat(currencyBalance) > 0 && handleMaxInput && (
              <Flex sx={styles.maxButton} size='sm' onClick={() => handleMaxInput(fieldType)}>
                <Text color='primaryBright' sx={{ lineHeight: '0px' }}>
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

export default React.memo(DexPanel)
