import { Button, Flex, Modal, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Field } from 'state/mint/v2/actions'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { AddLiquidityModalProps } from './types'
import { styles } from './styles'
import PoolInfo from '../PoolInfo'
import { useWeb3React } from '@web3-react/core'
import CurrencyLogo from 'components/CurrencyLogo'
import { DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE } from '../Actions'
import { ConfirmationPendingContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'

const AddLiquidityModal: React.FC<AddLiquidityModalProps> = ({
  currencies,
  liquidityMinted,
  noLiquidity,
  title,
  parsedAmounts,
  poolTokenPercentage,
  price,
  txHash,
  attemptingTxn,
  onDismiss,
  onAdd,
}) => {
  const { chainId } = useWeb3React()
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE) // custom from users
  const { t } = useTranslation()
  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? ''} ${
    currencies[Field.CURRENCY_A]?.symbol ?? ''
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? ''} ${currencies[Field.CURRENCY_B]?.symbol ?? ''}`
  return (
    <Modal title={title} onDismiss={onDismiss} zIndex={140}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : txHash ? (
        <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} />
      ) : (
        <Flex sx={styles.modalWrapper}>
          <>
            <Flex sx={{ ...styles.confirmDisabledInputContainer, transform: 'translate(0px, 12px)' }}>
              <Text size="22px" weight={700}>
                {parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)}
              </Text>
              <Flex sx={{ alignItems: 'center' }}>
                <CurrencyLogo currency={currencies[Field.CURRENCY_A]} size={30} />
                <Text size="14px" weight={700} ml="10px">
                  {currencies[Field.CURRENCY_A]?.symbol}
                </Text>
              </Flex>
            </Flex>
            <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Flex sx={styles.outerLogoCircle}>
                <Flex sx={styles.innerLogoCircle}>
                  <Text weight={700} color="primaryBright" sx={{ lineHeight: '0px' }}>
                    +
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex sx={{ ...styles.confirmDisabledInputContainer, transform: 'translate(0px, -12px)' }}>
              <Text size="22px" weight={700}>
                {parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)}
              </Text>
              <Flex sx={{ alignItems: 'center' }}>
                <CurrencyLogo currency={currencies[Field.CURRENCY_B]} size={30} />
                <Text size="14px" weight={700} ml="10px">
                  {currencies[Field.CURRENCY_B]?.symbol}
                </Text>
              </Flex>
            </Flex>
            <Text size="14px" textAlign="left" weight={500} margin="10px 0px" style={{ textAlign: 'center' }}>
              {t(
                'Output is estimated. If the price changes by more than %allowedSlippage%% your transaction will revert.',
                { allowedSlippage: allowedSlippage.toFixed(2) },
              )}
            </Text>
            <PoolInfo
              currencies={currencies}
              noLiquidity={noLiquidity}
              chainId={chainId}
              price={price}
              poolTokenPercentage={poolTokenPercentage}
              liquidityMinted={liquidityMinted}
            />
            <Button onClick={onAdd} fullWidth mt="15px">
              {t('Confirm Add Liquidity')}
            </Button>
          </>
        </Flex>
      )}
    </Modal>
  )
}

export default React.memo(AddLiquidityModal)
