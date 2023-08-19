import { Currency, Percent } from '@ape.swap/sdk-core'
import { Position } from '@ape.swap/v3-sdk'
import CurrencyLogo from 'components/CurrencyLogo'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { ConfirmationPendingContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import { Button, Flex, Modal, Text } from 'components/uikit'
import { useState } from 'react'
import PriceRangeSection from 'views/Positions/components/PriceRangeSection'
import RangeTag from 'views/Positions/components/RangeTag'
import styles from 'views/Positions/components/styles'

const ConfirmAddLiquidity = ({
  baseCurrency,
  quoteCurrency,
  position,
  outOfRange,
  ticksAtLimit,
  attemptingTxn,
  txHash,
  onAdd,
  onDismiss,
}: {
  ticksAtLimit: {
    LOWER?: boolean | undefined
    UPPER?: boolean | undefined
  }
  baseCurrency: Currency | undefined | null
  quoteCurrency: Currency | undefined | null
  position: Position | undefined
  outOfRange: boolean
  noLiquidity: boolean | undefined
  attemptingTxn: boolean
  txHash: string
  onAdd: () => void
  onDismiss: () => void
}) => {
  const [inverted, setInverted] = useState(false)
  const feeAmount = position?.pool.fee

  const pendingText = `Supplying ${position?.amount0.toSignificant(4) ?? ''} ${
    position?.amount0?.currency?.symbol ?? ''
  } and ${position?.amount1.toSignificant(4) ?? ''} ${position?.amount1?.currency?.symbol ?? ''}`

  return (
    <Modal title="Add Liquidity" sx={{ width: '460px' }}>
      <Flex sx={{ maxWidth: '100%', width: '420px', flexDirection: 'column' }}>
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : txHash ? (
          <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} />
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
                <DoubleCurrencyLogo currency0={baseCurrency} currency1={quoteCurrency} />
                <Text weight={600}>
                  &nbsp;{baseCurrency?.symbol}&nbsp;/&nbsp;{quoteCurrency?.symbol}
                </Text>
                <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
                  <Text size="10px" sx={{ lineHeight: '9px' }}>
                    {new Percent(feeAmount || 0, 1_000_000).toSignificant()}%
                  </Text>
                </Flex>
              </Flex>
              <RangeTag removed={false} inRange={!outOfRange} />
            </Flex>
            <Flex sx={{ ...styles.subContainer, mt: '10px', background: 'white3' }}>
              <Flex
                sx={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: '25px',
                }}
              >
                <Flex sx={{ alignItems: 'center' }}>
                  <CurrencyLogo currency={position?.amount0.currency} size={18} />
                  <Text size="14px" ml="5px">
                    {position?.amount0.currency.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {position?.amount0.toSignificant(4)}
                  </Text>
                </Flex>
              </Flex>
              <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <CurrencyLogo currency={position?.amount1.currency} size={18} />
                  <Text ml="5px" size="14px">
                    {position?.amount1.currency?.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {position?.amount1.toSignificant(4)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <PriceRangeSection
              currencyQuote={inverted ? position?.amount0.currency : position?.amount1.currency}
              currencyBase={inverted ? position?.amount1.currency : position?.amount0.currency}
              removed={false}
              inRange={!outOfRange}
              inverted={inverted}
              manuallyInverted={false}
              pool={position?.pool}
              priceUpper={inverted ? position?.token0PriceLower?.invert() : position?.token0PriceUpper}
              priceLower={inverted ? position?.token0PriceUpper?.invert() : position?.token0PriceLower}
              tickAtLimit={ticksAtLimit}
              setManuallyInverted={() => setInverted((prev) => !prev)}
            />
            <Button fullWidth mt="20px" onClick={onAdd}>
              Add
            </Button>
          </>
        )}
      </Flex>
    </Modal>
  )
}

export default ConfirmAddLiquidity
