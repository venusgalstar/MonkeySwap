import { ThemeUIStyleObject } from 'theme-ui'
// import { textUnderlineHover } from 'views/Dex/styles'

const styles: Record<
  | 'dexNavContainer'
  | 'navLinkContainer'
  | 'navIconContainer'
  | 'underline'
  | 'navLink'
  | 'liquiditySelector'
  | 'liquiditySelectorContainer'
  | 'migrate'
  | 'iconCover'
  | 'pendingTxDot',
  ThemeUIStyleObject
> = {
  // Token selector container
  dexNavContainer: {
    position: 'relative',
    width: '100%',
    height: '30px',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  navLinkContainer: {
    width: '100%',
    maxWidth: '225px',
    paddingRight: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navIconContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  underline: {
    display: 'inline-block',
    position: 'relative',
    background: 'primaryBright',
    height: '1px',
    width: '100%',
    borderRadius: '10px',
  },
  navLink: {
    position: 'relative',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  liquiditySelector: {
    position: 'relative',
    alignItems: 'center',
    fontSize: '14px',
    cursor: 'pointer',
    '@media (max-width: 350px)': {
      fontSize: '12px',
    },
    // ...textUnderlineHover,
  },
  liquiditySelectorContainer: {
    marginBottom: '20px',
    justifyContent: 'center',
    fontSize: '14px',
    alignItems: 'space-between',
    justifyItems: 'space-between',
    marginTop: '20px',
  },
  migrate: { margin: '0 15px', position: 'relative', alignItems: 'center', color: 'textDisabled' },
  iconCover: {
    cursor: 'pointer',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  pendingTxDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    bg: 'red',
    position: 'absolute',
    zIndex: '10',
    right: '-2px',
    top: '-2px',
  },
}

export default styles
