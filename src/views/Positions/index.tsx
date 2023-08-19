import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import { V3LiquiditySubNav } from 'components/DexNav/LiquiditySubNav'
import { Flex, Text } from 'components/uikit'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import { useV3Positions } from 'hooks/useV3Positions'
import { PositionDetails } from 'lib/types/position'
import { useCallback, useState } from 'react'
import { useFlipV3LayoutManager, useUserHideClosedPositions } from 'state/user/hooks'
import NoPositionSelectedPage from './components/NoPositionSelectedPage'
import PositionCard from './components/PositionCard'
import PositionDetailsPage from './components/PositionDetailsPage'
import PositionsLoading from './components/PositionsLoading'
import { DESKTOP_DISPLAY, MOBILE_DISPLAY } from './components/styles'

const Positions = () => {
  const { account } = useWeb3React()
  const { positions, loading: positionsLoading } = useV3Positions(account)
  const [selectedTokenId, setSelectedTokenId] = useState<string>('')

  const [userHideClosedPositions] = useUserHideClosedPositions()
  const [flipV3Layout] = useFlipV3LayoutManager()

  const [openPositions, closedPositions] = positions?.reduce<[PositionDetails[], PositionDetails[]]>(
    (acc, p) => {
      acc[p.liquidity?.isZero() ? 1 : 0].push(p)
      return acc
    },
    [[], []],
  ) ?? [[], []]

  const filteredPositions = [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)]

  const handleSelectedTokenId = useCallback((tokenId: string) => {
    setSelectedTokenId(tokenId)
  }, [])

  const { isDesktop } = useMatchBreakpoints()

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center', flexDirection: flipV3Layout ? 'auto' : 'row-reverse' }}>
      <Flex variant="flex.dexContainer">
        <DexNav />
        <V3LiquiditySubNav />
        <Flex
          sx={{
            overflowY: 'auto',
            height: '511px',
            flexDirection: 'column',
            padding: '0px 4px',
          }}
        >
          {positionsLoading ? (
            <PositionsLoading key="positions-loading" />
          ) : filteredPositions?.length > 0 ? (
            filteredPositions.map((position) => {
              return (
                <PositionCard
                  key={position.tokenId.toString()}
                  positionItem={position}
                  selectedTokenId={selectedTokenId}
                  handleSelectedTokenId={handleSelectedTokenId}
                />
              )
            })
          ) : (
            <Flex sx={{ display: MOBILE_DISPLAY, height: '70%', alignItems: 'center', justifyContent: 'center' }}>
              <NoPositionSelectedPage mobile />
            </Flex>
          )}
        </Flex>
      </Flex>
      {selectedTokenId ? (
        <PositionDetailsPage selectedTokenId={selectedTokenId} />
      ) : (
        <Flex
          variant="flex.v3SubDexContainer"
          sx={{ display: DESKTOP_DISPLAY, height: '634px', alignItems: 'center', justifyContent: 'center' }}
        >
          <NoPositionSelectedPage />
        </Flex>
      )}
    </Flex>
  )
}

export default Positions
