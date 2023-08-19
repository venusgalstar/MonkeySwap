import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<
  'historicalTxContainer' | 'emptyHistoryContainer' | 'statusContainer' | 'tokenInfoContainer',
  ThemeUIStyleObject
> = {
  historicalTxContainer: {
    height: '160px',
    flexDirection: 'column',
    bg: 'white3',
    borderRadius: '10px',
    py: '6px',
    px: '10px',
    gap: '2px',
    position: 'relative',
  },
  emptyHistoryContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    gap: '10px',
  },
  statusContainer: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
  },
  tokenInfoContainer: {
    p: '8px 4px 4px 4px',
    borderRadius: '8px',
    ':hover': {
      bg: 'white4',
    },
  },
}

export default styles
