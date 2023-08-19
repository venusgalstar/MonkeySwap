import { useWeb3React } from '@web3-react/core'
import { Flex, Text } from 'components/uikit'
import { getChainInfo } from 'config/constants/chains'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import useMachineTimeMs from 'hooks/useMachineTime'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { useEffect, useMemo, useState } from 'react'
import { Spinner } from 'theme-ui'

const DEFAULT_MS_BEFORE_WARNING = 600000
const NETWORK_HEALTH_CHECK_MS = 10000

const NetworkMonitor = () => {
  const { chainId } = useWeb3React()
  const blockNumber = useBlockNumber()
  const [isMounting, setIsMounting] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const machineTime = useMachineTimeMs(NETWORK_HEALTH_CHECK_MS)
  const blockTime = useCurrentBlockTimestamp()

  const waitMsBeforeWarning =
    (chainId ? getChainInfo(chainId)?.blockWaitMsBeforeWarning : DEFAULT_MS_BEFORE_WARNING) ?? DEFAULT_MS_BEFORE_WARNING

  const warning = Boolean(!!blockTime && machineTime - blockTime.mul(1000).toNumber() > waitMsBeforeWarning)

  useEffect(
    () => {
      if (!blockNumber) {
        return
      }

      setIsMounting(true)
      const mountingTimer = setTimeout(() => setIsMounting(false), 1000)

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        clearTimeout(mountingTimer)
      }
    },
    [blockNumber], //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  )

  //   const blockExternalLinkHref = useMemo(() => {
  //     if (!chainId || !blockNumber) return ''
  //     return getEtherscanLink(chainId, blockNumber.toString(), ExplorerDataType.BLOCK)
  //   }, [blockNumber, chainId])

  return blockNumber ? (
    <Flex
      sx={{
        position: 'fixed',
        display: ['none', 'none', 'none', 'flex'],
        bottom: '10px',
        left: '10px',
        width: 'fit-content',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 103,
      }}
    >
      <Flex sx={{ alignItems: 'center', height: '20px', width: 'auto' }}>
        <Text color={warning ? 'yellow' : 'success'} size="10px" sx={{ lineHeight: '10px' }}>
          {blockNumber}&ensp;
        </Text>
        <Flex
          sx={{
            transform: 'translate(-4px, -1px)',
            alignItems: 'center',
            justifyContent: 'center',
            height: '15px',
            width: '20px',
          }}
        >
          <Flex
            sx={{
              position: 'absolute',
              height: '5px',
              width: '5px',
              borderRadius: '5px',
              background: warning ? 'yellow' : 'success',
            }}
          />
          {isMounting && <Spinner size={14} color={warning ? 'yellow' : 'success'} />}
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <></>
  )
}

export default NetworkMonitor
