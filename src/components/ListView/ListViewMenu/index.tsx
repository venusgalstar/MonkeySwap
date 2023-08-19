import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import MenuSelect from './MenuSelect'
import { AnimatePresence, motion } from 'framer-motion'
import { ListMenuProps } from './types'
import { Image, useColorMode } from 'theme-ui'
import track from 'utils/track'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { CheckBox, Flex, Svg, Text, Toggle } from 'components/uikit'
import Input from 'components/uikit/Input/Input'

const ListViewMenu: React.FC<ListMenuProps> = ({
  query,
  onHandleQueryChange,
  setFilterOption,
  filterOption,
  setSortOption,
  setIsActive,
  sortOption,
  checkboxLabel,
  showOnlyCheckbox,
  setShowOnlyCheckbox,
  toogleLabels,
  filterOptions,
  sortOptions,
  actionButton,
  showMonkeyImage,
}) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const [expanded, setExpended] = useState<boolean | undefined>(false)
  const { asPath } = useRouter()
  const isExact = !asPath.includes('history')
  const [colorMode] = useColorMode()
  const [usedSearch, setUsedSearch] = useState<boolean | undefined>(false)

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
    setIsActive((prev) => !prev)
  }, [setIsActive])

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

  const handleFilterChange = (value: string) => {
    setFilterOption && setFilterOption(value)
    handleTracking('filter')
  }

  const handleCheckBox = () => {
    setShowOnlyCheckbox(!showOnlyCheckbox)
    handleTracking('checkbox')
  }

  return (
    <Flex
      sx={{
        ...styles.menuContainer,
        padding: showMonkeyImage
          ? ['10px 20px', '10px 20px', '10px 20px', '10px 120px 10px 10px']
          : ['10px 20px', '10px 20px', '10px 20px', '10px'],
      }}
    >
      <>
        <Flex sx={{ width: ['100%', '100%', '100%', 'unset'], maxWidth: '353px' }}>
          <Text sx={styles.searchText}>{t('Search')}</Text>
          <Input
            value={query}
            onChange={handleQueryChange}
            variant="search"
            width={['100%', '100%', '100%', 'unset']}
            sx={styles.searchInput}
          />
          <Flex sx={styles.expandedButton} onClick={handleExpandedBtn}>
            <Svg icon="MenuSettings" width="18px" />
          </Flex>
        </Flex>
        <Flex sx={{ ...styles.onlyMobile, width: '100%' }}>
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
                  {sortOption && (
                    <Flex sx={styles.selectContainer} pr={filterOption && 3}>
                      <MenuSelect selectedOption={sortOption} setOption={handleSortChange} options={sortOptions} />
                    </Flex>
                  )}
                  {filterOption && (
                    <Flex sx={styles.selectContainer} pl={sortOption && 3}>
                      <MenuSelect
                        selectedOption={filterOption}
                        setOption={handleFilterChange}
                        options={filterOptions}
                      />
                    </Flex>
                  )}
                </Flex>
                <Flex sx={styles.container}>
                  <Flex>
                    <Toggle
                      size="md"
                      labels={[t(`${toogleLabels[0]}`).toUpperCase(), t(`${toogleLabels[1]}`).toUpperCase()]}
                      onChange={handleToogle}
                      checked={!isExact}
                      sx={{ height: '36px', alignItems: 'center', '& button': { lineHeight: '20px' } }}
                    />
                  </Flex>
                  <Flex sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={handleCheckBox}>
                    <CheckBox checked={showOnlyCheckbox} onChange={handleCheckBox} />
                    <Text ml="10px" size="16px" weight={700}>
                      {t(`${checkboxLabel}`)}
                    </Text>
                  </Flex>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
        {sortOption && (
          <Flex sx={{ minWidth: '100px', ...styles.onlyDesktop }}>
            <MenuSelect selectedOption={sortOption} setOption={handleSortChange} options={sortOptions} />
          </Flex>
        )}
        {filterOption && (
          <Flex sx={{ minWidth: '100px', ...styles.onlyDesktop }}>
            <MenuSelect selectedOption={filterOption} setOption={handleFilterChange} options={filterOptions} />
          </Flex>
        )}
        <Flex sx={{ minWidth: '150px', ...styles.onlyDesktop }}>
          <Toggle
            size="md"
            labels={[t(`${toogleLabels[0]}`).toUpperCase(), t(`${toogleLabels[1]}`).toUpperCase()]}
            onChange={handleToogle}
            checked={!isExact}
            sx={styles.toogle}
          />
        </Flex>
        <Flex
          sx={{ alignItems: 'center', '&: hover': { cursor: 'pointer' }, ...styles.onlyDesktop }}
          onClick={handleCheckBox}
        >
          <CheckBox checked={showOnlyCheckbox} onChange={handleCheckBox} />
          <Text ml="10px" size="16px" weight={700}>
            {t(`${checkboxLabel}`)}
          </Text>
        </Flex>
        <Flex sx={styles.container}>
          <Flex sx={{ width: '100%' }}>{actionButton}</Flex>
        </Flex>
      </>
      {showMonkeyImage &&
        (colorMode === 'dark' ? (
          <Image src="/images/farm-night-farmer.svg" sx={styles.monkey} alt="" />
        ) : (
          <Image src="/images/farm-day-farmer.svg" sx={styles.monkey} alt="" />
        ))}
    </Flex>
  )
}

export default React.memo(ListViewMenu)
