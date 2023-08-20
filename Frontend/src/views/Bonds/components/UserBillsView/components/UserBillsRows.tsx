import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { BillsToRender } from '../types'
import { formatNumberSI } from 'utils/formatNumber'
import useIsMobile from 'hooks/useIsMobile'
import { styles } from './styles'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import ListViewContent from 'components/ListView/ListViewContent'
import { Flex } from 'components/uikit'
import Claim from 'views/Bonds/actions/Claim'
import { SupportedChainId } from '@ape.swap/sdk-core'
import ListView from 'components/ListView/ListView'
import VestedTimer from '../../VestedTimer'
import BillModal from '../../Modals'
import { ListTagVariants } from 'components/uikit/Tag/types'

const UserBillsRows: React.FC<{ billsToRender: BillsToRender[] }> = ({ billsToRender }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const billsListView = billsToRender?.flatMap((billToRender) => {
    if (!billToRender) return []
    const { bill } = billToRender
    const { token, quoteToken, earnToken } = bill
    const pending = getBalanceNumber(
      new BigNumber(billToRender.payout),
      bill?.earnToken?.decimals?.[chainId as SupportedChainId] ?? 18,
    )
    const claimable = getBalanceNumber(
      new BigNumber(billToRender.pendingRewards),
      bill?.earnToken?.decimals?.[chainId as SupportedChainId] ?? 18,
    )
    return {
      tokenDisplayProps: {
        token1: token.symbol,
        token2: bill.billType === 'reserve' ? earnToken.symbol : quoteToken.symbol,
        token3: earnToken.symbol,
        stakeLp: bill.billType !== 'reserve',
        billArrow: true,
      },
      listProps: {
        id: billToRender.id,
        title: (
          <ListViewContent
            tag={bill.billType as ListTagVariants}
            value={bill.lpToken.symbol}
            style={{ maxWidth: '150px', height: '35px', flexDirection: 'column', justifyContent: 'space-between' }}
          />
        ),
        titleContainerWidth: 280,
        cardContent: isMobile ? (
          <ListViewContent
            title={'Claimable'}
            value={formatNumberSI(parseFloat(claimable.toFixed(0)), 3)}
            value2={`($${(claimable * (billToRender?.bill?.earnTokenPrice ?? 0)).toFixed(2)})`}
            value2Secondary
            toolTip={`This is the amount of tokens that have vested and available to claim.`}
            toolTipPlacement={'bottomLeft'}
            toolTipTransform={'translate(29%, 0%)'}
            style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
          />
        ) : (
          <Flex style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <ListViewContent
              title={t('Claimable')}
              value={formatNumberSI(parseFloat(claimable.toFixed(0)), 3)}
              value2={`($${(claimable * (billToRender?.bill?.earnTokenPrice ?? 0)).toFixed(2)})`}
              value2Secondary
              style={styles.billInfo}
              toolTip={t('This is the amount of tokens that have vested and available to claim.')}
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(29%, -4%)"
            />
            <ListViewContent
              title={t('Pending')}
              value={formatNumberSI(parseFloat(pending.toFixed(0)), 3)}
              value2={`($${(pending * (billToRender?.bill?.earnTokenPrice ?? 0)).toFixed(2)})`}
              value2Secondary
              style={styles.billInfo}
              toolTip={t('This is the amount of unvested tokens that cannot be claimed yet.')}
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(22%, -4%)"
            />
            <VestedTimer lastBlockTimestamp={billToRender.lastBlockTimestamp} vesting={billToRender.vesting} />
            <Flex sx={{ width: '240px', justifyContent: 'space-between', minWidth: '220px', alignItems: 'center' }}>
              <Flex sx={{ maxWidth: '109px' }}>
                <Claim
                  billAddress={bill.contractAddress[chainId as SupportedChainId] ?? ''}
                  billIds={[billToRender.id]}
                  pendingRewards={billToRender?.pendingRewards}
                  earnToken={bill.earnToken.symbol}
                />
              </Flex>
              <Flex sx={{ maxWidth: '109px' }}>
                <BillModal buttonText={t('VIEW')} bill={bill} billId={billToRender.id} />
              </Flex>
            </Flex>
          </Flex>
        ),
        expandedContent: isMobile && (
          <Flex sx={{ width: '100%', flexWrap: 'wrap', padding: '0 10px' }}>
            <Flex sx={{ width: '100%', flexDirection: 'column' }}>
              <ListViewContent
                title={'Pending'}
                value={formatNumberSI(parseFloat(pending.toFixed(0)), 3)}
                value2={`($${(pending * (billToRender?.bill?.earnTokenPrice ?? 0)).toFixed(2)})`}
                value2Secondary
                toolTip={`This is the amount of unvested tokens that cannot be claimed yet.`}
                toolTipPlacement={'bottomLeft'}
                toolTipTransform={'translate(22%, 0%)'}
                style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
              />
              <VestedTimer
                lastBlockTimestamp={billToRender.lastBlockTimestamp}
                vesting={billToRender.vesting}
                mobileFlag
              />
            </Flex>
            <Flex
              sx={{
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Claim
                billAddress={bill.contractAddress[chainId as SupportedChainId] ?? ''}
                billIds={[billToRender.id]}
                pendingRewards={billToRender?.pendingRewards}
                earnToken={bill.earnToken.symbol}
                hasDarkBg
              />
              <BillModal buttonText={t('VIEW')} bill={bill} billId={billToRender.id} />
            </Flex>
          </Flex>
        ),
      },
    }
  })

  return <ListView listViews={billsListView} />
}

export default React.memo(UserBillsRows)
