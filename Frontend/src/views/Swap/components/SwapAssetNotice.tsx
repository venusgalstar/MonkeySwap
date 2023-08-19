import { Flex, Link, Text } from 'components/uikit'

const SwapAssetNotice = () => (
  <Flex
    sx={{
      flexDirection: 'column',
      width: '100%',
      maxWidth: '420px',
      height: 'fit-content',
      background: 'white2',
      padding: ['15px 5px', '15px 10px', '15px'],
      borderRadius: '10px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text sx={{ fontSize: '12px', fontWeight: '400', lineHeight: '14px', textAlign: 'center' }}>
      Are you swapping a reflext/tax token? If so, we recommend{' '}
      <Link target="_blank" href="https://legacy.apeswap.finance/swap">
        swapping on our V2 UI
      </Link>{' '}
      for an optimized trading experience!
    </Text>
  </Flex>
)
export default SwapAssetNotice
