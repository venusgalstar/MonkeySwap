import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'topContainer'
  | 'titleContainer'
  | 'titleText'
  | 'back'
  | 'lastUpdated'
  | 'lowerContainer'
  | 'layout'
  | 'chartCont'
  | 'infoCardMobile'
  | 'liquidityConCont'
  | 'infoCardDesktop'
  | 'formula'
  | 'loadingSpinner'
  | 'chartTokenImage',
  ThemeUIStyleObject
> = {
  mainContainer: {
    mt: '30px',
    width: '100%',
    flexDirection: 'column',
  },
  topContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    mt: ['20px'],
  },
  titleText: {
    fontWeight: 600,
    fontSize: ['16px'],
    lineHeight: ['20px'],
  },
  back: {
    fontSize: ['12px', '12px', '12px', '14px'],
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  lastUpdated: {
    fontWeight: 300,
    fontSize: ['10px', '10px', '10px', '12px'],
    color: 'textDisabled',
  },
  lowerContainer: {
    width: '100%',
    mt: '15px',
    flexDirection: ['column', 'column', 'column', 'row'],
  },
  layout: {
    minWidth: ['100%', '100%', '100%', 'calc(100% - 370px)'],
    width: ['100%', '100%', '100%', 'calc(100% - 370px)'],
    flexDirection: 'column',
    mr: ['0px', '0px', '0px', '20px'],
  },
  chartCont: {
    width: ['100vw', '100vw', '100%'],
    background: 'white2',
    borderRadius: '10px',
    ml: ['-10px', '-10px', '0px'],
    pb: '10px',
    minHeight: ['380px', '380px', '380px', '510px'],
    alignItems: 'center',
    flexDirection: 'column',
  },
  infoCardMobile: {
    width: '100%',
    display: ['flex', 'flex', 'flex', 'none'],
  },
  liquidityConCont: {
    width: ['100vw', '100vw', '100%'],
    background: 'white2',
    borderRadius: '10px',
    mt: '20px',
    ml: ['-10px', '-10px', '0px'],
    height: ['358px'],
  },
  infoCardDesktop: {
    width: ['100%', '100%', '100%', '380px'],
    display: ['none', 'none', 'none', 'flex'],
  },
  formula: {
    fontWeight: 300,
    fontSize: ['10px', '10px', '10px', '12px'],
    color: 'textDisabled',
    m: '10px 0 30px 0',
  },
  loadingSpinner: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTokenImage: {
    borderRadius: '50%',
  },
}
