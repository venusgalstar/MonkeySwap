import React from 'react'
import { Divider, Flex } from 'theme-ui'
import style from './styles'
import { IconButton } from '../Button'
import { InternalProps } from './types'

const ModalHeader: React.FC<InternalProps> = ({ children, onDismiss, hideDivider, ...props }) => {
  return (
    <>
      <Flex {...props} sx={style.modalHead}>
        {children}
        <IconButton icon="close" color="text" variant="transparent" onClick={onDismiss} />
      </Flex>
      {!hideDivider && <Divider />}
    </>
  )
}

export default ModalHeader
