import React, { useCallback, useState } from 'react'
import Banner from 'components/Banner'
import { useTranslation } from 'contexts/Localization'
import { BannerTypes } from 'components/Banner/types'
import ListView404 from 'components/ListView404'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/products'
import { styles } from './styles'
import { Flex } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import FirstTimeCard from './components/FirstTimeCard/FirstTimeCard'
import BillsListView from './components/BillsListView'
import BillsNav from './components/BillsNav'
import UserBillsView from './components/UserBillsView'
import { ChainId } from 'config/constants/chains'
import { useRouter } from 'next/router'

export enum BillsView {
  AVAILABLE_BILLS = 'Available Bonds',
  YOUR_BILLS = 'Your Bonds',
}

const Bills: React.FC = () => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const router = useRouter()
  const [billsView, setBillsView] = useState<string>(
    router?.query?.yourBonds !== undefined ? BillsView.YOUR_BILLS : BillsView.AVAILABLE_BILLS,
  )
  const value = typeof window !== 'undefined' ? localStorage.getItem('hideTips') : null
  const hideTips: boolean = value === null ? false : JSON.parse(value)

  const handleBillsViewChange = useCallback((newBillsView: string) => {
    setBillsView(newBillsView)
  }, [])

  return (
    <Flex sx={styles.billsViewContainer}>
      <Banner
        banner={`treasury-bills` as BannerTypes}
        title={t('ApeSwap Bonds')}
        link="?modal=tutorial"
        listViewBreak
        maxWidth={1130}
        openTips
      />
      {!chainId ? (
        <></>
      ) : !AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS].includes(
          (chainId as ChainId) ?? ChainId.BSC,
        ) ? (
        <Flex sx={{ mt: '20px' }}>
          <ListView404 product={LIST_VIEW_PRODUCTS.BILLS} />
        </Flex>
      ) : (
        <>
          {!hideTips && chainId && <FirstTimeCard />}
          <BillsNav billsView={billsView} setBillsView={handleBillsViewChange} />
          {billsView === BillsView.AVAILABLE_BILLS ? (
            <BillsListView />
          ) : (
            <UserBillsView handleBillsViewChange={handleBillsViewChange} />
          )}
        </>
      )}
    </Flex>
  )
}

export default Bills
