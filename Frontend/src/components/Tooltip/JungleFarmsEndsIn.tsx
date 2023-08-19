import React from 'react'
import useCurrentTime from 'hooks/useTimer'
import getTimePeriods from 'utils/getTimePeriods'
import { styles } from './styles'
import { Farm } from 'state/farms/types'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { BSC_BLOCK_TIME } from 'state/farms/fetchFarms'
import { Flex, Text } from 'components/uikit'

const JungleFarmsEndsIn: React.FC<{ farm: Farm }> = ({ farm }) => {
  const currentBlock = useBlockNumber() ?? 0
  const currentTime = useCurrentTime()
  const endBlock = farm?.endBlock ?? 0
  const startBlock = farm?.startBlock ?? 0
  const timeUntilStart = farm?.rewardsPerSecond
    ? getTimePeriods(Math.max(startBlock - currentTime / 1000, 0), true)
    : getTimePeriods(Math.max(startBlock - currentBlock, 0) * BSC_BLOCK_TIME, true)
  const timeUntilEnd = farm?.rewardsPerSecond
    ? getTimePeriods(Math.max(endBlock - currentTime / 1000, 0), true)
    : getTimePeriods(Math.max(endBlock - currentBlock, 0) * BSC_BLOCK_TIME, true)

  return (
    <Flex sx={{ mt: '5px' }}>
      {endBlock > 0 && farm?.rewardToken?.symbol !== 'BANANA' && (
        <Flex sx={styles.infoRow}>
          {farm?.rewardsPerSecond ? (
            <Text sx={styles.titleText}>{startBlock > currentTime / 1000 ? 'Starts in' : 'Ends in'}:</Text>
          ) : (
            <Text sx={styles.titleText}>{startBlock > currentBlock ? 'Starts in' : 'Ends in'}:</Text>
          )}
          {farm?.rewardsPerSecond ? (
            <Text sx={styles.contentText}>
              {startBlock > currentTime / 1000
                ? `${timeUntilStart.days}d, ${timeUntilStart.hours}h, ${timeUntilStart.minutes}m`
                : `${timeUntilEnd.days}d, ${timeUntilEnd.hours}h, ${timeUntilEnd.minutes}m`}
            </Text>
          ) : (
            <Text sx={styles.contentText}>
              {startBlock > currentBlock
                ? `${timeUntilStart.days}d, ${timeUntilStart.hours}h, ${timeUntilStart.minutes}m`
                : `${timeUntilEnd.days}d, ${timeUntilEnd.hours}h, ${timeUntilEnd.minutes}m`}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default JungleFarmsEndsIn
