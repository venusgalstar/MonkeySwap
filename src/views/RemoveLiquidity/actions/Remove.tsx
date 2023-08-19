import { Currency, CurrencyAmount, Percent } from '@ape.swap/sdk-core'
import { NonfungiblePositionManager, Position } from '@ape.swap/v3-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { Dispatch, ReactNode, SetStateAction, useCallback } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { currencyId } from 'utils/currencyId'
import track from 'utils/track'

const DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100)

const Remove = ({
  liquidityValue0,
  liquidityValue1,
  liquidityPercentage,
  positionSDK,
  tokenId,
  feeValue0,
  feeValue1,
  error,
  setAttemptingTxn,
  setTxHash,
}: {
  liquidityValue0: CurrencyAmount<Currency> | undefined
  liquidityValue1: CurrencyAmount<Currency> | undefined
  liquidityPercentage: Percent | undefined
  positionSDK: Position | undefined
  tokenId: string | undefined
  feeValue0: CurrencyAmount<Currency> | undefined
  feeValue1: CurrencyAmount<Currency> | undefined
  feeAmount: number | undefined
  inRange: boolean
  error: ReactNode | undefined
  setAttemptingTxn: Dispatch<SetStateAction<boolean>>
  setTxHash: Dispatch<SetStateAction<string>>
}) => {
  const { account, chainId, provider } = useWeb3React()
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()
  const positionManager = useV3NFTPositionManagerContract()
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE) // custom from users
  const deadline = useTransactionDeadline() // custom from users settings

  const [currencyAUsdVal] = useTokenPriceUsd(liquidityValue0?.currency ?? undefined)
  const [currencyBUsdVal] = useTokenPriceUsd(liquidityValue1?.currency ?? undefined)

  const burn = useCallback(async () => {
    setAttemptingTxn(true)
    if (
      !positionManager ||
      !liquidityValue0 ||
      !liquidityValue1 ||
      !deadline ||
      !account ||
      !chainId ||
      !positionSDK ||
      !liquidityPercentage ||
      !provider ||
      !tokenId
    ) {
      return
    }

    // we fall back to expecting 0 fees in case the fetch fails, which is safe in the
    // vast majority of cases
    const { calldata, value } = NonfungiblePositionManager.removeCallParameters(positionSDK, {
      tokenId: tokenId,
      liquidityPercentage,
      slippageTolerance: allowedSlippage,
      deadline: deadline.toString(),
      collectOptions: {
        expectedCurrencyOwed0: feeValue0 ?? CurrencyAmount.fromRawAmount(liquidityValue0.currency, 0),
        expectedCurrencyOwed1: feeValue1 ?? CurrencyAmount.fromRawAmount(liquidityValue1.currency, 0),
        recipient: account,
      },
    })

    const txn = {
      to: positionManager.address,
      data: calldata,
      value,
    }

    provider
      .getSigner()
      .estimateGas(txn)
      .then((estimate) => {
        const newTxn = {
          ...txn,
          gasLimit: calculateGasMargin(estimate),
        }

        return provider
          .getSigner()
          .sendTransaction(newTxn)
          .then((response: TransactionResponse) => {
            provider
              .waitForTransaction(response.hash)
              .then(() => {
                setAttemptingTxn(false)
              })
              .catch((error) => {
                setAttemptingTxn(false)
                console.error(error)
              })
            setTxHash(response.hash)
            addTransaction(response, {
              type: TransactionType.REMOVE_LIQUIDITY_V3,
              baseCurrencyId: currencyId(liquidityValue0.currency),
              quoteCurrencyId: currencyId(liquidityValue1.currency),
              expectedAmountBaseRaw: liquidityValue0.quotient.toString(),
              expectedAmountQuoteRaw: liquidityValue1.quotient.toString(),
            })
            track({
              event: 'RemoveLiquidity',
              chain: chainId,
              data: {
                version: 'V3',
                currencyA: liquidityValue0?.currency?.symbol,
                currencyB: liquidityValue1?.currency?.symbol,
                currencyAValue: parseFloat(liquidityValue0?.toSignificant(6) || '0'),
                currencyBValue: parseFloat(liquidityValue1?.toSignificant(6) || '0'),
                currencyAUsdValue: currencyAUsdVal * parseFloat(liquidityValue0?.toSignificant(6) || '0'),
                currencyBUsdValue: currencyBUsdVal * parseFloat(liquidityValue1?.toSignificant(6) || '0'),
              },
            })
          })
      })
      .catch((error) => {
        setAttemptingTxn(false)
        console.error(error)
      })
  }, [
    positionManager,
    currencyBUsdVal,
    currencyAUsdVal,
    liquidityValue0,
    liquidityValue1,
    deadline,
    account,
    chainId,
    feeValue0,
    feeValue1,
    positionSDK,
    liquidityPercentage,
    provider,
    tokenId,
    allowedSlippage,
    setAttemptingTxn,
    setTxHash,
    addTransaction,
  ])

  // const handleDismissConfirmation = useCallback(() => {
  //   // if there was a tx hash, we want to clear the input
  //   setTxHash('')
  //   onDismiss()
  // }, [onDismiss])

  // const [onRemoveLiquidity] = useModal(
  //   <RemoveLiquidityConfirmation
  //     feeValue0={feeValue0}
  //     feeValue1={feeValue1}
  //     liquidityValue0={liquidityValue0}
  //     liquidityValue1={liquidityValue1}
  //     feeAmount={feeAmount}
  //     inRange={inRange}
  //     attemptingTxn={attemptingTxn}
  //     txHash={txHash}
  //     burn={burn}
  //     onDismiss={handleDismissConfirmation}
  //   />,
  //   true,
  //   true,
  //   'removeLiquidityConfirmationModal',
  // )

  return (
    <Button
      fullWidth
      sx={{ mt: '10px' }}
      onClick={burn}
      disabled={!!error}
      // load={attemptingTxn}
      // disabled={attemptingTxn}
    >
      {error ? error : t('Remove')}
    </Button>
  )
}

export default Remove
