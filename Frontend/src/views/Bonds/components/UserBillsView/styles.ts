import styled from '@emotion/styled'
import { Flex, Text } from 'components/uikit'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  links: {
    alignItems: 'center',
    display: 'flex',
    width: 'max-content',
    justifyContent: 'space-between',
    marginBottom: '0.3em',
  },
  input: {
    borderRadius: '10px',
    fontWeight: 800,
    border: 'none',
    width: '100%',
    '@media screen and (min-width: 852px)': {
      width: '150px',
    },
    '@media screen and (min-width: 1000px)': {
      width: '240px',
    },
  },
  menuContainer: {
    borderRadius: '10px',
    justifyContent: 'space-between',
    padding: '10px 20px',
    zIndex: 2,
    backgroundColor: 'white2',
    minWidth: '300px',
    width: '100%',
    marginTop: '20px',
    '@media screen and (min-width: 852px)': {
      padding: '10px 10px',
    },
  },
  mobileContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  expandedButton: {
    backgroundColor: 'lvl1',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    ml: '10px',
  },
  mobileRow: {
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '353px',
    marginTop: '15px',
  },
  inputContainer: {
    width: '50%',
    justifyContent: 'center',
  },
}

export const CardContainer = styled(Flex)`
  background: ${({ theme }) => theme.colors.white2};
  flex-direction: column;
  min-width: 270px;
  align-items: center;
  margin: 0 0 16px 12px;
  border-radius: 10px;
  overflow: hidden;
  @media screen and (max-width: 852px) {
    width: 100%;
    margin: 0 0 10px 0;
  }
`

export const BillCardsContainer = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: flex-start;
`

export const FirstTimeCardContainer = styled(Flex)`
  max-width: 500px;
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  padding: 10px 20px;
  flex-direction: column;
  align-self: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    max-width: 100%;
    align-self: auto;
  }
`

export const BillGifContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
    min-width: 450px;
  }
`

export const DescriptionContainer = styled(Flex)`
  flex-direction: column;
  padding-left: 20px;
  padding: 20px 0 0 0;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
    padding: 0 0 20px 20px;
  }
`

export const BillDiagramContainer = styled(Flex)`
  margin-top: 10px;
`

export const SearchText = styled(Text)`
  font-weight: 700;
  font-size: 16px !important;
  display: none;
  align-items: center;
  @media screen and (min-width: 1050px) {
    display: inherit;
  }
`

export const ClaimAllWrapper = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`
