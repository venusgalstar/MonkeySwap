import { desktopMappedColumns, mobileMappedColumns } from './columnsFormat'
import { ThemeUIStyleObject } from 'theme-ui'

export const columnHeight: string = '60px'

export const styles: Record<
  | 'headerContainer'
  | 'headerText'
  | 'tableContainer'
  | 'tableRowContainer'
  | 'indexCol'
  | 'indexText'
  | 'nameCol'
  | 'symbolText'
  | 'nameText'
  | 'usdCol'
  | 'barCol'
  | 'barContainer'
  | 'scoreCol'
  | 'linkItem',
  ThemeUIStyleObject
> = {
  headerContainer: {
    display: 'grid',
    width: 'fit-content',
    gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
    position: 'sticky',
    top: 0,
    background: 'white2',
    zIndex: 10,
    borderColor: 'transparent transparent #ccc transparent',
    justifyItems: 'center',
  },
  headerText: {
    display: 'flex',
    fontWeight: [400, 400, 500],
    fontSize: ['8px', '8px', '12px'],
    color: 'textDisabled',
  },
  tableContainer: {
    width: ['100vw', 'auto', '100%'],
    overflowY: 'auto',
    position: 'relative',
    mt: '20px',
    ml: ['-20px', 0, 0],
    mr: ['-20px', 0, 0],
    borderRadius: '10px 10px 0 0',
    '::-webkit-scrollbar': {
      height: '3px',
      background: 'white3',
      width: '98%',
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
  },
  tableRowContainer: {
    width: 'fit-content',
    display: 'grid',
    gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
    borderColor: 'transparent transparent #ccc transparent',
    cursor: 'pointer',
  },
  indexCol: {
    padding: '8px',
    position: 'sticky',
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    height: columnHeight,
    minWidth: '25px',
    alignItems: 'center',
  },
  indexText: {
    fontWeight: 300,
    fontSize: ['12px'],
    color: 'textDisabled',
  },
  nameCol: {
    padding: '8px',
    position: 'sticky',
    left: 35,
    zIndex: 2,
    height: columnHeight,
    minWidth: '130px',
    alignItems: 'center',
  },
  symbolText: {
    fontWeight: 500,
    fontSize: ['10px', '10px', '10px', '12px'],
    lineHeight: ['14px'],
    ml: '5px',
  },
  nameText: {
    fontWeight: 500,
    fontSize: ['10px', '10px', '10px', '12px'],
    lineHeight: ['14px'],
    ml: '5px',
    color: 'textDisabled',
  },
  usdCol: {
    padding: '8px',
    justifyContent: 'center',
    height: columnHeight,
    fontWeight: 400,
    fontSize: ['10px', '10px', '10px', '12px'],
    alignItems: 'center',
  },
  barCol: {
    width: '100%',
    justifyContent: 'center',
  },
  barContainer: {
    padding: '8px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: columnHeight,
    minWidth: ['80px', '80px', '133px'],
  },
  scoreCol: {
    padding: '8px',
    position: 'sticky',
    right: 0,
    zIndex: 2,
    justifyContent: 'center',
    height: columnHeight,
    alignItems: 'center',
  },
  linkItem: {
    textDecoration: 'none',
  },
}
