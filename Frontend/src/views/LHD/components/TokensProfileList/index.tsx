import { useState, useEffect, useMemo } from 'react'
import { Box } from 'theme-ui'
import TableHeader from './components/TableHeader'
import SkeletonRow from './components/SkeletonRow'
import { styles } from './styles'
import TableRow from './components/TableRow'
import { Flex, Svg, Text } from 'components/uikit'
import Pagination from './components/Pagination'
import { sortProfiles } from './utils/sortProfiles'
import { useTranslation } from 'contexts/Localization'

// Hooks
import useModal from 'hooks/useModal'

// Components
import SearchBar from '../SearchBar'
import FilterModal from '../SearchBar/FilterModal'

// Types
import { LHDProfiles, Filters } from 'state/lhd/types'

interface TokensProfileListProps {
  simpleProfiles: LHDProfiles
  isLoading: boolean
  isSearchQuery: boolean
  appliedFilters: Filters
  setIsSearchQuery: (isSearchQuery: boolean) => void
  handleFiltersChange: ({ filters }: { filters: Filters }) => void
}

const TokensProfileList = ({
  simpleProfiles,
  isLoading,
  isSearchQuery,
  appliedFilters,
  setIsSearchQuery,
  handleFiltersChange,
}: TokensProfileListProps) => {
  // TODO: Come back to double check the sorting and add types/enums
  const [sortCol, setSortCol] = useState(appliedFilters.sort ? 'Market Cap' : 'Score')
  const [sortType, setSortType] = useState<'asc' | 'desc'>('desc')

  const [onFilterModal] = useModal(
    <FilterModal appliedFilters={appliedFilters} handleFiltersChange={handleFiltersChange} />,
  )

  const { t } = useTranslation()

  useEffect(() => {
    if (appliedFilters.sort) {
      setSortCol('Market Cap')
      setSortType('desc')
    } else {
      setSortCol('Score')
      setSortType('desc')
    }
  }, [appliedFilters.sort])

  const { offset, ...rest } = appliedFilters
  const currentPage = offset ? offset / 50 + 1 : 1

  const handlePaginate = (page: number): void => {
    if (page === 1) {
      // do not add offset to the query string AND cache if the page is 1
      handleFiltersChange({ filters: rest })
    } else {
      handleFiltersChange({ filters: { ...appliedFilters, offset: (page - 1) * 50 } })
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const renderSortedProfiles = useMemo(() => {
    return sortProfiles(simpleProfiles.data, sortCol, sortType)?.map((simpleProfile, index) => {
      return <TableRow key={`simpleProfile${index}`} index={index} simpleProfile={simpleProfile} />
    })
  }, [simpleProfiles.data, sortCol, sortType])

  return (
    <>
      <SearchBar
        handleFiltersChange={handleFiltersChange}
        onFilterModal={onFilterModal}
        searchQuery={appliedFilters.search ?? ''}
        appliedFilters={appliedFilters}
        isSearchQuery={isSearchQuery}
        setIsSearchQuery={setIsSearchQuery}
      />
      <Box sx={styles.tableContainer}>
        <TableHeader
          sortCol={sortCol}
          onSortColChange={(value: string) => setSortCol(value)}
          sortType={sortType}
          onSortTypeChange={(value) => setSortType(value)}
        />
        {isLoading &&
          [...Array(50)].map((_, i) => {
            return <SkeletonRow key={i} />
          })}

        {simpleProfiles.data.length > 0 ? (
          renderSortedProfiles
        ) : (
          <Flex
            sx={{
              width: '100%',
              height: '200px',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: '20px',
            }}
          >
            <Svg icon="placeholderMonkey" />
            <Text sx={{ fontSize: '12px', fontWeight: 500, color: 'textDisabled' }}>{t('No Results Found')}</Text>
          </Flex>
        )}
      </Box>
      <Pagination
        currentPage={currentPage}
        onPageChange={(page: number) => handlePaginate(page)}
        totalPages={simpleProfiles ? Math.ceil(simpleProfiles.count / 50) : 0}
        hidePagination={simpleProfiles.count < 51}
      />
    </>
  )
}

export default TokensProfileList
