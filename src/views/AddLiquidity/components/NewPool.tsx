import { Currency } from '@ape.swap/sdk-core'
import { Flex, NumericInput, Text } from 'components/uikit'

const NewPool = ({
  startPriceTypedValue,
  currencyA,
  currencyB,
  onStartPriceInput,
}: {
  startPriceTypedValue: string
  currencyA: Currency | undefined
  currencyB: Currency | undefined
  onStartPriceInput: (input: string) => void
}) => {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ mb: '5px', transform: 'translate(0, -2px)' }}>
        <Text>Set Starting Price</Text>
      </Flex>
      <Flex sx={{ flexDirection: 'column', background: 'white3', padding: '10px', borderRadius: '10px', mb: '10px' }}>
        <Text size="14px" sx={{ lineHeight: '21px' }}>
          This pool must be initialized before you can add liquidity. To initialize, select a starting price for the
          pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higer than usual due to the
          initialization transaction.
        </Text>
        <NumericInput
          value={startPriceTypedValue}
          onUserInput={onStartPriceInput}
          style={{ background: 'white4', marginTop: '10px', padding: '5px', borderRadius: '10px' }}
        />
        <Flex sx={{ mt: '8.5px', alignItems: 'center' }}>
          <Text size="14px">Current {currencyA?.symbol} Price:</Text>
          <Text ml="10px" size="14px">
            {startPriceTypedValue !== '' && startPriceTypedValue !== '0'
              ? `${startPriceTypedValue} ${currencyB?.symbol}`
              : '-'}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NewPool
