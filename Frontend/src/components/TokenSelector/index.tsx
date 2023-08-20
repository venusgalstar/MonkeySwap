import { Currency } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'
import TokenListModal from 'components/TokenListModal'
import { Flex, Skeleton, Svg, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import React from 'react'
import { styles } from './styles'
import ChainTokenSelector from '../OmniChain/OmniChainTokenSelector'
import TokenImage from '../TokenImage'
import { TokenInfo } from '@uniswap/token-lists'
import OmniTokenImage from '../OmniChain/OmniTokenImage'
import { ChainId } from 'config/constants/chains'

const TokenSelector = ({
  currency,
  onCurrencySelect,
  otherCurrency,
  isRemoveLiquidity,
  disableTokenSelect,
  isZapInput,
  isOmniChain,
}: {
  currency?: Currency | null
  otherCurrency?: Currency | null
  onCurrencySelect: (currency: Currency, chain: ChainId) => void
  disableTokenSelect?: boolean
  isRemoveLiquidity?: boolean
  isZapInput?: boolean //make this an enum
  isOmniChain?: boolean //make this an enum
}) => {
  const [onPresentCurrencyModal] = useModal(
    <TokenListModal
      onDismiss={() => null}
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      isZapInput={isZapInput}
    />,
  )

  const [onPresentOmniCurrencyModal] = useModal(
    <ChainTokenSelector onCurrencySelect={onCurrencySelect} selectedCurrency={currency} />,
  )

  return disableTokenSelect ? (
    <Flex
      sx={{
        ...styles.primaryFlex,
        cursor: 'default',
        '&:active': { transform: 'none' },
        ':hover': { background: 'white4' },
      }}
    >
      {currency ? (
        <CurrencyLogo currency={currency} />
      ) : (
        <Skeleton width="30px" height="30px" animation="waves" variant="circle" />
      )}
      <Text sx={{ ...styles.tokenText }}>{currency?.symbol}</Text>
    </Flex>
  ) : isRemoveLiquidity ? (
    <Flex
      sx={{
        ...styles.primaryFlex,
        cursor: 'default',
        '&:active': { transform: 'none' },
        ':hover': { background: 'white4' },
      }}
    >
      <Text sx={styles.tokenText}>
        {currency?.symbol} - {otherCurrency?.symbol}
      </Text>
    </Flex>
  ) : isOmniChain ? (
    <Flex sx={styles.primaryFlex} onClick={onPresentOmniCurrencyModal}>
      {currency ? (
        <OmniTokenImage currency={currency} size={30} />
      ) : (
        <Skeleton width="30px" height="30px" animation="waves" variant="circle" />
      )}
      <Text sx={styles.tokenText}>{currency?.symbol}</Text>
      <Svg icon="caret" />
    </Flex>
  ) : (
    <Flex sx={styles.primaryFlex} onClick={onPresentCurrencyModal}>
      {currency ? (
        <CurrencyLogo currency={currency} />
      ) : (
        <Skeleton width="30px" height="30px" animation="waves" variant="circle" />
      )}
      <Text sx={styles.tokenText}>{currency?.symbol}</Text>
      <Svg icon="caret" />
    </Flex>
  )
}

export default React.memo(TokenSelector)
