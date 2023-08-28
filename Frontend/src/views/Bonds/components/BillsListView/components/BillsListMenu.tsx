import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { SearchText, styles } from '../styles'
import { BillsListMenuProps, FILTER_OPTIONS, SORT_OPTIONS } from '../types'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckBox, Flex, Input, Svg, Text, Toggle } from 'components/uikit'
import MenuSelect from 'components/ListView/ListViewMenu/MenuSelect'
import NetworkSelector from 'components/NetworkSelector'
import useIsMobile from 'hooks/useIsMobile'

const BillsListMenu: React.FC<BillsListMenuProps> = ({
  onHandleQueryChange,
  setFilterOption,
  filterOption,
  setSortOption,
  sortOption,
  query,
  showOnlyDiscount,
  setShowOnlyDiscount,
  showAvailable,
  setShowAvailable,
}) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [expanded, setExpended] = useState(false)

  return (
    <Flex sx={styles.menuContainer}>
      {isMobile ? (
        <Flex sx={styles.mobileContainer}>
          <Flex sx={{ width: '100%', maxWidth: '353px' }}>
            <SearchText sx={{ fontWeight: 700, mr: '15px' }}>{t('Search')}</SearchText>
            <Input value={query} onChange={onHandleQueryChange} variant="search" sx={styles.input} width={'100%'} />
            <Flex sx={styles.expandedButton} onClick={() => setExpended(!expanded)}>
              <Svg icon="MenuSettings" width="18px" />
            </Flex>
          </Flex>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'fit-content', transitionEnd: { overflow: 'visible' } }}
                transition={{ opacity: { duration: 0.2 } }}
                exit={{ height: 0, overflow: 'hidden' }}
                sx={{
                  position: 'relative',
                  width: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Flex sx={styles.mobileRow}>
                  <Flex sx={styles.inputContainer} pr={3}>
                    <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={SORT_OPTIONS} />
                  </Flex>
                  <Flex sx={styles.inputContainer} pl={3}>
                    <MenuSelect
                      selectedOption={filterOption || ''}
                      setOption={setFilterOption}
                      options={FILTER_OPTIONS}
                    />
                  </Flex>
                  <Flex sx={styles.networkWrapper}>
                    <NetworkSelector billsFlag />
                  </Flex>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
          <Flex sx={styles.mobileRow}>
            <Flex>
              <Toggle
                size="sm"
                labels={[t('Available'), t('Sold Out')]}
                onChange={() => setShowAvailable(!showAvailable)}
                checked={!showAvailable}
                sx={{ height: '36px', alignItems: 'center' }}
              />
            </Flex>
            <Flex
              sx={{ alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setShowOnlyDiscount(!showOnlyDiscount)}
            >
              <CheckBox checked={showOnlyDiscount} onChange={() => setShowOnlyDiscount(!showOnlyDiscount)} />
              <Text ml="15px" size="14px" weight={700} color="success">
                {t('Discount')}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex>
            <SearchText sx={{ fontWeight: 700, mr: '15px' }}>{t('Search')}</SearchText>
            <Input value={query} onChange={onHandleQueryChange} variant="search" sx={styles.input} />
          </Flex>
          <Flex sx={{ minWidth: '100px' }}>
            <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={SORT_OPTIONS} />
          </Flex>
          <Flex sx={{ minWidth: '100px' }}>
            <MenuSelect selectedOption={filterOption || ''} setOption={setFilterOption} options={FILTER_OPTIONS} />
          </Flex>
          <Flex sx={{ minWidth: '150px' }}>
            <Toggle
              size="sm"
              labels={[t('Available'), t('Sold Out')]}
              onChange={() => setShowAvailable(!showAvailable)}
              checked={!showAvailable}
              sx={{ height: '36px', alignItems: 'center', width: '100%' }}
            />
          </Flex>
          <Flex
            sx={{ alignItems: 'center', '&: hover': { cursor: 'pointer' } }}
            onClick={() => setShowOnlyDiscount(!showOnlyDiscount)}
          >
            <CheckBox checked={showOnlyDiscount} onChange={() => setShowOnlyDiscount(!showOnlyDiscount)} />
            <Text ml="15px" size="14px" weight={700} color="success">
              {t('Discount')}
            </Text>
          </Flex>
          <Flex
            sx={{
              '& button': {
                width: '180px',
                justifyContent: 'space-between',
                '& span': { width: '100%', textAlign: 'left' },
              },
            }}
          >
            <NetworkSelector
            // supportedChains={AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS]}
            />
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default React.memo(BillsListMenu)
