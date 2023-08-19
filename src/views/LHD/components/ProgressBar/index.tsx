import React from 'react'
import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import { getColor } from '../../utils/getColor'

interface ProgressBarProps {
  value: number;
  position: 'left' | 'right'
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, position }) => {

  return (
    <Flex sx={{ width: '100%', alignItems: 'center', flexDirection: position === 'left' ? 'row' : 'row-reverse' }}>
      <Text sx={{
        fontWeight: 500,
        fontSize: ['10px', '10px', '10px', '12px'],
        margin: position === 'left' ? '0 5px 0 0' : '0 0 0 5px',
        minWidth: '25px',
      }}>
        {value}%
      </Text>
      <Box
        sx={{
          width: '100%',
          height: position === 'right' ? '12px' : '8px',
          backgroundColor: 'white4',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Box sx={{
          width: `${value <= 3 ? 3 : value}%`,
          backgroundColor: getColor(value),
          borderRadius: '10px',
          height: '100%',
        }} />
      </Box>
    </Flex>
  )
}

export default ProgressBar
