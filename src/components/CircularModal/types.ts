import React from 'react'

export interface CMProps {
  //actionType: 'sellModal' | 'buyModal' | 'generalHarvestModal' | 'poolHarvestModal'
  path: 'circular-buy' | 'circular-sell' | 'circular-ph' | 'circular-gh'
  onDismiss: () => void
}

export interface MP {
  supporting: string
  description: string
  actionType?: 'sellModal' | 'buyModal' | 'generalHarvestModal' | 'poolHarvestModal'
  children: React.ReactNode
}

export interface CTACardProps {
  type: string
  action: string
}

export interface CTAProps {
  actionType: 'circular-buy' | 'circular-sell' | 'circular-ph' | 'circular-gh'
}
