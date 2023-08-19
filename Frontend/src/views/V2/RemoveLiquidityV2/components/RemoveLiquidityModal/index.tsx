import { Button, Flex, Modal, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Field } from 'state/burn/v2/actions'
import { ConfirmationPendingContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { RemoveLiquidityModalProps } from './types'
import { styles } from './styles'
import PoolInfo from '../PoolInfo'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE } from '../../Actions'

const RemoveLiquidityModal: React.FC<RemoveLiquidityModalProps> = ({
  pair,
  title,
  parsedAmounts,
  txHash,
  attemptingTxn,
  onDismiss,
  onRemove,
}) => {
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE)
  const { t } = useTranslation()
  const currencyA = pair?.token0
  const currencyB = pair?.token1
  const pendingText = `${t('Removing')} ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? ''} ${
    currencyA?.symbol ?? ''
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? ''} ${currencyB?.symbol ?? ''}`
  return (
    <Modal title={title} onDismiss={onDismiss}>
      <Flex sx={{ maxWidth: '100%', width: '420px' }}>
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : txHash ? (
          <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} />
        ) : (
          <Flex sx={styles.modalWrapper}>
            <>
              <Flex sx={{ ...styles.confirmDisabledInputContainer, marginTop: '10px' }}>
                <Text size="22px" weight={700}>
                  {parsedAmounts[Field.LIQUIDITY]?.toSignificant(6)}
                </Text>
                <Flex sx={{ alignItems: 'center' }}>
                  <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} size={30} />
                  <Text size="14px" weight={700} ml="5px">
                    {`${currencyA?.symbol} - ${currencyB?.symbol}`}
                  </Text>
                </Flex>
              </Flex>
              <Text size="14px" textAlign="left" mt="15px" weight={500} style={{ textAlign: 'center' }}>
                {t(
                  'Output is estimated. If the price changes by more than %allowedSlippage%% your transaction will revert.',
                  { allowedSlippage: allowedSlippage?.toFixed(2) },
                )}
              </Text>
              <PoolInfo pair={pair} parsedAmounts={parsedAmounts} />
              <Button onClick={onRemove} fullWidth mt="15px">
                {t('Confirm Remove Liquidity')}
              </Button>
            </>
          </Flex>
        )}
      </Flex>
    </Modal>
  )
}

export default React.memo(RemoveLiquidityModal)
