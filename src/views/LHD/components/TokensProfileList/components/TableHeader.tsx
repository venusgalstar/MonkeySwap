import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import React from 'react'
import { styles } from '../styles'
import { columnWidths, mobileColumnWidths } from '../columnsFormat'
import { Svg } from 'components/uikit'
import TooltipBubble from 'components/uikit/Tooltip'

const TableHeader = ({
  sortCol,
  onSortColChange,
  sortType,
  onSortTypeChange,
}: {
  sortCol: string
  onSortColChange: (value: string) => void
  sortType: string
  onSortTypeChange: (value: any) => void
}) => {
  const headers = [
    '#',
    'Token',
    'Market Cap',
    '24h Change',
    'Extractable',
    'Strength',
    'Ownership',
    'Concentration',
    'Score',
  ]

  const HEADER_TIPS: any = {
    Extractable: 'The sum of the hard assets liquidity in all of the valid liquidity pairs for the token.',
    Strength: 'The ratio of the available liquidity of a token to its current market capitalization.',
    Ownership:
      'The ratio of the amount of liquidity owned by a project to the amount of liquidity that the project should own.',
    Concentration:
      'A metric that represents how well a project establishes deep liquidity in the pools it makes available for the token.',
    Score:
      'The Total Liquidity Health Score is the weighted average of: Strength (50%), Ownership (35%), Concentration (15%).',
  }

  const handleClick = (header: string) => {
    if (header === sortCol) {
      onSortTypeChange((prev: 'asc' | 'desc') => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      onSortColChange(header)
      onSortTypeChange('asc')
    }
  }

  return (
    <Box sx={styles.headerContainer}>
      {headers.map((header, index) => (
        <Flex
          key={index}
          sx={{
            padding: index === 0 ? '8px 0' : '8px',
            position: index === 0 || index === 1 || index === headers.length - 1 ? 'sticky' : undefined,
            left: index === 0 ? 0 : index === 1 ? 35 : undefined,
            right: index === headers.length - 1 ? 0 : undefined,
            zIndex: index === 0 || index === 1 || index === headers.length - 1 ? 2 : 1,
            background: 'white2',
            justifyContent: index === 1 ? 'flex-start' : 'center',
            minWidth: [`${mobileColumnWidths[index]}px`, `${mobileColumnWidths[index]}px`, `${columnWidths[index]}px`],
            display: 'flex',
            cursor: 'pointer',
          }}
          onClick={() => handleClick(header)}
        >
          <Text sx={styles.headerText}>
            {header}
            {HEADER_TIPS[header] && (
              <TooltipBubble
                style={{ zIndex: 1000 }}
                placement="bottomRight"
                transformTip="translate(14%, -8%)"
                width="180px"
                body={HEADER_TIPS[header]}
              >
                <div sx={{ ml: '2px', mt: ['1px', '1px', '2px', '2px'], width: ['8px', '8px', '10px', '12px'] }}>
                  <Svg color="textDisabled" icon="question" width="100%" />
                </div>
              </TooltipBubble>
            )}
            {header === sortCol && (
              <Flex sx={{ ml: '3px' }}>
                <Svg icon="caret" direction={sortType === 'asc' ? 'up' : 'down'} width={6} color="textDisabled" />
              </Flex>
            )}
          </Text>
        </Flex>
      ))}
    </Box>
  )
}

export default TableHeader
