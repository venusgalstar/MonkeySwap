import React from 'react'
import { Flex, Svg, Text } from 'components/uikit'
import { styles } from 'components/TokenSelector/styles'
import { Spinner } from 'theme-ui'
import LPSearchModal from 'components/LPSearchModal/LPSearchModal'
import useModal from 'hooks/useModal'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Token } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'

const LPSelector: React.FC<{
  lpPair: Pair | undefined
  onSelect: (currencyA: Token, currencyB: Token) => void
}> = ({ lpPair, onSelect }) => {
  const [onPresentCurrencyModal] = useModal(<LPSearchModal onSelect={onSelect} />, true, true, 'DualModalLP')

  return (
    <Flex sx={styles.primaryFlex} onClick={onPresentCurrencyModal}>
      {lpPair ? (
        <>
          <DoubleCurrencyLogo currency0={lpPair?.token0} currency1={lpPair?.token1} size={30} />
          <Text sx={styles.tokenText}>
            {lpPair.token0?.wrapped?.symbol}-{lpPair.token1?.wrapped?.symbol}
          </Text>
        </>
      ) : (
        <Spinner width="15px" height="15px" sx={{ marginRight: '10px' }} />
      )}
      <Svg icon="caret" />
    </Flex>
  )
}

export default LPSelector
