import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'contexts/Localization'
import LPSearcher from './LPSearcher'
import { Token } from '@ape.swap/sdk-core'
import { Flex, Modal } from 'components/uikit'

interface LPSearchModalProps {
  onSelect: (currencyA: Token, currencyB: Token) => void
  onDismiss?: () => void
}

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  overflow-y: scroll;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: none;
    overflow-y: auto;
  }
`

const LPSearchModal = ({ onDismiss = () => null, onSelect }: LPSearchModalProps) => {
  const { t } = useTranslation()
  const handleLPSelect = useCallback(
    (currencyA: Token, currencyB: Token) => {
      onDismiss()
      onSelect(currencyA, currencyB)
    },
    [onDismiss, onSelect],
  )

  return (
    <Modal onDismiss={onDismiss} title={t('LP Tokens')}>
      <Flex sx={{ flexDirection: 'column', width: '380px', maxWidth: '100%' }}>
        <LPSearcher onSelect={handleLPSelect} />
      </Flex>
    </Modal>
  )
}

export default React.memo(LPSearchModal)
