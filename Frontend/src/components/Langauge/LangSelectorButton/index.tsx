import React from 'react'
import useLanguageModal from '../LanguageModal/useLanguageModal'
import { Flex, Svg } from 'components/uikit'

const LangSelectorButton = () => {
  const { onPresentLanguageModal } = useLanguageModal()
  return (
    <Flex sx={{ padding: '0px 15px', cursor: 'pointer' }} onClick={onPresentLanguageModal}>
      <Svg icon="languageIcon" width="30px" color="text" />
    </Flex>
  )
}

export default React.memo(LangSelectorButton)
