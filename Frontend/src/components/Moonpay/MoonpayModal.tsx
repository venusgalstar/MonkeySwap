import React, { useState } from 'react'
import MoonPayIframe from './MoonFrame'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { CheckBox, Flex, Modal, Text } from 'components/uikit'
import { ModalProps } from 'components/uikit/Modal/types'

// Supported chains for moonpay
export const SUPPORTED_CHAINS = [SupportedChainId.BSC, SupportedChainId.MAINNET, SupportedChainId.POLYGON]

export default function MoonPayModal({ onDismiss }: { onDismiss?: () => void }) {
  const [accept, setAccept] = useState(false)
  const { t } = useTranslation()
  const { chainId } = useWeb3React()

  return (
    <Modal title="Buy crypto with MoonPay" onDismiss={onDismiss}>
      <Flex
        sx={{
          width: '420px',
          maxWidth: '100%',
          height: 'calc(100vh - 130px)',
          maxHeight: '738px',
          overflow: 'hidden',
          margin: '0 auto',
          marginTop: '16px',
          borderRadius: '1rem',
          '& > div': {
            gridColumn: 'span 12',
            width: '100%',
          },
        }}
      >
        {!SUPPORTED_CHAINS.includes(56) ? (
          <Flex sx={{ margin: '10px 0px', flexDirection: 'column' }}>
            <Text>
              {`${NETWORK_LABEL[56]} is unsupported by MoonPay. Assets purchased will be sent to other chains, depending on the asset.`}{' '}
            </Text>
            <Flex sx={{ margin: '20px 10px' }}>
              <Text size="14px">{t('Would you still like to purchase crypto with fiat?')}</Text>
              {'  '}
              <CheckBox
                sx={{
                  ml: '10px',
                  borderRadius: '8px',
                  backgroundColor: 'white3',
                  'input:checked ~ &': {
                    backgroundColor: 'yellow',
                  },
                }}
                checked={accept}
                onChange={() => {
                  setAccept((prev) => !prev)
                }}
              />
            </Flex>
            {accept && <MoonPayIframe />}
          </Flex>
        ) : (
          <MoonPayIframe />
        )}
      </Flex>
    </Modal>
  )
}
