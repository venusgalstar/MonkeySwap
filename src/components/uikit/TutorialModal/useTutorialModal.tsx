import useModal from 'hooks/useModal'
import TutorialModal from '.'
import { TModalProps } from './types'

interface ReturnType {
  onPresentTutorialModal: () => void
}

const useTutorialModal = ({
  type,
  children,
  title,
  description,
  onDismiss,
  t,
  isConnected,
  width,
}: TModalProps): ReturnType => {
  const [onPresentTutorialModal] = useModal(
    <TutorialModal
      type={type}
      title={title}
      description={description}
      onDismiss={onDismiss}
      t={t}
      isConnected={isConnected}
      width={width}
    >
      {children}
    </TutorialModal>,
    true,
    false,
    'TutorialModal',
  )
  return { onPresentTutorialModal }
}

export default useTutorialModal
