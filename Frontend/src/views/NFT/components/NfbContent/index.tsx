import { Button, Flex, Text } from 'components/uikit'
import Image from 'next/image'

export default function NfbContent() {
  return (
    <Flex
      sx={{
        flexDirection: ['column', null, null, null, null, 'row-reverse'],
        alignItems: 'center',
        backgroundColor: `white2`,
        pb: [50, null, null, null, null, 0],
        width: '100%',
        gap: 'em',
      }}
    >
      <Flex
        sx={{
          width: ['100%', null, null, null, null, '55%'],
          alignItems: 'center',
          mr: [0, 0, 0, 0, 0, 100],
          mt: [50, null, 75, null],
          justifyContent: 'center',
        }}
      >
        <Image src={`/images/nft/nfb-display.png`} alt={`NFB`} layout="intrinsic" width={700} height={300} />
      </Flex>

      <Flex
        sx={{
          flexDirection: 'column',
          gap: '1em',
          justifyContent: 'space-between',
          textAlign: 'left',
          width: ['80%', null, null, '50%'],
          pl: [0, null, null, '10%'],
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
          NON-FUNGIBLE BANANAS
        </Text>
        <Text sx={{ fontWeight: '400', color: 'text' }}>
          Non-Fungible BANANAs (NFBs) are a cryptographically generated set of 10,000 unique digital bananas. Each NFB
          has a random set of 10 characteristics, which give the NFB their Rarity rank.
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
            onClick={() => window.open('https://nftkey.app/collections/nfbs', '_blank')}
            sx={{ width: '100%' }}
            variant="secondary"
          >
            VIEW COLLECTION
          </Button>
          <Button
            onClick={() =>
              window.open(
                'https://liquidcollectibles.io/collection/0x9f707a412302a3ad64028a9f73f354725c992081',
                '_blank',
              )
            }
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
