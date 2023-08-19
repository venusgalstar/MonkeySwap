import FloatingDocs from 'components/FloatingDocs'
import { TOP_NAV_HEIGHT } from 'components/NavBarNew/styles'
import { Flex } from 'components/uikit'
import { customMeta, DEFAULT_META } from 'config/constants/meta'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CSSProperties } from 'theme-ui'

const variants = {
  dex: {
    mt: ['25px', '25px', '25px', '25px', '75px', '75px'],
    mb: ['100px', '100px', '100px', '100px', '100px', '100px'],
    justifyContent: 'center',
  },
  homepage: {
    justifyContent: 'center',
    overflow: 'display',
    maxWidth: 'auto',
  },
  listView: {
    maxWidth: ['500px', '500px', '500px', '1150px'],
    padding: '0px 10px',
  },
  lhd: {
    maxWidth: ['500px', '600px', '600px', '1150px'],
    padding: '0px 10px',
  },
}

const PageContainer = ({
  style,
  children,
  variant = 'dex',
  pageDetails = '',
}: {
  style?: CSSProperties
  children: React.ReactNode
  variant?: 'dex' | 'homepage' | 'listView' | 'lhd'
  pageDetails?: any
}) => {
  const { asPath } = useRouter()
  const pageMeta = customMeta[asPath] || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  const imageURL = `https://res.cloudinary.com/dswmrqgwy/image/upload/v1/lhd-share-images/lhd_share_${pageDetails}`

  return (
    <>
      <Head>
        {asPath.includes('/liquidity-health') ? (
          <>
            <title>ApeSwap | Liquidity Health Dashboard</title>
            <meta property="og:title" content="ApeSwap | Liquidity Health Dashboard" />
            <meta
              property="og:description"
              content="ApeSwap’s Liquidity Health Dashboard provides insights into the quality and sustainability of cryptocurrency projects based on different characteristics of their liquidity."
            />
            <meta
              property="og:image"
              content={asPath.includes('/liquidity-health/') ? imageURL : 'https://apeswap.finance/lhd-meta.png'}
            />
            <meta
              name="twitter:image"
              content={asPath.includes('/liquidity-health/') ? imageURL : 'https://apeswap.finance/lhd-meta.png'}
            />

            <meta
              name="twitter:description"
              content="ApeSwap’s Liquidity Health Dashboard provides insights into the quality and sustainability of cryptocurrency projects based on different characteristics of their liquidity."
            />
            <meta name="twitter:title" content="ApeSwap | Liquidity Health Dashboard" />
          </>
        ) : (
          <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta name="twitter:image" content="https://apeswap.finance/twitter.png" />
            <meta
              name="twitter:description"
              content="Swap, stake, and earn cryptocurrencies, all in one place. Accessible, transparent, and secure for everyone."
            />
            <meta name="twitter:title" content="ApeSwap: Your One-Stop, Multichain DeFi Hub" />
            {/* <meta property="og:Twitter" content="https://apeswap.finance/twitter.png" /> */}
          </>
        )}
      </Head>
      <Flex
        sx={{
          minHeight: '100vh',
          padding: variant === 'dex' ? '0px 10px' : '0px 0px',
          alignItems: 'center',
          width: '100%',
          paddingTop: variant !== 'homepage' ? `${TOP_NAV_HEIGHT}px` : '0px',
          flexDirection: 'column',
        }}
      >
        <Flex
          sx={{
            maxWidth: '1200px',
            width: '100%',
            minHeight: '100%',
            ...variants[variant],
            ...style,
          }}
        >
          {children}
        </Flex>
        <FloatingDocs />
      </Flex>
    </>
  )
}

export default PageContainer
