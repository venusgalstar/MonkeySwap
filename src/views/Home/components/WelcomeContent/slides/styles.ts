import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'slideContainer'
  | 'slideContent'
  | 'slideTitle'
  | 'slideSubtitle'
  | 'counterText'
  | 'availableOn'
  | 'billImage'
  | 'image'
  | 'buttonContainer'
  | 'learnMoreButton'
  | 'imageWrapper',
  ThemeUIStyleObject
> = {
  slideContainer: {
    width: '95vw',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: ['50px', '50px', '50px', '65px'],
    paddingBottom: ['30px', '30px', '30px', '75px'],
  },
  slideContent: {
    width: '100%',
    flexDirection: 'column',
    padding: ['0 10px', '0 10px 0 0', '0 10px 0 0', '0'],
    maxWidth: ['325px', '325px', '325px', '500px'],
    minWidth: '285px',
  },
  slideTitle: {
    fontSize: ['45px', '45px', '45px', '64px'],
    lineHeight: ['48px', '48px', '48px', '80px'],
    minHeight: ['none', 'none', 'none', '160px'],
    fontWeight: 700,
    background: 'home.title',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  slideSubtitle: {
    marginTop: '25px',
    fontWeight: 500,
    minHeight: ['45px', '45px', '45px', '75px'],
    lineHeight: ['15px', '15px', '15px', '25px'],
    fontSize: ['12px', '12px', '12px', '18px'],
    maxWidth: ['325px', '325px', '325px', '500px'],
  },
  counterText: {
    lineHeight: ['15px', '15px', '15px', '25px'],
    fontSize: ['12px', '12px', '12px', '18px'],
    fontWeight: 700,
  },
  availableOn: {
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '18px',
    textTransform: 'uppercase',
    marginRight: '10px',
  },
  billImage: {
    width: '100%',
    height: '182px',
    display: ['flex', 'flex', 'flex', 'none'],
    marginTop: ['25px', '25px', '25px', 0],
    justifyContent: ['center', 'center', 'center', 'flex-start'],
  },
  image: {
    borderRadius: '6px',
    width: '100%',
    height: '100%',
    maxWidth: ['325px', '325px', '325px', 'none'],
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  buttonContainer: {
    width: '100%',
    marginTop: ['20px', '20px', '20px', '30px'],
    justifyContent: ['space-around', 'space-around', 'space-around', 'flex-start'],
  },
  learnMoreButton: {
    marginRight: ['0', '0', '0', '20px'],
    background: 'background',
    fontSize: ['14px', '14px', '14px', '16px'],
    minWidth: ['125px', '125px', '125px', '138px'],
    color: 'yellow',
  },
  imageWrapper: {
    display: ['none', 'none', 'none', 'flex'],
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: ['50px', '50px', '50px', '35px'],
    zIndex: 10,
    padding: '10px',
    borderRadius: '15px',
    transition: 'all 0.3s ease-out',
    transform: 'matrix(1, 0.04, -0.34, 0.94, 0, 0)',
    width: '256px',
    height: '153px',
    '@media screen and (min-width: 700px)': {
      width: '300px',
      height: '179px',
    },
    '@media screen and (min-width: 950px)': {
      width: '375px',
      height: '220px',
    },
    '@media screen and (min-width: 1250px)': {
      width: '529px',
      height: '305px',
    },
    '&:hover': {
      transform: 'none',
      scale: '1.2',
      cursor: 'pointer',
      filter: 'drop-shadow(0px 0px 30px rgba(255, 168, 0, 0.25))',
    },
  },
}
