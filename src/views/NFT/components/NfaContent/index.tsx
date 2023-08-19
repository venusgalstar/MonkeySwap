import { Button, Flex, Text } from 'components/uikit'
import Image from 'next/image'

export default function NfaContent() {
  return (
    <Flex
      sx={{
        flexDirection: ['column', null, null, null, null, 'row'],
        alignItems: 'center',
        backgroundColor: `white1`,
        width: '100%',
        gap: '1em',
        pb: [50, null, null, null, null, 0],
      }}
    >
      <Flex
        sx={{
          width: ['100%', null, null, null, null, '55%'],
          alignItems: 'center',
          ml: [0, 0, 0, 0, 0, 100],
          mt: [50, null, 75, null],
          justifyContent: 'center',
        }}
      >
        <Image src={`/images/nft/nfa-display.png`} alt={`NFA Auction`} layout="intrinsic" width={700} height={300} />
      </Flex>

      <Flex
        sx={{
          flexDirection: 'column',
          gap: '1em',
          justifyContent: 'space-between',
          textAlign: 'left',
          width: ['80%', null, null, '50%'],
          pr: [0, null, null, '10%'],
          mt: [-50],
        }}
      >
        <Text
          sx={{
            fontSize: ['24px', '24px', '36px', '36px', '36px', '48px'],
            fontWeight: 700,
            lineHeight: '1em',
          }}
        >
          NON-FUNGIBLE APES
        </Text>
        <Text sx={{ fontWeight: '400', color: 'text' }}>
          Non-Fungible Apes (NFAs) are a cryptographically generated set of 1,000 unique, rare, and immutable digital
          apes. Each ape is created by hashing a string (such as “Strong Ape”) to randomly generate a set of 6
          characteristics.
        </Text>
        <Flex
          sx={{
            flexDirection: ['column', null, null, 'row'],
            justifyContent: 'space-between',
            width: '100%',
            gap: '1em',
          }}
        >
          <Button
            onClick={() => window.open('https://legacy.apeswap.finance/nft', '_blank')}
            sx={{ width: '100%' }}
            variant="secondary"
          >
            VIEW COLLECTION
          </Button>
          <Button
            onClick={() => window.open('https://legacy.apeswap.finance/auction', '_blank')}
            sx={{ width: '100%' }}
            variant="primary"
          >
            BUY NOW
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
