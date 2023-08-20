// Components
import { Flex, Svg, Text } from 'components/uikit'

// Types, Constants, Utils
import { ChainId, NETWORK_ICONS } from 'config/constants/chains'
import { DEX_CHAINS } from '../constants'
import { styles } from '../styles'

const ChainOptionsButtons = ({
  selectedChain,
  setSelectedChain,
  setViewAllChains,
}: {
  selectedChain: ChainId
  setSelectedChain: (chain: ChainId) => void
  setViewAllChains: (viewAllChains: boolean) => void
}) => {
  return (
    <Flex sx={{ position: 'relative', mb: '10px', gap: '10px' }}>
      {DEX_CHAINS.sort((chainInfo) => (chainInfo.chain === selectedChain ? -1 : 1))
        .slice(0, 6)
        .map((chainInfo) => {
          return (
            <Flex
              sx={{
                ...styles.chainOptionButton,
                border: selectedChain === chainInfo.chain && '2px solid gold',
              }}
              onClick={() => setSelectedChain(chainInfo.chain)}
              key={chainInfo.name}
            >
              <Svg width="25px" icon={NETWORK_ICONS[chainInfo.chain] ? NETWORK_ICONS[chainInfo.chain] : 'question'} />
            </Flex>
          )
        })}
      <Flex sx={styles.chainOptionButton} onClick={() => setViewAllChains(true)}>
        <Text sx={{ color: 'textDisabled' }}>{DEX_CHAINS.length - 6}+</Text>
      </Flex>
    </Flex>
  )
}

export default ChainOptionsButtons
