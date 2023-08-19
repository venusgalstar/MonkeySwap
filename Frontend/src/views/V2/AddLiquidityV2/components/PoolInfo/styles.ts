import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<'poolInfoContainer' | 'textWrap', ThemeUIStyleObject> = {
  poolInfoContainer: {
    width: '100%',
    background: 'white3',
    marginTop: '10px',
    flexDirection: 'column',
    borderRadius: '10px',
    padding: '10px',
  },
  textWrap: {
    wordBreak: 'break-all',
    lineHeight: '15px',
  },
}

export default styles
