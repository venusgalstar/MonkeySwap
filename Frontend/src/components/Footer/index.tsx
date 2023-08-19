// Components
import CountUp from 'react-countup'
import { Button, Flex, Skeleton, Svg, Text, Link } from 'components/uikit'
import { LangaugeDropdown } from 'components/Langauge'
import MoonPayModal from 'components/Moonpay/MoonpayModal'
import Newsletter from 'components/NewsLetter'
import ThemeSwitcher from 'components/ThemeSwitcher'
import MobileDropdown from './components/MobileDropdown'
import NetworkSelector from 'components/NetworkSelector'
import styles from './styles'

// Hooks
import { useTranslation } from 'contexts/Localization'
import useModal from 'hooks/useModal'
import { useBananaPrice } from 'state/application/hooks'

// Constants
import { mailChimpUrl } from 'config/constants/api'
import { ACCESS_LINKS, ENGAGE_LINKS, SOCIAL_LINKS, SUPPORT_LINKS } from './config'

const Footer = () => {
  const { t } = useTranslation()
  const bananaPrice = useBananaPrice()
  const [onPresentModal] = useModal(<MoonPayModal onDismiss={() => null} />)

  return (
    <>
      <Newsletter mailChimpUrl={mailChimpUrl} />
      <Flex sx={styles.container}>
        <Flex sx={styles.columnContainer}>
          <Flex sx={styles.leftColumnContainer}>
            <Svg icon="fullLogo" width="240px" />
            <Text color="primaryBright">
              {t(
                `ApeSwap is a multichain DeFi Hub offering an accessible, transparent, and secure experience for everyone.`,
              )}
            </Text>
            <Flex
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                flexWrap: 'wrap',
                height: ['100px', 'fit-content'],
              }}
            >
              <ThemeSwitcher />
              <NetworkSelector />
              <LangaugeDropdown />
            </Flex>
            <Flex
              sx={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {SOCIAL_LINKS.map(({ label, href }) => {
                return (
                  <Flex sx={styles.iconContainer} key={label} as={Link} href={href} target="_blank">
                    <Svg icon={label} color="text" />
                  </Flex>
                )
              })}
            </Flex>
            <Flex>
              <Flex
                sx={{ alignItems: 'center', textDecoration: 'none' }}
                as={Link}
                href="https://legacy.apeswap.finance/info"
              >
                <Svg icon="banana_token" width={35} />
                {bananaPrice ? (
                  <Text color="primaryBright" ml="7px" weight={600}>
                    $
                    <CountUp end={parseFloat(bananaPrice)} decimals={4} duration={1} separator="," />
                  </Text>
                ) : (
                  <Skeleton width="80px" animation="waves" ml="5px" />
                )}
              </Flex>
              <Button size="sm" ml="20px" sx={{ alignItems: 'center' }} onClick={onPresentModal}>
                <Text color="primaryBright" mr="5px" sx={{ lineHeight: '0px' }}>
                  {t('Add Funds')}
                </Text>
                <Svg icon="card" color="primaryBright" />
              </Button>
            </Flex>
          </Flex>
          <Flex sx={styles.rightColumnContainer}>
            <Flex sx={styles.supportLinksContainer}>
              <Text color="yellow" size="26px" weight={700}>
                {t('Support')}
              </Text>
              {SUPPORT_LINKS.map(({ label, href }) => {
                return (
                  <Flex
                    key={label}
                    sx={{ position: 'relative', width: 'fit-content' }}
                    as={Link}
                    href={href}
                    target="_blank"
                    variant="flex.link"
                  >
                    <Text color="primaryBright" key={label}>
                      {t(label)}
                    </Text>
                  </Flex>
                )
              })}
            </Flex>
            <Flex sx={styles.supportLinksContainer}>
              <Text color="yellow" size="26px" weight={700}>
                {t('Engage')}
              </Text>
              {ENGAGE_LINKS.map(({ label, href }) => {
                return (
                  <Flex
                    key={label}
                    sx={{ position: 'relative', width: 'fit-content' }}
                    as={Link}
                    href={href}
                    target="_blank"
                    variant="flex.link"
                  >
                    <Text variant="link" color="primaryBright" key={label}>
                      {t(label)}
                    </Text>
                  </Flex>
                )
              })}
            </Flex>
            <Flex sx={styles.supportLinksContainer}>
              <Text color="yellow" size="26px" weight={700}>
                {t('Access')}
              </Text>
              {ACCESS_LINKS.map(({ label, href }) => {
                return (
                  <Flex
                    key={label}
                    sx={{ position: 'relative', width: 'fit-content' }}
                    as={Link}
                    href={href}
                    target="_blank"
                    variant="flex.link"
                  >
                    <Text variant="link" color="primaryBright" key={label}>
                      {t(label)}
                    </Text>
                  </Flex>
                )
              })}
            </Flex>
            <MobileDropdown title="Support" items={SUPPORT_LINKS} />
            <MobileDropdown title="Engage" items={ENGAGE_LINKS} />
            <MobileDropdown title="Access" items={ACCESS_LINKS} />
          </Flex>
        </Flex>
        <Flex sx={styles.footerMonkeyContainer}>
          <Flex sx={styles.footerMonkey}>
            <Svg icon="logo" width="100%" />
          </Flex>
        </Flex>
        <Flex sx={styles.allRightsReserved}>
          <Text color="primaryBright">©2023 All rights reserved</Text>
          <Flex>
            <Flex variant="flex.link" sx={{ width: 'fit-content', position: 'relative' }} as={Link} href="/terms">
              <Text color="primaryBright" size="12px">
                Terms
              </Text>
            </Flex>
            <Text margin="0px 5px"> | </Text>
            <Flex variant="flex.link" sx={{ width: 'fit-content', position: 'relative' }} as={Link} href="/privacy">
              <Text color="primaryBright" size="12px">
                Privacy Policy
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
