import React, { useEffect, useState } from 'react'
import { TokenAddress } from 'state/lhd/types'
import { Flex, Text } from '../../../../../components/uikit'
import { icons } from '../../SmallChainIcons'

const ChainsIcons = ({ tokenAddresses }: { tokenAddresses?: TokenAddress[] }) => {
  const [extraChains, setExtraChains] = useState(0)
  const [elementsWithIcons, setElementsWithIcons] = useState<TokenAddress[]>([])
  const width = 16

  useEffect(() => {
    const filteredTokenAddresses = uniqueByChainId(tokenAddresses)
    let [extraChainsCount, foundChainsCount] = [0, 0]
    const newElementsWithIcons = filteredTokenAddresses?.filter((tokenAddress) => {
      if (icons.hasOwnProperty(tokenAddress.chainId) && foundChainsCount < 4) {
        foundChainsCount += 1
        return true
      } else {
        extraChainsCount += 1
        return false
      }
    })
    setExtraChains(extraChainsCount)
    setElementsWithIcons(newElementsWithIcons ?? [])
  }, [tokenAddresses])

  const uniqueByChainId = (tokens: TokenAddress[] | undefined): TokenAddress[] => {
    const seen = new Map()
    tokens = tokens ?? []
    return tokens.filter((token) => {
      const duplicate = seen.get(token.chainId)
      if (!duplicate) {
        seen.set(token.chainId, true)
        return true
      }
      return false
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      {elementsWithIcons.map((tokenAddress, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: index * (width * 0.7), // 25% overlap
            zIndex: index,
          }}
        >
          {icons[tokenAddress.chainId]}
        </div>
      ))}
      {extraChains > 0 && (
        <Flex
          sx={{
            position: 'absolute',
            left: elementsWithIcons.length * (width * 0.7), // 30% overlap
            zIndex: elementsWithIcons.length + 1,
            width: '16px',
            height: '16px',
            background: 'white3',
            borderRadius: '25px',
            border: '1px solid #fff',
            top: '2px',
          }}
        >
          <Text
            sx={{
              fontSize: '8px',
              width: '100%',
              height: '100%',
              display: 'flex',
              lineHeight: '25px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +{extraChains}
          </Text>
        </Flex>
      )}
    </div>
  )
}

export default ChainsIcons
