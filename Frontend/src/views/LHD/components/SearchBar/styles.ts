import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<'searchBarContainer' | 'btn' | 'filterBtn' | 'filterBtnActive', ThemeUIStyleObject> = {
  searchBarContainer: {
    position: 'relative',
    width: '100%',
    mt: '20px',
    gap: '10px',
    backgroundColor: 'white2',
    padding: '10px',
    borderRadius: '10px',
    flexDirection: ['column', 'column', 'row'],
  },
  btn: {
    width: '100%',
    maxWidth: ['100px', '100px', '88px'],
    color: 'text',
    fontSize: '10px',
    height: '36px',
    lineHeight: '14px',
    alignItems: 'center',
    background: 'white3',
  },
  filterBtn: {
    height: '34px',
    background: 'white4',
    fontWeight: '500',
    border: 'none',
  },
  filterBtnActive: {
    height: '34px',
    background: 'inheit',
    fontWeight: '500',
    border: 'none',
  },
}
