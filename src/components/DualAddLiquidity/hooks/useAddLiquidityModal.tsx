import React, { useCallback, useState } from 'react'
import DualLiquidityModal from '../DualLiquidityModal'
import { Field, selectCurrency } from 'state/swap/actions'
import { selectOutputCurrency } from 'state/zap/actions'
import { useDispatch } from 'react-redux'
import { ZapType } from '@ape.swap/sdk'
import { CHAIN_PARAMS } from 'config/constants/chains'

import { SupportedChainId } from '@ape.swap/sdk-core'
import useModal from 'hooks/useModal'
import { useWeb3React } from '@web3-react/core'

const useAddLiquidityModal = (zapIntoProductType?: ZapType, clearStack = false) => {
  const { chainId } = useWeb3React()
  const [poolAddress, setPoolAddress] = useState(' ')
  const [pid, setPid] = useState('')
  const [zapable, setZapable] = useState(false)
  const dispatch = useDispatch()
  const [onPresentAddLiquidityWidgetModal] = useModal(
    <DualLiquidityModal
      poolAddress={poolAddress}
      pid={pid}
      zapIntoProductType={zapIntoProductType}
      zapable={zapable}
    />,
    true,
    false,
    'dualLiquidityModal',
  )

  const nativeToETH = useCallback(
    (token: any) => {
      const nativeSymbol = CHAIN_PARAMS[chainId as SupportedChainId]?.nativeCurrency.symbol
      if (token.symbol === nativeSymbol) return 'ETH'
      return token.address[chainId as SupportedChainId]
    },
    [chainId],
  )

  return useCallback(
    (token: any, quoteToken: any, poolAddress?: string, pid?: string, zapable?: boolean) => {
      dispatch(
        selectCurrency({
          field: Field.INPUT,
          currencyId: nativeToETH(token),
        }),
      )
      dispatch(
        selectCurrency({
          field: Field.OUTPUT,
          currencyId: nativeToETH(quoteToken),
        }),
      )
      dispatch(
        selectOutputCurrency({
          currency1: nativeToETH(token),
          currency2: nativeToETH(quoteToken),
        }),
      )
      setPoolAddress(poolAddress ?? '')
      setPid(pid ?? '')
      setZapable(zapable ?? false)
      onPresentAddLiquidityWidgetModal()
    },
    [dispatch, nativeToETH, onPresentAddLiquidityWidgetModal],
  )
}

export default useAddLiquidityModal
