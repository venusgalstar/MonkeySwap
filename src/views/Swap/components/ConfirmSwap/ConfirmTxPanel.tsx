import React from 'react'
import { Button, Flex, Svg, Text } from 'components/uikit'
import styles from '../styles'
import RouteDetails from '../RouteDetails'
import { Route } from '@lifi/sdk'
import { useCurrency } from 'hooks/Tokens'
import { humanOutputAmount } from '../../utils'
import { ChainId, NETWORK_LABEL } from 'config/constants/chains'
import OmniTokenImage from 'components/OmniChain/OmniTokenImage'

const ConfirmTxPanel = ({
  selectedRoute,
  fee,
  onConfirm,
}: {
  selectedRoute: Route
  fee: number
  onConfirm?: () => void
}) => {
  const currencyIn = useCurrency(
    selectedRoute?.fromToken?.address,
    selectedRoute?.fromToken?.chainId as unknown as ChainId,
  )
  const currencyOut = useCurrency(
    selectedRoute?.toToken?.address,
    selectedRoute?.toToken?.chainId as unknown as ChainId,
  )
  const fullInputAmount = humanOutputAmount(selectedRoute?.fromAmount, selectedRoute?.fromToken?.decimals, 6)
  const fullExpectedOutputAmount = humanOutputAmount(selectedRoute?.toAmount, selectedRoute?.toToken?.decimals, 6)
  const minimumOut = humanOutputAmount(selectedRoute?.toAmountMin, selectedRoute?.toToken?.decimals)
  const isBridge = selectedRoute?.fromToken?.chainId !== selectedRoute?.toToken?.chainId

  return (
    <>
      <Flex sx={styles.inputContainer}>
        <Text>{fullInputAmount}</Text>
        <Flex sx={{ alignItems: 'center' }}>
          <OmniTokenImage currency={currencyIn} size={30} />
          <Text ml="10px">{currencyIn?.symbol}</Text>
        </Flex>
      </Flex>
      <Flex sx={{ justifyContent: 'center' }}>
        <Flex sx={styles.container}>
          <Flex sx={styles.subContainer}>
            <Svg icon="arrow" color="primaryBright" />
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={styles.outputContainer}>
        <Text>{fullExpectedOutputAmount}</Text>
        <Flex sx={{ alignItems: 'center' }}>
          <OmniTokenImage currency={currencyOut} size={30} />
          <Text ml="10px">{currencyOut?.symbol}</Text>
        </Flex>
      </Flex>
      <RouteDetails route={selectedRoute} fee={fee} />
      {isBridge ? (
        <Text size="12px" weight={300} sx={{ textAlign: 'center' }} margin="15px 0px">
          You are bridging <span sx={{ fontWeight: 700 }}>{selectedRoute?.fromToken?.symbol?.toUpperCase()} </span>
          in{' '}
          <span sx={{ fontWeight: 700 }}>
            {NETWORK_LABEL[selectedRoute?.fromToken?.chainId as unknown as ChainId]}{' '}
          </span>
          to <span sx={{ fontWeight: 700 }}>{selectedRoute?.toToken?.symbol?.toUpperCase()} </span>
          in{' '}
          <span sx={{ fontWeight: 700 }}>{NETWORK_LABEL[selectedRoute?.toToken?.chainId as unknown as ChainId]} </span>
          through <span sx={{ fontWeight: 700 }}>{selectedRoute?.steps[0]?.toolDetails.name} </span> bridge. Estimated
          time:{' '}
          <span sx={{ fontWeight: 700 }}>{Math.round(selectedRoute?.steps[0]?.estimate?.executionDuration / 60)} </span>
          minutes.
        </Text>
      ) : (
        <Text size="12px" weight={300} sx={{ textAlign: 'center' }} margin="15px 0px">
          Output is estimated. You will receive at least{' '}
          <span sx={{ fontWeight: 700 }}>
            {minimumOut} {currencyOut?.symbol}
          </span>{' '}
          or the transaction will be cancelled.
        </Text>
      )}
      <Button fullWidth onClick={onConfirm}>
        <Text color="primaryBright">Confirm</Text>
      </Button>
    </>
  )
}

export default ConfirmTxPanel
