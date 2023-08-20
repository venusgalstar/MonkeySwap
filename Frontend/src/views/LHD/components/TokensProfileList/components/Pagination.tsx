import React from 'react'
import { Button, Flex, Svg, Text } from 'components/uikit'
import { styles } from './styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  hidePagination?: boolean
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, hidePagination }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const initialPages = currentPage <= 5 ? Array.from({ length: 6 }, (_, i) => i + 1) : [1]
  const middlePages =
    currentPage > 5 && currentPage <= totalPages - 5 ? Array.from({ length: 5 }, (_, i) => currentPage - 2 + i) : []
  const finalPages =
    currentPage > totalPages - 5 ? Array.from({ length: 6 }, (_, i) => totalPages - 5 + i) : [totalPages]

  return (
    <>
      {!hidePagination && (
        <Flex sx={styles.paginationCont}>
          <Flex onClick={handlePreviousPage} sx={{ mx: '5px', cursor: 'pointer' }}>
            <Svg icon="caret" direction="left" width={7} color="textDisabled" />
          </Flex>

          {initialPages.map((page) => (
            <Button
              size="sm"
              key={page}
              onClick={() => onPageChange(page)}
              sx={{ ...styles.btn, background: currentPage === page ? 'yellow' : 'white2' }}
              variant={currentPage === page ? 'primary' : 'secondary'}
            >
              {page}
            </Button>
          ))}

          {(middlePages.length > 0 || finalPages[0] !== 2) && (
            <Text sx={{ color: 'textDisabled', mx: '10px' }}>...</Text>
          )}

          {middlePages.map((page) => (
            <Button
              size="sm"
              key={page}
              onClick={() => onPageChange(page)}
              sx={{ ...styles.btn, background: currentPage === page ? 'yellow' : 'white2' }}
              variant={currentPage === page ? 'primary' : 'secondary'}
            >
              {page}
            </Button>
          ))}

          {(middlePages.length > 0 || initialPages[0] !== totalPages - 1) && (
            <Text sx={{ color: 'textDisabled', mx: '10px' }}>...</Text>
          )}

          {finalPages.map((page) => (
            <Button
              size="sm"
              key={page}
              onClick={() => onPageChange(page)}
              sx={{ ...styles.btn, background: currentPage === page ? 'yellow' : 'white2' }}
              variant={currentPage === page ? 'primary' : 'secondary'}
            >
              {page}
            </Button>
          ))}

          <Flex onClick={handleNextPage} sx={{ mx: '5px', cursor: 'pointer' }}>
            <Svg icon="caret" direction="right" width={7} color="textDisabled" />
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default Pagination
