import { Flex, Svg } from 'components/uikit'
import useModal from 'hooks/useModal'
import MoonPayModal from './MoonpayModal'

export default function Moonpay() {
  const [onPresentModal] = useModal(<MoonPayModal onDismiss={() => null} />)

  return (
    <Flex onClick={onPresentModal} mr='20px' sx={{ cursor: 'pointer' }}>
      <Svg icon='card' width='30px' />
    </Flex>
  )
}
