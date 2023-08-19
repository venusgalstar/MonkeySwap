import { Box } from 'theme-ui'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import NumericInput from 'components/uikit/Input/NumericInput'
import { Flex, Text } from 'components/uikit'
import { debounce } from 'lodash'
import { useTranslation } from 'contexts/Localization'
import { Filters } from 'state/lhd/types'

const ScoreSlider = ({
  values,
  handler,
}: {
  values: Required<Filters>
  handler: (type: 'totalScore' | 'health' | 'ownership' | 'concentration', obj: 'min' | 'max', value: number) => void
}) => {
  const { t } = useTranslation()
  const handleMinInputChange = (type: 'totalScore' | 'health' | 'ownership' | 'concentration', value: string) => {
    const numValue = value ? parseInt(value) : 0
    if (numValue <= values[type].max && numValue >= 0) {
      handler(type, 'min', numValue)
    }
  }

  const handleMaxInputChange = (type: 'totalScore' | 'health' | 'ownership' | 'concentration', value: string) => {
    const numValue = value ? parseInt(value) : 0
    if (numValue <= 100) {
      handler(type, 'max', numValue)
    }
  }

  const handleScoreChange = debounce((value: { min: number; max: number }) => {
    handleMinInputChange('totalScore', value.min.toString())
    handleMaxInputChange('totalScore', value.max.toString())
  }, 10)

  const handleHealthChange = debounce((value: { min: number; max: number }) => {
    handleMinInputChange('health', value.min.toString())
    handleMaxInputChange('health', value.max.toString())
  }, 10)

  const handleConcenChange = debounce((value: { min: number; max: number }) => {
    handleMinInputChange('concentration', value.min.toString())
    handleMaxInputChange('concentration', value.max.toString())
  }, 10)

  const handleOwnerChange = debounce((value: { min: number; max: number }) => {
    handleMinInputChange('ownership', value.min.toString())
    handleMaxInputChange('ownership', value.max.toString())
  }, 10)

  return (
    <Box
      sx={{
        width: '100%',
        pb: '10px',
      }}
    >
      <Box sx={{ display: 'flex', padding: '0px 10px 10px 10px', justifyContent: 'space-between' }}>
        <Flex sx={{ width: '48%', flexDirection: 'column' }}>
          <Text sx={{ fontWeight: 500, fontSize: '12px', padding: '0 5px' }}>Min</Text>
          <NumericInput
            value={values.totalScore.min.toString()}
            onUserInput={(value) => handleMinInputChange('totalScore', value)}
            style={{ width: '100%', fontSize: '12px', fontWeight: 400, p: '10px', background: 'lvl2' }}
          />
        </Flex>
        <Flex sx={{ width: '48%', flexDirection: 'column' }}>
          <Text sx={{ fontWeight: 500, fontSize: '12px', padding: '0 5px' }}>Max</Text>
          <NumericInput
            value={values.totalScore.max.toString()}
            onUserInput={(value) => handleMaxInputChange('totalScore', value)}
            style={{ width: '100%', fontSize: '12px', fontWeight: 400, p: '10px', background: 'lvl2' }}
          />
        </Flex>
      </Box>
      <Flex sx={{ flexDirection: 'column', mt: '55px', p: '0 28px', position: 'relative' }}>
        <Text sx={{ fontWeight: 500, fontSize: '12px', position: 'absolute', top: '-50px', left: '15px' }}>
          {t('Score')}
        </Text>
        <InputRange
          minValue={0}
          maxValue={100}
          value={values.totalScore}
          //@ts-ignore
          onChange={(value: { min: number; max: number }) => handleScoreChange(value)}
        />
      </Flex>
      <Flex sx={{ flexDirection: 'column', mt: '55px', p: '0 28px', position: 'relative' }}>
        <Text sx={{ fontWeight: 500, fontSize: '12px', position: 'absolute', top: '-50px', left: '15px' }}>
          {t('Strength')}
        </Text>
        <InputRange
          minValue={0}
          maxValue={100}
          value={values.health}
          //@ts-ignore
          onChange={(value: { min: number; max: number }) => handleHealthChange(value)}
        />
      </Flex>
      <Flex sx={{ flexDirection: 'column', mt: '55px', p: '0 28px', position: 'relative' }}>
        <Text sx={{ fontWeight: 500, fontSize: '12px', position: 'absolute', top: '-50px', left: '15px' }}>
          {t('Ownership')}
        </Text>
        <InputRange
          minValue={0}
          maxValue={100}
          value={values.ownership}
          //@ts-ignore
          onChange={(value: { min: number; max: number }) => handleOwnerChange(value)}
        />
      </Flex>
      <Flex sx={{ flexDirection: 'column', mt: '55px', p: '0 28px', position: 'relative' }}>
        <Text sx={{ fontWeight: 500, fontSize: '12px', position: 'absolute', top: '-50px', left: '15px' }}>
          {t('Concentration')}
        </Text>
        <InputRange
          minValue={0}
          maxValue={100}
          value={values.concentration}
          //@ts-ignore
          onChange={(value: { min: number; max: number }) => handleConcenChange(value)}
        />
      </Flex>
    </Box>
  )
}

export default ScoreSlider
