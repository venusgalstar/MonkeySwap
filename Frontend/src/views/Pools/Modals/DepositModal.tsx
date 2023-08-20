import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import ModalInput from 'components/ModalInput'
import { useTranslation } from 'contexts/Localization'
import { getBNWithDecimals, getFullDisplayBalance } from 'utils/getBalanceNumber'
import { Button, Modal } from 'components/uikit'
import ApprovalAction from '../Actions/ApprovalAction'
import { Flex } from '../../../components/uikit'

interface DepositModalProps {
  max: string
  onConfirm: (amount: string) => Promise<void>
  tokenName?: string
  rawAllowance: string
  stakeTokenAddress: string
  sousId: number
}

const modalProps = {
  sx: {
    maxHeight: 'calc(100% - 30px)',
    minWidth: ['90%', '400px'],
    width: '200px',
    maxWidth: '425px',
  },
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  tokenName = '',
  rawAllowance,
  stakeTokenAddress,
  sousId,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(max))
  }, [max])
  const allowance = getBNWithDecimals(rawAllowance, 18)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={`${t('Stake')} ${tokenName}`} {...modalProps}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        inputTitle={t('Stake')}
      />
      {allowance?.lt(val) ? (
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <ApprovalAction stakingTokenContractAddress={stakeTokenAddress} sousId={sousId} width={'100%'} />
        </Flex>
      ) : (
        <Button
          fullWidth
          disabled={pendingTx || fullBalance === '0' || val === '0' || !val}
          onClick={async () => {
            setPendingTx(true)
            onConfirm(val).finally(() => setPendingTx(false))
          }}
          load={pendingTx}
          style={{
            borderRadius: '10px',
            marginTop: '10px',
          }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      )}
    </Modal>
  )
}

export default React.memo(DepositModal)
