import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { TradeState } from 'state/routing/types'
import Swap from './Swap'
import { Flex } from 'components/uikit'
import { WrapInputError, WrapType } from 'hooks/useWrapCallback'
import { Route } from '@lifi/sdk'

const Actions = ({
  routingState,
  inputError,
  selectedRoute,
  showWrap,
  wrapType,
  wrapInputError,
  onWrap,
  inputCurrencyAmount,
  feeStructure
}: {
  routingState?: TradeState
  inputError?: string
  selectedRoute: Route | undefined
  showWrap: boolean | undefined
  wrapInputError: WrapInputError | undefined
  wrapType: WrapType | undefined
  onWrap: (() => Promise<void>) | undefined
  inputCurrencyAmount: CurrencyAmount<Currency> | undefined
  feeStructure: {
    fee: number
    tier: string
  }
}) => {
  const { account } = useWeb3React()

  return (
    <Flex mt="10px">
      {!account ? (
        <ConnectWalletButton />
      ) : (
        <Swap
          routingState={routingState}
          selectedRoute={selectedRoute}
          showWrap={showWrap}
          wrapInputError={wrapInputError}
          wrapType={wrapType}
          onWrap={onWrap}
          inputError={inputError}
          inputCurrencyAmount={inputCurrencyAmount}
          feeStructure={feeStructure}
        />
      )}
    </Flex>
  )
}

export default Actions
