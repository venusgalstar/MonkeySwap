import { icons, SvgProps } from './types'
import { dynamicStyles } from './styles'
import {
  Caret,
  External,
  Home,
  Calculator,
  Farm,
  Frame,
  Gnana,
  Info,
  More,
  NFA,
  Pool,
  Rocket,
  Trade,
  Vault,
  Ellipse,
  Twitter,
  Send,
  Error,
  Close,
  Collapse,
  TextLogo,
  ProfileLight,
  ProfileDark,
  ProfileIcon,
  Logo,
  Hamburger,
  Search,
  Question,
  Success,
  Settings,
  Chart,
  Discord,
  Reddit,
  Medium,
  Instagram,
  Website,
  Arrow,
  SwapArrows,
  InfoSolid,
  SuccessOutline,
  Trash,
  Cancelled,
  ZapArrow,
  ZapIcon,
  Migrate,
  Message,
  Positions,
  MenuSettings,
  Fav,
  FullLogo,
  Telegram,
  Island,
  Moon,
  AccountMonkey,
  Card,
  Cog,
  Bridge,
  Docs,
  Quiz,
  PlaceholderMonkey,
  SwitchArrows,
  Copy,
  HamburgerClosed,
  BillsM1,
  BillsM2,
  BillsM3,
  URL,
  Bubble,
  Audit,
  GreenShield,
  Chain,
  Verified,
  TickShield,
  Share,
  FilledURL,
  YellowQuestionMark,
  BananaIcon,
  ScrollTop,
  Explorer,
  LiquidityIcon,
  PolygonNew,
  Fire,
  NavCaret,
  Logout,
  Wallet,
  Receipt,
} from './Icons'
import {
  BSC,
  BANANA,
  BNB,
  ETH,
  GNANA,
  POLYGON,
  TLOS,
  ARBITRUM,
  FANTOM,
  AVAX,
  OPTIMISM,
  CELO,
  CRONOS,
  POLYGONZK,
  GNOSIS,
  OKEX,
} from './tokens'
import {
  BinanceChain,
  Bitkeep,
  Brave,
  Coinbase,
  MadWallet,
  MathWallet,
  Metamask,
  Nabox,
  OKX,
  OntoWallet,
  SafePalWallet,
  SocialLogin,
  TokenPocket,
  TorusWallet,
  TrustWallet,
  Unstoppable,
  WalletConnect,
  WalletImage,
} from './walletIcons'
import { IconStyles } from './Icons/types'
import Language from './Icons/LanguageIcon'

const Svg: React.FC<SvgProps> = ({ icon, ...props }: any) => {
  const getStyles = ({ degree, color, margin }: IconStyles) =>
    dynamicStyles.generic({
      degree,
      color,
      margin,
    })
  switch (icon) {
    case icons.SUCCESS_OUTLINE:
      return <SuccessOutline {...props} getStyles={getStyles} />
    case icons.TRASH:
      return <Trash {...props} getStyles={getStyles} />
    case icons.CANCELLED:
      return <Cancelled {...props} getStyles={getStyles} />
    case icons.INFO_SOLID:
      return <InfoSolid {...props} getStyles={getStyles} />
    case icons.ARROW:
      return <Arrow {...props} getStyles={getStyles} />
    case icons.SWAP_ARROWS:
      return <SwapArrows {...props} getStyles={getStyles} />
    case icons.CARET:
      return <Caret {...props} getStyles={getStyles} />
    case icons.WEBSITE:
      return <Website {...props} getStyles={getStyles} />
    case icons.EXTERNAL:
      return <External {...props} getStyles={getStyles} />
    case icons.HOME:
      return <Home {...props} getStyles={getStyles} />
    case icons.CALCULATOR:
      return <Calculator {...props} getStyles={getStyles} />
    case icons.EXPLORER:
      return <Explorer {...props} getStyles={getStyles} />
    case icons.FARM:
      return <Farm {...props} getStyles={getStyles} />
    case icons.FRAME:
      return <Frame {...props} getStyles={getStyles} />
    case icons.GNANA:
      return <Gnana {...props} getStyles={getStyles} />
    case icons.INFO:
      return <Info {...props} getStyles={getStyles} />
    case icons.MORE:
      return <More {...props} getStyles={getStyles} />
    case icons.NFA:
      return <NFA {...props} getStyles={getStyles} />
    case icons.POOL:
      return <Pool {...props} getStyles={getStyles} />
    case icons.ROCKET:
      return <Rocket {...props} getStyles={getStyles} />
    case icons.TRADE:
      return <Trade {...props} getStyles={getStyles} />
    case icons.VAULT:
      return <Vault {...props} getStyles={getStyles} />
    case icons.ELLIPSE:
      return <Ellipse {...props} getStyles={getStyles} />
    case icons.COLLAPSE:
      return <Collapse {...props} getStyles={getStyles} />
    case icons.TEXTLOGO:
      return <TextLogo {...props} getStyles={getStyles} />
    case icons.PROFILELIGHT:
      return <ProfileLight {...props} getStyles={getStyles} />
    case icons.PROFILEDARK:
      return <ProfileDark {...props} getStyles={getStyles} />
    case icons.PROFILEICON:
      return <ProfileIcon {...props} getStyles={getStyles} />
    case icons.LOGO:
      return <Logo {...props} getStyles={getStyles} />
    case icons.HAMBURGER:
      return <Hamburger {...props} getStyles={getStyles} />
    case icons.TWITTER:
      return <Twitter {...props} getStyles={getStyles} />
    case icons.SEND:
      return <Send {...props} getStyles={getStyles} />
    case icons.ERROR:
      return <Error {...props} getStyles={getStyles} />
    case icons.CLOSE:
      return <Close {...props} getStyles={getStyles} />
    case icons.SEARCH:
      return <Search {...props} getStyles={getStyles} />
    case icons.SUCCESS:
      return <Success {...props} getStyles={getStyles} />
    case icons.QUESTION:
      return <Question {...props} getStyles={getStyles} />
    case icons.SETTINGS:
      return <Settings {...props} getStyles={getStyles} />
    case icons.CHART:
      return <Chart {...props} getStyles={getStyles} />
    case icons.BNB_TOKEN:
      return <BNB {...props} getStyles={getStyles} />
    case icons.BANANA_TOKEN:
      return <BANANA {...props} getStyles={getStyles} />
    case icons.ETH_TOKEN:
      return <ETH {...props} getStyles={getStyles} />
    case icons.GNANA_TOKEN:
      return <GNANA {...props} getStyles={getStyles} />
    case icons.POLYGON_TOKEN:
      return <POLYGON {...props} getStyles={getStyles} />
    case icons.TLOS_TOKEN:
      return <TLOS {...props} getStyles={getStyles} />
    case icons.BSC_TOKEN:
      return <BSC {...props} getStyles={getStyles} />
    case icons.DISCORD:
      return <Discord {...props} getStyles={getStyles} />
    case icons.REDDIT:
      return <Reddit {...props} getStyles={getStyles} />
    case icons.MEDIUM:
      return <Medium {...props} getStyles={getStyles} />
    case icons.INSTAGRAM:
      return <Instagram {...props} getStyles={getStyles} />
    case icons.ZAP_ICON:
      return <ZapIcon {...props} getStyles={getStyles} />
    case icons.ZAP_ARROW:
      return <ZapArrow {...props} getStyles={getStyles} color="white" />
    case icons.MIGRATE:
      return <Migrate {...props} getStyles={getStyles} />
    case icons.MESSAGE:
      return <Message {...props} getStyles={getStyles} />
    case icons.POSITIONS:
      return <Positions {...props} getStyles={getStyles} />
    case icons.MENU_SETTINGS:
      return <MenuSettings {...props} getStyles={getStyles} />
    case icons.FAV:
      return <Fav {...props} getStyles={getStyles} />
    case icons.FULL_LOGO:
      return <FullLogo {...props} getStyles={getStyles} />
    case icons.TELEGRAM:
      return <Telegram {...props} getStyles={getStyles} />
    case icons.ISLAND:
      return <Island {...props} getStyles={getStyles} />
    case icons.MOON:
      return <Moon {...props} getStyles={getStyles} />
    case icons.LANGUAGE_ICON:
      return <Language {...props} getStyles={getStyles} />
    case icons.ACCOUNT_MONKEY:
      return <AccountMonkey {...props} getStyles={getStyles} />
    case icons.CARD:
      return <Card {...props} getStyles={getStyles} />
    case icons.COG:
      return <Cog {...props} getStyles={getStyles} />
    case icons.COPY:
      return <Copy {...props} getStyles={getStyles} />
    case icons.BRIDGE:
      return <Bridge {...props} getStyles={getStyles} />
    case icons.DOCS:
      return <Docs {...props} getStyles={getStyles} />
    case icons.QUIZ:
      return <Quiz {...props} getStyles={getStyles} />
    case icons.PLACEHOLDER_MONKEY:
      return <PlaceholderMonkey {...props} getStyles={getStyles} />
    case icons.SWITCH_ARROWS:
      return <SwitchArrows {...props} getStyles={getStyles} />
    case icons.ARBITRUM_TOKEN:
      return <ARBITRUM {...props} getStyles={getStyles} />
    case icons.AVAX_TOKEN:
      return <AVAX {...props} getStyles={getStyles} />
    case icons.FANTOM_TOKEN:
      return <FANTOM {...props} getStyles={getStyles} />
    case icons.OPTIMISM_TOKEN:
      return <OPTIMISM {...props} getStyles={getStyles} />
    case icons.CRONOS_TOKEN:
      return <CRONOS {...props} getStyles={getStyles} />
    case icons.POLYGONZK_TOKEN:
      return <POLYGONZK {...props} getStyles={getStyles} />
    case icons.CELO_TOKEN:
      return <CELO {...props} getStyles={getStyles} />
    case icons.GNOSIS_TOKEN:
      return <GNOSIS {...props} getStyles={getStyles} />
    case icons.OKX_TOKEN:
      return <OKEX {...props} getStyles={getStyles} />
    case icons.HAMBURGER_CLOSED:
      return <HamburgerClosed {...props} getStyles={getStyles} />
    case icons.BILLS_M1:
      return <BillsM1 {...props} getStyles={getStyles} />
    case icons.BILLS_M2:
      return <BillsM2 {...props} getStyles={getStyles} />
    case icons.BILLS_M3:
      return <BillsM3 {...props} getStyles={getStyles} />
    case icons.URL:
      return <URL {...props} getStyles={getStyles} />
    case icons.BUBBLE:
      return <Bubble {...props} getStyles={getStyles} />
    case icons.AUDIT:
      return <Audit {...props} getStyles={getStyles} />
    case icons.GREEN_SHIELD:
      return <GreenShield {...props} getStyles={getStyles} />
    case icons.CHAIN:
      return <Chain {...props} getStyles={getStyles} />
    case icons.VERIFIED:
      return <Verified {...props} getStyles={getStyles} />
    case icons.TICK_SHIELD:
      return <TickShield {...props} getStyles={getStyles} />
    case icons.SHARE:
      return <Share {...props} getStyles={getStyles} />
    case icons.FILLED_URL:
      return <FilledURL {...props} getStyles={getStyles} />
    case icons.YELLOW_QUESTION:
      return <YellowQuestionMark {...props} getStyles={getStyles} />
    case icons.BANANA_ICON:
      return <BananaIcon {...props} getStyles={getStyles} />
    case icons.SCROLL_TOP:
      return <ScrollTop {...props} getStyles={getStyles} />
    case icons.LIQUIDITY_ICON:
      return <LiquidityIcon {...props} getStyles={getStyles} />
    case icons.POLYGON_NEW:
      return <PolygonNew {...props} getStyles={getStyles} />
    case icons.FIRE:
      return <Fire {...props} getStyles={getStyles} />
    case icons.NAV_CARET:
      return <NavCaret {...props} getStyles={getStyles} />
    case icons.LOGOUT:
      return <Logout {...props} getStyles={getStyles} />
    case icons.WALLET:
      return <Wallet {...props} getStyles={getStyles} />
    case icons.RECEIPT:
      return <Receipt {...props} getStyles={getStyles} />

    // Wallet Icons
    case icons.BINANCE_CHAIN:
      return <BinanceChain {...props} getStyles={getStyles} />
    case icons.BITKEEP:
      return <Bitkeep {...props} getStyles={getStyles} />
    case icons.BRAVE:
      return <Brave {...props} getStyles={getStyles} />
    case icons.COINBASE:
      return <Coinbase {...props} getStyles={getStyles} />
    case icons.MATH_WALLET:
      return <MathWallet {...props} getStyles={getStyles} />
    case icons.METAMASK:
      return <Metamask {...props} getStyles={getStyles} />
    case icons.NABOX:
      return <Nabox {...props} getStyles={getStyles} />
    case icons.ONTO_WALLET:
      return <OntoWallet {...props} getStyles={getStyles} />
    case icons.SAFE_PAL_WALLET:
      return <SafePalWallet {...props} getStyles={getStyles} />
    case icons.SOCIAL_LOGIN:
      return <SocialLogin {...props} getStyles={getStyles} />
    case icons.TOKEN_POCKET:
      return <TokenPocket {...props} getStyles={getStyles} />
    case icons.TORUS_WALLET:
      return <TorusWallet {...props} getStyles={getStyles} />
    case icons.TRUST_WALLET:
      return <TrustWallet {...props} getStyles={getStyles} />
    case icons.UNSTOPPABLE:
      return <Unstoppable {...props} getStyles={getStyles} />
    case icons.WALLET_CONNECT:
      return <WalletConnect {...props} getStyles={getStyles} />
    case icons.WALLET_IMAGE:
      return <WalletImage {...props} getStyles={getStyles} />
    case icons.MAD_WALLET:
      return <MadWallet {...props} getStyles={getStyles} />
    case icons.OKX:
      return <OKX {...props} getStyles={getStyles} />
    default:
      return null
  }
}

export default Svg
