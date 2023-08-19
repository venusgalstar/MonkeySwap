import { Button, Flex } from 'components/uikit'
import { TransactionResponse } from '@ethersproject/providers'
import { useTranslation } from 'contexts/Localization'
import { BigNumber, Contract } from 'ethers'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import React, { useCallback, useMemo, useState } from 'react'
import { Field } from 'state/burn/v2/actions'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import RemoveLiquidityModal from '../components/RemoveLiquidityModal'
import { styles } from './styles'
import { RemoveLiquidityActionProps } from './types'
import { Percent } from '@ape.swap/sdk-core'
import { usePairContract, useV2RouterContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { calculateSlippageAmount } from 'utils/calculateSlippageAmount'
import useModal from 'hooks/useModal'
import { TransactionType } from 'state/transactions/types'
import { currencyId } from 'utils/currencyId'
import ConnectWalletButton from 'components/ConnectWallet'

export const DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100)

const RemoveLiquidityActions: React.FC<RemoveLiquidityActionProps> = ({ pair, error, parsedAmounts }) => {
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const { t } = useTranslation()
  const { account, chainId, provider } = useWeb3React()

  const router = useV2RouterContract()

  // Currencies
  const currencyA = pair?.token0
  const currencyB = pair?.token1

  // Tokens
  const [tokenA, tokenB] = useMemo(() => [currencyA?.wrapped, currencyB?.wrapped], [currencyA, currencyB])

  // Signature data
  const [signatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)

  // Approval
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], router?.address)

  // Pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)

  // Attempt to approve
  const onAttemptToApprove = async () => {
    if (!pairContract || !pair || !provider || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')
    return approveCallback()
  }

  // get custom setting values for user
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE)

  // Custom from users settings
  const deadline = useTransactionDeadline()

  // tx sending
  const addTransaction = useTransactionAdder()

  // Attempt to approve
  async function onRemove() {
    if (!chainId || !provider || !account || !deadline || !router) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currencyB.isNative
    const oneCurrencyIsETH = currencyA.isNative || currencyBIsETH

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[], args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then((estimateGas) => calculateGasMargin(estimateGas))
          .catch((error) => {
            console.error(`estimateGas failed`, methodName, args, error)
            return undefined
          }),
      ),
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      setAttemptingTxn(true)
      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            type: TransactionType.REMOVE_LIQUIDITY_V3,
            baseCurrencyId: currencyId(currencyA),
            quoteCurrencyId: currencyId(currencyB),
            expectedAmountBaseRaw: parsedAmounts[Field.CURRENCY_A]?.quotient.toString() ?? '0',
            expectedAmountQuoteRaw: parsedAmounts[Field.CURRENCY_B]?.quotient.toString() ?? '0',
          })

          setTxHash(response.hash)

          // sendEvent({
          //   category: 'Liquidity',
          //   action: 'Remove',
          //   label: [currencyA.symbol, currencyB.symbol].join('/'),
          // })
        })
        .catch((error: Error) => {
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(error)
        })
    }
  }

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    setTxHash('')
  }, [])

  const [onPresentAddLiquidityModal] = useModal(
    <RemoveLiquidityModal
      title={t('Confirm Remove Liquidity')}
      pair={pair}
      parsedAmounts={parsedAmounts}
      txHash={txHash}
      attemptingTxn={attemptingTxn}
      onDismiss={handleDismissConfirmation}
      onRemove={onRemove}
    />,
    true,
    true,
    'removeLiquidityModal',
  )

  const renderAction = () => {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (error) {
      return (
        <Button fullWidth disabled>
          {error}
        </Button>
      )
    }
    if ((approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING) && !error) {
      return (
        <Flex sx={{ width: '100%' }}>
          <Button
            onClick={onAttemptToApprove}
            disabled={approval === ApprovalState.PENDING}
            load={approval === ApprovalState.PENDING}
            fullWidth
            sx={{ padding: '10px 2px' }}
          >
            {approval === ApprovalState.PENDING ? t('Enabling') : t('Enable')}
          </Button>
        </Flex>
      )
    }
    return (
      <Button
        fullWidth
        onClick={() => onPresentAddLiquidityModal()}
      >
        {t('Remove Liquidity')}
      </Button>
    )
  }

  return <Flex sx={{ ...styles.dexActionsContainer }}>{renderAction()}</Flex>
}

export default React.memo(RemoveLiquidityActions)
