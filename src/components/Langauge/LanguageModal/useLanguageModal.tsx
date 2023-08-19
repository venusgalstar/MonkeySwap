import SelectLanguageModal from './SelectLanguageModal'
import useModal from 'hooks/useModal'

interface ReturnType {
  onPresentLanguageModal: () => void
}

const useLanguageModal = (): ReturnType => {
  const [onPresentLanguageModal] = useModal(<SelectLanguageModal />, true, true, 'LanguageModal')
  return { onPresentLanguageModal }
}

export default useLanguageModal
