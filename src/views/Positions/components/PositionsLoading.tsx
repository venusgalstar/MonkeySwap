import { Flex, Skeleton } from 'components/uikit'

const PositionsLoading = () => {
  return (
    <Flex sx={{ width: '100%', flexDirection: 'column' }}>
      {[...Array(6)].map((_, i) => {
        return <Skeleton key={i} width="100%" height={80} sx={{ margin: '5px 0px' }} animation="waves" />
      })}
    </Flex>
  )
}

export default PositionsLoading
