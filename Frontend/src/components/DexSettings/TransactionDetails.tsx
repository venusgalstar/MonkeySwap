import React, { useState } from 'react'
import { Flex, Text } from '../uikit'
import Input from '../uikit/Input/Input'
import { DEFAULT_DEADLINE_FROM_NOW } from '../../config/constants/misc'
import { useUserSlippageTolerance, useUserTransactionTTL } from '../../state/user/hooks'
import { Percent } from '@ape.swap/sdk-core'

enum SlippageError {
  InvalidInput = 'InvalidInput',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const TransactionDetails = ({ isZap }: { isZap?: boolean }) => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const percentToString = typeof userSlippageTolerance !== 'string' ? userSlippageTolerance.toFixed(2) : ''
  const [slippageInput, setSlippageInput] = useState(percentToString)

  function parseSlippageInput(value: string) {
    setSlippageInput(value)
    if (value === '') return
    const replacedComma = value.replace(/,/g, ".")
    const parsed = Math.floor(Number.parseFloat(replacedComma) * 100)
    if (parsed === 0) {
      setUserSlippageTolerance(new Percent(50, 10_000))
    } else {
      setUserSlippageTolerance(new Percent(parsed, 10_000))
    }
  }

  return (
    <Flex sx={{ width: '100%', flexDirection: 'column' }}>
      <Flex sx={{ flexDirection: 'column', mb: '10px' }}>
        <Text size='18px' margin='10px 0px'>
          Slippage Tolerance
        </Text>
        <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Flex
            sx={{
              height: '35px',
              width: '55px',
              borderRadius: '10px',
              background:
                userSlippageTolerance !== 'auto' && userSlippageTolerance.toFixed(2) === '0.10' ? 'highLighted' : 'white3',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSlippageInput('')
              parseSlippageInput('0.1')
            }}
          >
            <Text> 0.1% </Text>
          </Flex>
          <Flex
            sx={{
              height: '35px',
              width: '55px',
              borderRadius: '10px',
              background:
                userSlippageTolerance !== 'auto' && userSlippageTolerance.toFixed(2) === '0.50' ? 'highLighted' : 'white3',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSlippageInput('')
              parseSlippageInput('0.5')
            }}
          >
            <Text> 0.5% </Text>
          </Flex>
          <Flex
            sx={{
              height: '35px',
              width: '55px',
              borderRadius: '10px',
              background:
                userSlippageTolerance !== 'auto' && userSlippageTolerance.toFixed(2) === '1.00' ? 'highLighted' : 'white3',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSlippageInput('')
              parseSlippageInput('1.0')
            }}
          >
            <Text> 1.0% </Text>
          </Flex>
          <Flex sx={{ width: '45%', position: 'relative' }}>
            <Input
              sx={{
                fontWeight: 700,
                width: '100%',
                height: '35px',
                background: 'white3',
                border: '0px',
                ':focus': { outline: 'none' },
              }}
              value={slippageInput}
              onChange={(e: any) => parseSlippageInput(e.target.value)}
            />
            <Flex
              sx={{ position: 'absolute', right: 5, justifyContent: 'center', alignItems: 'center', height: '100%' }}
            >
              <Text weight={700}>%</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TransactionDetails
