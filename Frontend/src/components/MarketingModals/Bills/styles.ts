import styled from "@emotion/styled"
import { Flex, Link, Text } from "components/uikit"

export const MainBody = styled(Flex)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
export const Description = styled(Flex)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0em 1.5em;
`
export const StyledText = styled(Text)`
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  text-align: center;
  margin: 0.5em 0;
`
export const StyledAnchor = styled(Link)`
  text-align: center;
`
export const TextButton = styled(Link)`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.yellow};
  text-decoration: underline;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  margin: 0.5em 0;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`
export const Hiw = styled(StyledText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  margin-top: 1em;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0;
  } ;
`
export const MainContentBody = styled(Flex)`
  display: flex;
  padding-left: 2em;
  padding-right: 2em;
`

export const Content = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  flex-direction: row;
  margin-top: 1em;

  &:first-child {
    margin-top: 0;
  }
`

export const RightText = styled(StyledText)`
  margin: 0;
  text-align: left;
  font-size: 12px;
  line-height: 18px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 14px;
    line-height: 21px;
  }
`
export const InnerTextButton = styled(TextButton)`
  margin: 0;
  padding: 0;
  text-align: left;
`
