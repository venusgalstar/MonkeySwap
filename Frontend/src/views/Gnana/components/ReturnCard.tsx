import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import { StyledCard, HeaderCard, Header, TokensDisplay, ContentCard, StyledButton, FlexSection } from './styles'
import { Flex } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import { getFullDisplayBalance } from 'utils/getBalanceNumber'
import { useTokenBalance } from 'lib/hooks/useCurrencyBalance'
import TokenInput from 'components/TokenInput/TokenInput'
import ConnectWalletButton from 'components/ConnectWallet'
import { Text } from 'components/uikit'
import { CurrencyAmount } from '@ape.swap/sdk-core'
import { useGnanaToken, useTreasury } from 'hooks/useContract'
import { useSellGoldenBanana } from '../useGoldenBanana'
import { useTokenAllowance } from 'hooks/useTokenAllowance'
import { Button } from '../../../components/uikit'
import ApproveBtn from '../../../components/ApproveBtn'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { useToastError } from '../../../state/application/hooks'

interface ReturnCardType {
  fromToken: string
  toToken: string
}

const ReturnCard: React.FC<ReturnCardType> = ({ fromToken, toToken }) => {
  const [val, setVal] = useState('')
  const [processing, setProcessing] = useState(false)
  const { account } = useWeb3React()
  const treasuryContract = useTreasury()
  const valBanana = parseFloat(val) * 0.98
  const { handleSell } = useSellGoldenBanana()
  const gnanaToken = useGnanaToken()
  const goldenBananaBalance = useTokenBalance(account, gnanaToken ?? undefined)
  const { tokenAllowance } = useTokenAllowance(gnanaToken ?? undefined, account, treasuryContract?.address)
  const { t } = useTranslation()
  const amountToApprove = gnanaToken
    ? CurrencyAmount.fromRawAmount(gnanaToken, ethers.constants.MaxInt256.toString())
    : undefined
  const toastError = useToastError()

  const [approval, approveCallback] = useApproveCallback(amountToApprove, treasuryContract?.address)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(goldenBananaBalance?.quotient?.toString() ?? 0))
  }, [goldenBananaBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )
  const sell = useCallback(async () => {
    setProcessing(true)
    handleSell(val)
      .catch((e) => {
        setProcessing(false)
        console.error(e)
        toastError(e)
      })
      .finally(() => {
        setProcessing(false)
      })
  }, [toastError, handleSell, val])

  const disabled = processing || parseFloat(val) > parseFloat(fullBalance) || parseFloat(val) === 0 || !val

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <StyledCard>
      <HeaderCard>
        <Header>{t('RETURN')}</Header>
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
              onClick={sell}
              load={processing}
              sx={{
                width: '100%',
                '&:disabled': {
                  background: 'white4',
                },
              }}
            >
              {t('RETURN')}
            </Button>
          </Flex>
        ) : (
          <Flex sx={{ my: '10px', width: '100%', maxWidth: '200px' }}>
            <ApproveBtn approvalState={approval} approveCallback={approveCallback} hasDarkBg />
          </Flex>
        )}
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', mb: '10px' }}>
          <Text sx={{ fontSize: '16px', fontWeight: 700 }}>
            {t('OUTPUT')} {`${toToken} ${valBanana ? valBanana?.toFixed(3) : 0}`}
          </Text>
          <Text sx={{ fontSize: '12px', fontWeight: 500 }}>*After 2% reflect fee</Text>
        </Flex>
      </ContentCard>
    </StyledCard>
  )
}

export default React.memo(ReturnCard)
