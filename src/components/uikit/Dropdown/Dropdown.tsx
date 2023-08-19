import React, { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { DropdownProps, dropdownPadding, fontSizes, sizes } from './types'
import Svg from '../Svg'

const Dropdown: React.FC<DropdownProps> = ({ component, children, size = sizes.MEDIUM, ...props }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen((prev) => !prev)

  return (
    <Box
      sx={{
        background: 'lvl1',
        borderRadius: '10px',
        cursor: 'pointer',
        width: '100%',
        position: 'relative',
      }}
      onClick={handleClick}
      {...props}
    >
      <Flex
        sx={{
          px: dropdownPadding[size].x,
          py: dropdownPadding[size].y,
          justifyContent: 'space-between',
          alignItems: 'center',
          span: {
            fontSize: fontSizes[size],
          },
        }}
      >
        {component}
        <Svg icon="caret" direction={open ? 'up' : 'down'} />
      </Flex>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: '10px' }}
            animate={{ height: 'fit-content' }}
            exit={{ height: '0px' }}
            sx={{
              position: 'absolute',
              background: 'lvl1',
              width: 'fit-content',
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
              overflow: 'hidden',
              marginTop: '5px',
              top: '85%',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default Dropdown
