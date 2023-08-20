import { Flex, IconButton, Svg, Text, Link } from 'components/uikit'
import { DEFAULT_TXN_DISMISS_MS } from 'config/constants/misc'
import React, { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './styles'

import { useRemovePopup } from 'state/application/hooks'
import { AlertProps } from './types'

const Toast = ({ popKey, popIndex, variant, text, url, linkText, errorText }: AlertProps) => {
  const removePopup = useRemovePopup()
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeThisPopup()
    }, DEFAULT_TXN_DISMISS_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeThisPopup])
  return (
    <motion.div
      initial={{ right: '-250px' }}
      animate={{ right: '10px' }}
      transition={{ duration: 0.5 }}
      exit={{ right: '-250px' }}
      sx={{ ...styles.alert, top: 70 * popIndex, zIndex: 103 }}
    >
      <Flex>
        <Svg
          icon={variant === 'danger' ? 'close' : variant}
          color={variant === 'error' || variant === 'danger' ? 'error' : 'success'}
          width="30px"
        />
      </Flex>

      <Flex sx={styles.content}>
        <Text>{text}</Text>

        {linkText && url && (
          <Link href={url} sx={styles.link} color="text" target="_blank">
            <Text mr="5px">{linkText}</Text>
            <Svg icon="external" />
          </Link>
        )}
        {errorText && (
          <Text
            sx={{ color: 'error', fontSize: '12px', lineHeight: '18px', fontWeight: 500, textTransform: 'capitalize' }}
          >
            {errorText.includes('execution reverted: BEP20: transfer amount exceeds allowance') ||
            errorText.includes('ds-math-sub-underflow')
              ? 'Approve contract first'
              : errorText.includes('INSUFFICIENT_B_AMOUNT') || errorText.includes('INSUFFICIENT_A_AMOUNT')
              ? 'Increase Slippage'
              : errorText.includes('user rejected transaction')
              ? 'User Rejected Transaction'
              : errorText}
          </Text>
        )}
      </Flex>
      <Flex sx={{ alignItems: 'flex-start', pt: '3px' }}>
        <IconButton icon="close" color="text" variant="transparent" onClick={removeThisPopup} />
      </Flex>
    </motion.div>
  )
}

export default Toast
