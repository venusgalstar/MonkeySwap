import styled from '@emotion/styled'
import { Flex, Text } from 'components/uikit'

export const ModalBodyContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 1180px) {
    flex-direction: row;
  }
`

export const Container = styled.div`
  max-height: 100vh;
  overflow: auto;
`

export const BillDescriptionContainer = styled(Flex)<{ p?: string; minHeight?: number; width?: string }>`
  position: relative;
  width: ${({ width }) => width || '310px'};
  min-height: ${({ minHeight }) => minHeight}px;
  height: fit-content;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 1180px) {
    width: 540px;
    justify-content: space-between;
    padding: ${({ p }) => p || '20px 30px'};
    margin: 0 10px 0 20px;
    min-height: auto;
  }
`

export const TopDescriptionText = styled(Text)<{ width?: string }>`
  opacity: 0.6;
  font-size: 12px;
  width: ${({ width }) => width || '100%'};
`

export const BillTitleContainer = styled(Flex)`
  flex-direction: column;
  margin: 10px 0 5px 0;
`

export const GridTextValContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  height: 18px;
  width: 100%;
  margin: 1px 0px;
  @media screen and (min-width: 1180px) {
    margin: 8px 0px;
  }
`

export const ActionButtonsContainer = styled(Flex)`
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  @media screen and (min-width: 1180px) {
    flex-direction: row;
    height: auto;
  }
`

export const StyledHeadingText = styled(Text)`
  font-size: 12px;
  align-self: center;
  @media screen and (min-width: 1180px) {
    font-size: 22px;
  }
`

export const BillsFooterContainer = styled(Flex)`
  width: 100%;
  height: 276px;
  margin-top: 20px;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  display: none;
  @media screen and (min-width: 1180px) {
    display: flex;
    flex-direction: row;
    height: 100px;
    margin-bottom: 0px;
  }
`

export const BillFooterContentContainer = styled(Flex)`
  background: ${({ theme }) => theme.colors.white3};
  width: 100%;
  height: 82px;
  border-radius: 10px;
  align-items: center;
  @media screen and (min-width: 1180px) {
    width: 351px;
    height: 82px;
  }
`

export const BillValueContainer = styled('div')`
  display: flex;
  width: 100%;
  padding-top: 10px;
  flex-wrap: wrap;
`

export const TextWrapper = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
  @media screen and (min-width: 1180px) {
    width: 50%;
  }
`

export const MobileFooterContainer = styled(Flex)`
  margin-top: 5px;

  @media screen and (min-width: 1180px) {
    display: none;
  }
`

export const MobileFooterContentContainer = styled(Flex)`
  flex-wrap: wrap;
  background: ${({ theme }) => theme.colors.white3};
  width: 100%;
  border-radius: 10px;
  align-items: center;
  @media screen and (min-width: 1180px) {
    width: 351px;
    height: 82px;
  }
`
