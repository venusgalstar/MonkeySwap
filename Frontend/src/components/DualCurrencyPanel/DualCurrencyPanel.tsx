import React, { useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Spinner } from 'theme-ui'
import { styles } from './styles'
import DualCurrencyDropdown from './DualCurrencyDropdown'
import useIsMobile from 'hooks/useIsMobile'
import { DualCurrencySelector } from 'views/Bonds/actions/types'
import { Currency, CurrencyAmount, SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { PairState, useV2Pair } from 'hooks/useV2Pairs'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { Flex, NumericInput, Text } from 'components/uikit'
import Dots from 'components/Dots'
import { nativeOnChain } from '../../config/constants/tokens'

/**
 * Dropdown component that supports both single currencies and currency pairs. An array of pairs is passed as lpList,
 * while the single currencies are fetched by the component itself
 * @param handleMaxInput function to set max available user's balance
 * @param onUserInput function to set input's value
 * @param value input's value
 * @param onCurrencySelect function to select the input's currency (both single and pairs)
 * @param inputCurrencies selected currencies for the input
 * @param lpList param to define the list of pairs to be used by the component
 * @param enableZap determines whether zap functionality is enabled for the selected product
 */

interface DualCurrencyPanelProps {
  handleMaxInput: () => void
  onUserInput: (val: string) => void
  value: string
  onCurrencySelect: (currency: DualCurrencySelector) => void
  inputCurrencies: Currency[]
  lpList: DualCurrencySelector[]
  principalToken: Currency | null,
  enableZap?: boolean
  //Currently used to pass lp price for bonds. Especially for non Ape LPs bonds as this file checks ApeV2 LP pair address
  lpUsdVal?: number
}

const DualCurrencyPanel: React.FC<DualCurrencyPanelProps> = ({
  handleMaxInput,
  onUserInput,
  value,
  onCurrencySelect,
  inputCurrencies,
  lpList,
  principalToken,
  enableZap,
  lpUsdVal = 0,
}) => {
  const { account, chainId } = useWeb3React()
  const isMobile = useIsMobile()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, inputCurrencies[1] ? (principalToken ?? inputCurrencies[0]) : inputCurrencies[0])
  const pairBalance = useCurrencyBalance(account, (principalToken ?? inputCurrencies[0]))
  const currencyBalance = selectedCurrencyBalance?.toSignificant(6)
  const { t } = useTranslation()

  const [usdValue] = useTokenPriceUsd(
    inputCurrencies[1] ? principalToken : inputCurrencies[0],
    !!inputCurrencies[1],
  )
  const usdVal = inputCurrencies[1] ? lpUsdVal : usdValue

  useEffect(() => {
    if (enableZap && pairBalance && pairBalance?.toExact() === '0') {
      onCurrencySelect({ currencyA: nativeOnChain(chainId as SupportedChainId), currencyB: undefined })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [pairBalance, chainId])

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <NumericInput
          value={value}
          onUserInput={(val) => onUserInput(val)}
          style={{ fontSize: isMobile ? '15px' : '22px', align: 'left' }}
        // removeLiquidity={isMobile}
        />
        <DualCurrencyDropdown
          inputCurrencies={inputCurrencies}
          onCurrencySelect={onCurrencySelect}
          lpList={lpList}
          principalToken={principalToken}
          enableZap={enableZap ?? true}
          showNativeFirst={enableZap && pairBalance?.toExact() === '0'}
        />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.4,
          }}
        >
          <Text size="12px" sx={styles.panelBottomText}>
            {!usdVal && value !== '0.0' ? (
              <Spinner width="15px" height="15px" />
            ) : value !== '0.0' && usdVal !== 0 && value ? (
              `$${(usdVal * parseFloat(value)).toFixed(2)}`
            ) : null}
          </Text>
        </Flex>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
              {!currencyBalance && <Dots />}
            </Text>
            {parseFloat(currencyBalance ?? '0') > 0 && (
              <Flex sx={styles.maxButton} size="sm" onClick={handleMaxInput}>
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

export default React.memo(DualCurrencyPanel)
