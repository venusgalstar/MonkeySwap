import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  'mainContainer' | 'yellowShadow' | 'centeredContainer' | 'slideContainer' | 'circlesContainer' | 'bubbleContainer',
  ThemeUIStyleObject
> = {
  mainContainer: {
    width: '100%',
    height: ['620px', '620px', '620px', '620px', '550px'],
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  yellowShadow: {
    position: 'absolute',
    zIndex: 3,
    width: '737px',
    height: '452px',
    left: '-398px',
    top: '-391px',
    background: 'linear-gradient(99.09deg, #A16552 0%, #FFB300 106.96%)',
    opacity: 0.15,
    filter: 'blur(250px)',
  },
  centeredContainer: {
    maxWidth: '1412px',
    zIndex: 2,
    justifyContent: 'center',
  },
  slideContainer: {
    width: '90%',
    zIndex: 1,
    marginTop: 60
  },
  circlesContainer: {
    width: '100%',
    maxWidth: '1412px',
    position: 'absolute',
    justifyContent: 'center',
  },
  bubbleContainer: {
    alignContent: 'center',
    zIndex: 1,
    position: 'absolute',
    top: [0, 0, 0, '-40px'],
    left: ['45%', '45%', '45%', '5%'],
  },
}
