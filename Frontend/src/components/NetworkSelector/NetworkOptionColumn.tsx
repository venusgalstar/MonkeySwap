// Components
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'

// Hooks
import { useWeb3React } from '@web3-react/core'
import useSelectChain from 'hooks/useSelectChain'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedNetwork } from 'state/user/reducer'

// Types, Constants, Utils
import { ChainId, NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'

const NetworkOptionColumn = ({
  onDismiss,
  onSetRequestPending,
  chains,
  title,
}: {
  onDismiss: () => void
  onSetRequestPending?: (reqFlag: boolean) => void
  chains: ChainId[]
  title: string
}) => {
  const selectChain = useSelectChain()
  const dispatch = useAppDispatch()
  const { chainId: selectedChainId } = useWeb3React()

  return (
    <>
      <Text sx={{ mt: '6px' }}>{title}</Text>
      {chains.map((chainId: ChainId) => {
        return (
          <Flex
            key={chainId}
            sx={{
              width: '100%',
              margin: '5px 0px',
              height: '43px',
              background: 'white3',
              borderRadius: '8px',
              border: selectedChainId === chainId ? '2px solid #FFCD38' : 'none',
              ':hover': {
                cursor: 'pointer',
                background: 'white4',
              },
            }}
            onClick={async () => {
              if (onSetRequestPending) {
                onSetRequestPending(true)
                selectChain(chainId)
                  .then(() => onSetRequestPending(false))
                  .catch(() => onSetRequestPending(false))
              } else {
                selectChain(chainId)
              }
              dispatch(updateSelectedNetwork({ chainId: chainId }))
              onDismiss()
            }}
          >
            <Flex
              sx={{
                pl: '15px',
                alignItems: 'center',
              }}
            >
              <Svg icon={NETWORK_ICONS[chainId]} width="27.5px" />
              <Text weight="500" size="16px" ml="15px" sx={{ lineHeight: '0px' }}>
                {NETWORK_LABEL[chainId]}
              </Text>
            </Flex>
          </Flex>
        )
      })}
    </>
  )
}

export default NetworkOptionColumn
