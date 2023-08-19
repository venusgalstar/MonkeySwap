import { useCallback, useState } from 'react'
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import Dropdown from './Dropdown'
import ModalHeader from 'components/uikit/Modal/ModalHeader'
import InputSlider from './InputSlider'
import { formatDollar } from 'utils/formatNumbers'
import ScoreSlider from './ScoreSlider'
import { Box } from 'theme-ui'
import ButtonSelector from './ButtonSelector'

// Helpers
import { getFilterDiff } from '../helpers'

// Constants
import { INITIAL_FILTER_VALUES } from 'views/LHD/utils/config'

// Types
import { Filters } from 'state/lhd/types'

const modalProps = {
  sx: {
    zIndex: 126,
    // overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    width: ['90%', '90%', '425px'],
    maxWidth: '425px',
    minWidth: 'unset',
  },
}

interface FilterModalProps {
  openChains?: boolean
  appliedFilters: Filters
  onDismiss?: () => void
  handleFiltersChange: ({ filters }: { filters: Filters }) => void
}

const FilterModal = ({ openChains, appliedFilters, onDismiss, handleFiltersChange }: FilterModalProps) => {
  const { t } = useTranslation()
  const { offset, search, sort, ...appliedModalFilters } = appliedFilters
  const [values, setValues] = useState<Required<Filters>>({ ...INITIAL_FILTER_VALUES, ...appliedModalFilters })

  const stringHandler = (
    type: 'totalScore' | 'health' | 'ownership' | 'concentration' | 'mcap' | 'extractable' | 'tags' | 'chains',
  ) => {
    if (type === 'mcap' || type === 'extractable') {
      if (
        values[type].min !== INITIAL_FILTER_VALUES[type].min ||
        values[type].max !== INITIAL_FILTER_VALUES[type].max
      ) {
        return `(${formatDollar({ num: values[type].min })}-${formatDollar({ num: values[type].max })})`
      }
    }
    if (type === 'tags' || type === 'chains') {
      return values[type].join(',')
    }
    if (values[type].min !== INITIAL_FILTER_VALUES[type].min || values[type].max !== INITIAL_FILTER_VALUES[type].max) {
      return `(${values[type].min}-${values[type].max})`
    }
    return ''
  }

  const mCapString = stringHandler('mcap')
  const extString = stringHandler('extractable')
  const score = stringHandler('totalScore')
  const health = stringHandler('health')
  const owner = stringHandler('ownership')
  const concen = stringHandler('concentration')
  const scoreString = `${score ? `Score: ${score}` : ''}${health ? ` Strength: ${health}` : ''}${
    owner ? ` Ownership: ${owner}` : ''
  } ${concen ? ` Concentration: ${concen}` : ''}`
  const tagsString = stringHandler('tags')
  const chainsString = stringHandler('chains')

  const handler = useCallback(
    (
      type: 'totalScore' | 'health' | 'ownership' | 'concentration' | 'mcap' | 'extractable',
      obj: 'min' | 'max',
      value: number,
    ) => {
      setValues((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          [obj]: value,
        },
      }))
    },
    [],
  )

  const buttonSelectorHandler = useCallback((type: 'tags' | 'chains', value: string[]) => {
    setValues((prevState) => ({
      ...prevState,
      [type]: value,
    }))
  }, [])

  const searchAction = () => {
    const diff = getFilterDiff(values)
    handleFiltersChange({ filters: { ...diff, sort } })
    onDismiss && onDismiss()
  }
  const clearAction = () => {
    setValues(INITIAL_FILTER_VALUES)
    handleFiltersChange({ filters: {} })
    onDismiss && onDismiss()
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader>
        <Text sx={{ width: '100%', textAlign: 'center' }}>{t('FILTERS')}</Text>
      </ModalHeader>
      <Dropdown
        open={openChains}
        title={t('Chains')}
        values={values['chains'].length > 0 ? `Chains: ${values['chains'].length} selected` : ''}
      >
        <ButtonSelector values={values} handler={buttonSelectorHandler} type="chains" />
      </Dropdown>
      <Dropdown title={t('Tags')} values={values['tags'].length ? `Tags: ${values['tags'].length} selected` : ''}>
        <ButtonSelector values={values} handler={buttonSelectorHandler} type="tags" />
      </Dropdown>
      <Dropdown
        title={t('Liquidity Score')}
        values={scoreString.length > 40 ? `${scoreString.slice(0, 40)}...` : scoreString}
      >
        <ScoreSlider values={values} handler={handler} />
      </Dropdown>
      <Dropdown title={t('Market Cap Range')} values={mCapString}>
        <InputSlider
          minRange={INITIAL_FILTER_VALUES.mcap.min}
          maxRange={INITIAL_FILTER_VALUES.mcap.max}
          values={values.mcap}
          setMinValue={(value: number) => handler('mcap', 'min', value)}
          setMaxValue={(value: number) => handler('mcap', 'max', value)}
        />
      </Dropdown>
      <Dropdown title={t('Extractable Liquidity Range')} values={extString}>
        <InputSlider
          minRange={INITIAL_FILTER_VALUES.extractable.min}
          maxRange={INITIAL_FILTER_VALUES.extractable.max}
          values={values.extractable}
          setMinValue={(value: number) => handler('extractable', 'min', value)}
          setMaxValue={(value: number) => handler('extractable', 'max', value)}
        />
      </Dropdown>
      <Flex sx={{ width: '100%', mt: '20px' }}>
        <Button
          variant="secondary"
          sx={{ display: 'flex', background: 'lvl1', width: '100%', maxWidth: '123px', mr: '20px' }}
          onClick={clearAction}
        >
          {t('Clear')}
          <Box sx={{ ml: '5px' }}>
            <Svg icon="trash" color="yellow" />
          </Box>
        </Button>
        <Button
          sx={{ width: '100%' }}
          disabled={
            !(
              values.totalScore.max > values.totalScore.min &&
              values.mcap.max >= INITIAL_FILTER_VALUES.mcap.min &&
              values.mcap.min <= INITIAL_FILTER_VALUES.mcap.max &&
              values.extractable.max >= INITIAL_FILTER_VALUES.extractable.min &&
              values.extractable.min <= INITIAL_FILTER_VALUES.extractable.max &&
              values.mcap.max > values.mcap.min
            )
          }
          onClick={searchAction}
        >
          {t('Search')}
        </Button>
      </Flex>
    </Modal>
  )
}

export default FilterModal
