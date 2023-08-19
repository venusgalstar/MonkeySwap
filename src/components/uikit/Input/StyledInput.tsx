//@ts-nocheck
import styled from '@emotion/styled'
import React from 'react'
import Flex from '../Flex'
import Input from './Input'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
  height?: string
}

const StyledInputWrapper = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.white4};
  border-radius: 10px;
  height: 72px;
  padding: 0px 16px;
`

const StyledInputComponent = styled(Input)`
  width: 100%;
  background: none;
  border: 0;
  color: ${({ theme }) => (theme.isDark ? theme.colors.primaryBright : theme.colors.primary)};
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  font-weight: 800;
  font-size: 22px;

  &::placeholder {
    color: ${({ theme }) => !theme.isDark && theme.colors.gray};
  }
`

const StyledInput: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value, height }) => {
  return (
    <StyledInputWrapper sx={{ height: height ?? null }}>
      {!!startAdornment && startAdornment}
      <StyledInputComponent placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

export default StyledInput
