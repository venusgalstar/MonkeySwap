import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { styles } from 'views/Farms/components/styles'
import { Button } from 'components/uikit'
import { FarmTypes } from 'state/farms/types'
import useHarvestAll from '../hooks/useHarvestAll'
import { useToastError } from '../../../state/application/hooks'

interface HarvestActionsProps {
  pids: number[]
  disabled: boolean
  farmType: FarmTypes[]
  contractAddress: string[]
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ pids, disabled, farmType, contractAddress }) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const handleHarvest = useHarvestAll(farmType, pids, contractAddress)
  const toastError = useToastError()
  const { t } = useTranslation()

  return (
    <Button
      disabled={disabled || pendingTrx}
      onClick={async () => {
        setPendingTrx(true)
        await handleHarvest()
          .then(() => {})
          .catch((e: any) => {
            console.error(e)
            toastError(e)
            setPendingTrx(false)
          })
        setPendingTrx(false)
      }}
      load={pendingTrx}
      sx={styles.harvestAllBtn}
    >
      {t('HARVEST ALL')} ({pids.length})
    </Button>
  )
}

export default HarvestAction
