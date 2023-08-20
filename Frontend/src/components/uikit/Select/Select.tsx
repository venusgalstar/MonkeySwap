import React, { useRef, useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { SelectProps, selectPadding, sizes, positions, selectedExtraPadding } from './types'
import Svg from '../Svg'
import styles from './styles'

const Select = ({
  children,
  active,
  width = 'fit-content',
  size = sizes.MEDIUM,
  position = positions.BOTTOM,
  className,
  label,
  ...props
}: SelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen((prev) => !prev)

  const setNativeInput = (val: string) => {
    const input = inputRef?.current

    if (input) {
      Object?.getOwnPropertyDescriptor?.(window.HTMLInputElement.prototype, 'value')?.set?.call(input, val)
      input.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  return (
    <>
      <Box sx={{ ...styles.container, width }} onClick={handleClick} className={className}>
        <Flex
          sx={{
            padding: selectedExtraPadding[size],
            pr: selectPadding[size],
            columnGap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {label ? (
            <Box>{label}</Box>
          ) : (
            React.Children.map(children, (child) => {
              if ((child as any)?.props?.value !== active) {
                return null
              }
              return React.cloneElement(child as any, {
                ...(child as any)?.props,
                active: true,
              })
            })
          )}
          <Svg icon="caret" direction={open ? 'up' : 'down'} />
        </Flex>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'fit-content' }}
              transition={{ opacity: { duration: 0.2 } }}
              exit={{ opacity: 0, height: 0 }}
              sx={{
                ...styles.ul,
                zIndex: 10,
                top: position === positions.BOTTOM ? 'calc(100% + 5px)' : undefined,
                bottom: position === positions.TOP ? 'calc(100% + 5px)' : undefined,
              }}
            >
              {React.Children.map(children, (child) => {
                return React.cloneElement(child as any, {
                  ...(child as any)?.props,
                  active: false,
                  onClick: () => setNativeInput((child as any)?.props?.value),
                })
              })}
            </motion.div>
          )}
        </AnimatePresence>
        <input ref={inputRef} value={active || ''} aria-hidden="true" tabIndex={-1} {...props} sx={styles.input} />
      </Box>
      {open && <div aria-hidden="true" onClick={() => setOpen(false)} sx={styles.backdrop} />}
    </>
  )
}

export default Select
