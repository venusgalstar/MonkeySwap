import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { InputProps } from 'theme-ui'
import { Button, Flex, StyledInput, Text } from 'components/uikit'
import styled from '@emotion/styled'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value }) => {
  const { t } = useTranslation()
  return (
    <Flex sx={{ width: '100%', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Text sx={{ fontSize: '12px', fontWeight: 500 }}>
        {max.toLocaleString()} {symbol} {t('Available')}
      </Text>
      <StyledInput
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <span sx={{ color: 'text' }}>{symbol}</span>
            <StyledSpacer />
            <div>
              <StyledButton size="sm" onClick={onSelectMax}>
                {t('Max')}
              </StyledButton>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </Flex>
  )
}

const StyledSpacer = styled(Flex)`
  flex-direction: column;
  width: 8px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledButton = styled(Button)`
  align-items: center;
  display: flex;
  background-color: #ffb300;
  box-shadow: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
`

export default TokenInput
