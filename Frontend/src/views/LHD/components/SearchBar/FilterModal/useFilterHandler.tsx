import { useCallback, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'

// Types
import { Filters } from 'state/lhd/types'

interface useFilterHandlerProps {
  searchQueryParam: string
  isSearchQuery: boolean
  setSearchQueryParam: (searchQuery: string) => void
  setIsSearchQuery: (isSearchQuery: boolean) => void
  handleFiltersChange: ({ filters }: { filters: Filters }) => void
  appliedFilters: Filters
}

const useFilterHandler = ({
  searchQueryParam,
  isSearchQuery,
  setSearchQueryParam,
  handleFiltersChange,
  setIsSearchQuery,
  appliedFilters,
}: useFilterHandlerProps) => {
  const debouncedQuery = useDebounce(searchQueryParam, 250)

  const handleQueryChange = useCallback(
    (searchQuery: string) => {
      setSearchQueryParam(searchQuery)
      setIsSearchQuery(true)
    },
    [setSearchQueryParam],
  )

  const { sort } = appliedFilters

  useEffect(() => {
    // Do NOT call handleFiltersChange on component mount or if searchQuery is not the intended action
    if (!isSearchQuery) {
      return
    }

    if (debouncedQuery) {
      handleFiltersChange({ filters: { search: debouncedQuery, sort } })
    } else {
      handleFiltersChange({ filters: { sort } })
    }
  }, [debouncedQuery])

  return handleQueryChange
}

export default useFilterHandler
