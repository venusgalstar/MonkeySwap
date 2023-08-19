import { FeeAmount } from '@ape.swap/v3-sdk'
import { Button, Flex, Svg, Text } from 'components/uikit'
import { PoolState, usePools } from 'hooks/usePools'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FEE_AMOUNT_DETAIL } from './constants'
import { useFeeTierDistribution } from 'hooks/useFeeTierDistribution'
import { Currency } from '@ape.swap/sdk-core'
import { DESKTOP_DISPLAY } from '../styles'

const FeeSelector = ({
  feeAmount,
  currencyA,
  currencyB,
  locked,
  onHandleFeeSelect,
}: {
  feeAmount: FeeAmount | undefined
  currencyA: Currency | undefined
  currencyB: Currency | undefined
  locked?: boolean
  onHandleFeeSelect: (fee: FeeAmount) => void
}) => {
  const [hide, setHide] = useState(true)

  const pools = usePools([
    [currencyA, currencyB, FeeAmount.LOWEST],
    [currencyA, currencyB, FeeAmount.LOW],
    [currencyA, currencyB, FeeAmount.MEDIUM],
    [currencyA, currencyB, FeeAmount.HIGH],
  ])

  // TODO: Add some sort of loading animation and handle error

  const { isLoading, isError, largestUsageFeeTier, distributions } = useFeeTierDistribution(currencyA, currencyB)

  useEffect(() => {
    if (feeAmount || isLoading || isError) {
      return
    }
    if (!largestUsageFeeTier) {
      setHide(false)
    } else {
      setHide(true)
      onHandleFeeSelect(largestUsageFeeTier)
    }
  }, [feeAmount, isLoading, isError, largestUsageFeeTier, onHandleFeeSelect])

  const poolsByFeeTier: Record<FeeAmount, PoolState> = useMemo(
    () =>
      pools.reduce(
        (acc, [curPoolState, curPool]) => {
          acc = {
            ...acc,
            ...{ [curPool?.fee as FeeAmount]: curPoolState },
          }
          return acc
        },
        {
          // default all states to NOT_EXISTS
          [FeeAmount.LOWEST]: PoolState.NOT_EXISTS,
          [FeeAmount.LOW]: PoolState.NOT_EXISTS,
          [FeeAmount.MEDIUM]: PoolState.NOT_EXISTS,
          [FeeAmount.HIGH]: PoolState.NOT_EXISTS,
        },
      ),
    [pools],
  )

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex
        sx={{
          position: 'relative',
          height: '55px',
          borderRadius: '10px',
          background: 'white3',
          width: '100%',
          padding: '10px 20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '15px',
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
            }}
          />
        )}

        <Flex sx={{ flexDirection: 'column' }}>
          <Text size="18px" weight={700}>
            {feeAmount && FEE_AMOUNT_DETAIL[feeAmount].label}% fee tier
          </Text>
          <Text size="10px" weight={500} sx={{ lineHeight: '15px' }}>
            {feeAmount &&
              (!distributions ||
              poolsByFeeTier[feeAmount] === PoolState.NOT_EXISTS ||
              poolsByFeeTier[feeAmount] === PoolState.INVALID
                ? 'Not created'
                : `${distributions && distributions[feeAmount]?.toFixed(0)}% Selected `)}
          </Text>
        </Flex>
        <Button size="sm" onClick={() => setHide((prev) => !prev)} sx={{ padding: '2px 10px', height: '30px' }}>
          <Text color="primaryBright" sx={{ lineHeight: '20px' }}>
            {hide ? 'Edit' : 'Hide'}
          </Text>
        </Button>
      </Flex>
      <AnimatePresence>
        {!hide && (
          <motion.div
            initial={{ opacity: 0, height: '0px', marginBottom: '0px' }}
            animate={{
              height: 'fit-content',
              marginBottom: '20px',
              opacity: 1,
              transitionEnd: {
                overflow: 'visible',
              },
            }}
            transition={{ opacity: { duration: 0.2 }, height: { duration: 0.3 } }}
            exit={{ opacity: 0, height: '0px', marginBottom: '0px' }}
            sx={{
              display: 'flex',
              flexDirection: ['column', 'column', 'column', 'column', 'column', 'row'],
              justifyContent: 'space-between',
              width: '100%',
              overflow: 'hidden',
              padding: '2px 0px',
            }}
          >
            {[FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map((curFeeAmount) => {
              return (
                <Flex
                  key={curFeeAmount}
                  sx={{
                    position: 'relative',
                    flexDirection: ['row', 'row', 'row', 'row', 'row', 'column'],
                    width: ['100%', '100%', '100%', '100%', '100%', '130px'],
                    maxWidth: '100%',
                    height: ['30px', '30px', '30px', '30px', '30px', '87px'],
                    maxHeight: '100%',
                    background: 'white3',
                    boxShadow: feeAmount === curFeeAmount && '0px 0px 1px 1px',
                    color: 'yellow',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: ['5px', '5px', '5px', '5px', '5px', '10px'],
                    margin: ['5px 0px', '5px 0px', '5px 0px', '5px 0px', '5px 0px', '0px'],
                    padding: ['0px 10px', '0px 10px', '0px 10px', '0px 10px', '0px 10px', '7.5px 5px'],
                    cursor: 'pointer',
                  }}
                  onClick={() => onHandleFeeSelect(curFeeAmount)}
                >
                  {feeAmount === curFeeAmount && (
                    <Flex sx={{ position: 'absolute', top: '5px', right: '5px', display: DESKTOP_DISPLAY }}>
                      <Svg icon="success" color="yellow" width="15px" />
                    </Flex>
                  )}
                  <Text
                    color="text"
                    size="18px"
                    weight={700}
                    sx={{
                      width: ['60px', '60px', '60px', '60px', '60px', '100%'],
                      textAlign: ['start', 'start', 'start', 'start', 'start', 'center'],
                    }}
                  >
                    {FEE_AMOUNT_DETAIL[curFeeAmount].label}%
                  </Text>
                  <Flex
                    sx={{
                      justifyContent: ['flex-start', 'flex-start', 'flex-start', 'flex-start', 'flex-start', 'center'],
                      width: ['130px', '130px', '130px', '130px', '130px', '100%'],
                    }}
                  >
                    <Text
                      color="text"
                      size="10px"
                      weight={400}
                      sx={{ lineHeight: '12px', mt: '3px', textAlign: 'center' }}
                    >
                      {FEE_AMOUNT_DETAIL[curFeeAmount].description}
                    </Text>
                  </Flex>
                  <Text color="text" size="10px" weight={700}>
                    {!distributions ||
                    poolsByFeeTier[curFeeAmount] === PoolState.NOT_EXISTS ||
                    poolsByFeeTier[curFeeAmount] === PoolState.INVALID
                      ? 'Not Created'
                      : distributions
                      ? `${distributions[curFeeAmount]?.toFixed(0)}% select`
                      : 'Not Created'}
                  </Text>
                </Flex>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default FeeSelector
