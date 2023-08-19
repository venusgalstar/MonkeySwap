import { ThemeUIStyleObject } from 'theme-ui'

export const JUSTIFY_CONTENT_BREAKPOINTS: ('space-between' | 'flex-start')[] = [
  'space-between',
  'space-between',
  'space-between',
  'flex-start',
]
export const FLEX_DIRECTION_BREAKPOINTS: ('row' | 'column')[] = ['row', 'row', 'row', 'column']

export const styles: Record<
  | 'apyInfo'
  | 'earnedInfo'
  | 'farmInfo'
  | 'cardContent'
  | 'actionContainer'
  | 'expandedContent'
  | 'styledBtn'
  | 'smallBtn'
  | 'depositContainer'
  | 'columnView'
  | 'stakeActions'
  | 'harvestAllBtn'
  | 'onlyDesktop'
  | 'onlyMobile',
  ThemeUIStyleObject
> = {
  apyInfo: {
    width: '100%',
    justifyContent: JUSTIFY_CONTENT_BREAKPOINTS,
    ml: ['0', '0', '0', '20px'],
    maxWidth: ['', '', '', '150px'],
    flexDirection: FLEX_DIRECTION_BREAKPOINTS,
  },
  earnedInfo: {
    width: '100%',
    justifyContent: JUSTIFY_CONTENT_BREAKPOINTS,
    maxWidth: ['', '', '', '120px'],
    flexDirection: FLEX_DIRECTION_BREAKPOINTS,
  },
  farmInfo: {
    width: '100%',
    justifyContent: JUSTIFY_CONTENT_BREAKPOINTS,
    flexDirection: FLEX_DIRECTION_BREAKPOINTS,
    maxWidth: ['', '', '', '180px'],
  },
  cardContent: {
    flexDirection: ['column', 'column', 'column', 'row'],
    width: '100%',
    justifyContent: 'space-between',
  },
  actionContainer: {
    justifyContent: ['space-between', 'space-between', 'space-between', 'space-around'],
    alignItems: 'center',
    width: '100%',
    mt: ['10px', '10px', '10px', '0'],
    flexDirection: ['row', 'row', 'row', 'row-reverse'],
  },
  expandedContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: ['wrap', 'wrap', 'wrap', 'nowrap'],
    padding: '0 10px',
    justifyContent: 'space-between',
  },
  styledBtn: {
    fontSize: '16px',
    lineHeight: '20px',
    padding: '10px',
    width: '140px',
    minWidth: ['130px', '130px', '130px', '100px'],
    height: '44px',
    '&:disabled': {
      background: 'white4',
    },
  },
  smallBtn: {
    maxWidth: '60px',
    width: '100%',
    minWidth: '44px',
    height: '44px',
    fontSize: '24px',
    lineHeight: '30px',
    fontWeight: 600,
    '&:disabled': {
      background: 'white4',
    },
  },
  depositContainer: {
    width: '100%',
    maxWidth: ['130px', '130px', '130px', '140px'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnView: {
    maxWidth: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  stakeActions: {
    maxWidth: ['', '', '', '94px'],
    alignItems: 'center',
    width: '100%',
  },
  harvestAllBtn: {
    height: '36px',
    lineHeight: '18px',
    justifyContent: 'center',
    minWidth: 'fit-content',
    width: ['100%', '100%', '100%', '180px'],
    fontSize: '16px',
  },
  onlyDesktop: {
    justifyContent: 'space-around',
    display: ['none', 'none', 'none', 'flex'],
  },
  onlyMobile: {
    flexDirection: 'column',
    display: ['flex', 'flex', 'flex', 'none'],
  },
}
