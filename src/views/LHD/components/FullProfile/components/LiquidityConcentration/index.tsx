import { TokenProfile } from 'state/lhd/types'
import { Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import TableHeader from './Table/TableHeader'
import TableRow from './Table/TableRow'
import TooltipBubble from 'components/uikit/Tooltip'

const LiquidityConcentration = ({ fullProfile }: { fullProfile: TokenProfile }) => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.mainContainer}>
      <Text sx={styles.title}>
        {t('Liquidity Concentration')}
        <TooltipBubble
          style={{ zIndex: 1000 }}
          placement="bottomRight"
          transformTip="translate(10%, -14%)"
          width="300px"
          body={`A detailed view of every liquidity pool available for the project.`}
        >
          <span sx={{ ml: '5px' }}>
            <Svg icon="question" width="12px" />
          </span>
        </TooltipBubble>
      </Text>
      <Flex sx={styles.tableCont}>
        <TableHeader />
        {fullProfile?.liquidityPools.length > 0 &&
          fullProfile.liquidityPools.map((pool, index) => {
            return <TableRow key={`${pool.lpAddress}-${pool.chainId}-${index}`} index={index} pool={pool} />
          })}
      </Flex>
    </Flex>
  )
}

export default LiquidityConcentration
