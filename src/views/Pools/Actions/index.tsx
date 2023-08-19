/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import DepositModal from '../Modals/DepositModal'
import { fetchPoolsUserDataAsync } from 'state/pools'
import WithdrawModal from 'components/WithdrawModal'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import useModal from 'hooks/useModal'
import ListViewContent from 'components/ListView/ListViewContent'
import { Button, Flex } from 'components/uikit'
import ConnectWalletButton from 'components/ConnectWallet'
import { poolStyles } from '../components/styles'
import { useSousStake } from '../hooks/useStake'
import { useSousUnstake } from '../hooks/useUnstake'
import { useToastError } from 'state/application/hooks'

interface CardActionProps {
  allowance: string
  stakingTokenBalance: string
  stakedTokenSymbol: string
  stakedBalance: string
  stakeTokenValueUsd: number
  stakeTokenAddress: string
  sousId: number
}

const Actions: React.FC<CardActionProps> = ({
  allowance,
  stakingTokenBalance,
  stakedTokenSymbol,
  stakedBalance,
  stakeTokenValueUsd,
  stakeTokenAddress,
  sousId,
}) => {
  const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(new BigNumber(stakedBalance) || new BigNumber(0)) * stakeTokenValueUsd
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)
  const toastError = useToastError()
  const { onStake } = useSousStake(sousId, stakeTokenValueUsd)
  const { onUnstake } = useSousUnstake(sousId)
  const { t } = useTranslation()

  const [onPresentDeposit, closeDepositModal] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      tokenName={stakedTokenSymbol}
      rawAllowance={allowance}
      stakeTokenAddress={stakeTokenAddress}
      sousId={sousId}
      onConfirm={async (val) => {
        setPendingDepositTrx(true)
        await onStake(val)
          .then(() => {
            closeDepositModal()
          })
          .catch((e: any) => {
            console.error(e)
            toastError(e)
            setPendingDepositTrx(false)
          })
        dispatch(fetchPoolsUserDataAsync(chainId as SupportedChainId, account ?? ''))
        setPendingDepositTrx(false)
      }}
    />,
    true,
    true,
    `depositPoolModal${stakeTokenAddress}-${sousId}`,
  )

  const [onPresentWithdraw, closeWithdrawModal] = useModal(
    <WithdrawModal
      max={stakedBalance}
      title={`${t('Unstake')} ${stakedTokenSymbol}`}
      onConfirm={async (val) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then(() => {
            closeWithdrawModal()
          })
          .catch((e: any) => {
            console.error(e)
            toastError(e)
            setPendingWithdrawTrx(false)
          })
        dispatch(fetchPoolsUserDataAsync(chainId as SupportedChainId, account ?? ''))
        setPendingWithdrawTrx(false)
      }}
    />,
    true,
    true,
    `withdrawPoolModal${stakeTokenAddress}-${sousId}`,
  )

  return (
    <Flex sx={poolStyles.actionContainer}>
      <ListViewContent
        title={t('Staked')}
        value={`${!account ? '0.000' : rawStakedBalance.toFixed(2)}`}
        value2={!account ? '$0.00' : userStakedBalanceUsd}
        value2Secondary
        value2Direction="column"
        style={{ flexDirection: 'column' }}
      />
      <Flex sx={poolStyles.depositContainer}>
        {!account ? (
          <ConnectWalletButton />
        ) : firstStake ? (
          <Button
            onClick={onPresentDeposit}
            load={pendingDepositTrx}
            disabled={pendingDepositTrx}
            sx={poolStyles.styledBtn}
          >
            {t('DEPOSIT')}
          </Button>
        ) : (
          <Flex sx={poolStyles.stakeActions}>
            <Button
              onClick={onPresentWithdraw}
              load={pendingWithdrawTrx}
              disabled={pendingWithdrawTrx}
              sx={poolStyles.smallBtn}
              mr="10px"
              size="sm"
            >
              {!pendingWithdrawTrx && <>-</>}
            </Button>
            <Button
              onClick={onPresentDeposit}
              load={pendingDepositTrx}
              disabled={pendingDepositTrx || !new BigNumber(stakingTokenBalance)?.gt(0)}
              sx={poolStyles.smallBtn}
              size="sm"
            >
              {!pendingDepositTrx && <>+</>}
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(Actions)
