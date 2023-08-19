import { ThemeUIStyleObject } from 'theme-ui'

export const MOBILE_DISPLAY = ['flex', 'flex', 'flex', 'flex', 'none', 'none']
export const DESKTOP_DISPLAY = ['none', 'none', 'none', 'none', 'flex', 'flex']

const styles: Record<'subContainer' | 'positionCardContainer', ThemeUIStyleObject> = {
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'white4',
    borderRadius: '10px',
    padding: '7.5px 10px',
  },
  positionCardContainer: {
    minHeight: 'fit-content',
    background: 'white3',
    borderRadius: '10px',
    justifyContent: 'center',
    margin: '5px 0px',
    flexDirection: 'column',
    color: 'yellow',
  },
}

export default styles
