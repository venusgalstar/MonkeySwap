import { Currency, CurrencyAmount, Percent } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { ConfirmationPendingContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import { Button, Flex, Modal, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import RangeTag from 'views/Positions/components/RangeTag'
import styles from 'views/Positions/components/styles'

const RemoveLiquidityConfirmation = ({
  feeValue0,
  feeValue1,
  liquidityValue0,
  liquidityValue1,
  feeAmount,
  inRange,
  attemptingTxn,
  txHash,
  burn,
  onDismiss,
}: //   handleParentDismiss,
{
  feeValue0: CurrencyAmount<Currency> | undefined
  feeValue1: CurrencyAmount<Currency> | undefined
  liquidityValue0: CurrencyAmount<Currency> | undefined
  liquidityValue1: CurrencyAmount<Currency> | undefined
  feeAmount: number | undefined
  inRange: boolean
  attemptingTxn: boolean
  txHash: string
  burn: () => void
  onDismiss: () => void
  //   handleParentDismiss: () => void
}) => {
  const { t } = useTranslation()
  const pendingText = `${t('Removing')} ${liquidityValue0?.toSignificant(4) ?? ''} ${
    feeValue0?.currency.symbol ?? ''
  } and ${liquidityValue1?.toSignificant(4) ?? ''} ${feeValue1?.currency.symbol ?? ''}`
  return (
    <Modal title="Remove Liquidity">
      <Flex sx={{ maxWidth: '100%', width: '420px', flexDirection: 'column' }}>
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : txHash ? (
          <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} />
        ) : (
          <>
            <Flex
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                mt: '10px',
              }}
            >
              <Flex sx={{ alignItems: 'center' }}>
                <DoubleCurrencyLogo currency0={feeValue0?.currency} currency1={feeValue1?.currency} />
                <Text weight={600}>
                  &nbsp;{feeValue0?.currency.symbol}&nbsp;/&nbsp;{feeValue1?.currency.symbol}
                </Text>
                <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
                  <Text size="10px" sx={{ lineHeight: '9px' }}>
                    {new Percent(feeAmount || 0, 1_000_000).toSignificant()}%
                  </Text>
                </Flex>
              </Flex>
              <RangeTag removed={false} inRange={inRange} />
            </Flex>
            <Flex sx={{ ...styles.subContainer, background: 'white3', mt: '10px' }}>
              <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <Text ml="5px" size="14px">
                    Pooled {feeValue0?.currency.symbol}
                  </Text>
                </Flex>
                <Flex sx={{ alignItems: 'center' }}>
                  <Text size="14px" mr="10px">
                    {liquidityValue0?.toSignificant(4)}
                  </Text>
                  <CurrencyLogo currency={feeValue0?.currency} size={18} />
                </Flex>
              </Flex>
              <Flex
                sx={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: '25px',
                }}
              >
                <Flex sx={{ alignItems: 'center' }}>
                  <Text size="14px" ml="5px">
                    Pooled {feeValue1?.currency.symbol}
                  </Text>
                </Flex>
                <Flex sx={{ alignItems: 'center' }}>
                  <Text size="14px" mr="10px">
                    {liquidityValue1?.toSignificant(4)}
                  </Text>
                  <CurrencyLogo currency={feeValue1?.currency} size={18} />
                </Flex>
              </Flex>
            </Flex>
            <Text margin="20px 0px 10px 5px">You will also collect fees earned from this position.</Text>
            <Flex sx={{ ...styles.subContainer, background: 'white3' }}>
              <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <Text ml="5px" size="14px">
                    {feeValue0?.currency.symbol} fees earned
                  </Text>
                </Flex>
                <Flex sx={{ alignItems: 'center' }}>
                  <Text size="14px" mr="10px">
                    {feeValue0?.toSignificant(4)}
                  </Text>
                  <CurrencyLogo currency={feeValue0?.currency} size={18} />
                </Flex>
              </Flex>
              <Flex
                sx={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: '25px',
                }}
              >
                <Flex sx={{ alignItems: 'center' }}>
                  <Text size="14px" ml="5px">
                    {feeValue1?.currency.symbol} fees earned
                  </Text>
                </Flex>
                <Flex sx={{ alignItems: 'center' }}>
                  <Text size="14px" mr="10px">
                    {feeValue1?.toSignificant(4)}
                  </Text>
                  <CurrencyLogo currency={feeValue1?.currency} size={18} />
                </Flex>
              </Flex>
            </Flex>
            <Button
              fullWidth
              mt="15px"
              onClick={() => {
                burn() //handleParentDismiss()
              }}
            >
              Remove
            </Button>
          </>
        )}
      </Flex>
    </Modal>
  )
}

export default RemoveLiquidityConfirmation
