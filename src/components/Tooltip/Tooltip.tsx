import React from 'react'
import { useTranslation } from '../../contexts/Localization'
import { styles } from './styles'
import { BLOCK_EXPLORER } from '../../config/constants/chains'
import ButtonsRow from './ButtonsRow'
import { Flex, Link, Text } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Farm } from 'state/farms/types'
import JungleFarmsEndsIn from './JungleFarmsEndsIn'
import { Pool } from 'state/pools/types'
import PoolsEndsIn from './PoolsEndsIn'
import { Svg } from '../uikit'
import { Box } from 'theme-ui'

export interface TooltipProps {
  valueTitle?: string
  valueContent?: string
  value2Title?: string
  value2Content?: string
  tokenContract: string
  secondURL?: string
  secondURLTitle?: string
  projectLink?: string
  twitter?: string
  audit?: string
  jungleFarm?: Farm
  pool?: Pool
  thirdURL?: string
  thirdURLTitle?: string
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
  valueTitle,
  valueContent,
  value2Title,
  value2Content,
  tokenContract,
  secondURL,
  secondURLTitle,
  projectLink,
  twitter,
  audit,
  jungleFarm,
  pool,
  thirdURL,
  thirdURLTitle,
}) => {
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const explorerLink = BLOCK_EXPLORER[chainId as SupportedChainId]
  const tokenLink = `${explorerLink}/address/${tokenContract}`

  return (
    <>
      {projectLink && twitter && (
        <ButtonsRow twitter={twitter} projectLink={projectLink} bubble={tokenContract} audit={audit} />
      )}
      {valueTitle && (
        <Flex sx={styles.infoRow}>
          <Text sx={styles.titleText}>{valueTitle}: </Text>
          <Text sx={styles.contentText}>{valueContent}</Text>
        </Flex>
      )}
      {value2Title && (
        <Flex sx={styles.infoRow}>
          <Text sx={styles.titleText}>{value2Title}: </Text>
          <Text sx={styles.contentText}>{value2Content}</Text>
        </Flex>
      )}
      {jungleFarm && <JungleFarmsEndsIn farm={jungleFarm} />}
      {pool && <PoolsEndsIn pool={pool} />}
      <Flex sx={{ justifyContent: 'center' }}>
        <Flex sx={{ width: '144px', flexDirection: 'column' }}>
          <Flex sx={styles.linkRow}>
            <Link href={tokenLink} sx={styles.link} target="_blank">
              {t('View Token Contract')}
              <Flex sx={{ ml: '5px' }}>
                <Svg icon="external" color="text" width={10} />
              </Flex>
            </Link>
          </Flex>
          {secondURL && (
            <Flex sx={styles.linkRow}>
              <Link href={secondURL} sx={styles.link} target="_blank">
                {secondURLTitle}
                <Flex sx={{ ml: '5px' }}>
                  <Svg icon="external" color="text" width={10} />
                </Flex>
              </Link>
            </Flex>
          )}
          {thirdURL && (
            <Flex sx={styles.linkRow}>
              <Link href={thirdURL} sx={styles.link} target="_blank">
                {thirdURLTitle}
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Tooltip
