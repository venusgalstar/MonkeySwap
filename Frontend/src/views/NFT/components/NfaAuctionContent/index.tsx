import { Button, Flex, Text } from 'components/uikit'
import Image from 'next/image'

export default function NfaAuctionContent() {
  return (
    <Flex
      sx={{
        flexDirection: ['column', null, null, null, null, 'row'],
        alignItems: 'center',
        backgroundColor: `white1`,
        width: '100%',
        gap: '1em',
        pb: 75,
      }}
    >
      <Flex
        sx={{
          width: ['100%', null, null, null, null, '30%'],
          alignItems: 'center',
          ml: [0, 0, 0, 0, 0, 100],
          mt: [50, null, 75, null],
          mb: 25,
          justifyContent: 'center',
        }}
      >
        <Image
          src={`/images/nft/nfa-auction.png`}
          alt={`NFA Section`}
          width={300}
          height={300}
          sx={{
            width: ['200px', '200px', '300px', '300px', '300px', '300px'],
            height: ['200px', '200px', '300px', '300px', '300px', '300px'],
          }}
        />
      </Flex>

      <Flex
        sx={{
          flexDirection: 'column',
          gap: '1em',
          justifyContent: 'space-between',
          textAlign: 'left',
          width: ['80%', null, null, '70%'],
          pr: [0, null, null, '10%'],
        }}
      >
        <Text
          sx={{
            fontSize: ['24px', '24px', '36px', '36px', '36px', '48px'],
            fontWeight: 700,
            lineHeight: '1em',
          }}
        >
          NFA AUCTION HOUSE
        </Text>
        <Text sx={{ fontWeight: '400', color: 'text' }}>
          Buy and sell Non-Fungible Apes through an auction mechanism.NFAs will be auctioned in the order they are
          submitted. When an auction ends, the NFA will be sent to the highest bidder automatically.
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
            onClick={() => window.open('https://legacy.apeswap.finance/auction', '_blank')}
            sx={{ width: ['100%', null, null, null, null, '50%'] }}
            variant="primary"
          >
            ENTER AUCTION HOUSE
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
