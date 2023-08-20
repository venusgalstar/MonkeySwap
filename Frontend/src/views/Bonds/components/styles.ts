import styled from '@emotion/styled'
import { Button, Flex } from 'components/uikit'

export const StyledButton = styled(Button)<{ buttonSize?: string }>`
  border-radius: 10px;
  font-weight: 700;
  padding: 10px 20px;
  width: 100%;
  min-width: ${({ buttonSize }) => buttonSize || '145px'};
  max-width: ${({ buttonSize }) => buttonSize || '145px'};
  height: 44px;
`

export const Container = styled(Flex)`
  position: relative;
  flex-direction: column;
`
