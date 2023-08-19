// Components
import { styles } from '../styles'
import { Flex, Input, Svg, Text } from 'components/uikit'

// Hooks
import { ChangeEvent, useCallback, useState } from 'react'

// Types, Constants, Utils
import { ChainId, NETWORK_ICONS } from 'config/constants/chains'
import { DEX_CHAINS } from '../constants'

const ChainOptionsList = ({
  setSelectedChain,
  setViewAllChains,
}: {
  setSelectedChain: (chain: ChainId) => void
  setViewAllChains: (viewAllChains: boolean) => void
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleChainSelect = (chain: ChainId) => {
    setSelectedChain(chain)
    setViewAllChains(false)
  }

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setSearchQuery(input)
  }, [])

  return (
    <Flex sx={styles.searchAndListContainer}>
      <Flex sx={{ position: 'relative', flexDirection: 'column' }}>
        <Flex>
          <Input onChange={handleInput} sx={styles.searchInput} placeholder="Search by chain name" />
          <Flex sx={{ position: 'absolute', right: '10px', top: '12px' }}>
            <Svg icon="search" />
          </Flex>
        </Flex>
        <Flex sx={styles.chainListContainer}>
          {DEX_CHAINS.filter((chainInfo) => chainInfo.name.toLowerCase().includes(searchQuery.toLowerCase())).map(
            (chainInfo) => {
              return (
                <Flex
                  sx={styles.chainOptionList}
                  onClick={() => handleChainSelect(chainInfo.chain)}
                  key={chainInfo.name}
                >
                  <Svg
                    width="25px"
                    icon={NETWORK_ICONS[chainInfo.chain] ? NETWORK_ICONS[chainInfo.chain] : 'question'}
                  />
                  <Text sx={{ fontWeight: '500', fontSize: '16px' }}>{chainInfo.name}</Text>
                </Flex>
              )
            },
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ChainOptionsList
