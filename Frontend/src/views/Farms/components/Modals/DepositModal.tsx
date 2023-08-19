import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Button, Modal } from 'components/uikit'
import { getBNWithDecimals, getFullDisplayBalance } from 'utils/getBalanceNumber'
import ModalInput from 'components/ModalInput/ModalInput'
import { useTokenContract } from '../../../../hooks/useContract'
import { useApprove } from '../../hooks/useApprove'
import { FarmTypes } from '../../../../state/farms/types'
import { useToastError } from '../../../../state/application/hooks'

const DepositModal = ({
  max,
  stakeLpAddress,
  farmTypes,
  contractAddress,
  rawAllowance,
  onConfirm,
}: {
  max: string
  stakeLpAddress: string
  farmTypes: FarmTypes
  contractAddress?: string
  rawAllowance: string
  onConfirm: (amount: string) => Promise<void>
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const allowance = getBNWithDecimals(rawAllowance, 18)

  const lpToken = useTokenContract(stakeLpAddress)
  const { onApprove } = useApprove(lpToken, farmTypes, contractAddress)
  const toastError = useToastError()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(max))
  }, [max])

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
    <Modal
      title={t('Stake LP tokens')}
      sx={{
        maxHeight: 'calc(100% - 30px)',
        minWidth: ['90%', '400px'],
        width: '200px',
        maxWidth: '425px',
      }}
    >
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        inputTitle={t('Stake')}
      />
      {allowance?.lt(val) ? (
        <Button
          onClick={async () => {
            setPendingTx(true)
            try {
              onApprove()
                .catch((e) => toastError(e))
                .finally(() => setPendingTx(false))
            } catch (e) {}
          }}
          disabled={pendingTx}
          load={pendingTx}
          sx={{ mt: '10px', width: '100%' }}
        >
          {t('Approve')}
        </Button>
      ) : (
        <Button
          fullWidth
          disabled={
            pendingTx || fullBalance === '0' || val === '0' || !val || parseFloat(fullBalance) < parseFloat(val)
          }
          onClick={async () => {
            setPendingTx(true)
            onConfirm(val).finally(() => setPendingTx(false))
          }}
          load={pendingTx}
          sx={{ mt: '10px', width: '100%' }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      )}
    </Modal>
  )
}

export default React.memo(DepositModal)
