import { Flex, Text } from 'components/uikit'
import styles  from './styles'

const AddLiquiditySign = () => (
  <Flex sx={styles.swapSwitchContainer}>
    <Flex sx={styles.swapSwitchButton}>
      <Text weight={700} size="20px" color="primaryBright" sx={{ mb: '1px', mr: '.5px' }}>
        +
      </Text>
    </Flex>
  </Flex>
)

export default AddLiquiditySign
