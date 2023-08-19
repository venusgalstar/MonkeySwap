// Components
import { styles } from './styles'
import { Flex, Svg, Text, Link } from 'components/uikit'
import DropdownDesktopMenu from './DropdownDesktopMenu'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useThemeUI } from 'theme-ui'
import { useState } from 'react'

// Types
import { NavItem } from '../../types'

interface NavOptionProps {
  navItem: NavItem
}

const NavOption = ({ navItem }: NavOptionProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { colorMode } = useThemeUI()
  const { t } = useTranslation()
  const { label, items, href } = navItem

  return (
    <Flex
      onMouseEnter={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={styles.desktopNavOptionContainer}
    >
      {items ? (
        <>
          {/* If there are subitems in the menu, handle accordingly */}
          <Text
            sx={{
              ...styles.desktopMainNavOptionFont,
              color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
            }}
          >
            {t(label)}
          </Text>
          <Svg
            icon="navCaret"
            width="8px"
            color={colorMode === 'dark' && !isHovered ? 'buttonDisabledText' : 'text'}
            direction={isHovered ? 'up' : 'down'}
          />
          <DropdownDesktopMenu isVisible={isHovered} items={items} />
        </>
      ) : (
        <>
          {/* If no subitems, display a clickable label */}
          <Link style={{ color: 'inherit', textDecoration: 'inherit' }} href={href || '/'}>
            <Text
              sx={{
                ...styles.desktopMainNavOptionFont,
                color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
              }}
            >
              {t(label)}
            </Text>
          </Link>
        </>
      )}
    </Flex>
  )
}

export default NavOption
