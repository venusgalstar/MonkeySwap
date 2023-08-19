import React, { useCallback, useContext, useEffect } from 'react'
import get from 'lodash/get'
import { Context } from 'contexts/ModalContext'

const useModal = (
  modal: React.ReactNode,
  closeOnOverlayClick = true,
  updateOnPropsChange = false,
  modalId = 'defaultNodeId',
  clearModalStack = false,
): [() => void, () => void] => {
  // Clear modal stack will not update props if the parent modal gets unmounted
  const { nodeId, modalNode, setModalNode, onPresent, handleClose, setCloseOnOverlayClick } = useContext(Context)
  const onPresentCallback = useCallback(() => {
    onPresent(modal, modalId, clearModalStack)
  }, [modal, modalId, clearModalStack, onPresent])
  const nodeIdIndex = nodeId.indexOf(modalId)
  useEffect(() => {
    // NodeId is needed in case there are 2 useModal hooks on the same page and one has updateOnPropsChange
    if (updateOnPropsChange) {
      const modalProps = get(modal, 'props')
      const oldModalProps = get(modalNode[nodeIdIndex], 'props')
      if (modalProps && oldModalProps && JSON.stringify(modalProps) !== JSON.stringify(oldModalProps)) {
        setModalNode((prev) => [...prev.filter((_, i) => i !== nodeIdIndex), modal])
      }
    }
  }, [updateOnPropsChange, nodeId, modalId, modal, nodeIdIndex, modalNode, setModalNode])

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick)
  }, [closeOnOverlayClick, setCloseOnOverlayClick])

  return [onPresentCallback, handleClose]
}

export default useModal
