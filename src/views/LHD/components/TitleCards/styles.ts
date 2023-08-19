import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'titleContainer'
  | 'titleText'
  | 'detailText'
  | 'btnText'
  | 'cardsContainer'
  | 'statsCont'
  | 'statsTitleCont'
  | 'statsTitle'
  | 'valueCont'
  | 'valueText'
  | 'footer'
  | 'cardBtnText',
  ThemeUIStyleObject
> = {
  mainContainer: {
    width: '100%',
    flexDirection: ['column', 'column', 'column', 'row'],
    mt: '30px',
  },
  titleContainer: {
    width: ['100%', '100%', '100%', '50%'],
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 700,
    fontSize: ['16px', '16px', '16px', '30px'],
    lineHeight: ['24px', '24px', '24px', '45px'],
  },
  detailText: {
    fontWeight: 500,
    fontSize: ['12px', '12px', '12px', '16px'],
    lineHeight: ['18px', '18px', '18px', '24px'],
  },
  btnText: {
    fontWeight: 500,
    textDecoration: 'underline',
    fontSize: ['12px', '12px', '12px', '16px'],
    lineHeight: ['18px', '18px', '18px', '24px'],
    mr: '10px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cardsContainer: {
    width: ['100%', '100%', '100%', '50%'],
    mt: ['15px', '15px', '15px', 0],
    justifyContent: ['space-between', 'space-between', 'space-between', 'flex-start'],
  },
  statsCont: {
    width: ['94px', '94px', '110px', '170px'],
    height: ['87px', '87px', '87px', '174px'],
    borderRadius: '10px',
    overflow: 'hidden',
    flexDirection: 'column',
    ml: ['0', '0', '0', '20px'],
  },
  statsTitleCont: {
    width: '100%',
    backgroundColor: 'white3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsTitle: {
    margin: ['5px 0', '5px 0', '5px 0', '20px 0'],
    fontWeight: 400,
    fontSize: ['10px'],
    lineHeight: ['10px', '10px', '10px', '12px'],
    textAlign: 'center',
    width: ['min-content', 'min-content', 'min-content', 'fit-content'],
    color: 'textDisabled',
  },
  valueCont: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white2',
    alignItems: 'center',
    flexDirection: 'column',
  },
  valueText: {
    fontWeight: 700,
    fontSize: ['20px', '20px', '20px', '55px'],
    lineHeight: ['30px', '30px', '30px', '83px'],
  },
  footer: {
    weight: 400,
    fontSize: ['8px', '8px', '8px', '10px'],
    lineHeight: ['15px'],
  },
  cardBtnText: {
    fontWeight: 600,
    textDecoration: 'underline',
    textTransform: 'capitalize',
    fontSize: '10px',
    lineHeight: '15px',
    marginTop: '-5px',
    color: 'yellow',
  },
}
