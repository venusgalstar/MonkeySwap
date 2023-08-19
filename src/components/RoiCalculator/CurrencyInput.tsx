import React from 'react'
import { Flex } from 'theme-ui'
import styles from './styles'
import { Button, NumericInput, Text } from 'components/uikit'

interface CurrencyInputPanelProps {
  dollarValue: string
  tokenValue: string
  onUserInput: (value: string) => void
  onMax: () => void
  removeLiquidity?: boolean
}

const CurrencyInputPanelRoi = ({ dollarValue, tokenValue, onUserInput, onMax }: CurrencyInputPanelProps) => {
  return (
    <Flex sx={styles.container}>
      <Flex sx={{ position: 'relative' }}>
        <Button onClick={onMax} variant="primary" style={styles.maxButton}>
          MAX
        </Button>
      </Flex>
      <Flex sx={styles.inputSection as any}>
        <Flex>
          <NumericInput
            value={tokenValue}
            onUserInput={onUserInput}
            style={{ align: 'right', width: '100%', background: 'white4', color: 'text', textAlign: 'right' }}
          />
        </Flex>
        <Text weight="light" variant="sm">
          {dollarValue ? `~ $${dollarValue}` : ' -'}
        </Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(CurrencyInputPanelRoi)
