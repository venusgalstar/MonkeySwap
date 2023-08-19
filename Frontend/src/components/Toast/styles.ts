import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<'alert' | 'content' | 'link', ThemeUIStyleObject> = {
  alert: {
    position: 'fixed',
    display: 'flex',
    width: '300px',
    background: 'navbar',
    borderRadius: '10px',
    pl: 9,
    py: 6,
    pr: 6,
    minHeight: '90px',
    columnGap: '11px',
    right: 10,
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    color: 'text',
    rowGap: '10px',
    ml: '10px',
  },
  link: {
    fontSize: 0,
    textDecoration: 'underline',
    color: 'primaryBright',
    fontWeight: 'bold',
  },
}

export default styles
