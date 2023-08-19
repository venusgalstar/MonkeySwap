// Components
import { Flex, Modal } from 'components/uikit'

// Types, Constants, Utils
import { DEX_ONLY_CHAINS, MAINNET_CHAINS } from 'config/constants/chains'
import NetworkOptionColumn from './NetworkOptionColumn'

const NetworkModal = ({
  onDismiss,
  onSetRequestPending,
  displayAll,
}: {
  onDismiss: () => void
  onSetRequestPending?: (reqFlag: boolean) => void
  displayAll: boolean
}) => {
  return (
    <Modal sx={{ width: ['250px', '250px', '250px', '250px'] }} title="Select Network" onDismiss={onDismiss}>
      <Flex sx={{ flexDirection: 'column' }}>
        <NetworkOptionColumn
          title="Primary Chains"
          onDismiss={onDismiss}
          onSetRequestPending={onSetRequestPending}
          chains={MAINNET_CHAINS}
        />
        {displayAll && (
          <NetworkOptionColumn
            title="Swap Only"
            onDismiss={onDismiss}
            onSetRequestPending={onSetRequestPending}
            chains={DEX_ONLY_CHAINS}
          />
        )}
      </Flex>
    </Modal>
  )
}

export default NetworkModal
