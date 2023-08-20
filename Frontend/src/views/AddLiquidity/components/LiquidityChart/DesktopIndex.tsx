import { Currency, Price, Token } from '@ape.swap/sdk-core'
import { format } from 'd3'
import { FeeAmount } from '@ape.swap/v3-sdk'
import { Flex, Text } from 'components/uikit'
import { saturate } from 'polished'
import { Bound } from 'state/mint/v3/actions'
import Chart from './Chart'
import { ZoomLevels } from './types'
import { useDensityChartData } from './hooks'
import { useCallback, useMemo } from 'react'
import { batch } from 'react-redux'
import { Spinner, useThemeUI } from 'theme-ui'
import { CHART_DESKTOP_HEIGHT } from '.'

const ZOOM_LEVELS: Record<FeeAmount, ZoomLevels> = {
  [FeeAmount.LOWEST]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.LOW]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.MEDIUM]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20,
  },
  [FeeAmount.HIGH]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20,
  },
}

const DesktopIndex = ({
  currencyA,
  currencyB,
  ticksAtLimit,
  price,
  interactive,
  id,
  feeAmount,
  priceLower,
  priceUpper,
  locked,
  onLeftRangeInput,
  onRightRangeInput,
}: {
  currencyA: Currency | undefined
  currencyB: Currency | undefined
  ticksAtLimit: { [bound in Bound]?: boolean | undefined }
  price: number | undefined
  interactive: boolean
  id?: string
  feeAmount?: FeeAmount
  priceLower?: Price<Token, Token>
  priceUpper?: Price<Token, Token>
  locked?: boolean
  onLeftRangeInput: (typedValue: string) => void
  onRightRangeInput: (typedValue: string) => void
}) => {
  const { isLoading, error, formattedData } = useDensityChartData({
    currencyA,
    currencyB,
    feeAmount,
  })

  const isSorted = currencyA && currencyB && currencyA?.wrapped.sortsBefore(currencyB?.wrapped)

  const { theme } = useThemeUI()

  const isUninitialized = !currencyA || !currencyB || (formattedData === undefined && !isLoading)

  const onBrushDomainChangeEnded = useCallback(
    (domain: [number, number], mode: string | undefined) => {
      let leftRangeValue = Number(domain[0])
      const rightRangeValue = Number(domain[1])

      if (leftRangeValue <= 0) {
        leftRangeValue = 1 / 10 ** 6
      }

      batch(() => {
        // simulate user input for auto-formatting and other validations
        if (
          (!ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER] || mode === 'handle' || mode === 'reset') &&
          leftRangeValue > 0
        ) {
          onLeftRangeInput(leftRangeValue.toFixed(6))
        }

        if ((!ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER] || mode === 'reset') && rightRangeValue > 0) {
          // todo: remove this check. Upper bound for large numbers
          // sometimes fails to parse to tick.
          if (rightRangeValue < 1e35) {
            onRightRangeInput(rightRangeValue.toFixed(6))
          }
        }
      })
    },
    [isSorted, onLeftRangeInput, onRightRangeInput, ticksAtLimit],
  )

  interactive = interactive && Boolean(formattedData?.length)

  const brushLabelValue = useCallback(
    (d: 'w' | 'e', x: number) => {
      if (!price) return ''

      if (d === 'w' && ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]) return '0'
      if (d === 'e' && ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]) return '∞'

      const percent = (x < price ? -1 : 1) * ((Math.max(x, price) - Math.min(x, price)) / price) * 100

      return price ? `${format(Math.abs(percent) > 1 ? '.2~s' : '.2~f')(percent)}%` : ''
    },
    [isSorted, price, ticksAtLimit],
  )

  const brushDomain: [number, number] | undefined = useMemo(() => {
    const leftPrice = isSorted ? priceLower : priceUpper?.invert()
    const rightPrice = isSorted ? priceUpper : priceLower?.invert()

    return leftPrice && rightPrice
      ? [parseFloat(leftPrice?.toSignificant(6)), parseFloat(rightPrice?.toSignificant(6))]
      : undefined
  }, [isSorted, priceLower, priceUpper])

  return (
    <Flex sx={{ width: '100%' }}>
      {!formattedData || formattedData.length === 0 || !price || isUninitialized || isLoading || error ? (
        <Flex sx={{ flexDirection: 'column', width: '100%', mb: '10px' }}>
          <Flex sx={{ height: '30px' }}>
            <Text sx={{ lineHeight: '20px', opacity: locked && 0.4 }}>Select Range</Text>
          </Flex>
          <Flex
            sx={{
              position: 'relative',
              height: CHART_DESKTOP_HEIGHT,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              background: 'white3',
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
            {isLoading ? (
              <Flex>
                <Spinner size={80} />
              </Flex>
            ) : isUninitialized ? (
              <Text>Your position will appear here.</Text>
            ) : !formattedData || formattedData.length === 0 || !price ? (
              <Text>Liquidity data not available.</Text>
            ) : (
              <Text>There is no liquidity data.</Text>
            )}
          </Flex>
        </Flex>
      ) : (
        <Flex sx={{ width: '100%' }}>
          <Chart
            id={id}
            data={{ series: formattedData, current: price }}
            dimensions={{ width: 700, height: 170 }}
            margins={{ top: 10, right: 2, bottom: 20, left: 0 }}
            styles={{
              area: {
                selection: 'yellow',
              },
              brush: {
                handle: {
                  west: saturate(1, theme.rawColors?.yellow?.toString() || 'gold') ?? 'error',
                  east: saturate(0.1, theme.rawColors?.yellow?.toString() || 'gold') ?? 'error',
                },
              },
            }}
            interactive={interactive}
            brushLabels={brushLabelValue}
            brushDomain={brushDomain}
            onBrushDomainChange={onBrushDomainChangeEnded}
            zoomLevels={ZOOM_LEVELS[feeAmount ?? FeeAmount.MEDIUM]}
            ticksAtLimit={ticksAtLimit}
            feeAmount={feeAmount}
            currencyA={currencyA}
            currencyB={currencyB}
          />
        </Flex>
      )}
    </Flex>
  )
}

export default DesktopIndex
