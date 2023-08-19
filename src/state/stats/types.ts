export interface FarmLpAprsType {
  chainId: number
  lpAprs: {
    pid: number
    lpApr: number
    lpAddress?: string
  }[]
}

export interface TagsType {
  [key: string]: any
}

export interface OrderingType {
  [key: string]: any
}

export interface StatsState {
  FarmLpAprs: FarmLpAprsType | undefined
  Tags: TagsType | undefined
  Ordering: OrderingType | undefined
}
