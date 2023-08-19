import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  'infoRow' | 'linkRow' | 'titleText' | 'contentText' | 'iconButton' | 'link',
  ThemeUIStyleObject
> = {
  infoRow: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '5px',
  },
  linkRow: {
    width: '100%',
    marginTop: '5px',
    justifyContent: 'flex-end',
    '& svg': { width: '11px' },
  },
  titleText: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: 500,
  },
  contentText: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: 700,
  },
  iconButton: {
    background: 'lvl1',
    textDecoration: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: '30px',
    padding: '2px 5px',
    borderRadius: '8px',
    margin: '0 5px 5px 0',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  link: {
    fontSize: '12px',
    lineHeight: '14px',
    display: 'flex',
    textDecoration: 'none',
    '&: hover': { textDecoration: 'underline' },
  },
}
