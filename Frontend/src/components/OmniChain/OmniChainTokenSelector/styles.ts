import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'sectionDividerFont'
  | 'searchAndListContainer'
  | 'searchInput'
  | 'chainOptionButton'
  | 'cursorHover'
  | 'chainOptionList'
  | 'chainListContainer',
  ThemeUIStyleObject
> = {
  sectionDividerFont: {
    fontWeight: '300',
    fontSize: '12px',
  },
  searchAndListContainer: {
    maxWidth: '100%',
    width: '450px',
    flexDirection: 'column',
    gap: '10px',
    bg: 'white3',
    padding: '10px',
    borderRadius: '10px',
  },
  searchInput: {
    fontWeight: '400',
    bg: 'white4',
    height: '40px',
    border: 'none',
    pl: '10px',
    borderRadius: '10px',
    mb: '8px',
    ':focus': { outline: 'none' },
  },
  chainOptionButton: {
    width: '45px',
    height: '40px',
    borderRadius: '10px',
    bg: 'white3',
    justifyContent: 'center',
    alignItems: ' center',
    ':hover': {
      cursor: 'pointer',
      bg: 'white4',
    },
  },
  chainListContainer: {
    position: 'relative',
    mb: '10px',
    gap: '10px',
    flexDirection: 'column',
  },
  chainOptionList: {
    width: '100%',
    height: '45px',
    borderRadius: '10px',
    gap: '10px',
    px: '10px',
    bg: 'white3',
    alignItems: ' center',
    ':hover': {
      cursor: 'pointer',
      bg: 'white4',
    },
  },
  cursorHover: {
    ':hover': {
      cursor: 'pointer',
    },
  },
}
