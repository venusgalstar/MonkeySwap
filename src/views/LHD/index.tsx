import { useState } from 'react'
import { useRouter } from 'next/router'
import { Flex } from 'components/uikit'
import { styles } from './styles'

// Components
import ListViewLayout from 'components/ListView/ListViewLayout'
import TokensProfileList from './components/TokensProfileList'
import TitleCards from './components/TitleCards'

// Helpers
import { generateSearchParams, queryStringToObject, getFilterDiff } from './components/SearchBar/helpers'

// Constants
import { INITIAL_FILTER_VALUES } from './utils/config'
const SCORE = 'score'

// Hooks
import { useSelector } from 'react-redux'
import useGetLHDProfiles from 'state/lhd/hooks/useGetLHDProfiles'

// Types
import { Filters } from 'state/lhd/types'
import { AppState } from 'state'

const LHD = () => {
  const router = useRouter()
  const { query: filters } = router
  const parsedFilters = queryStringToObject(filters as unknown as string)
  const appliedFiltersDiff = getFilterDiff({ ...INITIAL_FILTER_VALUES, ...parsedFilters })
  /**
   * Applied filters are the source of truth for the LHD filters, and are updated when the user changes the filters or searches.
   * The applied filters are used to fetch the data, and are also used to update the URL query string.
   * */
  const [appliedFilters, setAppliedFilters] = useState<Filters>(appliedFiltersDiff)
  /** Prevents a race condition between searching and filtering */
  const [isSearchQuery, setIsSearchQuery] = useState<boolean>(false)
  const { data: simpleProfiles = { count: 0, data: [] }, isLoading } = useGetLHDProfiles({ filters: appliedFilters })

  const { offset, search, sort, ...appliedModalFilters } = appliedFilters
  /**
   * This function is called when the user changes the filters or searches.
   * It updates the applied filters, and updates the URL query string in the same action handler.
   */
  const handleFiltersChange = ({ filters }: { filters: Filters; query?: string }): void => {
    setIsSearchQuery(!!filters?.search)

    const validFilters: Filters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key as keyof Filters]) {
        return { ...acc, [key]: filters[key as keyof Filters] }
      }
      return acc
    }, {} as Filters)

    setAppliedFilters(validFilters)
    const filterString = generateSearchParams({ ...INITIAL_FILTER_VALUES, ...validFilters })

    router.replace(
      {
        query: filterString,
      },
      undefined,
      { scroll: false },
    )
  }

  return (
    <Flex sx={styles.mainLHDContainer}>
      <ListViewLayout>
        <TitleCards appliedFilters={appliedModalFilters} handleFiltersChange={handleFiltersChange} />
        <TokensProfileList
          simpleProfiles={simpleProfiles}
          isLoading={isLoading}
          isSearchQuery={isSearchQuery}
          setIsSearchQuery={setIsSearchQuery}
          handleFiltersChange={handleFiltersChange}
          appliedFilters={appliedFilters}
        />
      </ListViewLayout>
    </Flex>
  )
}

export default LHD
