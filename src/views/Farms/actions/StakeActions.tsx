import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import DepositModal from '../components/Modals/DepositModal'
import WithdrawModal from 'components/WithdrawModal'
import { styles } from '../components/styles'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import useStake from '../hooks/useStake'
import useUnstake from '../hooks/useUnstake'
import { FarmTypes } from 'state/farms/types'
import { Button, Flex } from 'components/uikit'
import useModal from 'hooks/useModal'
import ConnectWalletButton from 'components/ConnectWallet'
import { fetchFarmUserDataAsync } from 'state/farms'
import { SupportedChainId } from '@ape.swap/sdk-core'
import track from 'utils/track'
import { useToastError } from 'state/application/hooks'

interface StakeActionsProps {
  id: string
  stakingTokenBalance: string
  stakedBalance: string
  lpValueUsd: number
  pid: number
  allowance: string
  stakeLpAddress: string
  farmTypes: FarmTypes
  contractAddress?: string
}

const StakeAction: React.FC<StakeActionsProps> = ({
  stakingTokenBalance,
  stakedBalance,
  lpValueUsd,
  pid,
  allowance,
  stakeLpAddress,
  farmTypes,
  contractAddress,
}) => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)
  const [depositAmount, setDepositAmount] = useState<string>()
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)
  const { t } = useTranslation()
  const onStake = useStake(farmTypes, pid, contractAddress)
  const onUnstake = useUnstake(farmTypes, pid, contractAddress)
  const toastError = useToastError()

  const [onPresentDeposit, closeDepositModal] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      stakeLpAddress={stakeLpAddress}
      farmTypes={farmTypes}
      contractAddress={contractAddress}
      rawAllowance={allowance}
      onConfirm={async (val: string) => {
        setDepositAmount(val)
        setPendingDepositTrx(true)
        await onStake(val)
          .then(() => {
            track({
              event: 'farm',
              chain: chainId,
              data: {
                cat: 'stake',
                depositAmount,
                pid,
                usdAmount: parseFloat(depositAmount ?? '0') * lpValueUsd,
              },
            })
            closeDepositModal()
          })
          .catch((e) => {
            console.error(e)
            toastError(e)
            setPendingDepositTrx(false)
          })
        dispatch(fetchFarmUserDataAsync(chainId as SupportedChainId, account ?? ''))
        setPendingDepositTrx(false)
      }}
    />,
    true,
    true,
    `depositFarmModal${stakeLpAddress}`,
  )

  const [onPresentWithdraw, closeWithdrawModal] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val: string) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then(() => {
            track({
              event: 'farm',
              chain: chainId,
              data: {
                cat: 'unstake',
                depositAmount,
                pid,
                usdAmount: parseFloat(depositAmount ?? '0') * lpValueUsd,
              },
            })
            closeWithdrawModal()
          })
          .catch((e) => {
            console.error(e)
            toastError(e)
            setPendingWithdrawTrx(false)
          })
        dispatch(fetchFarmUserDataAsync(chainId as SupportedChainId, account ?? ''))
        setPendingWithdrawTrx(false)
      }}
      title={'Unstake LP tokens'}
    />,
    true,
    true,
    `withDrawFarmModal${stakeLpAddress}`,
  )

  const renderStakingButtons = () => {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (firstStake) {
      return (
        <Button
          onClick={onPresentDeposit}
          load={pendingDepositTrx}
          disabled={pendingDepositTrx || parseFloat(stakingTokenBalance ?? '0') === 0}
          sx={styles.styledBtn}
        >
          {t('DEPOSIT')}
        </Button>
      )
    }
    return (
      <Flex sx={styles.stakeActions}>
        <Button
          onClick={onPresentWithdraw}
          load={pendingWithdrawTrx}
          disabled={pendingWithdrawTrx}
          mr="10px"
          size="sm"
          sx={styles.smallBtn}
        >
          -
        </Button>
        <Button
          onClick={onPresentDeposit}
          load={pendingDepositTrx}
          disabled={pendingDepositTrx || !new BigNumber(stakingTokenBalance)?.gt(0)}
          size="sm"
          sx={styles.smallBtn}
        >
          +
        </Button>
      </Flex>
    )
  }

  return renderStakingButtons()
}

export default React.memo(StakeAction)
