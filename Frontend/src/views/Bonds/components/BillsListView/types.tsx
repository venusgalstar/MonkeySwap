import React from 'react'

export type Option = {
  label: string
  value: string
}

export const FILTER_OPTIONS: Option[] = [
  {
    label: 'Filter',
    value: 'filter',
  },
  {
    label: 'Liquidity',
    value: 'liquidity',
  },
  {
    label: 'Reserve',
    value: 'reserve',
  },
  {
    label: 'Launch',
    value: 'launch',
  },
]

export const SORT_OPTIONS: Option[] = [
  {
    label: 'Sort',
    value: 'sort',
  },
  {
    label: 'Discount',
    value: 'discount',
  },
  {
    label: 'Vesting Term',
    value: 'vesting',
  },
  {
    label: 'New',
    value: 'new',
  },
]

export interface BillsListMenuProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setFilterOption: (value: string) => void
  filterOption?: string
  setSortOption: (value: string) => void
  sortOption: string
  query: string
  harvestAll?: React.ReactNode
  showOnlyDiscount: boolean
  setShowOnlyDiscount: (value: boolean) => void
  showAvailable: boolean
  setShowAvailable: (value: boolean) => void
}
