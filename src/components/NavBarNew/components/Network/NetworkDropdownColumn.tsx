// Components
import { Flex, Svg, Text } from 'components/uikit'
import { styles } from './styles'

// Hooks
import { useWeb3React } from '@web3-react/core'
import useSelectChain from 'hooks/useSelectChain'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedNetwork } from 'state/user/reducer'
import { useRouter } from 'next/router'

// Constants
import { ChainId, NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'

const NetworkDropdownColumn = ({
  chains,
  title,
  isDexOnly,
}: {
  chains: ChainId[]
  title: string
  isDexOnly: boolean
}) => {
  const selectChain = useSelectChain()
  const dispatch = useAppDispatch()
  const { chainId: selectedChainId } = useWeb3React()
  const { push } = useRouter()

  return (
    <Flex sx={styles.networkColumnContainer}>
      <Text sx={styles.columnTitleText}>{title}</Text>
      {chains
        .sort((chainId) => (chainId === selectedChainId ? -1 : 1))
        //.slice(0, isDexOnly ? 10 : 4) Commenting out until we have too many chains
        .map((chainId: ChainId) => {
          return (
            <Flex
              fullWidth
              key={chainId}
              sx={{ ...styles.networkOptionContainer, border: selectedChainId === chainId ? 'solid 2px #FFB300' : '' }}
              onClick={async () => {
                if (!isDexOnly) {
                  selectChain(chainId)
                } else {
                  selectChain(chainId).then(() => push('/swap'))
                }
                dispatch(updateSelectedNetwork({ chainId: chainId }))
              }}
            >
              <Flex sx={styles.networkOptionContent}>
                <Svg icon={NETWORK_ICONS[chainId]} width="27.5px" />
                <Text weight="400" size="15px" ml="10px" sx={{ lineHeight: '0px' }}>
                  {NETWORK_LABEL[chainId]}
                </Text>
                <Flex sx={{ ml: 'auto' }}>
                  {selectedChainId === chainId && <Svg icon="successOutline" color="yellow" width="18px" />}
                </Flex>
              </Flex>
            </Flex>
          )
        })}
      {/* {
        // This is for the 'MORE' option, commenting out until we have too many chains
        isDexOnly && (
          <Flex
            fullWidth
            sx={{ ...styles.networkOptionContainer }}
            onClick={async () => {
              alert('Coming soon')
            }}
          >
            <Flex sx={styles.networkOptionContent}>
              <Svg icon="more" width="27.5px" />
              <Text weight="400" size="15px" ml="10px" sx={{ lineHeight: '0px' }}>
                More Chains
              </Text>
              <Flex sx={{ ml: 'auto' }} />
            </Flex>
          </Flex>
        )
      } */}
    </Flex>
  )
}

export default NetworkDropdownColumn
