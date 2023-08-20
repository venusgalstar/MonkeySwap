import { Box } from 'theme-ui'
import 'react-input-range/lib/css/index.css'
import { Button, Flex, Svg } from 'components/uikit'
import { Filters } from 'state/lhd/types'
import { TAGS } from '../../../utils/config'
import { CHAIN_DETAILS } from '../../../utils/config'
import { styles } from '../styles'
import { icons } from '../../SmallChainIcons'

const mappedData = (type: string) => {
  if (type === 'tags') {
    return TAGS.sort((a, b) => a.label.localeCompare(b.label))
  } else {
    return CHAIN_DETAILS.map((item) => ({
      label: item.chainName,
      value: item.chainId,
    })).sort((a, b) => a.label.localeCompare(b.label))
  }
}

const ButtonSelector = ({
  values,
  handler,
  type,
}: {
  values: Required<Filters>
  handler: (type: 'tags' | 'chains', value: string[]) => void
  type: 'tags' | 'chains'
}) => {
  const handleButtonClick = (type: 'tags' | 'chains', item: any) => {
    if (values[type].includes(item.value)) {
      let tempArray = values[type].filter((value) => value !== item.value)
      handler(type, tempArray)
    } else {
      handler(type, [...values[type], item.value])
    }
  }

  const filterApplied = (type: 'tags' | 'chains', item: any): boolean => {
    return values[type].includes(item.value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {mappedData(type).map((item, index) => (
        <Flex key={`tag${index}`} sx={{ flexDirection: 'row', mb: '10px', p: '0 5px' }}>
          <Button
            size="sm"
            variant={filterApplied(type, item) ? 'primary' : 'tertiary'}
            sx={filterApplied(type, item) ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => handleButtonClick(type, item)}
            startIcon={type === 'chains' ? <Flex sx={{ mr: '5px' }}>{icons[item.value]}</Flex> : null}
          >
            {item.label}
          </Button>
        </Flex>
      ))}
    </Box>
  )
}

export default ButtonSelector
