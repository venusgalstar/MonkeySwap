import React from 'react'
import { Modal } from 'components/uikit'
import { BondLanding } from 'state/bondsLanding/types'
import ModalBondCard from './ModalBondCard'

const MultiMarketBond = ({ bonds }: { bonds: BondLanding[] | undefined }) => {
  const sortedBonds = bonds?.sort((a, b) => {
    // Handle cases where discount is undefined
    const aDiscount = typeof a.discount === 'undefined' ? Number.MIN_SAFE_INTEGER : a.discount
    const bDiscount = typeof b.discount === 'undefined' ? Number.MIN_SAFE_INTEGER : b.discount

    return bDiscount - aDiscount
  })

  return (
    <Modal title="Select bond">
      {bonds &&
        sortedBonds &&
        sortedBonds.map((bond) => {
          return <ModalBondCard bond={bond} key={bond.billAddress} />
        })}
    </Modal>
  )
}

export default MultiMarketBond
