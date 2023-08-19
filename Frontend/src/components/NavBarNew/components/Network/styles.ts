import { NAV_DESKTOP_DISPLAY } from 'components/NavBarNew/styles'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'networkSelectContainer'
  | 'networkSelectorText'
  | 'networkDropdownMainContainer'
  | 'networkOptionContainer'
  | 'networkColumnContainer'
  | 'columnTitleText'
  | 'networkOptionContent'
  | 'networkDropdownMainContainerFooter',
  ThemeUIStyleObject
> = {
  networkSelectContainer: {
    cursor: 'pointer',
    '&:hover': { bg: 'navbar' },
    height: '34px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '7px',
    borderRadius: '6px',
    position: 'relative',
    bg: ['navbar', 'navbar', 'navbar', 'navbar', 'transparent'],
  },
  networkSelectorText: {
    display: NAV_DESKTOP_DISPLAY,
    m: '0px 7.5px',
    lineHeight: '0px',
    fontSize: '14px',
  },
  networkDropdownMainContainer: {
    flexDirection: ['column', 'column', 'column', 'row'],
    position: 'absolute',
    top: '35px',
    right: '0px',
    width: ['190px', '190px', '190px', '420px', '420px'],
    height: ['300px', '400px', '400px', 'auto'],
    overflowY: ['scroll', 'scroll', 'scroll', 'hidden'],
    px: '15px',
    py: '10px',
    borderRadius: 'normal',
    backdropFilter: 'blur(15px)',
    boxShadow: '10px 10px 10px 0px rgba(0,0,0,0.1)',
  },
  networkDropdownMainContainerFooter: {
    flexDirection: ['column', 'column', 'column', 'row'],
    position: 'absolute',
    bottom: '35px',
    left: '0px',
    width: ['190px', '190px', '190px', '420px', '420px'],
    height: ['300px', '400px', '400px', 'auto'],
    overflowY: ['scroll', 'scroll', 'scroll', 'hidden'],
    px: '15px',
    py: '10px',
    borderRadius: 'normal',
    backdropFilter: 'blur(15px)',
  },
  networkOptionContainer: {
    borderRadius: '10px',
    margin: '5px 0px',
    padding: '0px 4px',
    height: '45px',
    '&:hover': { bg: 'white3' },
  },
  networkOptionContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  networkColumnContainer: { flexDirection: 'column', width: '100%', mx: ['0px', '0px', '0px', '10px'] },
  columnTitleText: {
    ml: ['0px', '0px', '0px', '3px'],
    mt: '5px',
    fontSize: ['14px', '14px', '14px', '16px'],
    fontWeight: '700',
  },
}
