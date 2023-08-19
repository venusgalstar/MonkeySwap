import React, { useState } from 'react'
import { Flex, Svg } from 'components/uikit'
import { Currency } from '@ape.swap/sdk-core'
import { TokenInfo } from '@uniswap/token-lists'
import { CHAIN_PARAMS, ChainId, NETWORK_ICONS } from 'config/constants/chains'
import { Box } from 'theme-ui'
import { WRAPPED_NATIVE_CURRENCY } from 'config/constants/tokens'
import { useCurrency } from '../../../hooks/Tokens'

// The purpose of this component is to load token images of unknown sources and to use a custom image if load fails

const OmniTokenImage = ({ currency, size }: { currency: Currency | null; size: number }) => {
  const [error, setError] = useState(false)
  const chainSize = size / 2.2 > 20 ? 20 : size / 2.2

  return (
    <>
      {!error && currency && ((currency as TokenInfo)?.logoURI || currency.isNative) ? (
        <Flex
          sx={{
            minWidth: `${size + 2}px`,
            height: `${size + 2}px`,
            background: '#fff',
            borderRadius: `${size}px`,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {currency?.isNative || currency.equals(WRAPPED_NATIVE_CURRENCY[currency?.chainId] as Currency) ? (
            <img
              width={size}
              height={size}
              src={CHAIN_PARAMS?.[currency?.chainId as ChainId]?.nativeCurrency.logo ?? 'question'}
              style={{ borderRadius: `${size}px` }}
              onError={() => setError(true)}
            />
          ) : (
            <img
              src={`${(currency as TokenInfo).logoURI}`}
              alt={'token img'}
              width={size}
              height={size}
              style={{ borderRadius: `${size}px` }}
              onError={() => setError(true)}
            />
          )}
          <Box sx={{ borderRadius: `${size}px`, position: 'absolute', top: -1, right: -1 }}>
            <Svg
              width={chainSize}
              height={chainSize}
              icon={NETWORK_ICONS?.[currency?.chainId as ChainId] ?? 'question'}
            />
          </Box>
        </Flex>
      ) : (
        <Flex
          sx={{
            minWidth: `${size}px`,
            height: `${size}px`,
            background: '#fff',
            borderRadius: '25px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1608_28082)">
              <path
                d="M25.6069 25.6066C31.4648 19.7487 31.4648 10.2513 25.6069 4.3934C19.749 -1.46447 10.2516 -1.46447 4.39371 4.3934C-1.46415 10.2513 -1.46415 19.7487 4.39371 25.6066C10.2516 31.4645 19.749 31.4645 25.6069 25.6066Z"
                fill="var(--theme-ui-colors-brown)"
                fillOpacity="0.2"
              />
              <path
                opacity="0.3"
                d="M24.5633 11.3573C23.8989 11.102 23.3778 11.1944 22.9747 11.3971C22.0431 8.70656 19.829 6.36891 17.2163 5.47981L17.1812 4.35342L15.7852 5.19821C15.6105 5.16292 15.4709 5.16292 15.297 5.16292C15.2619 4.95191 15.088 4.1777 15.0529 4.00123C13.7966 3.93064 12.8545 5.26805 12.8194 5.51435C10.1835 6.40195 7.97239 8.72758 7.03553 11.4062C6.65333 11.2079 6.11062 11.0855 5.43728 11.3573C3.90174 11.9558 3.48296 14.4895 4.73931 16.0732C5.1999 16.6702 5.69109 17.0164 6.18378 17.2018C6.08375 17.6599 6.01507 18.1165 6.01507 18.6068C5.94565 22.9006 10.656 26.1026 14.9126 25.9975C20.3911 26.0681 24.8574 22.0911 23.8802 17.3047C23.8743 17.2627 23.866 17.2229 23.8586 17.1823C24.3139 16.9923 24.8163 16.6499 25.2612 16.0732C26.5176 14.4895 26.0988 11.9558 24.5633 11.3573Z"
                fill="var(--theme-ui-colors-brown)"
              />
              <path
                d="M15.3272 10C16.5283 10 17.488 10.324 18.2064 10.972C18.936 11.6199 19.3008 12.534 19.3008 13.7143C19.3008 14.802 18.9528 15.6524 18.2569 16.2657C17.5722 16.8674 16.663 17.174 15.5292 17.1856L15.4451 18.4873H12.9195L12.8353 15.259H13.8455C14.7098 15.259 15.3665 15.1491 15.8155 14.9292C16.2757 14.7094 16.5058 14.3102 16.5058 13.7316C16.5058 13.3267 16.3992 13.0085 16.1859 12.777C15.9726 12.5456 15.6752 12.4299 15.2935 12.4299C14.8894 12.4299 14.5751 12.5514 14.3506 12.7944C14.1261 13.0258 14.0139 13.344 14.0139 13.749H11.3031C11.2807 13.0432 11.421 12.4068 11.724 11.8398C12.0383 11.2728 12.4985 10.8273 13.1047 10.5033C13.7221 10.1678 14.4629 10 15.3272 10ZM14.2159 23C13.7108 23 13.2955 22.8496 12.97 22.5487C12.6557 22.2363 12.4985 21.8545 12.4985 21.4032C12.4985 20.9404 12.6557 20.5527 12.97 20.2403C13.2955 19.9279 13.7108 19.7717 14.2159 19.7717C14.7098 19.7717 15.1139 19.9279 15.4282 20.2403C15.7537 20.5527 15.9165 20.9404 15.9165 21.4032C15.9165 21.8545 15.7537 22.2363 15.4282 22.5487C15.1139 22.8496 14.7098 23 14.2159 23Z"
                fill="var(--theme-ui-colors-text)"
              />
            </g>
            <defs>
              <clipPath id="clip0_1608_28082">
                <rect width="30" height="30" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Flex>
      )}
    </>
  )
}

export default OmniTokenImage
