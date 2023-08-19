import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  'mainContainer' | 'contentContainer' | 'visibleIcon' | 'invisibleIcon' | 'textContainer' | 'text',
  ThemeUIStyleObject
> = {
  mainContainer: {
    width: '100%',
    fontSize: ['7px', '8px', '10px', '16px'],
    justifyContent: 'center',
    fontWeight: 200,
    background: 'white4',
    color: 'white',
    borderRadius: '10px',
    padding: '10px',
    mb: '10px',
    position: 'relative',
    overflow: 'hidden',
  },
  contentContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visibleIcon: {
    marginRight: '5px',
  },
  invisibleIcon: {
    position: 'absolute',
    left: '-1',
    top: '10',
    opacity: 0.2,
    width: ['50px', '50px', '80px', '80px']
  },
  textContainer: {
    flexDirection: 'column',
  },
  text: {
    lineHeight: ['8px', '14px', '18px', '26px'],
  },
}
