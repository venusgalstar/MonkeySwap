import { Currency, Percent } from '@ape.swap/sdk-core'
import { FeeAmount } from '@ape.swap/v3-sdk'
import { Protocol } from '@ape.swap/router-sdk'

export interface RoutingDiagramEntry {
  percent: Percent
  path: [Currency, Currency, FeeAmount][]
  protocol: Protocol
}
