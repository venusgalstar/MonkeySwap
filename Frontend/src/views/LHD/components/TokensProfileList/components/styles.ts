import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<'btn' | 'paginationCont', ThemeUIStyleObject> = {
  btn: {
    mx: '10px',
    width: '25px',
    padding: '0px !important',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25px',
    fontWeight: 500,
    fontSize: '14px',
    border: '2px solid #FFB300',
  },
  paginationCont: {
    background: 'white2',
    py: '20px',
    width: ['100vw', 'auto', '100%'],
    ml: ['-20px', 0, 0],
    mr: ['-20px', 0, 0],
    justifyContent: 'center',
    borderRadius: '0 0 10px 10px',
  },
}
