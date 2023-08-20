import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'leftContainer'
  | 'nameBtnContainer'
  | 'tokenNameCont'
  | 'tokenName'
  | 'tokenSymbol'
  | 'priceChange'
  | 'buttons'
  | 'extraInfoCont'
  | 'rank'
  | 'rankText'
  | 'tagRow'
  | 'tag'
  | 'tagText'
  | 'chainsCont'
  | 'marketCap'
  | 'scoresCont'
  | 'singleScoreCont'
  | 'scoreTitle'
  | 'scoreCont'
  | 'scoreText'
  | 'scoreNumber'
  | 'shareCard'
  | 'shareText',
  ThemeUIStyleObject
> = {
  mainContainer: {
    width: '100%',
    flexDirection: ['column', 'column', 'column', 'row'],
  },
  leftContainer: {
    width: ['100%', '100%', 'unset'],
    minWidth: ['', '', '', '520px'],
    background: 'white2',
    borderRadius: '10px',
    padding: '10px 20px',
    alignItems: 'flex-start',
    mr: ['0px', '0px', '0px', '20px'],
  },
  nameBtnContainer: {
    width: '100%',
    alignItems: ['flex-start'],
    flexDirection: ['column', 'column', 'row'],
  },
  tokenNameCont: {
    flexDirection: 'column',
    lineHeight: ['30px'],
  },
  tokenName: {
    fontWeight: 300,
    fontSize: ['8px'],
    lineHeight: ['10px'],
    mx: '10px',
    color: 'textDisabled',
  },
  tokenSymbol: {
    fontWeight: 700,
    fontSize: ['22px'],
    lineHeight: ['20px'],
    mx: '10px',
  },
  priceChange: {
    background: 'white3',
    padding: '2px 5px',
    borderRadius: '10px',
    mr: '5px',
  },
  buttons: {
    height: '100%',
    alignItems: 'center',
    mt: ['10px', '10px', '0px'],
  },
  extraInfoCont: {
    width: '100%',
    alignItems: 'center',
    mt: '6px',
  },
  rank: {
    width: '50px',
    height: '20px',
    background: 'linear-gradient(99.09deg, #A16552 0%, #FFB300 106.96%)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  },
  rankText: {
    fontWeight: 300,
    fontSize: ['8px'],
    lineHeight: ['12px'],
    color: 'white',
  },
  tagRow: {
    mt: '6px',
  },
  tag: {
    height: '17px',
    padding: '0px 8px',
    marginRight: '6px',
    background: 'white4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  },
  tagText: {
    fontWeight: 500,
    fontSize: ['8px'],
    lineHeight: ['10px'],
    color: 'textDisabled',
    textDecoration: 'none',
  },
  chainsCont: {
    width: '65px',
    height: '100%',
    marginLeft: '10px',
  },
  marketCap: {
    fontWeight: 400,
    fontSize: ['12px'],
    lineHeight: ['18px'],
    color: 'textDisabled',
  },
  scoresCont: {
    width: '100%',
    background: 'white2',
    borderRadius: '10px',
    padding: ['10px', '10px', '10px', '20px'],
    flexDirection: ['column', 'column', 'column', 'row'],
    mt: ['15px', '15px', '15px', '0px'],
  },
  singleScoreCont: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: '90px',
  },
  scoreTitle: {
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '20px',
  },
  scoreCont: {
    width: '100%',
    maxWidth: '70px',
    flexDirection: 'column',
    alignItems: 'center',
    ml: '10px',
  },
  scoreText: {
    fontWeight: 400,
    fontSize: ['16px'],
    lineHeight: ['20px'],
    color: 'textDisabled',
  },
  scoreNumber: {
    fontWeight: 700,
    lineHeight: ['40px'],
  },
  shareCard: {
    width: ['100%'],
    textTransform: 'capitalize',
    flexDirection: ['row', 'row', 'row', 'column-reverse'],
    mx: ['0px', '0px', '0px', '15px'],
    minWidth: '65px',
    maxHeight: '60px',
    alignItems: 'center',
  },
  shareText: {
    fontWeight: 500,
    fontSize: ['10px'],
    lineHeight: ['17px'],
  },
}
