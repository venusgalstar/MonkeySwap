import { Button, Flex, Svg, Text } from 'components/uikit'
import { useColorMode } from 'theme-ui'

const ThemeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  const handleColorModeWithCookie = (newTheme: 'light' | 'dark') => {
    setColorMode(newTheme)
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`
  }

  return (
    <Button
      sx={{
        height: '35px',
        alignItems: 'center',
        '&&': {
          padding: '3px 12px',
        },
      }}
      variant="tertiary"
      onClick={() => handleColorModeWithCookie(isDark ? 'light' : 'dark')}
    >
      <Flex>
        <Svg icon="island" width="20px" color="island" />
        <Text weight={400} color="text" size="27px" margin="1px 5px 0px 6px">
          /
        </Text>
        <Svg icon="moon" width="24px" color="moon" />
      </Flex>
    </Button>
  )
}

export default ThemeSwitcher
