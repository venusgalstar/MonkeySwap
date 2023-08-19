import { useState } from 'react'
import { Box } from 'theme-ui'

// Hooks
import { useTranslation } from 'contexts/Localization'
import useGetHomepageStats from 'state/homepage/hooks/useGetHomepageStats'

// Components
import { Text } from 'components/uikit'
import Lists from './Lists'
import TabNavigation from 'components/TabNavigation'

// Constants
import { TabNavOptions } from './types'

const TABS: TabNavOptions[] = Object.values(TabNavOptions)

const DiscoverNewOpportunities = () => {
  const [activeTab, setActiveTab] = useState<TabNavOptions>(TabNavOptions.BONDS)
  const { data: stats } = useGetHomepageStats()
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        maxWidth: '1412px',
        width: '90vw',
        alignSelf: 'center',
        mt: ['50px', '50px', '92px'],
      }}
    >
      <Box sx={{ mb: ['10px', '10px', '35px'] }}>
        <Text sx={{ fontSize: ['25px', '25px', '35px'], fontWeight: '500' }}>{t('Discover New Opportunities')}</Text>
      </Box>
      <TabNavigation tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Lists activeTab={activeTab} stats={stats} />
    </Box>
  )
}

export default DiscoverNewOpportunities
