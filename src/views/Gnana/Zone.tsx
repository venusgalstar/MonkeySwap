import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import Banner from 'components/Banner'
import GnanaDisclaimers from './components/GnanaDisclaimers/GnanaDisclaimers'
import ConvertCard from './components/ConvertCard'
import ReturnCard from './components/ReturnCard'
import { PaddedCard, TopCon, CenterCard, OuterContent, InnerContent, InnerContentText, Cards } from './styles'
import SwiperProvider from '../../contexts/SwiperProvider'
import { Text, Flex } from 'components/uikit'
import dynamic from 'next/dynamic'
import { useThemeUI } from 'theme-ui'

const GnanaUtility = dynamic(() => import('./components/GnanaUtility/GnanaUtility'), {
  ssr: false,
})

const Zone = () => {
  const [readingMore, setReadingMore] = useState(false)
  const { t } = useTranslation()
  const { colorMode } = useThemeUI()
  const isDark = colorMode === 'dark'

  const toggleReadMore = () => {
    setReadingMore(!readingMore)
  }

  return (
    <Flex sx={{ flexDirection: 'column', margin: '30px 0px' }}>
      <Banner
        banner="gnana"
        link="?modal=tutorial"
        title={t('Golden Banana')}
        margin="0px 0px 20px 0px"
        maxWidth={1130}
      />
      <PaddedCard>
        <TopCon>
          <CenterCard>
            <Text sx={{ mt: '10px', color: isDark ? 'yellow' : 'primaryBright', fontSize: '30px', fontWeight: 700 }}>
              {t('HEADS UP, APES!')}
            </Text>
            {!readingMore && (
              <Text
                onClick={toggleReadMore}
                sx={{
                  display: ['flex', 'flex', 'flex', 'none'],
                  mt: '10px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color: 'primaryBright',
                }}
              >
                {t('READ MORE')}
              </Text>
            )}
            <InnerContent readingMore={readingMore}>
              <InnerContentText>
                {t(
                  'Converting from BANANA to GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30% per conversion. For every 1 BANANA you convert, you will receive 0.7 GNANA.',
                )}
              </InnerContentText>
            </InnerContent>
          </CenterCard>
        </TopCon>
        <OuterContent readingMore={readingMore}>
          <InnerContentText>
            {t(
              'Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This means that for every 1 BANANA you trade in, you will receive 0.7 GNANA',
            )}
          </InnerContentText>
        </OuterContent>
      </PaddedCard>
      <Cards id="convert">
        <ConvertCard fromToken="BANANA" toToken="GNANA" />
        <ReturnCard fromToken="GNANA" toToken="BANANA" />
      </Cards>
      <SwiperProvider>
        <GnanaUtility />
      </SwiperProvider>
      <GnanaDisclaimers />
    </Flex>
  )
}
export default React.memo(Zone)
