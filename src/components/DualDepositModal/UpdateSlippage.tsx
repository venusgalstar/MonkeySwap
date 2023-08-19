import React, { useMemo } from 'react'
import { useTranslation } from 'contexts/Localization'
import { useUserZapSlippageTolerance } from '../../state/user/hooks'
import { Button, Flex, Text } from 'components/uikit'
import { Percent } from '@ape.swap/sdk-core'
import { warningSeverity } from 'utils/prices'

interface UpdateSlippageProps {
  priceImpact: number
  updateSlippage: () => void
}

const UpdateSlippage: React.FC<UpdateSlippageProps> = ({ priceImpact, updateSlippage }) => {
  const { t } = useTranslation()
  const [zapSlippage] = useUserZapSlippageTolerance()

  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined
    if (priceImpact < 100) return 'success'
    const severity = warningSeverity(new Percent(priceImpact))
    if (severity < 100) return 'text'
    if (severity < 300) return 'yellow'
    return 'error'
  }, [priceImpact])

  return (
    <Flex
      sx={{
        mt: ['15px', '15px', '15px', '0px'],
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Flex sx={{ width: '100%', flexDirection: 'column' }}>
        <Text sx={{ fontSize: '12px', lineHeight: '18px' }}>
          {t('This transaction requires a slippage tolerance of ')}
          <Text sx={{ fontSize: '12px', lineHeight: '18px' }} color={priceImpactColor}>
            {Math.round(priceImpact + 5) / 100}%
          </Text>
          {'. '}
          {t('After this transaction, slippage tolerance will be reset to ')}
          {zapSlippage.toFixed(2)}
          {'%.'}
        </Text>
        {priceImpact + 5 > 500 && (
          <Text color="error" sx={{ fontSize: '12px', lineHeight: '18px' }}>
            {t('Beware: your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Button onClick={updateSlippage} sx={{ minWidth: '100px', marginLeft: '5px' }}>
        {t('Update')}
      </Button>
    </Flex>
  )
}

export default React.memo(UpdateSlippage)
