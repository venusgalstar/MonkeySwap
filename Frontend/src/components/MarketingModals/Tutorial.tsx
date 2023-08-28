import React from 'react'
import { TutorialModal } from 'components/uikit'
import { NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import {
  SwapSlides,
  FarmSlides,
  PoolSlides,
  MaximizerSlides,
  GnanaSlides,
  BillsSlides,
  IAOSlides,
  OrdersSlides,
  LiquiditySlides,
  ConnectWalletSlide,
  MigrateSlides,
  TheMigrationSlides,
  DefaultSlides,
  LiquidityV3Slides,
  LiquidityHealthSlides,
} from './TutorialSlides'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'

const Tutorial: React.FC<{
  location: string
  onDismiss: () => void
}> = ({ location, onDismiss }) => {
  const { t } = useTranslation()
  const { chainId, account } = useWeb3React()
  const networkLabel = NETWORK_LABEL[chainId as SupportedChainId]
  const firstPath = location.split('/')[1]

  const getSlidesContent = () => {
    switch (firstPath) {
      case 'swap': {
        return {
          type: `BNB-dex`,
          title: `Monkeys Market DEX`,
          description: `Securely trade any assets on our decentralized exchange with instant transactions.`,
          slides: /*account ? SwapSlides() :*/ [<ConnectWalletSlide key={0} />, ...SwapSlides()],
          isConnected: !!account,
        }
      }
      case 'farms': {
        return {
          type: `${networkLabel}-farms`,
          title: `Welcome to ApeSwap Farms`,
          description: `Earn tokens by staking liquidity provider (LP) tokens!`,
          slides: /*account ? FarmSlides() :*/ [<ConnectWalletSlide key={0} />, ...FarmSlides()],
          width: '300px',
          isConnected: !!account,
        }
      }
      case 'jungle-farms': {
        return {
          type: `jungle-farms`,
          title: `Welcome to Jungle Farms`,
          description: `Earn Partner Tokens by Staking Liquidity!`,
          slides: /*account ? FarmSlides() :*/ [<ConnectWalletSlide key={0} />, ...FarmSlides()],
          width: '285px',
          isConnected: !!account,
        }
      }
      case 'pools': {
        return {
          type: 'pools',
          title: 'Welcome to Staking Pools',
          description: 'Earn tokens by staking BANANA or GNANA!',
          slides: /*account ? PoolSlides() :*/ [<ConnectWalletSlide key={0} />, ...PoolSlides()],
          isConnected: !!account,
        }
      }
      case 'maximizers': {
        return {
          type: 'maximizers',
          title: 'Welcome to Banana Maximizers',
          description: 'Maximize your BANANA yields!',
          slides: account ? MaximizerSlides() : [<ConnectWalletSlide key={0} />, ...MaximizerSlides()],
          isConnected: !!account,
        }
      }
      case 'gnana': {
        return {
          type: 'gnana',
          title: 'Welcome to Golden Banana',
          description: 'Unlock the exclusive benefits of GNANA!',
          slides: account ? GnanaSlides() : [<ConnectWalletSlide key={0} />, ...GnanaSlides()],
          width: '296px',
          isConnected: !!account,
        }
      }
      case 'bonds': {
        return {
          type: 'treasury-bills',
          title: 'Welcome to ApeSwap Bonds',
          description: 'Buy tokens at a discount and obtain a unique NFT!',
          slides: account ? BillsSlides() : [<ConnectWalletSlide key={0} />, ...BillsSlides()],
          isConnected: !!account,
        }
      }
      case 'iao': {
        return {
          type: 'iao',
          title: 'Welcome to Initial Ape Offerings',
          description: 'Contribute BNB or GNANA to obtain newly launched tokens!',
          slides: account ? IAOSlides() : [<ConnectWalletSlide key={0} />, ...IAOSlides()],
          width: '285px',
          isConnected: !!account,
        }
      }
      case 'limit-orders': {
        return {
          type: 'orders',
          title: 'Welcome to Limit Orders',
          description: 'Trade at the price you want!',
          slides: account ? OrdersSlides() : [<ConnectWalletSlide key={0} />, ...OrdersSlides()],
          isConnected: !!account,
        }
      }
      case 'migrate': {
        return {
          type: 'migrate',
          title: 'Welcome to Liquidity Migration',
          description: 'Migrate your liquidity from external DEXs into ApeSwap',
          slides: account ? MigrateSlides() : [<ConnectWalletSlide key={0} />, ...MigrateSlides()],
          width: '332px',
          isConnected: !!account,
        }
      }
      case 'the-migration': {
        return {
          type: 'the-migration',
          title: 'Welcome to The Migration',
          description: 'Migrate your assets to our updated contracts to continue earning rewards!',
          slides: account ? MigrateSlides() : [<ConnectWalletSlide key={0} />, ...TheMigrationSlides()],
          width: '332px',
          isConnected: !!account,
        }
      }
      case 'liquidity-health': {
        return {
          type: `liquidity-health`,
          title: 'Welcome to Liquidity Health',
          description: `Analyze any project's Liquidity Health on our dashboard!`,
          slides: LiquidityHealthSlides(),
          isConnected: false,
        }
      }
      default:
        return {
          type: 'default',
          title: 'WELCOME TO APESWAP',
          description: 'Before we begin, please review these important tips!',
          slides: DefaultSlides(),
          isConnected: false,
        }
    }
  }

  const tutorials = getSlidesContent()

  return (
    <TutorialModal
      type={tutorials?.type}
      title={tutorials?.title}
      description={tutorials?.description}
      t={t}
      onDismiss={onDismiss}
      isConnected={tutorials?.isConnected}
      width={tutorials.width}
    >
      {tutorials?.slides}
    </TutorialModal>
  )
}

export default Tutorial
