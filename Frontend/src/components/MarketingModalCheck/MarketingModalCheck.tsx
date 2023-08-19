import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { SET_DEFAULT_MODAL_KEY, SHOW_DEFAULT_MODAL_KEY, SET_DEF_MOD_KEY, SHOW_DEF_MOD_KEY } from './constants'
import Tutorial from 'components/MarketingModals/Tutorial'
import GnanaModal from 'components/GnanaModal'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import CircularModal from '../CircularModal'

const MarketingModalCheck = () => {
  const { pathname, replace, query } = useRouter()
  const { chainId } = useWeb3React()
  const modalQuery = query.modal
  useMemo(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SHOW_DEFAULT_MODAL_KEY) // remove old key
      localStorage.removeItem(SET_DEFAULT_MODAL_KEY) // remove old key
      const sdmk = localStorage.getItem(SET_DEF_MOD_KEY)
      const isDefaultModalSet = JSON.parse(sdmk as string)
      if (!isDefaultModalSet) {
        localStorage.setItem(SHOW_DEF_MOD_KEY, JSON.stringify('SHOW'))
      }
    }
  }, [])

  const tutorial = modalQuery === 'tutorial'
  const getGnanaRoute = modalQuery === 'gnana'

  const path =
    query?.modal === 'circular-buy' ||
    query?.modal === 'circular-sell' ||
    query?.modal === 'circular-ph' ||
    query?.modal === 'circular-gh'
      ? query.modal
      : null
  const circularFlag = chainId === SupportedChainId.BSC && path !== null

  const onDismiss = () => {
    replace({
      pathname: pathname,
    })
  }

  return tutorial ? (
    <Tutorial location={pathname} onDismiss={onDismiss} />
  ) : getGnanaRoute ? (
    <GnanaModal onDismiss={onDismiss} />
  ) : circularFlag ? (
    <CircularModal path={path} onDismiss={onDismiss} />
  ) : (
    <></>
  )
  //  moonpayRoute ? (
  //   <MoonPayModal onDismiss={onDismiss} />
  // ) : newsletterRoute ? (
  //   <NewsletterModal onDismiss={onDismiss} />
  // ) : (
  //   <></>
  // )
}

export default React.memo(MarketingModalCheck)
