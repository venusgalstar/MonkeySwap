import { useState } from 'react'
import { LiquidityPool } from 'state/lhd/types'
import { Box } from 'theme-ui'
import { Flex, Svg, Text } from '../../../../../../../components/uikit'
import { formatDollar } from '../../../../../../../utils/formatNumbers'
import IconButton from '../../IconButton'
import { styles } from './styles'
import { useTranslation } from '../../../../../../../contexts/Localization'
import TokenImage from '../../../../../../../components/TokenImage'
import { CHAIN_DETAILS } from 'views/LHD/utils/config'

const TableRow = ({ index, pool }: { index: number; pool: LiquidityPool }) => {
  const NON_STANDARD_LPS = ['balancer', 'beethovenx']
  const [isCopied, setIsCopied] = useState(false)
  const { t } = useTranslation()

  const handleCopyClick = (address: string) => {
    setIsCopied(true)
    navigator.clipboard.writeText(address)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const getBlockExplorerURL = (chain: string, address: string, dex: string) => {
    // Filter out DEXs that don't have normal LP links
    if (NON_STANDARD_LPS.includes(dex)) return ''

    // Otherwise, use the block explorer for the chain
    const chainInfo = CHAIN_DETAILS.find((chainOption) => chainOption.chainId === chain)
    if (chainInfo) return `${chainInfo.blockExplorer?.url}address/${address}`
    return ''
  }
  const tokenLogo1 = pool.baseToken.tokenLogoUrl
  const tokenLogo2 = pool.quoteToken.tokenLogoUrl

  return (
    <Box sx={{ ...styles.rowCont, background: index % 2 ? 'white3' : 'white2' }}>
      <Flex sx={{ ...styles.index, background: index % 2 ? 'white3' : 'white2' }}>{index + 1}</Flex>
      <Flex sx={{ ...styles.lpNameCol, background: index % 2 ? 'white3' : 'white2' }}>
        <Flex sx={{ position: 'relative', minWidth: ['40px'] }}>
          <Flex sx={styles.imgCont}>
            <TokenImage url={tokenLogo1} size={22} />
          </Flex>
          <Flex sx={{ ...styles.imgCont, position: 'absolute', right: '0px', zIndex: -1 }}>
            <TokenImage url={tokenLogo2} size={22} />
          </Flex>
        </Flex>
        <Text sx={{ ...styles.bodyText, ml: '5px' }}>
          {pool?.baseToken?.symbol.toUpperCase()}-{pool?.quoteToken?.symbol.toUpperCase()}
        </Text>
      </Flex>
      <Flex sx={styles.colCont}>
        {pool.isHardAssetPair ? (
          <Text sx={{ ...styles.bodyText, color: 'success' }}>{t('Valid')}</Text>
        ) : (
          <Text sx={{ ...styles.bodyText, color: 'error' }}>{t('Invalid')}</Text>
        )}
      </Flex>
      <Flex sx={styles.colCont}>
        <Text sx={styles.bodyText}>{formatDollar({ num: pool?.pairTotalLiquidityUsd })}</Text>
      </Flex>
      <Flex sx={styles.colCont}>
        <Text sx={styles.bodyText}>{formatDollar({ num: pool?.pairExtractableLiquidityUsd })}</Text>
      </Flex>
      <Flex sx={styles.colCont}>
        <Text sx={styles.bodyText}>{pool?.chainName}</Text>
      </Flex>
      <Flex sx={styles.colCont}>
        <Text
          sx={{
            ...styles.bodyText,
            textTransform: 'capitalize',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {pool?.dex === 'apeswap' && (
            <Flex sx={{ mr: '3px' }}>
              <Svg icon="logo" width={15} />
            </Flex>
          )}
          {pool?.dex}
          <Text sx={{ textTransform: 'capitalize', ml: '2px' }}>{pool?.tags}</Text>
        </Text>
      </Flex>
      <Flex sx={{ ...styles.colCont, justifyContent: 'flex-end' }}>
        <Text sx={{ fontWeight: 500, fontSize: '10px' }}>
          {`${pool?.lpAddress.slice(0, 4)}...${pool?.lpAddress.slice(-4)}`}
        </Text>
        <Flex sx={{ ml: '5px' }} onClick={() => handleCopyClick(pool?.lpAddress)}>
          <Svg icon={isCopied ? 'success' : 'copy'} width={10} />
        </Flex>
        <IconButton href={getBlockExplorerURL(pool.chainId, pool.lpAddress, pool.dex)} icon="filledURL" simpleBtn />
      </Flex>
    </Box>
  )
}

export default TableRow
