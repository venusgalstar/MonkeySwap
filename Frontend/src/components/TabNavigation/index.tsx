import { Box, Theme } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'

interface TabNavigationProps<T> {
  tabs: T[]
  activeTab: T
  setActiveTab: (value: T) => void
}

const TabNavigation = <T extends string>({ tabs, activeTab, setActiveTab }: TabNavigationProps<T>) => {
  const { t } = useTranslation()

  return (
    <Flex sx={{ gap: ['20px', '20px', '25px'], fontSize: ['12px', '12px', '16px'] }}>
      {tabs.map((tab) => {
        const isActive: boolean = activeTab === tab
        return (
          <Flex
            key={tab}
            sx={{
              borderBottom: (theme: Theme) => (isActive ? `2px solid ${theme.colors?.text}` : ''),
              pb: ['3px', '3px', '7px'],
              cursor: 'pointer',
            }}
            onClick={() => setActiveTab(tab)}
          >
            <Text
              sx={{
                color: (theme: Theme) => (isActive ? `${theme.colors?.text}` : 'buttonDisabledText'),
              }}
            >
              {t(tab)}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default TabNavigation
