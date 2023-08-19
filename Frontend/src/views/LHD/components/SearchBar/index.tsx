import { ChangeEvent, useState, useCallback, useEffect } from 'react'
import { Box } from 'theme-ui'
import { Button, Flex, Input, Svg, Text, Select, SelectItem } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { useAnimation, motion } from 'framer-motion'

// Hooks
import useFilterHandler from './FilterModal/useFilterHandler'

// Types
import { Filters } from 'state/lhd/types'

// Constants
const SCORE = 'score'
interface SearchBarProps {
  searchQuery: string
  appliedFilters: Filters
  isSearchQuery: boolean
  setIsSearchQuery: (isSearchQuery: boolean) => void
  handleFiltersChange: ({ filters }: { filters: Filters }) => void
  onFilterModal: () => void
}

const SearchBar = ({
  appliedFilters,
  searchQuery,
  isSearchQuery,
  setIsSearchQuery,
  handleFiltersChange,
  onFilterModal,
}: SearchBarProps) => {
  const [searchQueryParam, setSearchQueryParam] = useState<string>(searchQuery)
  const { t } = useTranslation()

  useEffect(() => {
    setSearchQueryParam(searchQuery ?? '')
  }, [searchQuery])

  const { offset, search, sort, ...appliedModalFilters } = appliedFilters
  const changedPropertiesCount = Object.keys(appliedModalFilters).length

  const circle = <Box>&bull;</Box>

  const SORT_OPTIONS = [
    {
      value: SCORE,
      label: (
        <Flex sx={{ gap: '2px', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
          {!sort && circle}
          <Box sx={{ fontSize: '12px' }}>{t('Score')}</Box>{' '}
          <Box sx={{ color: 'lightGray', fontSize: '12px' }}>({t('Default')})</Box>
        </Flex>
      ),
    },
    { value: 'mcap', label: <Flex sx={{ gap: '3px', fontSize: '12px' }}>{sort && circle} Market Cap</Flex> },
  ]

  const handleQueryChange = useFilterHandler({
    setSearchQueryParam,
    searchQueryParam,
    handleFiltersChange,
    isSearchQuery,
    setIsSearchQuery,
    appliedFilters,
  })

  //shakes when no results are found
  const controls = useAnimation()
  const startShaking = useCallback(async () => {
    controls.start({
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.2, repeat: 2 },
    })
  }, [controls])

  return (
    <Flex sx={styles.searchBarContainer}>
      <motion.div animate={controls} style={{ display: 'inline-block', width: '100%' }}>
        <Input
          placeholder={t('Token name, address, symbol ...')}
          value={searchQueryParam}
          variant="search"
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleQueryChange(event.target.value)}
          style={{ backgroundColor: 'white2' }}
          sx={{ width: '100%', '::placeholder': { fontSize: '10px', fontWeight: 300 } }}
        />
      </motion.div>
      <Flex sx={{ gap: '10px' }}>
        <Select
          label={<Box sx={{ pl: '10px', fontSize: '12px' }}>{t(`Sort: ${sort ? 'Mcap' : 'Score'}`)}</Box>}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            const { sort, ...filters } = appliedFilters
            handleFiltersChange({ filters: value === SCORE ? filters : { ...filters, sort: value } })
          }}
          sx={{
            zIndex: 11,
            width: ['100%', '100%', '200px'],
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {SORT_OPTIONS.map(({ label, value }) => (
            <SelectItem value={value} key={value} size="xsm" sx={{ px: '10px' }}>
              {label}
            </SelectItem>
          ))}
        </Select>
        <Button
          variant={changedPropertiesCount === 0 ? 'tertiary' : 'secondary'}
          sx={styles.btn}
          endIcon={
            <Flex sx={{ ml: '5px' }}>
              <Svg icon="MenuSettings" />
            </Flex>
          }
          onClick={onFilterModal}
        >
          {t('Filters')}
        </Button>
        {changedPropertiesCount > 0 && (
          <Flex
            sx={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              zIndex: 10,
              width: '16px',
              height: '16px',
              background: '#FFB300',
              borderRadius: '25px',
            }}
          >
            <Text
              sx={{
                fontSize: '8px',
                width: '100%',
                height: '100%',
                display: 'flex',
                lineHeight: '25px',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAFAFA',
              }}
            >
              {changedPropertiesCount}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default SearchBar
