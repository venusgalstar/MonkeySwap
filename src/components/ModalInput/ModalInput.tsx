import React from 'react'
import { useTranslation } from '../../contexts/Localization'
import { Button, Flex, Input, Text } from 'components/uikit'
import { Theme } from 'theme-ui'

interface ModalInputProps {
  max: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  inputTitle?: string
  displayDecimals?: number
}

const ModalInput: React.FC<ModalInputProps> = ({ max, onChange, onSelectMax, value, inputTitle, displayDecimals }) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max || max === 'NaN'
  const displayBalance = isBalanceZero ? '0' : parseFloat(max).toFixed(displayDecimals || 4)

  return (
    <Flex sx={{ position: 'relative' }}>
      <Flex
        sx={{
          flexDirection: 'column',
          backgroundColor: 'white3',
          borderRadius: '16px',
          color: 'text',
          padding: '8px 16px 8px 0',
          width: '100%',
        }}
      >
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-end', pl: '16px' }}>
          <Text sx={{ fontSize: '14px', fontWeight: 800 }}>{inputTitle}</Text>
          <Text sx={{ fontSize: '16px', fontWeight: 500 }}>
            {t('Balance')}: {displayBalance.toLocaleString()}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mt: '5px' }}>
          <Input onChange={onChange} placeholder="0" value={value} />
          <Button size="sm" onClick={onSelectMax} sx={{ ml: '1px', fontWeight: 600 }}>
            {t('Max')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ModalInput
