import Lottie from 'lottie-react'
import Flex from '../Flex'
import apeSpinner from './apeSpinner.json'

const Spinner = ({ size }: { size?: number }) => {
  return (
    <Flex sx={{ width: size, height: size }}>
      <Lottie animationData={apeSpinner} loop />
    </Flex>
  )
}

export default Spinner
