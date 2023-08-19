// Hooks
import { useWeb3React } from '@web3-react/core'
import { useMemo, useState } from 'react'

// Components
import { styles } from './styles'
import Image from 'next/image'
import { Spinner } from 'theme-ui'
import { Flex, Svg, Text } from 'components/uikit'
import AccountDetailsDropdown from './AccountDetailsDropdown'

// State
import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'
import { useAllTransactions } from 'state/transactions/hooks'

const AccountLoggedIn = () => {
  const { account } = useWeb3React()
  const transactions = useAllTransactions()
  const pendingTransactions = useMemo(() => Object.values(transactions).filter((tx) => !tx.receipt), [transactions])
  const profileImage = useAppSelector((state: AppState) => state.application.profileImage)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return account ? (
    <Flex>
      <Flex
        sx={styles.accountLoggedInMainContainer}
        onFocus={() => setIsHovered(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* If any txs pending, show a loader */}
        {pendingTransactions?.length > 0 ? (
          <>
            <Flex
              onClick={() => setIsHovered(!isHovered)}
              sx={{ ...styles.hideOnMobile, alignItems: 'center', mr: '10px' }}
            >
              <Text sx={{ fontWeight: '400' }} mr="5px">
                {pendingTransactions.length}
              </Text>
              <Text sx={{ fontWeight: '400' }}> tx pending </Text>
            </Flex>
            <Spinner size={20} />
          </>
        ) : (
          <>
            {/* If no txs show either profile or icon, adapted to mobile/desktop */}
            {profileImage ? (
              <Image
                onClick={() => setIsHovered(!isHovered)}
                src={profileImage}
                alt=""
                width={24}
                height={24}
                sx={{ borderRadius: '15px' }}
              />
            ) : (
              <Flex onClick={() => setIsHovered(!isHovered)}>
                <Svg icon="settings" width="18px" />
              </Flex>
            )}
            <Text
              onClick={() => setIsHovered(!isHovered)}
              sx={{ fontWeight: '400', ...styles.hideOnMobile }}
              size="14px"
            >
              {account.slice(0, 4)}...
              {account.slice(account.length - 4, account.length)}
            </Text>
          </>
        )}
        <AccountDetailsDropdown isVisible={isHovered} />
      </Flex>
    </Flex>
  ) : (
    <></>
  )
}

export default AccountLoggedIn
