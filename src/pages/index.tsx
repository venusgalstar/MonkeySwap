import HomePage from './home'

export default function Index({ randomImage, randomLHDImage }: { randomImage: number; randomLHDImage: number }) {
  return <HomePage randomImage={randomImage} randomLHDImage={randomLHDImage} />
}

import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'

// SSR getters
import { getIndustryStats } from 'state/lhd/hooks/useGetIndustryStats'
import { getHomepageStats } from 'state/homepage/hooks/useGetHomepageStats'
import { getTvlStats } from 'state/homepage/hooks/useGetTvlStats'
import { getLiveAndUpcoming } from 'state/homepage/hooks/useGetLiveAndUpcoming'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery([QUERY_KEYS.INDUSTRY_STATS], getIndustryStats)
  await queryClient.prefetchQuery([QUERY_KEYS.HOMEPAGE_STATS], getHomepageStats)
  await queryClient.prefetchQuery([QUERY_KEYS.TVL_STATS], getTvlStats)
  await queryClient.prefetchQuery([QUERY_KEYS.LIVE_AND_UPCOMING], getLiveAndUpcoming)

  // Generates a random number on the server which is then passed to the client for consistency between them.
  // Bear in mind this amountOfBillsImages should be updated if the amount of bills images change
  const getRandomImg = (imageCount: number): number => {
    return Math.floor(Math.random() * (imageCount + 1))
  }
  const BILLS_IMAGES_COUNT = 10
  const LHD_IMAGES_COUNT = 7
  const randomImage = getRandomImg(BILLS_IMAGES_COUNT)
  const randomLHDImage = getRandomImg(LHD_IMAGES_COUNT)
  return {
    props: {
      randomImage,
      randomLHDImage,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
