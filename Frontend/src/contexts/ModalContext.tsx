import { Flex } from 'components/uikit'
import React, { createContext, useState } from 'react'

interface ModalsContext {
  nodeId: string[]
  modalNode: React.ReactNode[]
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode[]>>
  onPresent: (node: React.ReactNode, newNodeId: string, clearModalStack: boolean) => void
  handleClose: () => void
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ModalsContext>({
  nodeId: [],
  modalNode: [],
  setModalNode: () => null,
  onPresent: () => null,
  handleClose: () => null,
  setCloseOnOverlayClick: () => true,
})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodeId, setNodeId] = useState<string[]>([])
  const [modalNode, setModalNode] = useState<React.ReactNode[]>([])
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const handlePresent = (node: React.ReactNode, newNodeId: string, clearModalStack: boolean) => {
    if (clearModalStack) {
      setModalNode([node])
      setNodeId([newNodeId])
    } else {
      setModalNode((prev) => [...prev, node])
      setNodeId((prev) => [...prev, newNodeId])
    }
  }

  const handleDismiss = () => {
    if (modalNode.length > 0) {
      if (React.isValidElement(modalNode[modalNode.length - 1])) {
        // @ts-ignore
        modalNode[modalNode.length - 1].props.onDismiss?.()
      }
    }
    setModalNode(modalNode.slice(0, modalNode.length - 1))
    setNodeId(nodeId.slice(0, nodeId.length - 1))
  }

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }

  return (
    <Context.Provider
      value={{
        nodeId,
        modalNode,
        setModalNode,
        onPresent: handlePresent,
        handleClose: handleDismiss,
        setCloseOnOverlayClick,
      }}
    >
      {modalNode.map((modal, i) => {
        return (
          <Flex key={nodeId[i]}>
            <Flex onClick={handleOverlayDismiss}/>
            {React.isValidElement(modal) &&
              React.cloneElement(modal, {
                // @ts-ignore
                onDismiss: handleDismiss,
              })}
          </Flex>
        )
      })}
      {children}
    </Context.Provider>
  )
}

export default ModalProvider
