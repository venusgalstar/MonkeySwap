import { Flex, NumericInput, Text } from 'components/uikit'
import { useCallback, useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import { Box } from 'theme-ui'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0;
  }

  70% {
    box-shadow: 0 0 0 2px;
  }

  100% {
    box-shadow: 0 0 0 0;
  }
`

const RangeSelector = ({
  value,
  rangeType,
  disabled,
  tokenASymbol,
  tokenBSymbol,
  locked,
  onRangeInput,
  onDecrementRange,
  onIncrementRange,
}: {
  value: string
  rangeType: 'Min Price' | 'Max Price'
  disabled?: boolean
  tokenASymbol?: string
  tokenBSymbol?: string
  locked?: boolean
  onRangeInput: (input: string) => void
  onDecrementRange: () => string
  onIncrementRange: () => string
}) => {
  const [localValue, setLocalValue] = useState('')
  const [useLocalValue, setUseLocalValue] = useState(false)
  const [active, setActive] = useState(false)
  const [pulsing, setPulsing] = useState<boolean>(false)

  const handleOnFocus = () => {
    setUseLocalValue(true)
    setActive(true)
  }

  const handleOnBlur = useCallback(() => {
    setUseLocalValue(false)
    setActive(false)
    onRangeInput(localValue) // trigger update on parent value
  }, [localValue, onRangeInput])

  // for button clicks
  const handleDecrement = useCallback(() => {
    setUseLocalValue(false)
    onRangeInput(onDecrementRange())
  }, [onDecrementRange, onRangeInput])

  const handleIncrement = useCallback(() => {
    setUseLocalValue(false)
    onRangeInput(onIncrementRange())
  }, [onIncrementRange, onRangeInput])

  useEffect(() => {
    if (localValue !== value && !useLocalValue) {
      setTimeout(() => {
        setLocalValue(value) // reset local value to match parent
        setPulsing(true) // trigger animation
        setTimeout(function () {
          setPulsing(false)
        }, 1800)
      }, 0)
    }
  }, [localValue, useLocalValue, value])
  return (
    <Box
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      sx={{
        position: 'relative',
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        height: '87.2px',
        width: '280px',
        background: 'white3',
        borderRadius: '10px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5px 7.5px',
        boxShadow: active && '0px 0px 0px 1.5px',
        animation: pulsing && `${pulse} 0.8s linear`,
        color: 'yellow',
      }}
    >
      {locked && (
        <Flex
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'white3',
            opacity: 0.7,
            top: 0,
            left: 0,
            borderRadius: '10px',
            zIndex: 10,
          }}
        />
      )}
      <Text sx={{ fontSize: ['3.5vw', '3.5vw', '16px'] }}>{rangeType}</Text>
      <Flex sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Flex
          sx={{
            minHeight: ['6vw', '6vw', '25px'],
            minWidth: ['6vw', '6vw', '25px'],
            height: ['6vw', '6vw', '25px'],
            width: ['6vw', '6vw', '25px'],
            background: disabled ? 'grey' : 'yellow',
            borderRadius: '4px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleDecrement}
        >
          <Text color="primaryBright" sx={{ fontSize: ['4vw', '4vw', '25px'] }}>
            -
          </Text>
        </Flex>
        <NumericInput
          onUserInput={(input) => setLocalValue(input)}
          value={localValue}
          style={{ textAlign: 'center', color: 'text', fontSize: ['4.25vw', '4.5vw', '22px'] }}
        />
        <Flex
          sx={{
            minHeight: ['6vw', '6vw', '25px'],
            minWidth: ['6vw', '6vw', '25px'],
            height: ['6vw', '6vw', '25px'],
            width: ['6vw', '6vw', '25px'],
            background: disabled ? 'grey' : 'yellow',
            borderRadius: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleIncrement}
        >
          <Text color="primaryBright" sx={{ fontSize: ['4vw', '4vw', '20px'] }}>
            +
          </Text>
        </Flex>
      </Flex>
      <Text weight={300} sx={{ fontSize: ['2.7vw', '2.7vw', '12px'] }}>
        {tokenBSymbol} per {tokenASymbol}
      </Text>
    </Box>
  )
}

export default RangeSelector
