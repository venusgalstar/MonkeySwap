import styled from '@emotion/styled'
import { Flex, Skeleton } from 'components/uikit'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  // Style for the banner flex
  flexPrimary: {
    position: 'relative',
    width: '100%',
  },
  // Style for title container
  titleContainer: {
    position: 'absolute',
    flexDirection: 'column',
    top: '20%',
    left: '5%',
    width: '45%',
  },
  // Style for the banner text
  titleText: {
    fontWeight: 700,
    lineHeight: '4.5vw',
    fontSize: '5vw',
    '@media screen and (min-width: 1130px)': {
      lineHeight: '50px',
      fontSize: '55px',
    },
  },
  // Style for learn more text
  learnText: {
    alignItems: 'center',
    mt: '5%',
    fontSize: 'calc(6px + 1.5vw)',
    textTransform: 'capitalize',
    padding: 0,
    fontWeight: 600,
    '@media screen and (min-width: 1130px)': {
      fontSize: '22.5px',
    },
  },
}

export const FlexImage = styled(Flex)<{ maxWidth?: number; listViewBreak?: boolean }>`
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  width: 100%;
  height: 24vw;
  @media screen and (min-width: 500px) and (max-width: 851px) {
    height: ${({ listViewBreak }) => (listViewBreak ? '120px' : '24vw')};
  }
  @media screen and (min-width: ${({ maxWidth }) => maxWidth}px) {
    height: ${({ maxWidth }) => maxWidth / 4}px;
    width: ${({ maxWidth }) => maxWidth}px;
  }
`

export const FlexSkeleton = styled(Skeleton)<{ maxWidth?: number; listViewBreak?: boolean }>`
  border-radius: 10px;
  width: 100%;
  height: 24vw;
  @media screen and (min-width: 500px) and (max-width: 851px) {
    height: ${({ listViewBreak }) => (listViewBreak ? '120px' : '24vw')};
  }
  @media screen and (min-width: ${({ maxWidth }) => maxWidth}px) {
    height: ${({ maxWidth }) => (maxWidth ? maxWidth / 4 : 10)}px;
    width: ${({ maxWidth }) => maxWidth}px;
  }
`
