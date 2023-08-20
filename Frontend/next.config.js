/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  env: {
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  images: {
    domains: [
      'raw.githubusercontent.com',
      's2.coinmarketcap.com',
      'assets.coingecko.com',
      'tokens.pancakeswap.finance',
      'ipfs.io',
      'res.cloudinary.com',
      'apeswap.mypinata.cloud',
      'assets-cdn.trustwallet.com',
      'apeswap.finance',
      'static.debank.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/migrate',
        destination: '/add-liquidity',
        permanent: false,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
