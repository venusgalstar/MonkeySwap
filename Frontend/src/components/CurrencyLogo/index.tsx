import { Currency, Token } from '@ape.swap/sdk-core'
import { TokenInfo } from '@uniswap/token-lists'
import { Skeleton } from 'components/uikit'
import useAssetLogoSource from 'hooks/useAssetLogoSource'
import Image from 'next/image'
import { CSSProperties } from 'theme-ui'

const CurrencyLogo = ({
  currency,
  style,
  size = 30,
}: {
  currency?: Currency | undefined | null
  size?: number
  style?: CSSProperties
}) => {
  const [src, nextSrc] = useAssetLogoSource(
    currency?.wrapped?.address,
    currency?.chainId,
    currency?.isNative,
    (currency as TokenInfo)?.logoURI,
  )

  return src ? (
    <Image
      src={
        currency?.symbol === 'GNANA'
          ? 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/GNANA.svg'
          : currency?.symbol === 'WBNB'
          ? 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/WBNB.svg'
          : src
      }
      onError={nextSrc}
      alt={currency?.name || ''}
      height={size}
      width={size}
      sx={{ borderRadius: size / 2, ...style }}
    />
  ) : (
    <Skeleton height={size} width={size} sx={{ borderRadius: size / 2, ...style }} animation="waves" />
  )
}

export default CurrencyLogo
