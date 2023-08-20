import { BOTTOM_NAV_HEIGHT, NAV_DESKTOP_DISPLAY } from 'components/NavBarNew/styles'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'hideOnMobile'
  | 'desktopNavOptionContainer'
  | 'mobileNavOptionContainer'
  | 'mobileNavOptionText'
  | 'desktopNavOption'
  | 'desktopNavArrow'
  | 'desktopNavItemTitle'
  | 'desktopNavItemSubtitle'
  | 'desktopMainNavOptionFont'
  | 'mainDropdownMenuContainer'
  | 'popUpMobileMenuContainer'
  | 'popUpMobileMenuOption'
  | 'mobileNavOptionTitle'
  | 'mobileNavOptionSubtitle',
  ThemeUIStyleObject
> = {
  // Desktop Formatting
  mainDropdownMenuContainer: {
    position: 'absolute',
    top: '35px',
    left: '0',
    width: 'max-content',
    px: '30px',
    py: '20px',
    borderRadius: 'normal',
    backdropFilter: 'blur(15px)',
    boxShadow: '10px 10px 10px 0px rgba(0,0,0,0.1)',
  },
  desktopNavOptionContainer: {
    cursor: 'pointer',
    '&:hover': { bg: 'navbar' },
    height: '34px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '7px',
    borderRadius: '6px',
    position: 'relative',
  },
  desktopNavOption: {
    p: '10px',
    gap: '15px',
    borderRadius: 'normal',
    alignItems: 'center',
    width: 'auto',
    minWidth: '250px',
    height: '59px',
    '&:hover': { bg: 'white3', opacity: '1' },
  },
  desktopNavArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    height: '15px',
    width: '15px',
    borderRadius: '20px',
    bg: 'rgba(253, 251, 245, 0.20)',
    fontSize: '12px',
    lineHeight: '12px',
  },
  desktopNavItemTitle: {
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '18px',
  },
  desktopNavItemSubtitle: { fontSize: '12px', fontWeight: '300', lineHeight: '18px', color: 'buttonDisabledText' },
  desktopMainNavOptionFont: {
    fontSize: '16px',
    fontWeight: '400',
  },

  // Mobile Formatting
  mobileNavOptionContainer: {
    height: '55px',
    padding: '3px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    position: 'relative',
    width: '100%',
  },
  mobileNavOptionText: {
    fontSize: '11px',
    fontWeight: '500',
    lineHeight: '12px',
    textAlign: 'center',
  },
  popUpMobileMenuContainer: {
    position: 'fixed',
    left: '0',
    bottom: `${BOTTOM_NAV_HEIGHT + 2}px`,
    width: '100vw',
    px: '15px',
    py: '10px',
    backdropFilter: 'blur(15px)',
  },
  popUpMobileMenuOption: {
    p: '10px',
    gap: '15px',
    borderRadius: 'normal',
    alignItems: 'center',
    width: '100%',
    minWidth: '1000px',
    height: '59px',
    '&:hover': { bg: 'white3', opacity: '1' },
  },
  mobileNavOptionTitle: {
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
  },
  mobileNavOptionSubtitle: {
    fontSize: '9px',
    fontWeight: '300',
    lineHeight: '14px',
    color: 'buttonDisabledText',
  },

  // Utils
  hideOnMobile: {
    display: NAV_DESKTOP_DISPLAY,
  },
}
