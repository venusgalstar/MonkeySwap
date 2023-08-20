import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { apyModalRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { useCurrency } from 'hooks/Tokens'
import { Box, Flex, Heading } from 'theme-ui'
import useIsMobile from 'hooks/useIsMobile'
import { useTranslation } from 'contexts/Localization'
import CurrencyInputPanel from './CurrencyInput'
import DetailsContent from './DetailsContent'
import styles from './styles'
import ServiceTokenDisplay from '../ServiceTokenDisplay'
import { useWeb3React } from '@web3-react/core'
import useAllTokenPrices from 'hooks/useAllTokenPrices'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { Button, Modal, Tab, Tabs, Text } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'

interface RoiCalculatorModalProps {
  onDismiss?: () => void
  label?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apr?: number
  lpApr?: number
  apy?: number
  lpAddress?: string
  tokenAddress?: string
  quoteTokenAddress?: string
  isLp?: boolean
  liquidityUrl?: string
  lpPrice?: number
  lpCurr1?: string
  lpCurr2?: string
}

const amountButtons = ['100', '1000']
const intervals = [1, 7, 30, 365]
const compoundIntervals = [1, 7, 14, 30]

const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = (props) => {
  const { onDismiss, label, rewardTokenName, rewardTokenPrice, apr, lpApr, lpAddress, tokenAddress, isLp, lpPrice } =
    props
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [compoundFrequency, setCompoundFrequency] = useState(1)
  const [amountDollars, setAmountDollars] = useState('')
  const [inputValue, setInputValue] = useState('0')
  const { account, chainId } = useWeb3React()
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const tokenPrices = useAllTokenPrices()
  const [keySuffix, setKeySuffix] = useState(0)

  useEffect(() => {
    if (compoundFrequency > numberOfDays) {
      setCompoundFrequency(intervals?.[0])
    }
  }, [compoundFrequency, numberOfDays])

  const tokenPrice = new BigNumber(rewardTokenPrice ?? 0).toNumber()
  const tokensWorthForDollarSelected = parseFloat(amountDollars || inputValue) / tokenPrice

  const onIntervalClick = (type: 'staked' | 'compound') => (index: number) => {
    if (type === 'staked') {
      setNumberOfDays(intervals[index])
    } else {
      setCompoundFrequency(compoundIntervals[index])
    }
  }

  const currency = useCurrency(isLp ? lpAddress : tokenAddress)

  const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays,
    farmApr: (apr ?? 0) + (lpApr || 0),
    tokenPrice,
    roundingDecimals: 8,
    // Get the fraction of 1 day
    compoundFrequency: 1 / compoundFrequency,
    amountDollar: parseFloat(amountDollars || inputValue),
  })

  const percentageCompound = apyModalRoi({
    amountEarned: compoundROIRates,
    amountInvested: tokensWorthForDollarSelected,
  })

  const compoundROIRatesValue = Number.isNaN(compoundROIRates) ? 0 : compoundROIRates
  const percentageCompoundValue = Number.isNaN(parseFloat(percentageCompound)) ? 0 : percentageCompound

  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const maxAmount = maxAmountSpend(selectedCurrencyBalance)?.toFixed(6) || '0'

  const rewardPrice = useMemo(() => {
    if (!isLp) {
      const rewardToken = tokenPrices?.find(
        (tok) => tok.address[chainId as SupportedChainId]?.toLowerCase() === tokenAddress?.toLowerCase(),
      )
      return rewardToken?.price
    }
    if (isLp && !lpPrice) {
      const rewardToken = tokenPrices?.find(
        (tok) => tok.address?.[chainId as SupportedChainId]?.toLowerCase() === lpAddress?.toLowerCase(),
      )
      return rewardToken?.price
    }
    return lpPrice
  }, [chainId, isLp, lpAddress, lpPrice, tokenAddress, tokenPrices])

  const onTokenAmountChange = useCallback(
    (value: string) => {
      setInputValue(value)
      const fiatValue = parseFloat(!!currency && value ? ((rewardPrice ?? 0) * parseFloat(value))?.toFixed(2) : '0')
      setAmountDollars(Number.isFinite(fiatValue) ? fiatValue.toString() : '0')
    },
    [currency, rewardPrice],
  )

  const onDollarAmountChange = useCallback(
    (value: string) => {
      setAmountDollars(value)
      const expectedValue = parseFloat(!!currency && value ? (parseFloat(value) / (rewardPrice ?? 0))?.toFixed(6) : '0')
      setInputValue(Number.isFinite(expectedValue) ? expectedValue.toString() : '0')
    },
    [currency, rewardPrice],
  )

  return (
    <Modal onDismiss={onDismiss} title={t('Return Calculator')} onAnimationComplete={() => setKeySuffix(keySuffix + 1)}>
      <Box>
        <Heading as="h3" style={styles.title}>
          {label} {isLp && t('LP')}
        </Heading>
        <CurrencyInputPanel
          dollarValue={amountDollars?.toString()}
          tokenValue={inputValue}
          onUserInput={onTokenAmountChange}
          onMax={() => onTokenAmountChange(maxAmount)}
        />
        <Flex sx={styles.buttonsContainer}>
          <Flex sx={{ columnGap: ['8px', '8px', '17px'] }}>
            {amountButtons.map((amount) => (
              <Button
                key={`${amount}`}
                size="sm"
                onClick={() => onDollarAmountChange(amount)}
                style={{ lineHeight: '0.7', minWidth: '72px' }}
              >
                ${amount}
              </Button>
            ))}
          </Flex>
          <Text style={styles.balance}>
            {t('Balance')}: {maxAmount || 0}
          </Text>
        </Flex>
        <Heading as="h3" style={styles.title}>
          {t('STAKING PERIOD')}
        </Heading>
        <Box sx={styles.tabContainer}>
          <Tabs activeTab={intervals.indexOf(numberOfDays)} variant="fullWidth">
            {intervals.map((interval, index) => (
              <Tab
                key={`${interval}${keySuffix}D`}
                index={index}
                label={`${interval}D`}
                onClick={onIntervalClick('staked')}
                size="sm"
                variant="fullWidth"
                style={{ borderRadius: '0px', padding: '4px' }}
              />
            ))}
          </Tabs>
        </Box>
        <Heading as="h3" style={styles.title}>
          {t('COMPOUNDING FREQUENCY')}
        </Heading>
        <Box sx={styles.tabContainer}>
          <Tabs activeTab={compoundIntervals.indexOf(compoundFrequency)} variant="fullWidth">
            {compoundIntervals.map((interval, index) => (
              <Tab
                key={`${interval}${keySuffix}D`}
                index={index}
                label={`${interval}${t('D')}`}
                onClick={onIntervalClick('compound')}
                size="sm"
                variant="fullWidth"
                disabled={interval > numberOfDays}
                style={{ borderRadius: '0px', padding: '4px' }}
              />
            ))}
          </Tabs>
        </Box>
        <Heading as="h3" style={styles.title}>
          {t('RETURN AT CURRENT RATES')}
        </Heading>
        <Flex sx={styles.roiContainer}>
          <ServiceTokenDisplay token1={rewardTokenName} size={46} />
          <Box>
            <Text sx={{ fontSize: '18px' }} as="p" weight="bold" variant="lg">
              ${(compoundROIRatesValue * tokenPrice).toFixed(2)}
            </Text>
            <Box sx={styles.roiBanana}>
              <Text variant="sm">
                ~{compoundROIRatesValue.toFixed(2)} {rewardTokenName}
              </Text>
              <Text variant="sm">({percentageCompoundValue}%)</Text>
            </Box>
          </Box>
        </Flex>
        <DetailsContent {...props} />
      </Box>
    </Modal>
  )
}

export default React.memo(RoiCalculatorModal)
