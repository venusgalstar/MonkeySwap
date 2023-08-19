import { Flex, Svg, Text } from 'components/uikit'
import { useColorMode } from 'theme-ui'

const NavBarThemeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  const handleColorModeWithCookie = (newTheme: 'light' | 'dark') => {
    setColorMode(newTheme)
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`
  }

  return (
    <Flex
      sx={{
        height: '34px',
        borderRadius: '10px',
        alignItems: 'center',
        '&&': {
          padding: '3px 12px',
        },
        width: '100%',
        bg: 'white3',
        gap: '15px',
        '&:hover': { bg: 'navbar' },
        justifyContent: 'center',
      }}
      onClick={() => handleColorModeWithCookie(isDark ? 'light' : 'dark')}
    >
      <Flex>
        <Text sx={{ mr: '6px', color: isDark ? 'buttonDisabledText' : 'text' }} weight={400}>
          Light
        </Text>
        <Svg color={isDark ? 'buttonDisabledText' : 'text'} icon="island" width="16px" />
      </Flex>
      <Text weight={400} color="text" size="20px">
        /
      </Text>
      <Flex>
        <Text sx={{ mr: '6px', color: isDark ? 'text' : 'buttonDisabledText' }} weight={400}>
          Dark
        </Text>
        <Svg color={isDark ? 'text' : 'buttonDisabledText'} icon="moon" width="20px" />
      </Flex>
    </Flex>
  )
}

export default NavBarThemeSwitcher
