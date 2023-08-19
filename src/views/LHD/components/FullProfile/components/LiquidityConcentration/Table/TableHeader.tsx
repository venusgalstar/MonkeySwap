import React from 'react'
import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import { styles } from './styles'

const TableHeader = () => {
  const headers = [
    '#',
    'Liquidity Pool',
    'Status',
    'Total Liquidity',
    'Extractable',
    'Chain',
    'DEX',
    'Pair Address',
  ]

  return (
    <Box sx={styles.headerCont}>
      {headers.map((header, index) => (
        <Flex
          key={index}
          sx={{
            padding: '8px',
            position: index === 0 || index === 1 ? 'sticky' : undefined,
            left: index === 0 ? 0 : index === 1 ? 25 : undefined,
            right: index === headers.length - 1 ? 0 : undefined,
            zIndex: index === 0 || index === 1 ? 2 : 1,
            background: 'white2',
            justifyContent: index === 1 ? 'flex-start' : 'center',
          }}
        >
          <Text sx={{ ...styles.headerText,color: index === 0 ? undefined : 'textDisabled'  }}>
            {header}
          </Text>
        </Flex>
      ))}
    </Box>
  )
}

export default TableHeader