// Components
import { styles } from './styles'
import { Box, useThemeUI } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import Image from 'next/image'
import Link from 'next/link'

// Hooks
import { useTranslation } from 'contexts/Localization'

// Types
import { NavMenuProps } from '../../types'

const PopUpMobileMenu = ({ isVisible, items }: NavMenuProps) => {
  const { colorMode } = useThemeUI()

  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        display: isVisible ? 'flex' : 'none',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
        ...styles.popUpMobileMenuContainer,
      }}
    >
      <Flex sx={{ gap: '10px', flexDirection: 'column' }}>
        {items.map(({ itemLabel, itemDesc, icon, href }, index) => {
          return (
            <Link href={href || ''} key={itemLabel} style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Flex
                sx={{
                  ...styles.popUpMobileMenuOption,
                  opacity: colorMode === 'dark' ? '0.7' : '0.85',
                }}
              >
                <Box sx={{ height: '20px', width: '20px', position: 'relative' }}>
                  <img src={`${icon}-${colorMode}.svg`} alt={`${itemLabel} logo`} />
                </Box>
                <Flex sx={{ flexDirection: 'column' }}>
                  <Text sx={styles.mobileNavOptionTitle}>{t(itemLabel || '')}</Text>
                  <Text sx={styles.mobileNavOptionSubtitle}>{t(itemDesc || '')}</Text>
                </Flex>
              </Flex>
            </Link>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default PopUpMobileMenu
