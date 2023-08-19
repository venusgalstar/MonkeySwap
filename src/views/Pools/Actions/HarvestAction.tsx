import React, { useState } from 'react'
import { fetchPoolsUserDataAsync, updateUserPendingReward } from 'state/pools'
import { useTranslation } from 'contexts/Localization'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { useSousHarvest } from '../hooks/useHarvest'
import { useSousStake } from '../hooks/useStake'
import { SupportedChainId } from '@ape.swap/sdk-core'
import ListViewContent from 'components/ListView/ListViewContent'
import { Button, Flex } from 'components/uikit'
import { poolStyles } from '../components/styles'
import useDebounce from '../../../hooks/useDebounce'
import { useToastError } from '../../../state/application/hooks'
import ApprovalAction from './ApprovalAction'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/getBalanceNumber'

interface HarvestActionsProps {
  sousId: number
  userEarnings: number
  earnTokenSymbol: string
  earnTokenValueUsd: number
  disabled: boolean
  rawAllowance: string
  stakeTokenAddress: string
}

const HarvestAction: React.FC<HarvestActionsProps> = ({
  sousId,
  earnTokenSymbol,
  disabled,
  userEarnings,
  earnTokenValueUsd,
  rawAllowance,
  stakeTokenAddress,
}) => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const [pendingApeHarderTrx, setPendingApeHarderTrx] = useState(false)
  const debouncedPendingApeHarder = useDebounce(pendingApeHarderTrx, 500)
  const { onHarvest } = useSousHarvest(sousId)
  const { onStake } = useSousStake(sousId, earnTokenValueUsd)
  const isBananaBanana = sousId === 0
  const toastError = useToastError()
  const allowance = getBalanceNumber(new BigNumber(rawAllowance), 18)
  const { t } = useTranslation()
  const userTokenBalanceUsd = (userEarnings * earnTokenValueUsd).toFixed(2)

  const handleHarvest = async () => {
    setPendingTrx(true)
    await onHarvest().catch((e) => {
      console.error(e)
      toastError(e)
      setPendingTrx(false)
    })
    dispatch(updateUserPendingReward(chainId as SupportedChainId, sousId, account ?? ''))
    setPendingTrx(false)
  }

  const handleApeHarder = async () => {
    setPendingApeHarderTrx(true)
    await onStake(userEarnings.toString()).catch((e) => {
      console.error(e)
      toastError(e)
      setPendingApeHarderTrx(false)
    })
    dispatch(fetchPoolsUserDataAsync(chainId as SupportedChainId, account ?? ''))
    setPendingApeHarderTrx(false)
  }

  return (
    <Flex sx={{ ...poolStyles.actionContainer, minWidth: isBananaBanana && ['', '', '', '380px'] }}>
      <ListViewContent
        title={t('Earned')}
        value={userEarnings?.toFixed(3)}
        valueIcon={
          <Flex sx={{ height: '16px', alignItems: 'center', mr: '3px' }}>
            <ServiceTokenDisplay token1={earnTokenSymbol} size={13} />
          </Flex>
        }
        value2={`$${userTokenBalanceUsd}`}
        value2Secondary
        value2Direction="column"
        style={poolStyles.columnView}
      />
      <Button
        disabled={disabled || pendingTrx}
        onClick={handleHarvest}
        load={pendingTrx}
        sx={
          isBananaBanana
            ? poolStyles.fixedSizedBtn
            : {
                ...poolStyles.styledBtn,
                '&:disabled': {
                  background: 'white4',
                },
              }
        }
      >
        {t('HARVEST')}
      </Button>
      {isBananaBanana && (
        <Flex
          sx={{
            width: ['100%', '100%', '100%', 'unset'],
            margin: ['15px 0 0 0', '15px 0 0 0', '15px 0 0 0', '0 10px'],
          }}
        >
          {new BigNumber(allowance)?.lte(userEarnings) && userEarnings > 0.001 ? (
            <ApprovalAction stakingTokenContractAddress={stakeTokenAddress} sousId={sousId} width={'100%'} hasDarkBg />
          ) : (
            <Button
              size="md"
              disabled={disabled || pendingApeHarderTrx}
              onClick={handleApeHarder}
              load={debouncedPendingApeHarder && pendingApeHarderTrx}
              sx={{
                ...poolStyles.apeHarder,
                padding: pendingApeHarderTrx ? '10px 0px' : '10px',
                minWidth: pendingApeHarderTrx ? '150px' : ['130px', '130px', '130px', '125px'],
              }}
            >
              {t('APE HARDER')}
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(HarvestAction)
