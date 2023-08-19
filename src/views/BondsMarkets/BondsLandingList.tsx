import React, { useCallback } from 'react'
import useGetBondsLandingList from '../../state/bondsLanding/hooks/useGetBondList'
import { Flex, Text } from '../../components/uikit'
import { BondLanding } from '../../state/bondsLanding/types'
import BondCard from './components/BondCard'
import { useSinglePageView } from './types'
import _ from 'lodash'
import { Divider } from 'theme-ui'

export interface BondsLandingListProps {
  query: string
  sortOption?: string
  filteredChains: Record<string, boolean>
  showAvailable: boolean
}

const BondsLandingList: React.FC<BondsLandingListProps> = ({ query, sortOption, filteredChains, showAvailable }) => {
  const { data: bondsLandingList } = useGetBondsLandingList()
  const bondList = Object.values(bondsLandingList ?? {})
    .flat()
    .flatMap((obj) => obj?.bonds)
    .filter((bond) => {
      if (!bond || bond?.inactive) return false
      if (bond?.showcaseTokenName === 'GMR') return false
      return true
    })

  const [availableBondsArray, soldOutBondsArray] = _.partition(bondList, (bond) => {
    return !bond.soldOut
  })

  const filterBonds = useCallback(
    (bonds: BondLanding[]) => {
      const filteredQuery = bonds?.filter((obj) => obj?.showcaseTokenName?.toUpperCase().includes(query.toUpperCase()))

      const filteredBondsByChain = filteredQuery.filter((obj) => filteredChains['chain_' + obj.chainId.toString()])

      const sortedBonds = filteredBondsByChain.filter(Boolean).sort((a, b) => {
        switch (sortOption) {
          case 'discount':
            const discountA = a.discount || 0
            const discountB = b.discount || 0
            return discountB - discountA // Sorting in descending order
          case 'initTime':
            const initTimeA = a.initTime || 0
            const initTimeB = b.initTime || 0
            return initTimeA - initTimeB // Sorting in ascending order
          default:
            if (a.showcaseTokenName?.toUpperCase() === 'BANANA' && b.showcaseTokenName?.toUpperCase() !== 'BANANA') {
              return -1
            } else if (
              a.showcaseTokenName?.toUpperCase() !== 'BANANA' &&
              b.showcaseTokenName?.toUpperCase() === 'BANANA'
            ) {
              return 1
            }
            const defaultDiscountA = a.discount || 0
            const defaultDiscountB = b.discount || 0
            return defaultDiscountB - defaultDiscountA
        }
      })

      return sortedBonds?.reduce<Record<string, BondLanding[]>>((acc, obj) => {
        if (!acc[obj.showcaseTokenName]) {
          acc[obj.showcaseTokenName] = []
        }
        acc[obj.showcaseTokenName].push(obj)
        return acc
      }, {})
    },
    [filteredChains, query, sortOption],
  )

  const groupedActiveBonds = filterBonds(availableBondsArray)
  const groupedSoldOutBonds = filterBonds(soldOutBondsArray)
  const loaded = Object.keys(groupedActiveBonds).length > 0 || Object.keys(groupedSoldOutBonds).length > 0

  return (
    <>
      {useSinglePageView && loaded ? (
        <>
          <Flex sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start', mt: '20px' }}>
            {Object.keys(groupedActiveBonds)?.map((key) => {
              const bonds = groupedActiveBonds[key]
              if (!bonds) return <></>
              return <BondCard bonds={bonds} key={bonds?.[0]?.billAddress} showAvailable={showAvailable} />
            })}
          </Flex>
          {Object.keys(groupedSoldOutBonds).length > 0 && (
            <Flex
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center', position: 'relative', my: '15px' }}
            >
              <Divider sx={{ width: '100%' }} />
              <Text
                sx={{
                  position: 'absolute',
                  top: '-10px',
                  background: 'white1',
                  p: '5px 15px',
                  borderRadius: '10px',
                  fontWeight: 700,
                }}
              >
                SOLD OUT
              </Text>
            </Flex>
          )}
          <Flex sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start', mt: '20px' }}>
            {Object.keys(groupedSoldOutBonds)?.map((key) => {
              const bonds = groupedSoldOutBonds[key]
              if (!bonds) return <></>
              return <BondCard bonds={bonds} key={bonds?.[0]?.billAddress} showAvailable={showAvailable} />
            })}
          </Flex>
        </>
      ) : (
        <Flex sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start', mt: '20px' }}>
          {Object.keys(showAvailable ? groupedActiveBonds : groupedSoldOutBonds)?.map((key) => {
            const bonds = showAvailable ? groupedActiveBonds[key] : groupedSoldOutBonds[key]
            if (!bonds) return <></>
            return <BondCard bonds={bonds} key={bonds?.[0]?.billAddress} showAvailable={showAvailable} />
          })}
        </Flex>
      )}
    </>
  )
}

export default BondsLandingList
