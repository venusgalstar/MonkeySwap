// Components
import styles from './styles'
import { Flex, Link, Svg, Text } from 'components/uikit'
import DexSettings from 'components/DexSettings'
import ZapSlippage from '../ZapSlippage'
import TransactionHistory from 'views/Swap/components/TransactionHistory'

// Hooks
import React, { useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import useModal from 'hooks/useModal'
import { useWeb3React } from '@web3-react/core'
import useFetchLifiTxHistory from 'state/swap/hooks/useFetchLifiTxHistory'

// Types, Constants, Utils
import { ChainId, DEX_ONLY_CHAINS } from 'config/constants/chains'

interface DexNavProps {
  zapSettings?: boolean
}

const DexNav: React.FC<DexNavProps> = ({ zapSettings }) => {
  const { t } = useTranslation()
  const { pathname, push } = useRouter()
  const { chainId, account } = useWeb3React()
  const { refetch, data: rawTransactions } = useFetchLifiTxHistory(account || '')

  // Check for pending txs & refetch on any account changes
  const isPendingTx = rawTransactions?.some((tx) => tx?.status === 'PENDING')
  useEffect(() => {
    refetch()
  }, [account, refetch])

  const onLiquidity =
    pathname?.includes('add-liquidity') ||
    pathname?.includes('liquidity') ||
    pathname?.includes('remove') ||
    pathname?.includes('find') ||
    pathname?.includes('zap') ||
    pathname?.includes('migrate') ||
    pathname?.includes('unstake')

  const [onPresentSettingsModal] = useModal(<DexSettings />)
  const [onPresentZapSettingsModal] = useModal(<ZapSlippage />)
  const [onViewTxHistory] = useModal(<TransactionHistory />)

  return (
    <Flex sx={styles.dexNavContainer}>
      <Flex sx={{ ...styles.navLinkContainer, justifyContent: 'flex-start' }}>
        <Text
          size="14px"
          variant="link"
          sx={{
            ...styles.navLink,
            color: !pathname?.includes('swap') && 'textDisabled',
            mr: '20px',
          }}
          onClick={() => push('/swap')}
          id="swap-link"
        >
          {t('Swap')}
        </Text>
        {!DEX_ONLY_CHAINS.includes(chainId as ChainId) && (
          <Text
            size="14px"
            variant="link"
            sx={{
              ...styles.navLink,
              color: !onLiquidity && 'textDisabled',
            }}
            onClick={() => push('/zap')}
            id="liquidity-link"
            className="liquidity"
          >
            {t('Liquidity')}
          </Text>
        )}
      </Flex>
      <Flex sx={styles.navIconContainer}>
        <Flex
          sx={{
            width: '90px',
            justifyContent: 'space-between',
            mt: '5px',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          <Link href="?modal=tutorial">
            <Svg icon="quiz" />
          </Link>
          <Flex sx={{ cursor: 'pointer', mb: '6px', ml: '2px', position: 'relative' }} onClick={onViewTxHistory}>
            {isPendingTx && <Flex sx={styles.pendingTxDot}></Flex>}
            <Svg icon="receipt" />
          </Flex>
          <Flex
            onClick={zapSettings ? onPresentZapSettingsModal : onPresentSettingsModal}
            sx={{ cursor: 'pointer', mb: '6px' }}
          >
            <Svg icon="cog" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DexNav
