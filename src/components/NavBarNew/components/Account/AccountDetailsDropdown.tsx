// Components
import { styles } from './styles'
import { Flex, Svg, Text, Link } from 'components/uikit'
import NavBarThemeSwitcher from './NavBarThemeSwitcher'

// Hooks
import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { useCurrencyBalanceString } from 'lib/hooks/useCurrencyBalance'

// State
import { useAppDispatch } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'

// Constants & Utils
import { SupportedChainId } from '@ape.swap/sdk-core'
import { CHAIN_PARAMS, ChainId, NETWORK_ICONS } from 'config/constants/chains'
import { getEtherscanLink } from 'utils'

const AccountDetailsDropdown = ({ isVisible }: { isVisible: boolean }) => {
  const [isSuccessfulCopy, setIsSuccessfulCopy] = useState<boolean>(false)

  const { colorMode } = useThemeUI()
  const dispatch = useAppDispatch()
  const { account, chainId, connector } = useWeb3React()
  const balance = useCurrencyBalanceString(chainId ?? ChainId.BSC)

  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
  }, [connector])

  const handleCopy = () => {
    setIsSuccessfulCopy(true)
    navigator.clipboard.writeText(account || '')
    setTimeout(() => {
      setIsSuccessfulCopy(false)
    }, 1000)
  }

  return (
    <Flex
      sx={{
        ...styles.mainAccountDetailsContainer,
        display: isVisible ? 'flex' : 'none',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
      }}
    >
      {/* First Line of Account Info with copy, explorer, and logout buttons */}
      <Flex sx={styles.firstLineAccountDetailsContainer}>
        <Flex onClick={handleCopy} sx={styles.copyAddressContainer}>
          <Svg icon="wallet" />
          <Text sx={{ fontWeight: '400', px: '2' }} size="14px">
            {account?.slice(0, 4)}...
            {account?.slice(account?.length - 4, account?.length)}
          </Text>
          <Svg icon={isSuccessfulCopy ? 'success' : 'copy'} width={14} />
        </Flex>
        <Flex sx={{ gap: '10px', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Flex sx={styles.accountButton}>
            <Link href={getEtherscanLink(account || '', 'address', chainId ?? SupportedChainId.BSC)} target="_blank">
              <Svg icon="explorer" color="text" width={'100%'} />
            </Link>
          </Flex>
          <Flex
            sx={styles.accountButton}
            onClick={() => {
              disconnect(), dispatch(updateSelectedWallet({ wallet: undefined }))
            }}
          >
            <Svg icon="logout" color="text" />
          </Flex>
        </Flex>
      </Flex>

      {/* Second line of account info with asset holdings */}
      <Flex sx={{ flexDirection: 'column' }}>
        <Text sx={{ fontSize: '12px', lineHeight: '18px' }}>Native Asset Holdings:</Text>
        <Flex sx={styles.holdingsContainer}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <Svg icon={chainId ? NETWORK_ICONS[chainId as SupportedChainId] : 'error'} width="25px" />
            <Text sx={{ ml: '8px' }}>
              {chainId ? CHAIN_PARAMS[chainId as SupportedChainId]?.nativeCurrency?.symbol : 'Not Supported'}
            </Text>
          </Flex>
          <Flex>
            <Text sx={{ ml: '8px' }}>{balance}</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* TODO: Add key account links & txs here */}

      <NavBarThemeSwitcher />
    </Flex>
  )
}

export default AccountDetailsDropdown
