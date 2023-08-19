import React, { useState } from 'react'
import { useAppDispatch } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { styles } from 'views/Farms/components/styles'
import { Button, Flex } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import ListViewContent from 'components/ListView/ListViewContent'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { SupportedChainId } from '@ape.swap/sdk-core'
import useHarvest from '../hooks/useHarvest'
import { FarmTypes } from 'state/farms/types'
import { updateFarmUserEarnings } from 'state/farms'

interface HarvestActionsProps {
  id: string
  pid: number
  userEarningsUsd: string
  disabled: boolean
  userEarnings: string
  farmType: FarmTypes
  contractAddress?: string
  earnTokenSymbol?: string
}

const HarvestAction: React.FC<HarvestActionsProps> = ({
  id,
  pid,
  disabled,
  userEarningsUsd,
  userEarnings,
  farmType,
  contractAddress,
  earnTokenSymbol,
}) => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const handleHarvest = useHarvest(farmType, pid, contractAddress)
  const { t } = useTranslation()

  return (
    <Flex sx={styles.actionContainer}>
      <ListViewContent
        title={t('Earned')}
        value={userEarnings}
        valueIcon={
          <Flex sx={{ height: '16px', alignItems: 'center', mr: '3px' }}>
            <ServiceTokenDisplay token1={earnTokenSymbol} size={13} />
          </Flex>
        }
        value2={userEarningsUsd}
        value2Secondary
        value2Direction="column"
        style={styles.columnView}
      />
      <Flex sx={styles.depositContainer}>
        <Button
          disabled={disabled || pendingTrx}
          onClick={async () => {
            setPendingTrx(true)
            await handleHarvest()
            dispatch(updateFarmUserEarnings(chainId as SupportedChainId, id, account ?? ''))
            setPendingTrx(false)
          }}
          load={pendingTrx}
          sx={styles.styledBtn}
        >
          {t('HARVEST')}
        </Button>
      </Flex>
    </Flex>
  )
}

export default React.memo(HarvestAction)
