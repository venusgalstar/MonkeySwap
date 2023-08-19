import { NAV_DESKTOP_DISPLAY } from 'components/NavBarNew/styles'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'accountLoggedInMainContainer'
  | 'hideOnMobile'
  | 'mainAccountDetailsContainer'
  | 'firstLineAccountDetailsContainer'
  | 'copyAddressContainer'
  | 'accountButton'
  | 'holdingsContainer',
  ThemeUIStyleObject
> = {
  accountLoggedInMainContainer: {
    cursor: 'pointer',
    '&:hover': { bg: 'navbar' },
    bg: ['navbar', 'navbar', 'navbar', 'navbar', 'transparent'],
    height: '34px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '7px',
    borderRadius: '6px',
    position: 'relative',
  },
  mainAccountDetailsContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: '35px',
    right: '0px',
    width: '300px',
    px: '20px',
    py: '20px',
    borderRadius: 'normal',
    backdropFilter: 'blur(15px)',
    gap: '20px',
    boxShadow: '10px 10px 10px 0px rgba(0,0,0,0.1)',
  },
  firstLineAccountDetailsContainer: {
    py: '5px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    verticalAlign: 'middle',
  },
  copyAddressContainer: {
    p: '5px',
    borderRadius: '8px',
    cursor: 'pointer',
    verticalAlign: 'middle',
    '&:hover': { bg: 'white3' },
  },
  accountButton: {
    p: '4px',
    width: '25px',
    height: '25px',
    borderRadius: '100px',
    '&:hover': { bg: 'white3' },
  },
  holdingsContainer: {
    mt: '6px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hideOnMobile: {
    display: NAV_DESKTOP_DISPLAY,
  },
}
