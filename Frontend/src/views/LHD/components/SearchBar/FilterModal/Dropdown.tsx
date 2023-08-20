import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex, Svg, Text } from 'components/uikit'

const Dropdown = ({
  title,
  values,
  children,
  open,
}: {
  title: string
  values: string
  children: React.ReactNode
  open?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(open)
  return (
    <Flex
      sx={{
        border: '2px solid',
        borderRadius: '10px',
        borderColor: 'lvl1',
        background: 'lvl1',
        width: '100%',
        flexDirection: 'column',
        height: 'fit-content',
        cursor: 'pointer',
        overflow: 'hidden',
        mt: '20px',
      }}
    >
      <Flex
        sx={{ width: '100%', padding: '10px', justifyContent: 'space-between', fontSize: '12px', fontWeight: 500 }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Text>{title}</Text>
          <Text sx={{ color: 'textDisabled', ml: '3px' }}>{values}</Text>
        </Flex>
        <Svg icon="caret" direction={isOpen ? 'up' : 'down'} />
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden', width: '100%' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default Dropdown
