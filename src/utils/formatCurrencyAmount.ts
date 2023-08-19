import { Currency, CurrencyAmount, Fraction, Price } from '@ape.swap/sdk-core'
import JSBI from 'jsbi'
import formatLocaleNumber from 'lib/utils/formatLocaleNumber'

export function formatCurrencyAmount(
  amount: CurrencyAmount<Currency> | undefined,
  sigFigs: number,
  fixedDecimals?: number,
): string {
  if (!amount) {
    return '-'
  }

  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
    return '0'
  }

  if (amount.divide(amount.decimalScale).lessThan(new Fraction(1, 100000))) {
    return `<${formatLocaleNumber({ number: 0.00001, locale: 'en-US' })}`
  }

  return formatLocaleNumber({ number: amount, locale: 'en-US', sigFigs, fixedDecimals })
}

export function formatPrice(price: Price<Currency, Currency> | undefined | any, sigFigs: number): string {
  if (!price) {
    return '-'
  }

  if (parseFloat(price.toFixed(8)) < 0.00000001) {
    return `<${formatLocaleNumber({ number: 0.00001, locale: 'en-US' })}`
  }

  return formatLocaleNumber({ number: price, locale: 'en-US', sigFigs })
}
