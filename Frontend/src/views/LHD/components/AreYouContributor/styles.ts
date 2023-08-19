import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'contributorCont'
  | 'title'
  | 'info'
  | 'btnCont'
  | 'btn',
  ThemeUIStyleObject> = {
  contributorCont: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    mt: '15px',
    p: '20px',
  },
  title: {
    fontWeight: 700,
    fontSize: ['11px', '11px', '11px', '20px'],
    lineHeight: ['23px'],
  },
  info: {
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '15px',
    mt: '10px',
  },
  btnCont: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: ['column', 'column', 'column', 'row'],
    mt: '20px',
  },
  btn: {
    width: ['100%', '100%', '100%', '141px'],
    fontSize: ['14px', '14px', '14px', '16px'],
    lineHeight: ['14px', '14px', '14px', '22px'],
    height: ['31px', '31px', '31px', '44px'],
  },
}