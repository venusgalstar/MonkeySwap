import { SupportedChainId } from '@ape.swap/sdk-core'
import React from 'react'
import { useMoonPayUrl } from './useMoonpayUrl'

const MoonPayIframe: React.FC<{ manualChainId?: SupportedChainId }> = ({ manualChainId }) => {
  const url = useMoonPayUrl(manualChainId)
  return (
    <iframe
      title="Moonpay topup"
      src={url}
      scrolling="no"
      allow="accelerometer; autoplay; camera; gyroscope; payment"
      sx={{ width: '100%' }}
    />
  )
}

export default MoonPayIframe
