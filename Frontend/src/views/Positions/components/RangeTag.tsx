import { Flex, Text } from 'components/uikit'

const RangeTag = ({ removed, inRange }: { removed?: boolean; inRange: boolean }) => {
  return (
    <Flex variant="flex.tag" sx={{ background: 'white4' }}>
      <Flex
        sx={{
          height: '5px',
          width: '5px',
          borderRadius: '5px',
          background: removed ? 'error' : inRange ? 'success' : 'yellow',
          mr: '5px',
        }}
      />
      <Text size="10px" sx={{ lineHeight: '9px', opacity: 0.7 }}>
        {removed ? 'Closed' : inRange ? 'In range' : 'Out of range'}
      </Text>
    </Flex>
  )
}

export default RangeTag
