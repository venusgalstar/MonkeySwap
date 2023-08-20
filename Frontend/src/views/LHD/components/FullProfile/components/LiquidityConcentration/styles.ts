import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    p: '20px 10px 10px 10px'
  },
  title: {
    fontWeight: 600,
    fontSize: ['18px'],
    lineHeight: ['32px'],
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
  },
  tableCont: {
    width: '100%',
    flexDirection: 'column',
    overflow: 'auto',
    height: 'fill-available',
    '::-webkit-scrollbar': {
      height: '3px',
      background: 'white3',
    },
    '::-webkit-scrollbar:vertical': {
      width: '3px',
      background: 'white3',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'textDisabled',
      borderRadius: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'white3',
      color: 'input',
      borderRadius: '10px',
    },
  }
}