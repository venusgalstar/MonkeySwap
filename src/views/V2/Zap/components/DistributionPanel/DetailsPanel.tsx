import React, { ReactNode, useMemo } from 'react'
import { ONE_BIPS } from 'config/constants/misc'
import { Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { warningSeverity } from 'utils/prices'
import { formatPriceImpact } from 'views/Swap/utils'
import { MergedZap } from 'state/zap/actions'

interface DetailsPanelProps {
  zap: MergedZap
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ zap }) => {
  const { t } = useTranslation()
  const { pairOut, currencyOut1, currencyOut2, liquidityProviderFee, currencyIn, totalPriceImpact } = zap

  const priceImpactColor = useMemo(() => {
    if (!totalPriceImpact) return undefined
    if (totalPriceImpact.lessThan('0')) return 'success'
    const severity = warningSeverity(totalPriceImpact)
    if (severity < 1) return 'text'
    if (severity < 3) return 'yellow'
    return 'error'
  }, [totalPriceImpact])

  return (
    <Flex sx={{ flexDirection: 'column', marginTop: '15px' }}>
      <Row>
        <StyledText>{t('Price Impact')}</StyledText>
        <Text size="14px" color={priceImpactColor}>
          {totalPriceImpact ? formatPriceImpact(totalPriceImpact) : '-'}
        </Text>
      </Row>
      <Row>
        <StyledText>{t('Liquidity Provider Fee')}</StyledText>
        <StyledText>
          {liquidityProviderFee?.toSignificant(3)} {currencyIn?.currency?.symbol}
        </StyledText>
      </Row>
      <Row>
        <StyledText>{t('Share of Pool')}</StyledText>
        <StyledText>
          {(pairOut?.poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : pairOut?.poolTokenPercentage?.toFixed(2)) ??
            '0'}
          %
        </StyledText>
      </Row>
      <Row>
        <StyledText>{`${currencyOut1?.outputCurrency?.symbol} per ${currencyOut2?.outputCurrency?.symbol}`}</StyledText>
        <StyledText>
          {currencyOut1?.outputAmount?.asFraction.divide(currencyOut2?.outputAmount || '')?.toSignificant(5)}
        </StyledText>
      </Row>
      <Row>
        <StyledText>{`${currencyOut2?.outputCurrency?.symbol} per ${currencyOut1?.outputCurrency?.symbol}`}</StyledText>
        <StyledText>
          {currencyOut2?.outputAmount?.asFraction.divide(currencyOut1?.outputAmount || '')?.toSignificant(5)}
        </StyledText>
      </Row>
    </Flex>
  )
}

export default DetailsPanel

const Row = ({ children }: { children: ReactNode }) => {
  return <Flex sx={{ justifyContent: 'space-between' }}>{children}</Flex>
}

const StyledText = ({ children }: { children: ReactNode }) => {
  return <Text sx={{ fontSize: '12px', lineHeight: '18px' }}>{children}</Text>
}
