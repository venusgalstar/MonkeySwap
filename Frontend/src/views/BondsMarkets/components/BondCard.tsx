import React from 'react'
import { Flex, Svg, Text } from 'components/uikit'
import { BondLanding } from 'state/bondsLanding/types'
import { useCurrency } from 'hooks/Tokens'
import { ChainId } from 'config/constants/chains'
import OmniTokenImage from 'components/OmniChain/OmniTokenImage'
import { DESKTOP_DISPLAY, MOBILE_DISPLAY } from 'theme/display'
import { styles } from './styles'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import useSelectChain from 'hooks/useSelectChain'
import useModal from 'hooks/useModal'
import MultiMarketBond from './MultiMarketBond'

const BondCard: React.FC<{ bonds: BondLanding[] | undefined; showAvailable: boolean }> = ({ bonds, showAvailable }) => {
  const currency = useCurrency(bonds?.[0]?.showcaseToken, bonds?.[0]?.chainId as unknown as ChainId)
  const higherDiscount = Math.max(...(bonds?.map((obj) => obj?.discount || 0) ?? []))
  const router = useRouter()
  const { chainId } = useWeb3React()
  const selectChain = useSelectChain()
  const [multiMarketBond] = useModal(<MultiMarketBond bonds={bonds} />)
  const hasToSwitchChain = chainId !== bonds?.[0]?.chainId

  const handleClick = () => {
    if (bonds?.[0]?.soldOut) return
    if (bonds?.length === 1) {
      if (hasToSwitchChain) {
        selectChain(bonds?.[0]?.chainId).then(() => {
          router.push(`/bonds?bondAddress=${bonds?.[0]?.billAddress?.toLowerCase()}`)
        })
      } else {
        router.push(`/bonds?bondAddress=${bonds?.[0]?.billAddress?.toLowerCase()}`)
      }
    } else {
      multiMarketBond()
    }
  }

  return (
    <Flex sx={{ ...styles.bondCard, cursor: bonds?.[0]?.soldOut ? 'unset' : 'pointer' }} onClick={handleClick}>
      <Flex sx={styles.mainContent}>
        <Flex sx={{ ...styles.imageCont, mx: ['10px', '10px', '10px', '15px'] }}>
          <Flex sx={{ display: MOBILE_DISPLAY }}>
            <OmniTokenImage currency={currency} size={30} />
          </Flex>
          <Flex sx={{ display: ['none', 'none', 'none', 'flex', 'none'] }}>
            <OmniTokenImage currency={currency} size={40} />
          </Flex>
          <Flex sx={{ display: ['none', 'none', 'none', 'none', 'flex'] }}>
            <OmniTokenImage currency={currency} size={56} />
          </Flex>
        </Flex>
        <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text sx={{ fontSize: ['12px', '12px', '12px', '16px'], fontWeight: 700 }}>{currency?.symbol}</Text>
            <Text sx={styles.markets}>
              {bonds?.length} {bonds?.length === 1 ? 'Market' : 'Markets'}
            </Text>
          </Flex>
          {bonds && !bonds?.[0]?.soldOut ? (
            <Flex sx={{ ...styles.bondInfo, width: ['150px', '150px', '150px', '70px'] }}>
              <Flex sx={{ justifyContent: 'flex-end' }}>
                <Text sx={styles.buyNow}>
                  {hasToSwitchChain ? 'SWITCH CHAIN & BUY' : 'BUY NOW'}
                  <Flex sx={{ ml: '5px' }}>
                    <Svg icon="caret" direction="right" color="yellow" width="7" />
                  </Flex>
                </Text>
              </Flex>
              <Flex sx={{ flexDirection: ['row', 'row', 'row', 'column'], justifyContent: 'flex-end' }}>
                <Text sx={styles.discount}>Discount</Text>
                <Text
                  sx={{
                    ...styles.discountAmount,
                    color: higherDiscount ? (higherDiscount > 0 ? 'success' : 'error') : 'text',
                  }}
                >
                  {higherDiscount?.toFixed(2)}%
                </Text>
              </Flex>
            </Flex>
          ) : (
            <Flex sx={{ ...styles.bondInfo, width: ['150px', '150px', '150px', '70px'], alignItems: 'flex-end' }}>
              <Text sx={styles.buyNow}> SOLD OUT</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      {bonds && !bonds?.[0]?.soldOut && (
        <Flex sx={{ ...styles.hoverContainer, display: DESKTOP_DISPLAY }}>
          <Text sx={{ display: 'flex', fontSize: '16px', fontWeight: 900, color: 'yellow' }}>
            {hasToSwitchChain ? 'SWITCH CHAIN & BUY' : 'BUY NOW'}
            <Flex sx={{ ml: '5px' }}>
              <Svg icon="caret" direction="right" width={10} color="yellow" />
            </Flex>
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export default BondCard
