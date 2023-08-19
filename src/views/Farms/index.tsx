import React, { useEffect, useRef, useState } from 'react'
import { Flex } from 'components/uikit'
import { styles } from './styles'
import { useFarmOrderings, useFarms } from 'state/farms/hooks'
import { useWeb3React } from '@web3-react/core'
import Banner from 'components/Banner'
import ListViewMenu from 'components/ListView/ListViewMenu'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/products'
import { SupportedChainId } from '@ape.swap/sdk-core'
import ListView404 from 'components/ListView404'
import { BLUE_CHIPS, NUMBER_OF_FARMS_VISIBLE, SORT_OPTIONS, STABLES } from './constants'
import DisplayFarms from './components/DisplayFarms'
import { Farm, FarmTypes } from 'state/farms/types'
import { orderBy } from 'lodash'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useTranslation } from 'contexts/Localization'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import HarvestAll from './actions/HarvestAll'
import BigNumber from 'bignumber.js'
import { useSetZapOutputList } from 'state/zap/hooks'
import { getBalanceNumber } from '../../utils/getBalanceNumber'
import { ChainId } from 'config/constants/chains'

const Farms = () => {
  const { account, chainId } = useWeb3React()
  const currentBlock = useBlockNumber()
  const farms = useFarms(account ?? '')
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [sortOption, setSortOption] = useState('all')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const windowIsVisible = useIsWindowVisible()
  const { search } = windowIsVisible ? window.location : { search: '' }
  const params = new URLSearchParams(search)
  const urlSearchedFarm = params?.get('pid') ? params?.get('pid') : ''
  const urlSearchedJFarm = params?.get('jid') ? params?.get('jid') : ''
  const [stakedOnly, setStakedOnly] = useState(false)
  const { farmOrderings } = useFarmOrderings(chainId as ChainId)
  const [isActive, setIsActive] = useState(true)
  const { t } = useTranslation()

  const getActiveFarms = () => {
    const aFarms: Farm[] = []
    farms?.forEach((farm) => {
      if (farm.farmType === FarmTypes.MASTER_CHEF_V1 || farm.farmType === FarmTypes.MASTER_CHEF_V2) {
        if (farm.pid !== 0 && farm.multiplier !== '0X') {
          aFarms.push(farm)
        }
      }
      if (farm.farmType === FarmTypes.DUAL_FARM) {
        if (farm.multiplier !== '0X') {
          aFarms.push(farm)
        }
      }
      if (farm.farmType === FarmTypes.JUNLGE_FARM) {
        if (!farm?.endBlock || !currentBlock) {
          aFarms.push(farm)
        } else if ((farm?.endBlock ?? 0) > (currentBlock ?? 0)) {
          aFarms.push(farm)
        }
      }
    })
    return aFarms
  }
  const getInnactiveFarms = () => {
    const iFarms: Farm[] = []
    farms?.forEach((farm) => {
      if (farm.farmType === FarmTypes.MASTER_CHEF_V1 || farm.farmType === FarmTypes.MASTER_CHEF_V2) {
        if (farm.pid !== 0 && farm.multiplier === '0X') {
          iFarms.push(farm)
        }
      }
      if (farm.farmType === FarmTypes.DUAL_FARM) {
        if (farm.multiplier === '0X') {
          iFarms.push(farm)
        }
      }
      if (farm.farmType === FarmTypes.JUNLGE_FARM) {
        if ((farm?.endBlock ?? 0) < (currentBlock ?? 0)) {
          iFarms.push(farm)
        }
      }
    })
    return iFarms
  }

  const activeFarms = getActiveFarms()
  const inactiveFarms = getInnactiveFarms()

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedOnlyInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const showMoreFarms = (entries: any) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      // @ts-ignore
      loadMoreObserver.observe(loadMoreRef?.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const hasHarvestPids =
    activeFarms &&
    inactiveFarms &&
    [...activeFarms, ...inactiveFarms]
      .filter(
        (farm: Farm) =>
          farm.userData &&
          chainId &&
          getBalanceNumber(
            new BigNumber(farm.userData?.rewards ?? ''),
            farm?.rewardToken?.decimals?.[chainId as SupportedChainId] ?? 18,
            //farm ?.rewardToken?.decimals?.[chainId] ?? 18,
          ) > 0.001,
      )
      .map((filteredFarm) => {
        return filteredFarm.pid
      })

  const hasHarvestTypes =
    activeFarms &&
    inactiveFarms &&
    [...activeFarms, ...inactiveFarms]
      .filter((farm) => farm.userData && new BigNumber(farm.userData.rewards).isGreaterThan(0))
      .map((filteredFarm) => {
        return filteredFarm.farmType
      })

  const hasHarvestContracts =
    activeFarms &&
    inactiveFarms &&
    [...activeFarms, ...inactiveFarms]
      .filter((farm) => farm.userData && new BigNumber(farm.userData.rewards).isGreaterThan(0))
      .map((filteredFarm) => {
        return filteredFarm?.contractAddress ? filteredFarm?.contractAddress : ''
      })

  const renderFarms = () => {
    let farms = isActive ? activeFarms : inactiveFarms

    if (urlSearchedFarm) {
      const farmCheck =
        activeFarms?.find((farm) => {
          return farm.pid === parseInt(urlSearchedFarm) && farm.farmType === FarmTypes.MASTER_CHEF_V2
        }) !== undefined
      if (farmCheck) {
        const urlFarm = activeFarms?.find((farm: Farm) => {
          return farm.pid === parseInt(urlSearchedFarm) && farm.farmType === FarmTypes.MASTER_CHEF_V2
        })
        if (urlFarm) {
          farms = [
            urlFarm,
            ...activeFarms?.filter((farm) => {
              return !(farm.pid === parseInt(urlSearchedFarm) && farm.farmType === FarmTypes.MASTER_CHEF_V2)
            }),
          ]
        }
      }
    }
    if (urlSearchedJFarm) {
      const farmCheck =
        activeFarms?.find((farm) => {
          return farm.pid === parseInt(urlSearchedJFarm) && farm.farmType === FarmTypes.JUNLGE_FARM
        }) !== undefined
      if (farmCheck) {
        const urlFarm = activeFarms?.find((farm: Farm) => {
          return farm.pid === parseInt(urlSearchedJFarm) && farm.farmType === FarmTypes.JUNLGE_FARM
        })
        if (urlFarm) {
          farms = [
            urlFarm,
            ...activeFarms?.filter((farm) => {
              return !(farm.pid === parseInt(urlSearchedJFarm) && farm.farmType === FarmTypes.JUNLGE_FARM)
            }),
          ]
        }
      }
    }

    if (stakedOnly) {
      farms = isActive ? stakedOnlyFarms : stakedOnlyInactiveFarms
    }

    if (query) {
      farms = farms?.filter((farm) => {
        return farm.lpStakeTokenSymbol.toUpperCase().includes(query.toUpperCase())
      })
    }

    // TODO: Refactor this to be a helper function outside of this file
    switch (sortOption) {
      case 'all':
        return farmOrderings
          ? orderBy(
              farms,
              (farm: Farm) => farmOrderings.find((ordering: any) => ordering.pid === farm.pid)?.order,
              'asc',
            ).slice(0, numberOfFarmsVisible)
          : farms?.slice(0, numberOfFarmsVisible)
      case 'stables':
        return (
          farms ??
          []
            .filter((farm: Farm) => STABLES.includes(farm.tokenSymbol) && STABLES.includes(farm.quoteTokenSymbol))
            .slice(0, numberOfFarmsVisible)
        )
      case 'apr':
        return orderBy(farms, (farm) => parseFloat(farm.apy ?? '0'), 'desc').slice(0, numberOfFarmsVisible)
      case 'blueChips':
        return (
          farms ??
          []
            .filter((farm: Farm) => BLUE_CHIPS.includes(farm.tokenSymbol) || BLUE_CHIPS.includes(farm.quoteTokenSymbol))
            .slice(0, numberOfFarmsVisible)
        )
      case 'liquidity':
        return orderBy(farms, (farm: Farm) => parseFloat(farm.totalLpStakedUsd ?? '0'), 'desc').slice(
          0,
          numberOfFarmsVisible,
        )
      default:
        return farmOrderings
          ? orderBy(
              farms,
              (farm: Farm) => farmOrderings.find((ordering: any) => ordering.pid === farm.pid)?.order,
              'asc',
            ).slice(0, numberOfFarmsVisible)
          : farms?.slice(0, numberOfFarmsVisible)
    }
  }
  // Set zap output list to match farms
  useSetZapOutputList(
    activeFarms?.map((farm) => {
      return { currencyIdA: farm?.tokenAddress, currencyIdB: farm?.quoteTokenAddress }
    }),
  )

  return (
    <Flex sx={styles.farmContainer}>
      <Banner banner="banana-farms" link="?modal=tutorial" title={t('Farms')} listViewBreak maxWidth={1130} />
      <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '20px' }}>
        <ListViewMenu
          query={query}
          onHandleQueryChange={handleChangeQuery}
          setSortOption={setSortOption}
          sortOption={sortOption}
          checkboxLabel="Staked"
          setIsActive={setIsActive}
          showOnlyCheckbox={stakedOnly}
          setShowOnlyCheckbox={setStakedOnly}
          toogleLabels={['ACTIVE', 'INACTIVE']}
          sortOptions={SORT_OPTIONS}
          actionButton={
            <HarvestAll
              pids={hasHarvestPids ?? []}
              contractAddress={hasHarvestContracts ?? []}
              farmType={hasHarvestTypes ?? []}
              disabled={hasHarvestPids?.length === 0}
            />
          }
          showMonkeyImage
        />
      </Flex>
      {!chainId ? (
        <></>
      ) : !AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.FARMS].includes(chainId as ChainId) ? (
        <Flex mt="20px">
          <ListView404 product={LIST_VIEW_PRODUCTS.FARMS} />
        </Flex>
      ) : (
        <DisplayFarms
          farms={renderFarms() ?? []}
          farmTags={[]}
          isActive={isActive}
          openPid={urlSearchedFarm || urlSearchedJFarm}
        />
      )}
      <div ref={loadMoreRef} />
    </Flex>
  )
}

export default Farms
