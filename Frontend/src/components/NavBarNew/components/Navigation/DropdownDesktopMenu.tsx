// Components
import { styles } from './styles'
import { Box, useThemeUI } from 'theme-ui'
import { Flex, Text, Link } from 'components/uikit'

// Hooks
import { useState } from 'react'
import { useTranslation } from 'contexts/Localization'

// Types
import { NavMenuProps } from '../../types'

const DropdownMenu = ({ isVisible, items }: NavMenuProps) => {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const { colorMode } = useThemeUI()

  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        ...styles.mainDropdownMenuContainer,
        display: isVisible ? 'flex' : 'none',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
      }}
    >
      <Flex sx={{ gap: '10px', flexDirection: 'column' }}>
        {items.map(({ itemLabel, itemDesc, icon, href }, index) => {
          const isItemHovered = isHovered === index
          return (
            <Link href={href || ''} key={itemLabel} style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Flex
                onMouseEnter={() => setIsHovered(index)}
                onFocus={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                sx={{
                  ...styles.desktopNavOption,
                  opacity: colorMode === 'dark' ? '0.7' : '0.85',
                }}
              >
                <Box sx={{ height: '25px', width: '25px', position: 'relative' }}>
                  <img src={`${icon}-${colorMode}.svg`} alt={`${itemLabel} logo`} />
                </Box>
                <Flex sx={{ flexDirection: 'column' }}>
                  <Text sx={styles.desktopNavItemTitle}>{t(itemLabel || '')}</Text>
                  <Text sx={styles.desktopNavItemSubtitle}>{t(itemDesc || '')}</Text>
                </Flex>
                <Flex
                  sx={{
                    ...styles.desktopNavArrow,
                    visibility: isItemHovered ? 'inherit' : 'hidden',
                  }}
                >
                  {'>'}
                </Flex>
              </Flex>
            </Link>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default DropdownMenu
