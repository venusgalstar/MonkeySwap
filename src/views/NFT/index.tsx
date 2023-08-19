import { Flex } from 'components/uikit'
import NfaContent from './components/NfaContent'
import NfbContent from './components/NfbContent'
import NfaAuctionContent from './components/NfaAuctionContent'

const NFT = () => {
  return (
    <Flex sx={{ flexDirection: 'column', width: '100%', margin: '0 auto' }}>
      <NfaContent />
      <NfbContent />
      <NfaAuctionContent />
    </Flex>
  )
}

export default NFT
