import React from 'react'
import RoiCalculatorModal from './RoiCalculatorModal'
import styles from './styles'
import useModal from 'hooks/useModal'
import { IconButton, Svg } from 'components/uikit'

export interface CalcButtonProps {
  label?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apr?: number
  lpApr?: number
  apy?: number
  lpAddress?: string
  tokenAddress?: string
  quoteTokenAddress?: string
  isLp?: boolean
  liquidityUrl?: string
  lpPrice?: number
  lpCurr1?: string
  lpCurr2?: string
}

const CalcButton: React.FC<CalcButtonProps> = (props) => {
  const { apr } = props
  const [onPresentCalcModal] = useModal(<RoiCalculatorModal {...props} />)

  return (
    <IconButton variant="transparent" onClick={onPresentCalcModal} disabled={!apr} sx={styles.apyButton}>
      <Svg icon="calculator" color="yellow" />
    </IconButton>
  )
}

export default React.memo(CalcButton)
