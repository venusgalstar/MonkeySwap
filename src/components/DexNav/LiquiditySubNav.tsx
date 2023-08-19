import { Flex, Svg, Text } from 'components/uikit'
import { useRouter } from 'next/router'
import styles from './styles'

export const V3LiquiditySubNav = () => {
  const { pathname, push } = useRouter()

  return (
    <Flex sx={styles.liquiditySelectorContainer}>
      <Flex sx={{ ...styles.liquiditySelector, mr: '20px' }} onClick={() => push('/v3-liquidity')} id="zap-link">
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('/v3-liquidity') ? 'text' : 'textDisabled'} icon="Positions" width="20px" />
        </Flex>
        <Text variant="link" color={pathname.includes('/v3-liquidity') ? 'text' : 'textDisabled'}>
          Positions
        </Text>
      </Flex>
    </Flex>
  )
}

export const V2LiquiditySubNav = () => {
  const { pathname, push } = useRouter()

  return (
    <Flex sx={styles.liquiditySelectorContainer}>
      <Flex sx={{ ...styles.liquiditySelector, mr: '20px' }} onClick={() => push('/liquidity')} id="zap-link">
        <Flex sx={{ marginRight: '5px' }}>
          <Svg
            color={pathname.includes('/liquidity') || pathname.includes('/remove') ? 'text' : 'textDisabled'}
            icon="Positions"
            width="20px"
          />
        </Flex>
        <Text
          color={pathname.includes('/liquidity') || pathname.includes('/remove') ? 'text' : 'textDisabled'}
          variant="link"
        >
          Positions
        </Text>
      </Flex>
      <Flex onClick={() => push('/zap')} to="/zap" id="zap-link" sx={{ ...styles.liquiditySelector, mr: '20px' }}>
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('zap') ? 'text' : 'textDisabled'} icon="ZapIcon" />
        </Flex>
        <Text color={pathname.includes('zap') ? 'text' : 'textDisabled'}>Zap</Text>
      </Flex>
      <Flex sx={styles.liquiditySelector} onClick={() => push('/add-liquidity')}>
        <Text
          color={pathname.includes('add-liquidity') ? 'text' : 'textDisabled'}
          sx={{ whiteSpace: 'nowrap' }}
          id="add-liquidity-link"
          variant="link"
        >
          + Add
        </Text>
      </Flex>
    </Flex>
  )
}
