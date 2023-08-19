/** @jsxImportSource theme-ui */
import React from 'react'
import CTA from './CTA'
import { CMProps } from './types'
import { Modal } from '../uikit'
import CircularContent from './CircularContent'
import { MODAL_INFO } from '../MarketingModalCheck/constants'

const CM: React.FC<CMProps> = ({ path, onDismiss }) => {
  const modalInfo = MODAL_INFO[path]
  return (
    <Modal title={modalInfo['title']} onDismiss={onDismiss} sx={{ width: '410px' }}>
      <CircularContent supporting={modalInfo['supporting']} description={modalInfo['description']}>
        <CTA actionType={path} />
      </CircularContent>
    </Modal>
  )
}

export default CM
