import { Currency } from '@ape.swap/sdk-core'
import { ChainId } from 'config/constants/chains'

export interface OmniChainPanelProps {
  panelText?: string
  value: string
  currency?: Currency | null
  currencyChain?: ChainId | null
  onCurrencySelect: (currency: Currency, chain: ChainId) => void
  onUserInput?: (input: string) => void
  handleMaxInput?: (field: any) => void
  disabled?: boolean
  apiPrice?: string
}
