// @ts-nocheck
import styled from '@emotion/styled'
import { Text } from 'components/uikit'
import { ThemeUIStyleObject } from 'theme-ui'

export const UtilityCon = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 10px;
  margin-bottom: 32px;
  padding: 32px;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.navbar)};
`
export const UtilityTitle = styled.div`
  display: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0 20px 0;
`
export const UtilityHeading = styled(Text)`
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 700;
`

export const UtilityWrapper = styled.div`
  max-width: 1412px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`

export const Bubble = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive, theme }) =>
    isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : theme.colors.white4};
  height: 14px;
  width: 14px;
  border-radius: 50px;
  margin: 0px 2.5px 0px 2.5px;
  cursor: pointer;
  display: block;
`

export const styles = {
  mainContainer: {
    width: '350px',
    margin: '10px',
    maxWidth: '80vw',
    height: '100%',
    padding: '5px',
    borderRadius: '10px',
    background: 'bg1',
  },
  subContainer: {
    width: '100%',
    borderRadius: '10px',
    flexWrap: 'wrap',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'flex-start',
    background: 'bg2',
  },
  box: { width: '100%', margin: '20px 15px 15px 15px' },
  action: {
    background: 'linear-gradient(53.53deg, #A16552 15.88%, #E1B242 92.56%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    fontSize: '22px',
    fontWeight: '700',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
  },
  detail: {
    fontWeight: 400,
    fontSize: '13px',
  },
}
export const showIcon = (icon: string): ThemeUIStyleObject => ({
  width: '100%',
  height: '100%',
  background: `url(images/gnana-icons/${icon}.svg)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
})
