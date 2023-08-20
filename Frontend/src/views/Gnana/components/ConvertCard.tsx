import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import TokenInput from 'components/TokenInput'
import { HeaderCard, Header, TokensDisplay, ContentCard, StyledCard } from './styles'
import { Flex } from 'theme-ui'
import { useTokenBalance } from 'lib/hooks/useCurrencyBalance'
import { useWeb3React } from '@web3-react/core'
import { getFullDisplayBalance } from 'utils/getBalanceNumber'
import { Button, CheckBox, Text } from 'components/uikit'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import { CurrencyAmount, SupportedChainId } from '@ape.swap/sdk-core'
import { useBuyGnana } from '../useGoldenBanana'
import { useTreasury } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWallet'
import { useToken } from 'hooks/Tokens'
import { useTokenAllowance } from 'hooks/useTokenAllowance'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import ApproveBtn from '../../../components/ApproveBtn'
import { useToastError } from 'state/application/hooks'

interface ConvertCardType {
  fromToken: string
  toToken: string
}

const ConvertCard: React.FC<ConvertCardType> = ({ fromToken, toToken }) => {
  const MAX_BUY = 5000
  const { chainId, account } = useWeb3React()
  const [val, setVal] = useState('')
  const [unlimitedGnana, setUnlimitedGnanaMinting] = useState<boolean>(false)
  const [unlimited, setUnlimited] = useState<boolean>(unlimitedGnana)
  const gnanaVal = parseFloat(val) * 0.7
  const [processing, setProcessing] = useState(false)
  const treasuryContract = useTreasury()
  const handleBuy = useBuyGnana()
  const bananaToken = useToken(BANANA_ADDRESSES[chainId as SupportedChainId])
  const bananaBalance = useTokenBalance(account, bananaToken ?? undefined)
  const { tokenAllowance } = useTokenAllowance(bananaToken ?? undefined, account, treasuryContract?.address)
  const { t } = useTranslation()
  const [triedMore, setTriedMore] = useState(false)
  const amountToApprove = bananaToken
    ? CurrencyAmount.fromRawAmount(bananaToken, ethers.constants.MaxInt256.toString())
    : undefined
  const toastError = useToastError()

  const [approval, approveCallback] = useApproveCallback(amountToApprove, treasuryContract?.address)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(bananaBalance?.quotient?.toString() ?? 0))
  }, [bananaBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (!unlimited && parseInt(e.currentTarget.value) > MAX_BUY) {
        setTriedMore(true)
        return
      }
      setVal(e.currentTarget.value)
    },
    [setVal, unlimited],
  )

  useEffect(() => {
    setTimeout(() => {
      setTriedMore(false)
    }, 600)
  }, [triedMore])

  const buy = useCallback(async () => {
    setProcessing(true)
    await handleBuy(val)?.catch((e: any) => {
      console.error(e)
      toastError(e)
    })
    setProcessing(false)
  }, [handleBuy, toastError, val])

  const disabled = processing || parseInt(val) === 0 || parseInt(val) > parseInt(fullBalance) || !val

  const displayMax = unlimited ? 'unlimited' : MAX_BUY

  const handleSelectMax = useCallback(() => {
    const max = parseInt(fullBalance) < MAX_BUY || unlimited ? fullBalance : MAX_BUY
    setVal(max.toString())
  }, [fullBalance, unlimited, setVal])

  const handleCheckBox = useCallback(() => {
    setUnlimited(!unlimited)
    if (!unlimited) setUnlimitedGnanaMinting(true)
    if (unlimited) {
      setUnlimitedGnanaMinting(false)
      setVal('')
    }
  }, [setUnlimitedGnanaMinting, unlimited])

  return (
    <StyledCard>
      <HeaderCard>
        <Header>{t('CONVERT')}</Header>
        <TokensDisplay>
          {fromToken} &gt; {toToken}
        </TokensDisplay>
      </HeaderCard>
      <ContentCard>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={parseFloat(fullBalance).toFixed(2)}
          symbol={fromToken}
        />
        {!account ? (
          <Flex sx={{ margin: '15px 0 10px 0' }}>
            <ConnectWalletButton />
          </Flex>
        ) : parseFloat(tokenAllowance?.toExact() ?? '0') >= parseFloat(val) || !val ? (
          <Flex sx={{ my: '10px', width: '100%', maxWidth: '200px' }}>
            <Button
              disabled={disabled}
              load={processing}
              onClick={buy}
              sx={{
                width: '100%',
                '&:disabled': {
                  background: 'white4',
                },
              }}
            >
              {t('CONVERT')}
            </Button>
          </Flex>
        ) : (
          <Flex sx={{ my: '10px', width: '100%', maxWidth: '200px' }}>
            <ApproveBtn approvalState={approval} approveCallback={approveCallback} hasDarkBg />
          </Flex>
        )}
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', mb: '10px' }}>
          <Text sx={{ fontSize: '16px', fontWeight: 700 }}>
            {t('OUTPUT')} {`${toToken} ${gnanaVal ? gnanaVal.toFixed(3) : 0}`}
          </Text>
          <Text sx={{ fontSize: '12px', fontWeight: 500, color: triedMore ? '#ff0000' : null }}>
            {t('*Current max conversion is %displayMax%', { displayMax })}
          </Text>
          <Flex
            sx={{
              alignItems: 'center',
              marginTop: '20px',
              cursor: 'pointer',
            }}
            onClick={handleCheckBox}
          >
            <Flex sx={{ minWidth: '42px', pr: '15px' }}>
              <CheckBox id="checkbox" scale="md" checked={unlimited} onChange={handleCheckBox} background="white2" />
            </Flex>
            <Text sx={{ fontSize: '12px', fontWeight: 500, lineHeight: '18px' }}>
              {t('I understand how GNANA works and I want to enable unlimited buy.')}
            </Text>
          </Flex>
        </Flex>
      </ContentCard>
    </StyledCard>
  )
}

export default React.memo(ConvertCard)
