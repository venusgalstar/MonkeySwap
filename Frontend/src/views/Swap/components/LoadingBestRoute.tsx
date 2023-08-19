import { Flex, Text } from 'components/uikit'
import { Spinner } from 'theme-ui'
import styles from './styles'

const LoadingBestRoute = () => {
  return (
    <Flex sx={styles.dexTradeInfoContainer}>
      <Flex sx={{ alignItems: 'center' }}>
        <Spinner size={22} mr="15px" color="text" />
        <Text size="12px" sx={{ wordBreak: 'break-all', lineHeight: '15px' }}>
          Fetching the best route
        </Text>
      </Flex>
    </Flex>
  )
}

export default LoadingBestRoute
