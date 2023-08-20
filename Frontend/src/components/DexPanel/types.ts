import { Currency } from '@ape.swap/sdk-core'

export interface DexPanelProps {
  value: string
  currency?: Currency | null
  otherCurrency?: Currency | null
  panelText?: string
  onCurrencySelect: (currency: Currency) => void
  onUserInput?: (input: string) => void
  handleMaxInput?: (field: any) => void
  setTradeValueUsd?: (val: number) => void
  fieldType?: any
  showCommonBases?: boolean
  disabled?: boolean
  ordersDisabled?: boolean
  independentField?: any
  disableTokenSelect?: boolean
  isZapInput?: boolean
  userBalance?: number
  locked?: boolean
  pricing: Pricing
  apiPrice?: string
}

export enum Pricing {
  LIFI = 0,
  PRICEGETTER = 1,
}
