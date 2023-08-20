import { Button, Flex } from 'components/uikit'
import { TransactionResponse } from '@ethersproject/providers'
import ConnectWallet from 'components/ConnectWallet'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'ethers'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import React, { useCallback, useState } from 'react'
import { Field } from 'state/mint/v2/actions'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { styles } from './styles'
import { AddLiquidityActionsProps } from './types'
import { useV2RouterContract } from 'hooks/useContract'
import { calculateSlippageAmount } from 'utils/calculateSlippageAmount'
import { ZERO_PERCENT } from 'config/constants/misc'
import useModal from 'hooks/useModal'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { TransactionType } from 'state/transactions/types'
import { currencyId } from 'utils/currencyId'
import { Percent } from '@ape.swap/sdk-core'
import { useIsSwapUnsupported } from 'hooks/useIsSwapUnsupported'
import { useWeb3React } from '@web3-react/core'
import AddLiquidityModal from '../AddLiquidityModal'

export const DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE = new Percent(50, 10_000)

const AddLiquidityActions: React.FC<AddLiquidityActionsProps> = ({
  currencies,
  error,
  parsedAmounts,
  noLiquidity,
  liquidityMinted,
  poolTokenPercentage,
  price,
  handleConfirmedTx,
}) => {
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const { t } = useTranslation()
  const { account, chainId, provider } = useWeb3React()

  // Currencies
  const currencyA = currencies?.CURRENCY_A
  const currencyB = currencies?.CURRENCY_B

  // Check to see if the add is supported
  const addIsUnsupported = useIsSwapUnsupported(currencyA, currencyB)

  // get custom setting values for user
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE) // custom from users

  // Custom from users settings
  const deadline = useTransactionDeadline()

  // Add transaction
  const addTransaction = useTransactionAdder()

  const router = useV2RouterContract()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], router?.address)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], router?.address)
  async function onAdd() {
    if (!chainId || !provider || !account || !router) return

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
    }

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null
    if (currencyA.isNative || currencyB.isNative) {
      const tokenBIsETH = currencyB.isNative
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        (tokenBIsETH ? currencyA : currencyB)?.wrapped?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).quotient.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).quotient.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        currencyA?.wrapped?.address ?? '',
        currencyB?.wrapped?.address ?? '',
        parsedAmountA.quotient.toString(),
        parsedAmountB.quotient.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }

    setAttemptingTxn(true)
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false)
          handleConfirmedTx && handleConfirmedTx(response.hash)
          addTransaction(response, {
            type: TransactionType.ADD_LIQUIDITY_V2_POOL,
            baseCurrencyId: currencyId(currencyA),
            expectedAmountBaseRaw: parsedAmounts[Field.CURRENCY_A]?.quotient.toString() ?? '0',
            quoteCurrencyId: currencyId(currencyB),
            expectedAmountQuoteRaw: parsedAmounts[Field.CURRENCY_B]?.quotient.toString() ?? '0',
          })

          setTxHash(response.hash)

          // sendEvent({
          //   category: 'Liquidity',
          //   action: 'Add',
          //   label: [currencies[Field.CURRENCY_A]?.symbol, currencies[Field.CURRENCY_B]?.symbol].join('/'),
          // })
        }),
      )
      .catch((error) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error)
        }
      })
  }

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    setTxHash('')
  }, [])

  const [onPresentAddLiquidityModal] = useModal(
    <AddLiquidityModal
      title={noLiquidity ? t('You are creating a pool') : t('Confirm Add Liquidity')}
      currencies={currencies}
      noLiquidity={noLiquidity}
      liquidityMinted={liquidityMinted}
      parsedAmounts={parsedAmounts}
      price={price}
      poolTokenPercentage={poolTokenPercentage}
      txHash={txHash}
      attemptingTxn={attemptingTxn}
      onDismiss={handleDismissConfirmation}
      onAdd={onAdd}
    />,
    true,
    true,
    'addLiquidityModal',
    true,
  )

  const renderAction = () => {
    if (addIsUnsupported) {
      return (
        <Button fullWidth disabled>
          {t('Unsupported Asset')}
        </Button>
      )
    }
    if (!account) {
      return <ConnectWallet />
    }
    if (error) {
      return (
        <Button fullWidth disabled>
          {error}
        </Button>
      )
    }
    if (
      (approvalA === ApprovalState.NOT_APPROVED ||
        approvalA === ApprovalState.PENDING ||
        approvalB === ApprovalState.NOT_APPROVED ||
        approvalB === ApprovalState.PENDING) &&
      !error
    ) {
      return (
        <Flex sx={{ width: '100%' }}>
          <>
            {approvalA !== ApprovalState.APPROVED && (
              <Button
                onClick={approveACallback}
                disabled={approvalA === ApprovalState.PENDING}
                load={approvalA === ApprovalState.PENDING}
                fullWidth
                mr={approvalB !== ApprovalState.APPROVED && '7.5px'}
                sx={{ padding: '10px 2px' }}
              >
                {approvalA === ApprovalState.PENDING
                  ? `${t('Enabling')} ${currencies[Field.CURRENCY_A]?.symbol}`
                  : `${t('Enable')} ${currencies[Field.CURRENCY_A]?.symbol}`}
              </Button>
            )}
            {approvalB !== ApprovalState.APPROVED && (
              <Button
                onClick={approveBCallback}
                disabled={approvalB === ApprovalState.PENDING}
                load={approvalB === ApprovalState.PENDING}
                fullWidth
                sx={{ padding: '10px 2px' }}
              >
                {approvalB === ApprovalState.PENDING
                  ? `${t('Enabling')} ${currencies[Field.CURRENCY_B]?.symbol}`
                  : `${t('Enable')} ${currencies[Field.CURRENCY_B]?.symbol}`}
              </Button>
            )}
          </>
        </Flex>
      )
    }
    return (
      <Button
        fullWidth
        onClick={() => onPresentAddLiquidityModal()}
      >
        {t('Add Liquidity')}
      </Button>
    )
  }

  return <Flex sx={styles.dexActionsContainer}>{renderAction()}</Flex>
}

export default React.memo(AddLiquidityActions)
