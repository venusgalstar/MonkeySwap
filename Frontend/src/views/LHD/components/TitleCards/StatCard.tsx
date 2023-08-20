import React from 'react'
import { Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { Box } from 'theme-ui'
import { styles } from './styles'

const StatCard = ({
  title,
  value,
  footerInfo,
}: {
  title: 'Industry Average' | 'Chains Supported' | 'Supported Tokens'
  value: number
  footerInfo: React.ReactNode
}) => {
  const { t } = useTranslation()
  const Icons = {
    ['Industry Average']: <Svg icon="greenShield" />,
    ['Chains Supported']: <Svg icon="chain" />,
    ['Supported Tokens']: <Svg icon="verified" />,
  }

  const icon = Icons[title]
  return (
    <Flex sx={styles.statsCont}>
      <Flex sx={styles.statsTitleCont}>
        <Flex>
          <Box sx={{ mr: '5px' }}>{icon}</Box>
        </Flex>
        <Text sx={styles.statsTitle}>{t(`${title}`)}</Text>
      </Flex>
      <Flex sx={styles.valueCont}>
        <Text sx={styles.valueText}>{value > 0 ? value : '-'}</Text>
        <Text sx={styles.footer}>{footerInfo}</Text>
      </Flex>
    </Flex>
  )
}

export default StatCard
