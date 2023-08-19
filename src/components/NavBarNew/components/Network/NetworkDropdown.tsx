// Components
import { styles } from './styles'
import { Flex } from 'components/uikit'
import NetworkDropdownColumn from './NetworkDropdownColumn'

// Hooks
import { useThemeUI } from 'theme-ui'

// Constants
import { DEX_ONLY_CHAINS, MAINNET_CHAINS } from 'config/constants/chains'

const NetworkDropdown = ({ isVisible }: { placement: string; isVisible: boolean }) => {
  const { colorMode } = useThemeUI()

  return (
    <Flex
      sx={{
        ...styles.networkDropdownMainContainer,
        display: isVisible ? 'flex' : 'none',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
      }}
    >
      <NetworkDropdownColumn chains={MAINNET_CHAINS} title="Primary Chains" isDexOnly={false} />
      <NetworkDropdownColumn chains={DEX_ONLY_CHAINS} title="Swap Only" isDexOnly={true} />
    </Flex>
  )
}

export default NetworkDropdown
