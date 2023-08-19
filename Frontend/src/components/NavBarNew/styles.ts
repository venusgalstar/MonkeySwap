import { ThemeUIStyleObject } from 'theme-ui'

export const TOP_NAV_HEIGHT = 60
export const BOTTOM_NAV_HEIGHT = 70
export const NAV_MOBILE_DISPLAY = ['flex', 'flex', 'flex', 'flex', 'none']
export const NAV_DESKTOP_DISPLAY = ['none', 'none', 'none', 'none', 'flex']

export const styles: Record<'mainNavContainer' | 'hideOnMobile' | 'bottomMobileNavContainer', ThemeUIStyleObject> = {
  mainNavContainer: {
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100%',
    zIndex: 100,
    px: ['30px', '30px', '30px', '30px', '40px'],
    py: '16px',
  },
  bottomMobileNavContainer: {
    display: NAV_MOBILE_DISPLAY,
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 10,
    px: '10px',
    py: '8px',
    height: `${BOTTOM_NAV_HEIGHT}px`,
  },
  hideOnMobile: {
    display: NAV_DESKTOP_DISPLAY,
  },
}
