import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { NonfungiblePositionManager } from '@ape.swap/v3-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import { BigNumber } from 'ethers'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { useCallback, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { currencyId } from 'utils/currencyId'
import track from 'utils/track'

const Claim = ({
  currency0ForFeeCollectionPurposes,
  currency1ForFeeCollectionPurposes,
  tokenId,
  feeValue0,
  feeValue1,
  fullWidth,
}: {
  currency0ForFeeCollectionPurposes: Currency | undefined
  currency1ForFeeCollectionPurposes: Currency | undefined
  tokenId: BigNumber | undefined
  feeValue0: CurrencyAmount<Currency> | undefined
  feeValue1: CurrencyAmount<Currency> | undefined
  fullWidth?: boolean
}) => {
  const { account, provider, chainId } = useWeb3React()
  const positionManager = useV3NFTPositionManagerContract()
  const addTransaction = useTransactionAdder()

  const disabledClaim = feeValue0?.equalTo(0) && feeValue1?.equalTo(0)

  const [currencyAUsdVal] = useTokenPriceUsd(currency0ForFeeCollectionPurposes ?? undefined)
  const [currencyBUsdVal] = useTokenPriceUsd(currency1ForFeeCollectionPurposes ?? undefined)

  const [claimPending, setClaimPending] = useState<boolean>(false)
  const onClaim = useCallback(() => {
    if (
      !currency0ForFeeCollectionPurposes ||
      !currency1ForFeeCollectionPurposes ||
      !chainId ||
      !positionManager ||
      !account ||
      !tokenId ||
      !provider
    )
      return

    setClaimPending(true)

    // we fall back to expecting 0 fees in case the fetch fails, which is safe in the
    // vast majority of cases
    const { calldata, value } = NonfungiblePositionManager.collectCallParameters({
      tokenId: tokenId.toString(),
      expectedCurrencyOwed0: feeValue0 ?? CurrencyAmount.fromRawAmount(currency0ForFeeCollectionPurposes, 0),
      expectedCurrencyOwed1: feeValue1 ?? CurrencyAmount.fromRawAmount(currency1ForFeeCollectionPurposes, 0),
      recipient: account,
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
              .then(() => setClaimPending(false))
              .catch((error) => {
                setClaimPending(false)
                console.error(error)
              })

            track({
              event: 'ClaimFee',
              chain: chainId,
              data: {
                currencyA: currency0ForFeeCollectionPurposes.symbol,
                currencyB: currency1ForFeeCollectionPurposes.symbol,
                currencyAValue: parseFloat(feeValue0?.toSignificant(6) || '0'),
                currencyBValue: parseFloat(feeValue1?.toSignificant(6) || '0'),
                currencyAUsdValue: currencyAUsdVal * parseFloat(feeValue0?.toSignificant(6) || '0'),
                currencyBUsdValue: currencyBUsdVal * parseFloat(feeValue1?.toSignificant(6) || '0'),
              },
            })

            addTransaction(response, {
              type: TransactionType.COLLECT_FEES,
              currencyId0: currencyId(currency0ForFeeCollectionPurposes),
              currencyId1: currencyId(currency1ForFeeCollectionPurposes),
              expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(currency0ForFeeCollectionPurposes, 0).toExact(),
              expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(currency1ForFeeCollectionPurposes, 0).toExact(),
            })
          })
      })
      .catch((error) => {
        setClaimPending(false)
        console.error(error)
      })
  }, [
    chainId,
    feeValue0,
    currencyAUsdVal,
    currencyBUsdVal,
    feeValue1,
    currency0ForFeeCollectionPurposes,
    currency1ForFeeCollectionPurposes,
    positionManager,
    addTransaction,
    account,
    tokenId,
    provider,
  ])

  return (
    <Button
      size="sm"
      onClick={onClaim}
      load={claimPending}
      disabled={claimPending || disabledClaim}
      fullWidth={fullWidth}
    >
      Claim
    </Button>
  )
}

export default Claim
