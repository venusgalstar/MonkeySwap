import { Currency, CurrencyAmount, Percent, Price, Token } from '@ape.swap/sdk-core'
import { Position } from '@ape.swap/v3-sdk'
import CurrencyLogo from 'components/CurrencyLogo'
import DexPanel from 'components/DexPanel'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { ConfirmationPendingContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import { Flex, Modal, Text } from 'components/uikit'
import { BigNumber } from 'ethers'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import useIsMobile from 'hooks/useIsMobile'
import { useCallback, useState } from 'react'
import { Field } from 'state/mint/v3/actions'
import { useV3DerivedMintInfo, useV3MintActionHandlers, useV3MintState } from 'state/mint/v3/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import PriceRangeSection from 'views/Positions/components/PriceRangeSection'
import RangeTag from 'views/Positions/components/RangeTag'
import styles from 'views/Positions/components/styles'
import Add from './actions/Add'
import { Pricing } from '../../components/DexPanel/types'

const IncreaseLiquidity = ({
  quoteCurrency,
  baseCurrency,
  removed,
  inRange,
  inverted,
  manuallyInverted,
  priceUpper,
  priceLower,
  tickAtLimit,
  currentPosition,
  feeAmount,
  tokenId,
  setManuallyInverted,
  onDismiss,
}: {
  quoteCurrency: Currency | undefined
  baseCurrency: Currency | undefined
  removed: boolean | undefined
  inRange: boolean
  inverted: boolean | undefined
  manuallyInverted: boolean
  priceUpper: Price<Token, Token> | undefined
  priceLower: Price<Token, Token> | undefined
  feeAmount: number | undefined
  currentPosition: Position | undefined
  tokenId: BigNumber | undefined
  tickAtLimit: {
    LOWER: boolean | undefined
    UPPER: boolean | undefined
  }
  setManuallyInverted: (manuallyInverted: boolean) => void
  onDismiss: () => void
}) => {
  // mint state
  const { independentField, typedValue } = useV3MintState()
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')

  const {
    pool,
    dependentField,
    parsedAmounts,
    position,
    noLiquidity,
    currencies,
    outOfRange,
    currencyBalances,
    depositADisabled,
    depositBDisabled,
    errorMessage,
  } = useV3DerivedMintInfo(
    baseCurrency ?? undefined,
    quoteCurrency ?? undefined,
    feeAmount,
    baseCurrency ?? undefined,
    currentPosition,
  )

  const { onFieldAInput, onFieldBInput } = useV3MintActionHandlers(noLiquidity)

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const positionManager = useV3NFTPositionManagerContract()

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const pendingText = `Supplying ${position?.amount0.toSignificant(4) ?? ''} ${
    position?.amount0.currency.symbol ?? ''
  } and ${position?.amount1.toSignificant(4) ?? ''} ${position?.amount1.currency.symbol ?? ''}`

  const onUserDismiss = useCallback(() => {
    setTxHash('') // if there was a tx hash, we want to clear the input
    onDismiss()
  }, [onDismiss])

  const isMobile = useIsMobile()

  return (
    <Modal title="Increase Position">
      <Flex
        sx={{
          maxWidth: '100%',
          width: '420px',
          flexDirection: 'column',
        }}
      >
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : txHash ? (
          <TransactionSubmittedContent hash={txHash} onDismiss={onUserDismiss} />
        ) : (
          <>
            <Flex
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                mt: '10px',
              }}
            >
              <Flex sx={{ alignItems: 'center' }}>
                <DoubleCurrencyLogo currency0={quoteCurrency} currency1={baseCurrency} />
                <Text weight={600}>
                  &nbsp;{quoteCurrency?.symbol}&nbsp;/&nbsp;{baseCurrency?.symbol}
                </Text>
                <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
                  <Text size="10px" sx={{ lineHeight: '9px' }}>
                    {new Percent(feeAmount || 0, 1_000_000).toSignificant()}%
                  </Text>
                </Flex>
              </Flex>
              <RangeTag removed={removed} inRange={inRange} />
            </Flex>
            <Flex sx={{ ...styles.subContainer, mt: '10px', background: 'white3' }}>
              <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <CurrencyLogo currency={quoteCurrency} size={18} />
                  <Text ml="5px" size="14px">
                    {quoteCurrency?.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {inverted ? currentPosition?.amount0.toSignificant(4) : currentPosition?.amount1.toSignificant(4)}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                sx={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: '25px',
                }}
              >
                <Flex sx={{ alignItems: 'center' }}>
                  <CurrencyLogo currency={baseCurrency} size={18} />
                  <Text size="14px" ml="5px">
                    {baseCurrency?.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {inverted ? currentPosition?.amount1.toSignificant(4) : currentPosition?.amount0.toSignificant(4)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <PriceRangeSection
              currencyQuote={quoteCurrency}
              currencyBase={baseCurrency}
              removed={removed}
              inRange={inRange}
              inverted={inverted}
              manuallyInverted={manuallyInverted}
              pool={pool}
              priceUpper={priceUpper}
              priceLower={priceLower}
              tickAtLimit={tickAtLimit}
              setManuallyInverted={setManuallyInverted}
            />
            <Text margin="10px 0px" weight={700}>
              {' '}
              Add more liquidity{' '}
            </Text>
            <DexPanel
              onUserInput={onFieldBInput}
              handleMaxInput={() => {
                onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
              }}
              value={formattedAmounts[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B] ?? null}
              onCurrencySelect={() => null}
              locked={depositBDisabled}
              disableTokenSelect
              pricing={Pricing.PRICEGETTER}
            />
            <Flex sx={{ mt: '10px' }} />
            <DexPanel
              onUserInput={onFieldAInput}
              handleMaxInput={() => {
                onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
              }}
              value={formattedAmounts[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A] ?? null}
              onCurrencySelect={() => null}
              locked={depositADisabled}
              disableTokenSelect
              pricing={Pricing.PRICEGETTER}
            />
            <Add
              parsedAmounts={parsedAmounts}
              positionManager={positionManager}
              baseCurrency={currencies[Field.CURRENCY_A]}
              quoteCurrency={currencies[Field.CURRENCY_B]}
              position={position}
              outOfRange={outOfRange}
              hasExistingPosition={true}
              noLiquidity={noLiquidity}
              tokenId={tokenId?.toString()}
              setAttemptingTxn={setAttemptingTxn}
              setTxHash={setTxHash}
              errorMessage={errorMessage}
            />
          </>
        )}
      </Flex>
    </Modal>
  )
}

export default IncreaseLiquidity
