import React from 'react'
import { SimpleTokenProfile } from 'state/lhd/types'
import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import { formatDollar } from 'utils/formatNumbers'
import PriceChange from '../../FullProfile/components/PercentageChange'
import ProgressBar from '../../ProgressBar'
import { getColor } from '../../../utils/getColor'
import { styles } from '../styles'
import TokenImage from 'components/TokenImage'
import useIsMobile from 'hooks/useIsMobile'
import { useRouter } from 'next/router'
import Link from 'next/link'

const TableRow = ({ index, simpleProfile }: { index: number; simpleProfile: SimpleTokenProfile }) => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const qs = router.asPath.split('?')

  return (
    <Link
      sx={{ ...styles.linkItem }}
      href={`/liquidity-health/${simpleProfile.addressMapping.tokenAddresses[0].chainId}/${
        simpleProfile.addressMapping.tokenAddresses[0].address
      }${qs[1] !== undefined ? '?' + qs[1] : ''}`}
    >
      <Box sx={{ ...styles.tableRowContainer, background: index % 2 ? 'white3' : 'white2' }}>
        <Flex sx={{ ...styles.indexCol, background: index % 2 ? 'white3' : 'white2' }}>
          <Text sx={styles.indexText}>{simpleProfile?.ranking}</Text>
        </Flex>
        <Flex sx={{ ...styles.nameCol, background: index % 2 ? 'white3' : 'white2' }}>
          <TokenImage url={simpleProfile?.addressMapping?.tokenLogoUrl} size={30} />
          <Flex sx={{ flexDirection: 'column' }}>
            <Text sx={styles.symbolText}>{simpleProfile?.addressMapping?.tokenSymbol}</Text>
            <Text sx={styles.nameText}>
              {simpleProfile?.addressMapping?.tokenName.substring(0, isMobile ? 12 : 18).trim()}
              {simpleProfile?.addressMapping?.tokenName.length > (isMobile ? 12 : 18) ? '...' : ''}
            </Text>
          </Flex>
        </Flex>
        <Flex sx={styles.usdCol}>
          <Text>{formatDollar({ num: simpleProfile?.mcap?.reduce((sum, current) => sum + current.amount, 0) })}</Text>
        </Flex>
        <Flex sx={styles.usdCol}>
          <Text>
            <PriceChange priceChange={simpleProfile?.priceChange24hr?.toFixed(2)} />
          </Text>
        </Flex>
        <Flex sx={styles.usdCol}>
          <Text>{formatDollar({ num: simpleProfile?.extractableLiquidity })}</Text>
        </Flex>
        <Flex sx={styles.barCol}>
          <Flex sx={styles.barContainer}>
            <ProgressBar value={Math.floor(simpleProfile?.healthScore * 100)} position="left" />
          </Flex>
        </Flex>
        <Flex sx={styles.barCol}>
          <Flex sx={styles.barContainer}>
            <ProgressBar value={Math.floor(simpleProfile?.ownershipScore * 100)} position="left" />
            {simpleProfile?.ownershipScore === 0 && (
              <Text sx={{ fontWeight: 500, fontSize: '9px', mt: -4, color: 'textDisabled' }}>DATA NEEDED</Text>
            )}
          </Flex>
        </Flex>
        <Flex sx={styles.barCol}>
          <Flex sx={styles.barContainer}>
            <ProgressBar value={Math.floor(simpleProfile?.concentrationScore * 100)} position="left" />
          </Flex>
        </Flex>
        <Flex sx={{ ...styles.scoreCol, background: index % 2 ? 'white3' : 'white2' }}>
          <Text sx={{ fontWeight: 700, fontSize: '12px', color: getColor(simpleProfile?.totalScore * 100) }}>
            {Math.floor(simpleProfile?.totalScore * 100)?.toFixed()}
          </Text>
        </Flex>
      </Box>
    </Link>
  )
}

export default TableRow
