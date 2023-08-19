import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import AssetOverview from './AssetOverview'
import { styles } from './styles'
import { Flex, Tab, Tabs, Text } from 'components/uikit'
import dynamic from 'next/dynamic'

const AssetBreakdown = dynamic(() => import('./AssetBreakdown'), {
  ssr: false,
})

const TreasuryBreakdown: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', mb: '5px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Funds Breakdown')}
        </Text>
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'center', margin: '10px 0px 5px 0px' }}>
        <Tabs activeTab={activeTab} size="sm" variant="centered">
          <Tab index={0} size="sm" label={t('All')} activeTab={activeTab} variant="centered" onClick={setActiveTab} />
          <Tab
            index={1}
            size="sm"
            label={t('Op. Funds')}
            variant="fullWidth"
            activeTab={activeTab}
            onClick={setActiveTab}
          />
          <Tab index={2} size="sm" label={t('POL')} variant="centered" activeTab={activeTab} onClick={setActiveTab} />
        </Tabs>
      </Flex>
      <Flex sx={{ justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <AssetOverview activeView={activeTab} />
        <AssetBreakdown activeView={activeTab} />
      </Flex>
    </Flex>
  )
}

export default React.memo(TreasuryBreakdown)
