import { Button, Flex, Svg, Text } from 'components/uikit'
import { Box } from 'theme-ui'
import PriceChange from '../PercentageChange'
import IconButton from '../IconButton'
import ChainsIcons from '../ChainsIcons'
import ProgressBar from '../../../ProgressBar'
import { getColor } from '../../../../utils/getColor'
import { ExternalDataOption, TokenProfile, TokenProfileLinks } from 'state/lhd/types'
import useModal from 'hooks/useModal'
import SharableCard from '../../../SharableCard'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import TokenImage from '../../../../../../components/TokenImage'
import Link from 'next/link'
import { CHAIN_DETAILS } from 'views/LHD/utils/config'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ScoreChange from '../ScoreChange'

const TopSectionCards = ({ fullProfile, scoreDifference }: { fullProfile: TokenProfile; scoreDifference: number }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const firstValidMcap = fullProfile?.mcap.find((input: ExternalDataOption) => input?.amount) as ExternalDataOption

  const { siteUrl, auditUrls, twitterUrl, telegramUrl, discordUrl } = fullProfile?.addressMapping
    ?.profileLinks as TokenProfileLinks

  const getBlockExplorerURL = (chain: string, address: string) => {
    const chainInfo = CHAIN_DETAILS.find((chainOption) => chainOption.chainId === chain)
    if (chainInfo) return `${chainInfo.blockExplorer?.url}address/${address}`
    return ''
  }

  const [onCreateCard] = useModal(
    <SharableCard
      tokenSymbol={fullProfile?.addressMapping?.tokenSymbol}
      tokenName={fullProfile?.addressMapping?.tokenName}
      tokenImageURL={
        fullProfile?.addressMapping?.cloudinaryLogoUrl
          ? fullProfile?.addressMapping?.cloudinaryLogoUrl
          : fullProfile?.addressMapping?.tokenLogoUrl
      }
      totalScore={fullProfile?.totalScore}
      healthScore={fullProfile?.healthScore}
      concentrationScore={fullProfile?.concentrationScore}
      ownershipScore={fullProfile?.ownershipScore}
      tokenAddresses={fullProfile?.addressMapping.tokenAddresses}
      formulaVersion={fullProfile?.formulaVersion}
    />,
  )

  useEffect(() => {
    if (router.query.modal === 'card') {
      onCreateCard()
    }
  }, [router.query])

  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.leftContainer}>
        <Flex sx={{ width: '100%' }}>
          <Flex sx={{ width: '100%', flexDirection: 'column' }}>
            <Flex sx={styles.nameBtnContainer}>
              <Flex>
                <TokenImage url={fullProfile?.addressMapping?.tokenLogoUrl} size={25} />
                <Flex sx={styles.tokenNameCont}>
                  <Text sx={styles.tokenName}>{fullProfile?.addressMapping?.tokenName}</Text>
                  <Text sx={styles.tokenSymbol}>{fullProfile?.addressMapping?.tokenSymbol}</Text>
                </Flex>
                <Box sx={styles.priceChange}>
                  <Text sx={{ fontWeight: 700, fontSize: ['14px'] }}>
                    $
                    {fullProfile?.currentPrice[0]?.amount < 0.00001
                      ? fullProfile?.currentPrice[0]?.amount
                      : fullProfile?.currentPrice[0]?.amount.toFixed(5)}
                    <PriceChange priceChange={fullProfile?.priceChange24hr?.toFixed(2)} />
                  </Text>
                </Box>
              </Flex>
              <Flex sx={styles.buttons}>
                {siteUrl && <IconButton href={siteUrl} icon="filledURL" />}
                {auditUrls?.[0] && <IconButton href={auditUrls?.[0]} icon="tickShield" />}
                {twitterUrl && <IconButton href={twitterUrl} icon="twitter" />}
                {telegramUrl && <IconButton href={telegramUrl} icon="send" />}
                {discordUrl && <IconButton href={discordUrl} icon="discord" />}
                <IconButton href={fullProfile?.addressMapping?.tokenAddresses[0]?.address} icon="copy" />
                <IconButton
                  href={getBlockExplorerURL(
                    fullProfile?.addressMapping?.tokenAddresses[0]?.chainId,
                    fullProfile?.addressMapping?.tokenAddresses[0]?.address,
                  )}
                  icon="explorer"
                />
              </Flex>
            </Flex>
            <Flex sx={styles.extraInfoCont}>
              <Flex sx={styles.rank}>
                <Text sx={styles.rankText}>
                  {t('Rank #')}
                  {fullProfile?.ranking}
                </Text>
              </Flex>
              <Flex sx={styles.chainsCont}>
                <ChainsIcons tokenAddresses={fullProfile?.addressMapping.tokenAddresses} />
              </Flex>
              <Text sx={styles.marketCap}>
                {t('Market Cap:')} ${Math.round(firstValidMcap?.amount).toLocaleString(undefined)}
              </Text>
            </Flex>
            {fullProfile?.addressMapping?.tags && (
              <Flex sx={styles.tagRow}>
                {fullProfile?.addressMapping?.tags.map((tag: string) => (
                  <Flex key={tag} sx={styles.tag}>
                    <Text sx={styles.tagText}>{tag.replace('_', ' ')}</Text>
                  </Flex>
                ))}
                <Flex sx={styles.tag}>
                  <Link
                    href="https://github.com/ApeSwapFinance/lhd-config"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={styles.tagText}
                  >
                    + Add Tag
                  </Link>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={styles.scoresCont}>
        <Flex sx={{ width: '100%', flexDirection: 'row' }}>
          <Flex sx={styles.singleScoreCont}>
            <Text sx={styles.scoreTitle}>{t('Strength')}</Text>
            <Text sx={styles.scoreTitle}>{t('Ownership')}</Text>
            <Text sx={styles.scoreTitle}>{t('Concentration')}</Text>
          </Flex>
          <Flex sx={{ flexDirection: 'column', width: '100%' }}>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.floor(fullProfile?.healthScore * 100)} position="right" />
            </Flex>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.floor(fullProfile?.ownershipScore * 100)} position="right" />
            </Flex>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.floor(fullProfile?.concentrationScore * 100)} position="right" />
            </Flex>
          </Flex>
          <Flex sx={{ ...styles.scoreCont, ml: '15px' }}>
            <Text
              sx={{
                ...styles.scoreNumber,
                color: getColor(fullProfile.totalScore * 100),
                fontSize: Math.floor(fullProfile.totalScore * 100) === 100 ? '48px' : '52px',
              }}
            >
              {Math.floor(fullProfile.totalScore * 100)}
            </Text>
            <Flex sx={{ flexDirection: 'row' }}>
              <ScoreChange change={scoreDifference.toFixed(2)} />
              <Text
                sx={{
                  fontSize: '10px',
                  fontWeight: '300',
                  ml: '5px',
                }}
              >
                (7d)
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex sx={{ mt: ['10px', '10px', '10px', '0px'] }}>
          <Button variant="primary" sx={styles.shareCard} onClick={onCreateCard}>
            <Text sx={styles.shareText} color="primaryBright">
              {t('Share')}
            </Text>
            <Svg icon="share" width={17} color="primaryBright" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TopSectionCards
