// Components
import styles from './styles'
import { Flex, Svg, Text, Link, Tooltip } from 'components/uikit'
import { Spinner } from 'theme-ui'
import OmniTokenImage from 'components/OmniChain/OmniTokenImage'

// Hooks
import { useCurrency } from 'hooks/Tokens'

// Types, Constants, Utils
import { ChainId, NETWORK_LABEL } from 'config/constants/chains'
import { LiFiTransaction } from './types'
import { humanOutputAmount } from 'views/Swap/utils'
import { Currency } from '@ape.swap/sdk-core'

const TransactionContainer = ({ transaction }: { transaction: LiFiTransaction }) => {
  const { sending, status, receiving, transactionId, substatusMessage } = transaction

  const fromCurrency = useCurrency(sending?.token?.address as string, sending?.chainId as ChainId)
  const toCurrency = useCurrency(receiving?.token?.address as string, receiving?.chainId as ChainId)

  // Logic to display dates
  function pad(n: number) {
    return n < 10 ? '0' + n : n
  }
  const date = new Date(sending?.timestamp * 1000)
  const utcDateObj = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
  let options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
  let utcDate = utcDateObj.toLocaleDateString('en-US', options)
  let utcTime = pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes())

  return (
    <Flex sx={styles.historicalTxContainer}>
      {/* Header Section */}
      <Flex
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Text sx={{ fontSize: '14px', fontWeight: '300' }}>{utcDate}</Text>
        <Text sx={{ fontSize: '14px', fontWeight: '300' }}>{utcTime + ' UTC'}</Text>
      </Flex>

      {/* Token Images & Info */}
      <Link target="_blank" sx={{ textDecoration: 'none' }} href={sending?.txLink}>
        <Flex sx={styles.tokenInfoContainer}>
          <OmniTokenImage size={35} currency={fromCurrency as Currency} />
          <Flex sx={{ flexDirection: 'column', ml: '10px' }}>
            <Text sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '14px' }}>
              {humanOutputAmount(sending?.amount, sending?.token?.decimals)} {sending?.token?.symbol}
            </Text>
            <Text sx={{ fontSize: '12px', fontWeight: '300' }}>
              ${sending?.amountUSD} of {sending?.token?.symbol} on {NETWORK_LABEL[sending?.chainId as ChainId]}
            </Text>
          </Flex>
        </Flex>
      </Link>

      <Flex sx={{ width: '15px', height: '15px', ml: '19px' }}>
        <Svg icon="arrow" direction="down" />
      </Flex>

      <Link target="_blank" sx={{ textDecoration: 'none' }} href={receiving?.txLink || ''}>
        <Flex sx={styles.tokenInfoContainer}>
          <OmniTokenImage size={35} currency={toCurrency as Currency} />
          <Flex sx={{ flexDirection: 'column', ml: '10px' }}>
            <Text sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '14px' }}>
              {receiving?.token ? (
                <>
                  {humanOutputAmount(receiving?.amount, receiving?.token?.decimals)} {receiving?.token?.symbol}
                </>
              ) : (
                <>Transaction Pending</>
              )}
            </Text>
            <Text sx={{ fontSize: '12px', fontWeight: '300' }}>
              {receiving?.token ? (
                <>
                  ${receiving?.amountUSD} of {receiving?.token?.symbol} on{' '}
                  {NETWORK_LABEL[receiving?.chainId as ChainId]}
                </>
              ) : (
                <>in progress on {NETWORK_LABEL[receiving?.chainId as ChainId]}...</>
              )}
            </Text>
          </Flex>
        </Flex>
      </Link>

      {/* Status */}
      <Tooltip
        placement={'topRight'}
        transformTip={`translate(15px, -12px)`}
        body={<Flex>{substatusMessage}</Flex>}
        sx={{ width: '200px' }}
      >
        <Flex sx={styles.statusContainer}>
          {status === 'DONE' ? (
            <Svg width="20px" height="20px" icon="success" />
          ) : ['NOT_FOUND', 'INVALID', 'FAILED'].includes(status) ? (
            <Svg width="20px" height="20px" color="error" icon="error" />
          ) : (
            <Spinner width="20px" height="20px" />
          )}
        </Flex>
      </Tooltip>
    </Flex>
  )
}
export default TransactionContainer
