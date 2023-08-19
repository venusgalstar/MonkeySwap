import { BigNumber } from '@ethersproject/bignumber'
import { SwapRouter, Trade } from '@ape.swap/router-sdk'
import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { FeeOptions } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { SWAP_ROUTER_ADDRESSES } from 'config/constants/addresses'
import { useMemo } from 'react'
import useENS from './useENS'
import { SignatureData } from './useERC20Permit'

interface SwapCall {
  address: string
  calldata: string
  value: string
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
export function useSwapCallArguments(
  trade: Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent,
  recipientAddressOrName: string | null | undefined,
  signatureData: SignatureData | null | undefined,
  deadline: BigNumber | undefined,
  feeOptions: FeeOptions | undefined,
): SwapCall[] {
  const { account, chainId, provider } = useWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress

  return useMemo(() => {
    if (!trade || !recipient || !provider || !account || !chainId || !deadline) return []

    const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined
    if (!swapRouterAddress) return []

    const { value, calldata } = SwapRouter.swapCallParameters(trade, {
      fee: feeOptions,
      recipient,
      slippageTolerance: allowedSlippage,
      ...(signatureData
        ? {
            inputTokenPermit:
              'allowed' in signatureData
                ? {
                    expiry: signatureData.deadline,
                    nonce: signatureData.nonce,
                    s: signatureData.s,
                    r: signatureData.r,
                    v: signatureData.v as any,
                  }
                : {
                    deadline: signatureData.deadline,
                    amount: signatureData.amount,
                    s: signatureData.s,
                    r: signatureData.r,
                    v: signatureData.v as any,
                  },
          }
        : {}),

      deadlineOrPreviousBlockhash: deadline.toString(),
    })
    return [
      {
        address: swapRouterAddress,
        calldata,
        value,
      },
    ]
  }, [account, allowedSlippage, chainId, deadline, feeOptions, provider, recipient, signatureData, trade])
}
