import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { BillCardsContainer, CardContainer } from '../styles'
import BillModal from 'views/Bonds/components/Modals'
import { BillsToRender } from '../types'
import { formatNumberSI } from 'utils/formatNumber'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { Flex, Skeleton } from 'components/uikit'
import ListViewContent from 'components/ListView/ListViewContent'
import Claim from 'views/Bonds/actions/Claim'
import { ListTagVariants } from 'components/uikit/Tag/types'

const CardView: React.FC<{ billsToRender: BillsToRender[] }> = ({ billsToRender }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const billsCardView = billsToRender.map((billToRender, i) => {
    const { bill, filteredOwnedBillNftData } = billToRender
    const claimable = getBalanceNumber(
      new BigNumber(billToRender.pendingRewards),
      bill?.earnToken?.decimals?.[chainId as SupportedChainId] ?? 18,
    )
    return (
      <CardContainer key={i}>
        {filteredOwnedBillNftData?.image ? (
          <BillModal
            bill={bill}
            billId={billToRender.id}
            billCardImage={`${filteredOwnedBillNftData?.image + '?img-width=720'}`}
          />
        ) : (
          <Skeleton width="270px" height="159px" />
        )}
        <Flex
          padding="0px 15px"
          sx={{ height: '75px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <ListViewContent
            tag={bill.billType as ListTagVariants}
            value={bill.lpToken.symbol}
            style={{ height: '35px', width: '130px', flexDirection: 'column' }}
          />
          <ListViewContent
            title={t('Claimable')}
            value={formatNumberSI(parseFloat(claimable.toFixed(0)), 3)}
            value2={`($${(claimable * (billToRender?.bill?.earnTokenPrice ?? 0))?.toFixed(2)})`}
            value2Secondary
            style={{ height: '35px', width: '60px', alignItems: 'flex-end', flexDirection: 'column' }}
          />
        </Flex>
        <Claim
          billAddress={bill.contractAddress[chainId as SupportedChainId] ?? ''}
          billIds={[billToRender.id]}
          pendingRewards={billToRender?.pendingRewards}
          earnToken={bill.earnToken.symbol}
        />
      </CardContainer>
    )
  })

  return <BillCardsContainer>{billsCardView}</BillCardsContainer>
}

export default React.memo(CardView)
