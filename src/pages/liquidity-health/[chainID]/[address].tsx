// pages/lhd/[chainID]/[address]/[[...currency]].tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageContainer from '../../../components/PageContainer'
import FullProfile from '../../../views/LHD/components/FullProfile'

// Hooks
import { useSelector } from 'react-redux'

// Types
import { AppState } from 'state'

const MultiParamPage = () => {
  const router = useRouter()
  const { chainID, address } = router.query

  useEffect(() => {
    if (chainID && address) {
      // Perform any client-side data fetching or processing based on chainID and address here.
    }
  }, [chainID, address])

  return (
    <PageContainer variant="lhd" pageDetails={`${chainID}_${address}`}>
      <FullProfile chainID={chainID as string} address={address as string} />
    </PageContainer>
  )
}

export default MultiParamPage

import { getLHDProfile } from 'state/lhd/hooks/useGetLHDProfile'
import { QUERY_KEYS } from 'config/constants/queryKeys'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const { chainID, address } = context.query
  await queryClient.prefetchQuery([QUERY_KEYS.LHD_PROFILE, chainID, address], () =>
    getLHDProfile({ chainID: chainID as string, address: address as string }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
