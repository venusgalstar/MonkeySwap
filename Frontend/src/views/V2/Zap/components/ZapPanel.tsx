import React from 'react'
import { Flex, NumericInput, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { Spinner } from 'theme-ui'
import { Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { Pair } from '@ape.swap/v2-sdk'
import { styles } from '../styles'
import Dots from 'components/Dots'
import LPSelector from './LpSelector'
export interface ZapPanelProps {
  value: string
  onSelect: (currencyIdA: Token, currencyIdB: Token) => void
  lpPair: Pair | undefined
}

const ZapPanel: React.FC<ZapPanelProps> = ({ value, onSelect, lpPair }) => {
  const { account } = useWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, lpPair?.liquidityToken ?? undefined)
  const currencyBalance = selectedCurrencyBalance?.toSignificant(6)
  const { t } = useTranslation()

  const [usdVal] = useTokenPriceUsd(lpPair?.liquidityToken, true)

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{t('To')}:</Text>
        <NumericInput value={value} onUserInput={() => null} />
        <LPSelector lpPair={lpPair} onSelect={onSelect} />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex sx={styles.centered}>
          <Text size="12px" sx={styles.panelBottomText}>
            {!usdVal && value !== '0.0' ? (
              <Spinner width="15px" height="15px" />
            ) : value !== '0.0' && usdVal !== 0 && value ? (
              `$${(usdVal * parseFloat(value)).toFixed(2)}`
            ) : null}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          {account ? (
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
              {!currencyBalance && <Dots />}
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapPanel)
