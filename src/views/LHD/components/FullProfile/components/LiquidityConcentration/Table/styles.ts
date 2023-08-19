import { desktopMappedColumns, mobileMappedColumns } from './columnsConfig'
import { ThemeUIStyleObject } from 'theme-ui'


export const styles: Record<
  | 'headerCont'
  | 'headerText'
  | 'rowCont'
  | 'index'
  | 'lpNameCol'
  | 'imgCont'
  | 'bodyText'
  | 'colCont',
  ThemeUIStyleObject> = {
  headerCont: {
    display: 'grid',
    width: 'fit-content',
    gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
    position: 'sticky',
    top: 0,
    background: 'white2',
    zIndex: 10,
    borderColor: 'transparent transparent #ccc transparent',
  },
  headerText: {
    fontWeight: [400, 400, 500],
    fontSize: ['8px', '8px', '10px'],
  },
  rowCont: {
    width: 'fit-content',
    display: 'grid',
    gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
    borderColor: 'transparent transparent #ccc transparent',
    cursor: 'pointer',
  },
  index: {
    padding: '8px',
    position: 'sticky',
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    height: '40px',
    fontWeight: 300,
    fontSize: ['12px'],
    lineHeight: '24px',
    color: 'textDisabled'
  },
  lpNameCol: {
    position: 'sticky',
    left: 25,
    zIndex: 2,
    height: '40px',
    alignItems: 'center',
  },
  imgCont: {
    minWidth: '24px',
    height: '24px',
    mt: ['2px'],
    mr: ['5px'],
    background: '#fff',
    borderRadius: '25px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    fontWeight: 500,
    fontSize: ['10px', '10px', '10px', '12px'],
    lineHeight: ['24px'],
  },
  colCont: {
    padding: '8px',
    justifyContent: 'center',
    height: '40px',
    display: 'flex',
    alignItems: 'center'
  }
}