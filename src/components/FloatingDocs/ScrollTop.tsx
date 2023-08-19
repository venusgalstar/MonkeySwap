import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Svg } from '../uikit'

const ScrollTop = () => {
  const [visible, setVisible] = useState(false)
  const isBrowser = typeof window !== 'undefined'

  const checkVisibility = useCallback(() => {
    if (isBrowser && window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [isBrowser])

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener('scroll', checkVisibility)
      return () => {
        window.removeEventListener('scroll', checkVisibility)
      }
    }
  }, [checkVisibility, isBrowser])

  const scrollToTop = () => {
    if (isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      {visible && (
        <Flex
          onClick={scrollToTop}
          sx={{
            position: 'absolute',
            width: ['40px', '40px', '50px'],
            bottom: 60,
            borderRadius: '55px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          <Svg icon="scrollTop"/>
        </Flex>
      )}
    </>
  )
}

export default ScrollTop