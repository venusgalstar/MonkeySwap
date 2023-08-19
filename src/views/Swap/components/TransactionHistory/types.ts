export interface LiFiTransaction {
  status: string
  substatus: string
  substatusMessage: string
  tool: string
  transactionId: string
  lifiExplorerLink: string
  fromAddress: string
  toAddress: string
  sending: LiFiTokenInTx
  receiving: LiFiTokenInTx
}

export interface LiFiTokenInTx {
  txHash: string
  txLink: string
  amount: string
  chainId: number
  token: LiFiToken
  timestamp: number
  gasPrice: string
  gasUsed: string
  gasToken: LiFiToken
  gasAmount: string
  gasAmountUSD: string
  amountUSD: string
}

export interface LiFiToken {
  address: string
  chainId: number
  symbol: string
  decimals: number
  name: string
  priceUSD: string
  logoURI: string
  coinKey: string
}

// Root object
export interface AllTxs {
  walletAddress: string
  transactions: LiFiTransaction[]
}
