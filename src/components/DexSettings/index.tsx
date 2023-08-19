import { Flex, Modal, Text } from 'components/uikit'
import TransactionDetails from './TransactionDetails'
import React from 'react'
import { useRouter } from 'next/router'

const DexSettings = ({ onDismiss } : {onDismiss?: () => void}) => {
  const { push } = useRouter()

  return (
    <Modal title="Settings" sx={{ maxWidth: '420px', minWidth: ['95%', '330px'] }}>
      <Flex sx={{ maxWidth: '100%', width: '380px', flexDirection: 'column' }}>
        <TransactionDetails />
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px 0px' }}>
          <Text sx={{fontWeight: 400}}>
            <Text
              size="14px"
              variant="link"
              sx={{
                position: 'relative',
                cursor: 'pointer',
                textDecoration: 'none',
                mr: '20px',
              }}
              onClick={() => {
                push('/v3-liquidity')
                onDismiss && onDismiss()
              }}
              id="swap-link"
            >
              {'View V3 positions'}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default DexSettings
