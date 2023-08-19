import React from 'react'
import { ModalBody } from './styles'

const ModalContent: React.FC = ({ Icon, children }: any) => {
  return (
    <ModalBody>
      {Icon}
      {children}
    </ModalBody>
  )
}

export default ModalContent
