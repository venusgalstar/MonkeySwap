import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Box, useThemeUI } from 'theme-ui'
import { showIcon, styles } from './styles'
import { Flex, Text } from 'components/uikit'

interface UtilitySlidesProps {
  action: string
  icon: string
  title: string
  detail: string
  href?: string
}

const UtilitySlide: React.FC<UtilitySlidesProps> = ({ action, icon, title, detail, href }) => {
  const { t } = useTranslation()

  return (
    <Flex sx={{ ...styles.mainContainer }}>
      <a href={href ?? '#convert'} target={href ? '_blank' : ''} rel="noreferrer" sx={{ textDecoration: 'none' }}>
        <Flex sx={{ ...styles.subContainer }}>
          <Box sx={styles.box}>
            <Text sx={styles.action}>{t(`${action}`)}</Text>
          </Box>
          <Box sx={{ width: '100%', height: '105px', marginTop: '25px' }}>
            <Box sx={showIcon(icon)}></Box>
          </Box>
          <Box sx={styles.box} style={{ maxWidth: '130px', minHeight: '50px' }}>
            <Text sx={styles.title}>{t(`${title}`)}</Text>
          </Box>
          <Box sx={styles.box} style={{ paddingTop: '15px', minHeight: '80px' }}>
            <Text sx={styles.detail}>{t(`${detail}`)}</Text>
          </Box>
        </Flex>
      </a>
    </Flex>
  )
}

export default UtilitySlide
