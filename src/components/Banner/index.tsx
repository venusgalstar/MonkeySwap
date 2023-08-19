import { Text, useColorMode } from 'theme-ui'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { styles, FlexSkeleton } from './styles'
import { BannerTypes, ColorProps } from './types'
import { Button, Flex } from 'components/uikit'
import { useRouter } from 'next/router'
import { Svg } from '../uikit'
import { useHideTips } from '../../views/Bonds/components/FirstTimeCard/useHideTips'
import Image from 'next/image'

const Banner: React.FC<{
  banner: BannerTypes
  link: string
  title?: string
  children?: React.FC
  listViewBreak?: boolean
  margin?: string
  titleColor?: ColorProps
  maxWidth?: number
  openTips?: boolean
}> = ({ banner, children, title, listViewBreak, margin, titleColor, link, maxWidth = 1200, openTips }) => {
  const { push } = useRouter()
  const [colorMode] = useColorMode()
  const { t } = useTranslation()
  const loaded = `../images/banners/${banner}-${colorMode === 'dark' ? 'night' : 'day'}.svg`
  const handleHideTips = useHideTips()

  const openBannerLink = (bannerLink: string) => {
    bannerLink.includes('modal') ? push({ search: bannerLink }) : window.open(bannerLink, '_blank')
  }

  const handleClick = () => {
    if (openTips) {
      handleHideTips(false)
    }
    openBannerLink(link)
  }

  // Media breaks are used until tablet mode on list view is designed
  return (
    <Flex
      sx={{
        ...styles.flexPrimary,
        margin,
      }}
    >
      {loaded ? (
        <Image
          src={loaded}
          alt="banner"
          width={1200}
          height={300}
          priority
          sx={{
            objectFit: 'cover',
            borderRadius: '10px',
            width: '100%',
            height: '24vw',
            '@media screen and (min-width: 500px) and (max-width: 851px)': {
              height: listViewBreak ? '120px' : '24vw',
            },
            '@media screen and (min-width: 1130px)': {
              height: '282px',
              width: '1130px',
            },
          }}
        />
      ) : (
        <FlexSkeleton maxWidth={maxWidth} listViewBreak={listViewBreak} />
      )}
      <Flex sx={{ ...styles.titleContainer }}>
        <Text
          sx={{
            ...styles.titleText,
            color: titleColor || 'text',
            '@media screen and (min-width: 500px) and (max-width: 851px)': {
              fontSize: listViewBreak ? '25px' : '5vw',
              lineHeight: listViewBreak ? '25px' : '5vw',
            },
          }}
        >
          {title?.toUpperCase()}
        </Text>
        <Button
          variant="text"
          onClick={handleClick}
          sx={{
            ...styles.learnText,
            color: titleColor || 'text',
            '&&&:hover': {
              textDecoration: 'none',
              color: titleColor || 'text',
            },
          }}
        >
          {link.includes('?modal') ? t('Tutorial') : t('Learn More')}{' '}
          <Flex sx={{ ml: '5px' }}>
            <Svg icon="caret" direction="right" color={titleColor || 'text'} width="10px" />
          </Flex>
        </Button>
      </Flex>
      {children}
    </Flex>
  )
}

export default Banner
