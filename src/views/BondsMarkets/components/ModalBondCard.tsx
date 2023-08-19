import React from 'react'
import { styles } from './styles'
import { Flex, Svg, Text } from 'components/uikit'
import { MOBILE_DISPLAY } from 'theme/display'
import OmniTokenImage from 'components/OmniChain/OmniTokenImage'
import { BondLanding } from 'state/bondsLanding/types'
import { useCurrency } from 'hooks/Tokens'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import useSelectChain from 'hooks/useSelectChain'

const ModalBondCard = ({ bond }: { bond: BondLanding }) => {
  const currency = useCurrency(bond.showcaseToken, bond.chainId)
  const router = useRouter()
  const { chainId } = useWeb3React()
  const selectChain = useSelectChain()

  const handleClick = () => {
    if (chainId !== bond?.chainId) {
      selectChain(bond?.chainId).then(() => {
        router.push(`/bonds?bondAddress=${bond?.billAddress?.toLowerCase()}`)
      })
    } else {
      router.push(`/bonds?bondAddress=${bond.billAddress?.toLowerCase()}`)
    }
  }

  return (
    <Flex
      sx={{
        ...styles.mainContent,
        cursor: 'pointer',
        borderRadius: '10px',
        p: '10px',
        ':hover': {
          background: 'white3',
        },
      }}
      onClick={handleClick}
    >
      <Flex sx={{ ...styles.imageCont, mr: ['10px', '10px', '10px', '15px'] }}>
        <Flex sx={{ display: MOBILE_DISPLAY }}>
          <OmniTokenImage currency={currency} size={30} />
        </Flex>
        <Flex sx={{ display: ['none', 'none', 'none', 'flex'] }}>
          <OmniTokenImage currency={currency} size={40} />
        </Flex>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Flex sx={{ flexDirection: 'column', justifyContent: 'center', minWidth: '80px' }}>
          <Text sx={{ fontSize: ['12px', '12px', '12px', '18px'] }}>{currency?.symbol}</Text>
          <Text sx={styles.markets}>{bond.principalTokenName}</Text>
        </Flex>
        <Flex sx={{ ...styles.bondInfo, width: ['55px', '55px', '55px', '70px'] }}>
          <Flex sx={{ flexDirection: 'column' }}>
            <Text sx={styles.discount}>Discount</Text>
            <Text
              sx={{
                ...styles.discountAmount,
                color: bond?.discount ? (bond?.discount > 0 ? 'success' : 'error') : 'text',
              }}
            >
              {bond.discount?.toFixed(2)}%
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Text sx={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: 'yellow' }}>
            BUY NOW
            <Flex sx={{ ml: '5px' }}>
              <Svg icon="caret" direction="right" width={8} color="yellow" />
            </Flex>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ModalBondCard
