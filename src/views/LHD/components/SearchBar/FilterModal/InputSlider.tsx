import { Box } from 'theme-ui'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import NumericInput from 'components/uikit/Input/NumericInput'
import { Flex, Text } from 'components/uikit'
import { MinMax } from 'state/lhd/types'
import { formatDollar } from 'utils/formatNumbers'
import { debounce } from 'lodash'

const InputSlider = ({
  values,
  setMinValue,
  setMaxValue,
  minRange,
  maxRange,
}: {
  values: MinMax
  setMinValue: (value: number) => void
  setMaxValue: (value: number) => void
  minRange: number
  maxRange: number
}) => {
  const handleMinInputChange = (value: string) => {
    const numValue = value ? parseInt(value) : 0
    setMinValue(numValue)
  }

  const handleMaxInputChange = (value: string) => {
    const numValue = value ? parseInt(value) : 0
    setMaxValue(numValue)
  }

  const handleSliderChange = debounce((value: { min: number; max: number }) => {
    setMinValue(value.min)
    setMaxValue(value.max)
  }, 10)

  return (
    <Box
      sx={{
        width: '100%',
        pb: '10px',
      }}
    >
      <Box sx={{ mt: '25px', p: '0 40px' }}>
        <InputRange
          minValue={minRange}
          maxValue={maxRange}
          value={{ min: values.min, max: values.max }}
          formatLabel={(value) => formatDollar({ num: value })}
          //@ts-ignore
          onChange={(value: { min: number; max: number }) => handleSliderChange(value)}
        />
      </Box>
      <Box sx={{ display: 'flex', padding: '5px 10px', justifyContent: 'space-between' }}>
        <Flex sx={{ width: '48%', flexDirection: 'column' }}>
          <Text sx={{ fontWeight: 500, fontSize: '12px', padding: '0 5px' }}>Min</Text>
          <NumericInput
            value={values.min.toString()}
            onUserInput={handleMinInputChange}
            style={{ width: '100%', fontSize: '12px', fontWeight: 400, p: '10px', background: 'lvl2' }}
          />
        </Flex>
        <Flex sx={{ width: '48%', flexDirection: 'column' }}>
          <Text sx={{ fontWeight: 500, fontSize: '12px', padding: '0 5px' }}>Max</Text>
          <NumericInput
            value={values.max.toString()}
            onUserInput={handleMaxInputChange}
            style={{ width: '100%', fontSize: '12px', fontWeight: 400, p: '10px', background: 'lvl2' }}
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default InputSlider
