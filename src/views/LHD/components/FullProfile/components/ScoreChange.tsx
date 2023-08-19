import React from 'react'
import { Text } from '../../../../../components/uikit'

const ScoreChange = ({ change }: { change: string }) => {
  const isPositive = parseFloat(change) > 0
  const floatChange = parseFloat(change)

  const changeStyle = {
    color: floatChange > 0 ? 'success' : floatChange < 0 ? 'error' : 'text',
    fontSize: ['10px', '10px', '10px', '12px'],
  }

  return (
    <Text sx={changeStyle}>
      {isPositive ? '+' : ''}
      {change}%
    </Text>
  )
}

export default ScoreChange
