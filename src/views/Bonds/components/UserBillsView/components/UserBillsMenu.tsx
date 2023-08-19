import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { ClaimAllWrapper, SearchText, styles } from '../styles'
import { FILTER_OPTIONS, SORT_OPTIONS } from '../types'
import { AnimatePresence, motion } from 'framer-motion'
import { useWeb3React } from '@web3-react/core'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { CheckBox, Flex, Input, Svg, Text, Toggle } from 'components/uikit'
import MenuSelect from 'components/ListView/ListViewMenu/MenuSelect'
import ClaimAll from 'views/Bonds/actions/ClaimAll'
import { Bills } from 'views/Bonds/types'

export interface UserBillsMenuProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setFilterOption: (value: string) => void
  filterOption?: string
  setSortOption: (value: string) => void
  sortOption?: string
  query: string
  harvestAll?: React.ReactNode
  bills?: Bills[]
  showClaimed: boolean
  setShowClaimed: (value: boolean) => void
  listView: boolean
  setListView: (view: boolean) => void
}

const UserBillsMenu: React.FC<UserBillsMenuProps> = ({
  onHandleQueryChange,
  setFilterOption,
  filterOption,
  setSortOption,
  query,
  sortOption,
  bills,
  showClaimed,
  setShowClaimed,
  listView,
  setListView,
}) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [expanded, setExpended] = useState(false)
  const userOwnedBills: Bills[] = bills ? bills?.filter((bill) => (bill?.userOwnedBillsData?.length ?? 0) > 0) : []
  const ownedBillsAmount = bills
    ?.flatMap((bill) => (bill?.userOwnedBillsData ? bill.userOwnedBillsData : []))
    .filter((b) => parseFloat(b.pendingRewards) > 0).length
  const ownedBills = userOwnedBills?.map((bill) => {
    return (
      bill?.userOwnedBillsData && {
        billAddress: bill.contractAddress[chainId as SupportedChainId],
        billIds: bill.userOwnedBillsData
          .filter((b) => parseFloat(b.pendingRewards) > 0)
          .map((b) => {
            return b.id
          }),
      }
    )
  })
  return (
    <Flex sx={styles.menuContainer}>
      {isMobile ? (
        <Flex sx={styles.mobileContainer}>
          <Flex sx={{ width: '100%', maxWidth: '350px' }}>
            <SearchText bold mr="15px">
              {t('Search')}
            </SearchText>
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
                    <MenuSelect selectedOption={sortOption ?? ''} setOption={setSortOption} options={SORT_OPTIONS} />
                  </Flex>
                  <Flex sx={styles.inputContainer} pl={3}>
                    <MenuSelect
                      selectedOption={filterOption ?? ''}
                      setOption={setFilterOption}
                      options={FILTER_OPTIONS}
                    />
                  </Flex>
                  <Flex
                    sx={{ marginTop: '15px', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Flex>
                      <Toggle
                        size="sm"
                        labels={[t('List'), t('Gallery')]}
                        onChange={() => setListView(!listView)}
                        checked={!listView}
                        sx={{
                          height: '36px',
                          alignItems: 'center',
                          '& div': { minWidth: '70px', textAlign: 'center' },
                        }}
                      />
                    </Flex>
                    <Flex sx={{ cursor: 'pointer' }} onClick={() => setShowClaimed(!showClaimed)}>
                      <CheckBox checked={showClaimed} onChange={() => setShowClaimed(!showClaimed)} />
                      <Text ml="15px" size="14px">
                        {t('Claimed')}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
          <Flex sx={{ width: '100%', maxWidth: '350px', marginTop: '15px' }}>
            <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount ?? 0} buttonSize={'100%'} />
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex>
            <SearchText bold mr="15px">
              {t('Search')}
            </SearchText>
            <Input value={query} onChange={onHandleQueryChange} variant="search" sx={styles.input} />
          </Flex>
          <Flex sx={{ minWidth: '100px' }}>
            <MenuSelect selectedOption={sortOption ?? ''} setOption={setSortOption} options={SORT_OPTIONS} />
          </Flex>
          <Flex sx={{ minWidth: '100px' }}>
            <MenuSelect selectedOption={filterOption ?? ''} setOption={setFilterOption} options={FILTER_OPTIONS} />
          </Flex>
          <Flex sx={{ minWidth: '150px' }}>
            <Toggle
              size="sm"
              labels={[t('List'), t('Gallery')]}
              onChange={() => setListView(!listView)}
              checked={!listView}
              sx={{
                height: '36px',
                width: '100%',
                alignItems: 'center',
                '& div': { minWidth: '75px', textAlign: 'center' },
              }}
            />
          </Flex>
          <Flex sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowClaimed(!showClaimed)}>
            <CheckBox checked={showClaimed} onChange={() => setShowClaimed(!showClaimed)} />
            <Text ml="15px" size="14px">
              {t('Claimed')}
            </Text>
          </Flex>
          <ClaimAllWrapper>
            <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount ?? 0} buttonSize={'180px'} />
          </ClaimAllWrapper>
        </>
      )}
    </Flex>
  )
}

export default React.memo(UserBillsMenu)
