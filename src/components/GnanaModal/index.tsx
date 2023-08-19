import React from 'react'
import Gnana from './Gnana'
import { modalProps } from './styles'
import { Modal } from 'components/uikit'

const GnanaModal: React.FC<any> = ({ onDismiss }) => {
  return (
    <Modal title="Get GNANA" onDismiss={onDismiss} {...modalProps}>
      <Gnana />
    </Modal>
  )
}

export default GnanaModal
