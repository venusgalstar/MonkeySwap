import { Button, Flex, Svg, Text, Link } from 'components/uikit'

const NoPositionSelectedPage = ({ mobile }: { mobile?: boolean }) => {
  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <Svg icon="placeholderMonkey" width={250} />
      <Text sx={{ mt: '10px' }}>{mobile ? 'Your position info will appear here' : 'The token pair info will appear here'}</Text>
    </Flex>
  )
}

export default NoPositionSelectedPage
