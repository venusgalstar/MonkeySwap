// @ts-nocheck
import styled from '@emotion/styled'
import { Button, Flex, Text } from 'components/uikit'

export const StyledCard = styled.div`
  overflow: visible;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.navbar};
  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
    margin-top: 0;
    background: transparent;
    box-shadow: none;
  }
`
export const HeaderCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white3};
  padding-top: 10px;
  padding-bottom: 5px;
`
export const Header = styled(Text)`
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 30px;
  }
`
export const TokensDisplay = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
  background-clip: text;
  text-fill-color: transparent;
  text-transform: uppercase;
`
export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  height: 100%;
  background: ${({ theme }) => theme.colors.white3};
  margin-top: 10px;
  padding: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px;
  }
`
export const StyledButton = styled(Button)`
  border-radius: 10px;
  box-shadow: none;
  text-transform: uppercase;
  margin-top: 15px;
`

export const FlexSection = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    height: 120px;
  }
`

// ConfirmModal
export const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`
