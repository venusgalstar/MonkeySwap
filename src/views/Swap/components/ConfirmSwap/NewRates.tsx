import React from 'react'
import { Flex, Svg, Text } from 'components/uikit'
import OmniTokenImage from 'components/OmniChain/OmniTokenImage'
import { humanOutputAmount } from '../../utils'
import { ChainId } from 'config/constants/chains'
import { ExchangeRateUpdateParams } from '@lifi/sdk'
import { useCurrency } from 'hooks/Tokens'

const NewRates = ({ newRates }: { newRates: ExchangeRateUpdateParams }) => {
  const { newToAmount, oldToAmount, toToken } = newRates
  const toCurrency = useCurrency(toToken.address, toToken.chainId as unknown as ChainId)
  return (
    <Flex sx={{ width: '100%', alignItems: 'center', flexDirection: 'column', mt: '20px' }}>
      <Flex
        sx={{
          p: '8px 4px 4px 4px',
          borderRadius: '8px',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Flex sx={{ width: '210px' }}>
          <OmniTokenImage size={30} currency={toCurrency} />
          <Flex sx={{ flexDirection: 'column', ml: '10px' }}>
            <Text sx={{ fontSize: '12px', fontWeight: '300', lineHeight: '14px' }}>Old Amount:</Text>
            <Text sx={{ fontSize: '16px', fontWeight: '700' }}>
              {humanOutputAmount(oldToAmount, toToken.decimals, 8)} {toToken.symbol}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={{ width: '15px', height: '15px', ml: '19px' }}>
        <Svg icon="arrow" direction="down" />
      </Flex>
      <Flex
        sx={{
          p: '8px 4px 4px 4px',
          borderRadius: '8px',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Flex sx={{ width: '210px' }}>
          <OmniTokenImage size={30} currency={toCurrency} />
          <Flex sx={{ flexDirection: 'column', ml: '10px' }}>
            <Text sx={{ fontSize: '12px', fontWeight: '300', lineHeight: '14px' }}>New Amount:</Text>
            <Text sx={{ fontSize: '16px', fontWeight: '700' }}>
              {humanOutputAmount(newToAmount, toToken.decimals, 8)} {toToken.symbol}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NewRates
