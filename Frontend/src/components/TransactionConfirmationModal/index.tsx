import React, { useCallback, useState } from 'react'
import { SupportedChainId, Currency, Token } from '@ape.swap/sdk-core'
import { Button, Text, Flex, Modal, Svg, Spinner } from 'components/uikit'
import { ArrowUpCircle } from 'react-feather'
import { useTranslation } from 'contexts/Localization'
import { getEtherscanLink } from 'utils'
import { Link } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import { Pair } from '@ape.swap/v2-sdk'
import useCurrencyLogoURIs from 'lib/hooks/useCurrencyLogoURIs'
import { ExchangeRateUpdateParams } from '@lifi/sdk'
import NewRates from '../../views/Swap/components/ConfirmSwap/NewRates'

export function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '15px 0px',
        borderRadius: '10px',
      }}
    >
      <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size={200} />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          background: 'white3',
          padding: '10px 20px',
          margin: '10px',
          borderRadius: '10px',
        }}
      >
        <Text size="20px" weight={500} margin="5px 0px" sx={{ textAlign: 'center' }}>
          {t('Waiting For Confirmation')}
        </Text>
        <Flex margin="10px 0px">
          <Text weight={700} sx={{ textAlign: 'center' }}>
            {pendingText}
          </Text>
        </Flex>
        <Text size="14px" weight={400}>
          {t('Confirm this transaction in your wallet')}
        </Text>
      </Flex>
    </Flex>
  )
}

export function TransactionSubmittedContent({
  onDismiss,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  currencyToAdd?: Currency | undefined
  LpToAdd?: Pair
}) {
  const { connector, chainId } = useWeb3React()

  const token: Token | undefined = currencyToAdd?.wrapped
  const { t } = useTranslation()

  const logoURL = useCurrencyLogoURIs(token)[0]

  const addToken = useCallback(() => {
    if (!token?.symbol || !connector.watchAsset) return
    connector.watchAsset({
      address: token.address,
      symbol: token.symbol,
      decimals: token.decimals,
      image: logoURL,
    })
  }, [connector, logoURL, token])

  return (
    <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <ArrowUpCircle strokeWidth={1} size={97} color="rgba(255, 179, 0, 1)" />
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: '20px' }}>
          <Text size="20px">{t('Transaction Submitted')}</Text>
          {chainId && hash && (
            <Link
              color="text"
              href={getEtherscanLink(hash, 'transaction', chainId)}
              target="_blank"
              sx={{ display: 'flex', fontWeight: 500, mt: '15px' }}
            >
              {t('View on explorer')}
              <Flex sx={{ ml: '7px' }}>
                <Svg icon="external" color="text" width={13} />
              </Flex>
            </Link>
          )}
          {currencyToAdd && connector.watchAsset && (
            <Button variant="tertiary" mt="20px" onClick={addToken}>
              <Flex>
                <Text>{t(`Add %symbol% to Metamask`, { symbol: currencyToAdd.symbol || '' })}</Text>
                <Svg icon="metamask" width="16px" />
              </Flex>{' '}
            </Button>
          )}
          <Button fullWidth onClick={onDismiss} style={{ height: '50px', fontSize: '20px' }} mt="20px">
            {t('Close')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export function TransactionErrorContent({
  message,
  onDismiss,
  newRates,
  confirmNewRates,
}: {
  message: string
  onDismiss: () => void
  newRates?: ExchangeRateUpdateParams | null
  confirmNewRates?: ((value: boolean) => void) | null
}) {
  const { t } = useTranslation()
  const hasNewRates = message?.includes('Exchange rate has changed!')

  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      {hasNewRates && newRates ? (
        <NewRates newRates={newRates} />
      ) : (
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pt: '20px' }}>
          <Svg icon="error" color="error" />
          <Text
            color="error"
            sx={{
              textAlign: 'center',
              width: '80%',
              marginTop: '10px',
              fontSize: '12px',
              fontWeight: 500,
              overflow: 'hidden',
            }}
          >
            {message}
          </Text>
        </Flex>
      )}
      <Flex mt="20px">
        <Button onClick={() => (hasNewRates ? confirmNewRates && confirmNewRates(true) : onDismiss())}>
          {hasNewRates ? t('Confirm new rate') : t('Dismiss')}
        </Button>
      </Flex>
    </Flex>
  )
}

interface ConfirmationModalProps {
  title: string
  onDismiss: () => void
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useWeb3React()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Flex sx={{ width: '420px', zIndex: 112 }}>
      <Modal title={title} onDismiss={handleDismiss}>
        <Flex sx={{ width: '380px', maxWidth: '100%' }}>
          {attemptingTxn ? (
            <ConfirmationPendingContent pendingText={pendingText} />
          ) : hash ? (
            <TransactionSubmittedContent hash={hash} onDismiss={onDismiss} currencyToAdd={currencyToAdd} />
          ) : (
            content()
          )}
        </Flex>
      </Modal>
    </Flex>
  )
}

export default TransactionConfirmationModal
