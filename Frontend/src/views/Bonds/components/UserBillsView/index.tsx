import React, { useCallback, useMemo, useState } from 'react'
import { Container } from '../styles'
import UserBillsRows from './components/UserBillsRows'
import UserBillsMenu from './components/UserBillsMenu'
import { useBills } from 'state/bills/hooks'
import { BillsView } from '../../index'
import orderBy from 'lodash/orderBy'
import CardView from './components/CardView'
import EmptyListComponent, { EmptyComponentType } from '../EmptyListComponent/EmptyList'
import { BillsToRender } from './types'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { SupportedChainId } from '@ape.swap/sdk-core'
import BigNumber from 'bignumber.js'
import { Flex } from 'components/uikit'

interface UserBillsViewProps {
  handleBillsViewChange: (view: BillsView) => void
}

const UserBillsView: React.FC<UserBillsViewProps> = ({ handleBillsViewChange }) => {
  const bills = useBills()
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('sort')
  const [filterOption, setFilterOption] = useState('filter')
  const [showClaimed, setShowClaimed] = useState(false)
  const [listView, setListView] = useState(true)
  const noResults = !!query || filterOption !== 'all' || showClaimed
  const { chainId } = useWeb3React()

  const sortBills = useCallback(
    (billsToSort: BillsToRender[]) => {
      const currentTime = new Date().getTime() / 1000
      const sorting = (bills: any) => {
        switch (sortOption) {
          case 'sort':
            return bills
          case 'claimable':
            return orderBy(
              bills,
              (bill) =>
                getBalanceNumber(
                  new BigNumber(bill.pendingRewards ?? ''),
                  bill?.bill?.earnToken?.decimals[chainId as SupportedChainId],
                ) * bill?.bill?.earnTokenPrice,
              'desc',
            )
          case 'pending':
            return orderBy(
              bills,
              (bill) =>
                getBalanceNumber(
                  new BigNumber(bill.payout ?? ''),
                  bill?.bill?.earnToken?.decimals[chainId as SupportedChainId],
                ) * bill?.bill?.earnTokenPrice,
              'desc',
            )
          case 'vested':
            return orderBy(
              bills,
              (bill) => parseInt(bill?.lastBlockTimestamp) + parseInt(bill?.vesting) - currentTime,
              'asc',
            )
          default:
            return bills
        }
      }
      return sorting(billsToSort)
    },
    [chainId, sortOption],
  )

  const billsToRender = useMemo((): BillsToRender[] => {
    let billsToReturn = bills
    if (query) {
      billsToReturn = billsToReturn?.filter((bill) => {
        return bill.lpToken.symbol.toUpperCase().includes(query.toUpperCase())
      })
    }
    if (filterOption === 'liquidity') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'liquidity'.toUpperCase())
    }
    if (filterOption === 'reserve') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'reserve'.toUpperCase())
    }
    if (filterOption === 'launch') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'launch'.toUpperCase())
    }
    const flatMapBeforeSorting: any = billsToReturn?.flatMap((bill) => {
      if (!bill?.userOwnedBillsData || bill?.userOwnedBillsData?.length < 0) return []
      const ownedBills = bill?.userOwnedBillsData
      return ownedBills?.flatMap((ownedBill, i) => {
        if (!showClaimed && parseFloat(ownedBill.pendingRewards) === 0 && parseFloat(ownedBill.payout) === 0) {
          return []
        }
        const ownedBillNftData = bill?.userOwnedBillsNftData ? bill?.userOwnedBillsNftData[i] : null
        return { ...ownedBill, filteredOwnedBillNftData: ownedBillNftData, bill }
      })
    })
    return sortBills(flatMapBeforeSorting)
  }, [bills, query, filterOption, sortBills, showClaimed])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <Container>
      <UserBillsMenu
        bills={bills}
        onHandleQueryChange={handleChangeQuery}
        setFilterOption={setFilterOption}
        filterOption={filterOption}
        setSortOption={setSortOption}
        sortOption={sortOption}
        query={query}
        showClaimed={showClaimed}
        setShowClaimed={setShowClaimed}
        listView={listView}
        setListView={setListView}
      />
      <Flex sx={{ padding: '20px 0 50px 0', width: '100%' }}>
        {billsToRender?.length ? (
          !listView ? (
            <CardView billsToRender={billsToRender} />
          ) : (
            <UserBillsRows billsToRender={billsToRender} />
          )
        ) : (
          <EmptyListComponent
            type={noResults ? EmptyComponentType.NO_RESULTS : EmptyComponentType.USER_BILLS}
            handleBillsViewChange={handleBillsViewChange}
          />
        )}
      </Flex>
    </Container>
  )
}

export default React.memo(UserBillsView)
