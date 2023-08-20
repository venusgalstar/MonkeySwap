// Components
import { styles } from './styles'
import { Flex, Modal, Svg, Input, Text } from 'components/uikit'
import ChainOptionsButtons from './components/ChainOptionsButtons'
import ChainOptionsList from './components/ChainOptionsList'
import List from './components/List'
import { ChainId } from 'config/constants/chains'

// Hooks
import { ChangeEvent, useCallback, useState } from 'react'

// Types, Constants, Utils
import { Currency } from '@ape.swap/sdk-core'
import { isAddress } from 'utils'
import { useWeb3React } from '@web3-react/core'

const ChainTokenSelector = ({
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
}: {
  onDismiss?: () => void
  onCurrencySelect: (currency: Currency, chain: ChainId) => void
  selectedCurrency?: Currency | null
}) => {
  const { chainId } = useWeb3React()

  const [selectedChain, setSelectedChain] = useState<ChainId>(chainId as ChainId)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewAllChains, setViewAllChains] = useState<boolean>(false)

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

  return !viewAllChains ? (
    <Modal title="Select Token" zIndex={110} sx={{ height: '560px', width: '420px' }}>
      <Text sx={styles.sectionDividerFont}>Select Chain</Text>
      <ChainOptionsButtons
        setSelectedChain={setSelectedChain}
        selectedChain={selectedChain}
        setViewAllChains={setViewAllChains}
      />
      <Text sx={styles.sectionDividerFont}>Select Token</Text>
      <Flex sx={styles.searchAndListContainer}>
        <Flex sx={{ position: 'relative', flexDirection: 'column' }}>
          <Flex>
            <Input onChange={handleInput} sx={styles.searchInput} placeholder="Search by token or address" />
            <Flex sx={{ position: 'absolute', right: '10px', top: '12px' }}>
              <Svg icon="search" />
            </Flex>
          </Flex>
          <List
            searchQuery={searchQuery}
            onCurrencySelect={onCurrencySelect}
            selectedCurrency={selectedCurrency}
            onDismiss={onDismiss}
            selectedChain={selectedChain}
          />
        </Flex>
      </Flex>
    </Modal>
  ) : (
    <Modal zIndex={110} sx={{ height: '560px', width: '420px' }}>
      <Flex sx={{ justifyContent: 'space-between', mb: '20px' }}>
        <Flex onClick={() => setViewAllChains(false)} sx={styles.cursorHover}>
          <Svg width="10px" icon="arrow" direction="left" />
        </Flex>
        <Text sx={{ fontSize: '16px', fontWeight: '300' }}>All Chain Options</Text>
      </Flex>
      <ChainOptionsList setSelectedChain={setSelectedChain} setViewAllChains={setViewAllChains} />
    </Modal>
  )
}

export default ChainTokenSelector
