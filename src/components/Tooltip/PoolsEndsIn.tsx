import React from 'react'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { Flex, Text } from 'components/uikit'
import { Pool } from 'state/pools/types'
import { BSC_BLOCK_TIME } from 'state/pools/fetchPools'

const PoolsEndsIn: React.FC<{ pool: Pool }> = ({ pool }) => {
  const currentBlock = useBlockNumber() ?? 0
  const { t } = useTranslation()
  const timeUntilStart = getTimePeriods(Math.max((pool?.startBlock ?? 0) - currentBlock, 0) * BSC_BLOCK_TIME, true)
  const timeUntilEnd = getTimePeriods(
    Math.max(parseInt(pool?.endBlock ?? '0') - currentBlock, 0) * BSC_BLOCK_TIME,
    true,
  )
  return (
    <Flex sx={{ mt: '5px' }}>
      {(pool?.endBlock ?? 0) > 0 && pool?.rewardToken?.symbol !== 'BANANA' && (
        <Flex sx={styles.infoRow}>
          <Text sx={styles.titleText}>{(pool?.startBlock ?? 0) > currentBlock ? t('Starts in') : t('Ends in')}:</Text>
          <Text sx={styles.contentText}>
            {(pool?.startBlock ?? 0) > currentBlock
              ? `${timeUntilStart.days}d, ${timeUntilStart.hours}h, ${timeUntilStart.minutes}m`
              : `${timeUntilEnd.days}d, ${timeUntilEnd.hours}h, ${timeUntilEnd.minutes}m`}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(PoolsEndsIn)
