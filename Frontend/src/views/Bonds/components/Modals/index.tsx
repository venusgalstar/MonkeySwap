import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import UserBillModalView from './UserBillModalView'
import WarningModal from './WarningModal'
import useModal from 'hooks/useModal'
import { Bills } from 'views/Bonds/types'
import BuyBillModalView from './BuyBillModalView'
import { Button, Flex } from 'components/uikit'
import Image from 'next/image'
import ReflectModal from './ReflectModal'
import { SupportedChainId } from '@ape.swap/sdk-core'

const REFLECT_BONDS = ['NOOT']

interface BillModalProps {
  bill: Bills
  buttonText?: string
  id?: number
  billId?: string
  buyFlag?: boolean
  billCardImage?: string
  disabled?: boolean
}

const BillModal: React.FC<BillModalProps> = ({ buttonText, bill, id, buyFlag, billId, billCardImage, disabled }) => {
  const router = useRouter()
  const { chainId } = useWeb3React()
  const [onPresentBuyBillsModal, handleBuyBillsModalClose] = useModal(
    <BuyBillModalView billIndex={bill.index} />,
    false,
    false,
    `billsModal${id}`,
  )

  const [onPresentUserBillModal] = useModal(
    <UserBillModalView bill={bill} billId={billId} />,
    true,
    true,
    `billsModal${bill.billNftAddress}-${billId}`,
  )

  const [onPresentBuyWarning, handleBuyWarningClose] = useModal(
    <WarningModal bill={bill} />,
    true,
    true,
    `billsWarningModal${id}`,
  )

  const [onPresentReflectModal] = useModal(
    <ReflectModal billIndex={bill.index} billSymbol={bill.earnToken.symbol} />,
    true,
    true,
    `billsReflectWarningModal${id}`,
  )

  const closeBuyModals = (): void => {
    handleBuyBillsModalClose()
    handleBuyWarningClose()
  }

  useEffect(() => {
    return () => {
      closeBuyModals()
    }
  }, [])

  useEffect(() => {
    if (!router.query.bondAddress) {
      closeBuyModals()
    }
  }, [router.query.bondAddress])

  const handleBuyClick = () => {
    const { contractAddress } = bill
    buyFlag
      ? REFLECT_BONDS.includes(bill?.earnToken.symbol)
        ? onPresentReflectModal()
        : parseFloat(bill?.discount as string) < 0
        ? onPresentBuyWarning()
        : onPresentBuyBillsModal()
      : onPresentUserBillModal()

    router.push(`/bonds?bondAddress=${contractAddress[chainId as SupportedChainId]}`, undefined, { shallow: true })
  }

  return !billCardImage ? (
    <Button
      onClick={handleBuyClick}
      disabled={disabled}
      sx={{
        lineHeight: '20px',
        minWidth: '109px',
        width: ['240px', '240px', '240px', '100%'],
        mt: ['10px', '10px', '10px', '0px'],
      }}
    >
      {buttonText}
    </Button>
  ) : (
    <Flex sx={{ cursor: 'pointer', width: '270px' }} onClick={onPresentUserBillModal}>
      <Image width={720} height={405} alt={'user-bill'} src={billCardImage} layout="responsive" />
    </Flex>
  )
}

export default React.memo(BillModal)
