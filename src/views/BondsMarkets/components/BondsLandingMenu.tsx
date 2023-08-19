import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { AnimatePresence, motion } from 'framer-motion'
import { useColorMode } from 'theme-ui'
import track from 'utils/track'
import { useWeb3React } from '@web3-react/core'
import { Flex, Svg, Toggle } from 'components/uikit'
import Input from 'components/uikit/Input/Input'
import MenuSelect from '../../../components/ListView/ListViewMenu/MenuSelect'
import { SORT_OPTIONS, useSinglePageView } from '../types'
import { Button } from 'components/uikit'
import { ChainId, NETWORK_ICONS } from 'config/constants/chains'
import { DESKTOP_DISPLAY, MOBILE_DISPLAY } from '../../../theme/display'
import { useRouter } from 'next/router'

export interface BondsLandingMenuProps {
  query: string
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  showAvailable: boolean
  setShowAvailable: Dispatch<SetStateAction<boolean>>
  sortOption?: string
  setSortOption: Dispatch<SetStateAction<string>>
  filteredChains: Record<string, boolean>
  setFilteredChains: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

const BondsLandingMenu: React.FC<BondsLandingMenuProps> = ({
  query,
  onHandleQueryChange,
  showAvailable,
  setShowAvailable,
  sortOption,
  setSortOption,
  filteredChains,
  setFilteredChains,
}) => {
  const { chainId } = useWeb3React()
  const [expanded, setExpended] = useState<boolean | undefined>(false)
  const [usedSearch, setUsedSearch] = useState<boolean | undefined>(false)
  const { push } = useRouter()

  const handleTracking = useCallback(
    (type: string) => {
      track({
        event: 'list-menu',
        chain: chainId,
        data: {
          cat: type,
        },
      })
    },
    [chainId],
  )

  const handleToogle = useCallback(() => {
    setShowAvailable((prev) => !prev)
  }, [setShowAvailable])

  const handleExpandedBtn = () => {
    setExpended(!expanded)
    handleTracking('expanded')
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHandleQueryChange(e)
    if (!usedSearch) {
      setUsedSearch(true)
      handleTracking('search')
    }
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
    handleTracking('sort')
  }

  return (
    <Flex sx={styles.menuContainer}>
      <>
        <Flex sx={{ width: ['100%', '100%', '100%', '45%'], maxWidth: ['353px', '353px', '353px', 'unset'] }}>
          <Input
            value={query}
            placeholder="Search for a Bond..."
            onChange={handleQueryChange}
            variant="search"
            width={['100%', '100%', '100%', '100%']}
            sx={styles.searchInput}
          />
          <Flex sx={styles.expandedButton} onClick={handleExpandedBtn}>
            <Svg icon="MenuSettings" width="18px" />
          </Flex>
        </Flex>
        <Flex sx={{ display: MOBILE_DISPLAY, width: '100%' }}>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'fit-content', transitionEnd: { overflow: 'visible' } }}
                transition={{ opacity: { duration: 0.2 } }}
                exit={{ height: 0, overflow: 'hidden' }}
                sx={styles.expandedContainer}
              >
                <Flex sx={styles.container}>
                  {Object.keys(filteredChains).map((prefixedChain) => {
                    const chain = prefixedChain.substring(6)
                    return (
                      <Flex
                        onClick={() =>
                          setFilteredChains((prevChains) => ({
                            ...prevChains,
                            [chain]: !prevChains[chain],
                          }))
                        }
                        key={chain}
                        sx={styles.filterChainBtn}
                      >
                        <Flex
                          sx={{
                            ...styles.chainIconCont,
                            filter: `${filteredChains['chain_' + chain] ? 'none' : 'grayscale(100%)'}`,
                          }}
                        >
                          <Svg icon={NETWORK_ICONS[chain as unknown as ChainId]} width="20px" />
                        </Flex>
                      </Flex>
                    )
                  })}
                </Flex>
                <Flex sx={styles.container}>
                  {sortOption && (
                    <Flex sx={styles.selectContainer}>
                      <MenuSelect selectedOption={sortOption} setOption={handleSortChange} options={SORT_OPTIONS} />
                    </Flex>
                  )}
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
        <Flex sx={{ display: DESKTOP_DISPLAY }}>
          {Object.keys(filteredChains).map((prefixedChain) => {
            const chain = prefixedChain.substring(6)
            return (
              <Flex
                onClick={() =>
                  setFilteredChains((prevChains) => ({
                    ...prevChains,
                    [chain]: !prevChains[chain],
                  }))
                }
                key={chain}
                sx={styles.filterChainBtn}
              >
                <Flex
                  sx={{
                    ...styles.chainIconCont,
                    filter: `${filteredChains['chain_' + chain] ? 'none' : 'grayscale(100%)'}`,
                  }}
                >
                  <Svg icon={NETWORK_ICONS[chain as unknown as ChainId]} width="20px" />
                </Flex>
              </Flex>
            )
          })}
        </Flex>
        {sortOption && (
          <Flex sx={{ minWidth: '120px', display: DESKTOP_DISPLAY }}>
            <MenuSelect selectedOption={sortOption} setOption={handleSortChange} options={SORT_OPTIONS} />
          </Flex>
        )}
        <Flex
          sx={{
            ...styles.container,
            width: useSinglePageView ? ['100%', '100%', '100%', '250px'] : ['100%', '100%', '100%', '350px'],
            justifyContent: 'center',
          }}
        >
          {!useSinglePageView && (
            <Toggle
              size="md"
              labels={['Available', 'Sold Out']}
              onChange={handleToogle}
              checked={!showAvailable}
              sx={{ minWidth: '185px', height: '36px', alignItems: 'center', '& button': { lineHeight: '20px' } }}
            />
          )}
          <Button
            sx={{
              width: '100%',
              height: '36px',
              fontSize: '14px',
            }}
            onClick={() => push('bonds?yourBonds')}
          >
            My bonds
          </Button>
        </Flex>
      </>
    </Flex>
  )
}

export default BondsLandingMenu
