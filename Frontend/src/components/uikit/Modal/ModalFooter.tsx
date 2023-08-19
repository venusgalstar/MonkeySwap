import React, { useContext } from 'react'
import { Flex } from 'theme-ui'
import { InternalProps } from './types'
import styles from './styles'
import Text from '../Text'
import { Context as ModalContext } from 'contexts/ModalContext'

const ModalFooter = ({ children, onDismiss, t }: InternalProps) => {
  const { handleClose } = useContext(ModalContext)
  const onClose = () => {
    onDismiss?.()
    handleClose()
  }
  return (
    <Flex sx={styles.modalFooter}>
      {children}
      <Text
        onClick={onClose}
        sx={{
          textDecoration: 'underline',
          color: 'text',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        {t ? t('Cancel') : 'Cancel'}
      </Text>
    </Flex>
  )
}

export default ModalFooter
