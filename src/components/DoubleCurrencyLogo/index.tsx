import { Currency } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'

const DoubleCurrencyLogo = ({
  currency0,
  currency1,
  size = 30,
  spacing = '-13px',
}: {
  currency0: Currency | undefined | null
  currency1: Currency | undefined | null
  size?: number
  spacing?: string
}) => {
  return (
    <>
      <CurrencyLogo currency={currency0} size={size} style={{ zIndex: 1 }} />
      <CurrencyLogo
        currency={currency1}
        size={size}
        style={{ transform: `translate(${spacing}, 0px)`, marginRight: spacing }}
      />
    </>
  )
}

export default DoubleCurrencyLogo
