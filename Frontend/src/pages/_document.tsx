import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Titan+One:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&display=swap" rel="stylesheet" />
          <link rel="apple-touch-icon" href="https://apeswap.finance/logo.png" />
          <meta
            name="description"
            content="ApeSwap is a multichain DeFi Hub offering an accessible, transparent, and secure experience for everyone."
          />
          <meta name="theme-color" content="#000000" />
          {/* <meta name="twitter:image" content="https://apeswap.finance/twitter.png" /> */}
          {/* <meta name="twitter:image" content="https://i.imgur.com/g1sFeUS.png" />
          <meta name="og:image" content="https://i.imgur.com/g1sFeUS.png" /> */}
          {/* <meta
            name="twitter:description"
            content="Swap, stake, and earn cryptocurrencies, all in one place. Accessible, transparent, and secure for everyone."
          />
          <meta name="twitter:title" content="ApeSwap: Your One-Stop, Multichain DeFi Hub" /> */}
          <meta name="twitter:card" content="summary_large_image" />
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N4FS3L6');`,
            }}
          ></Script>
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N4FS3L6"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
