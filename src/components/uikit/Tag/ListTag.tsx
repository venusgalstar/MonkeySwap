import React from 'react'
import { styles } from './styles'
import { ListTagProps, lpTags } from './types'
import Flex from '../Flex'

const ListTag: React.FC<ListTagProps> = ({ variant, text = '' }) => {
  return (
    <Flex variant={variant} sx={styles.listTagCont({ variant })}>
      {text
        ?
        <Flex sx={styles.tagText({ variant })}>
          {text}
        </Flex>
        :
        <Flex sx={styles.tagText({ variant })}>
          {variant.toUpperCase().replace('_', ' ')} {lpTags.includes(variant) && 'LP'}
        </Flex>
      }
    </Flex>
  )
}

export default ListTag
