import React from 'react'
import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import { getColor } from 'views/LHD/utils/getColor'

interface ProgressBarProps {
  value: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <Flex sx={{ width: ['100px','100px','100px','100%'], alignItems: 'center', flexDirection: 'row', mt: '5px' }}>
      <Box
        sx={{
          width: '100%',
          height: '5px',
          backgroundColor: 'white4',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: `${value <= 3 ? 3 : value}%`,
            backgroundColor: 'text',
            borderRadius: '10px',
            height: '100%',
          }}
        />
      </Box>
    </Flex>
  )
}

export default ProgressBar
