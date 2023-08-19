import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { Flex, Svg, Text } from 'components/uikit'
import {
  AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS,
  LIST_VIEW_PRODUCTS,
  FULL_PRODUCT_NAMES,
} from 'config/constants/products'
import { useTranslation } from 'contexts/Localization'
import useSelectChain from 'hooks/useSelectChain'
import React from 'react'
import { CHAIN_PARAMS, ChainId, NETWORK_LABEL } from 'config/constants/chains'

const ListView404: React.FC<{ product: LIST_VIEW_PRODUCTS }> = ({ product }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const switchNetwork = useSelectChain()

  return (
    <Flex
      sx={{
        width: '100%',
        background: 'white2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
      }}
    >
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px' }}>
        <Text size="25px" sx={{ mb: '15px', textAlign: 'center' }}>
          {"You're"} connected to: {NETWORK_LABEL[chainId as SupportedChainId]}
        </Text>
        <Svg icon="placeholderMonkey" />
        <Text size="12px" sx={{ margin: '10px 0px 5px 0px', opacity: '.5', textAlign: 'center' }}>
          {t('%product% is only available on ', {
            product: FULL_PRODUCT_NAMES[product],
          })}
          {AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[product].length === 1
            ? AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[product].map((chainId) => `${NETWORK_LABEL[chainId]}. `)
            : AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[product].map((chainId) =>
                AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[product].indexOf(chainId) ===
                AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[product].length - 1
                  ? `${NETWORK_LABEL[chainId]}. `
                  : `${NETWORK_LABEL[chainId]}, `,
              )}
          {t('Switch to: ')}
        </Text>
        <Flex sx={{ mt: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[product].map((chainId) => {
            return (
              <Flex
                key={chainId}
                sx={{
                  padding: '5px 10px',
                  background: 'white3',
                  alignItems: 'center',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  margin: '5px 5px',
                }}
                onClick={() => switchNetwork(chainId)}
              >
                <ServiceTokenDisplay
                  token1={CHAIN_PARAMS[chainId as ChainId]?.nativeCurrency.symbol}
                  size={22.5}
                />
                <Text ml="10px">{NETWORK_LABEL[chainId]}</Text>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ListView404
