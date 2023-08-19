import styled from '@emotion/styled'
import { Flex } from 'components/uikit'

export const Container = styled(Flex)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 24px;
  }
`
