import { Box } from 'theme-ui'
import { Skeleton } from 'components/uikit'
import React from 'react'
import { styles } from '../styles'

const SkeletonRow = () => {

  return (
    <Box sx={styles.headerContainer}>
      {[...Array(9)].map((_, i) => {
        return <Skeleton key={i} width="50%" height="70%" sx={{ margin: '2.5px 0px' }} />
      })}
    </Box>
  )
}

export default SkeletonRow
