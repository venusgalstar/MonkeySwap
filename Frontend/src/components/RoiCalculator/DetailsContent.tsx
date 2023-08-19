import React, { useEffect, useState } from 'react'
import { Flex, Text, Box, Link } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import { Field, selectCurrency } from 'state/swap/actions'
import { tokenListInfo } from './tokenInfo'
import styles, { FarmButton } from './styles'
import DualLiquidityModal from '../DualAddLiquidity/DualLiquidityModal'
import { selectOutputCurrency } from 'state/zap/actions'
import { useAppDispatch } from 'state/hooks'
import { BANANA_ADDRESSES, GNANA_ADDRESSES } from 'config/constants/addresses'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import useModal from 'hooks/useModal'
import { Button, Svg } from 'components/uikit'

interface DetailsContentProps {
  onDismiss?: () => void
  label?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apr?: number
  lpApr?: number
  apy?: number
  lpAddress?: string
  tokenAddress?: string
  quoteTokenAddress?: string
  isLp?: boolean
  liquidityUrl?: string
  lpCurr1?: string
  lpCurr2?: string
}

const DetailsContent: React.FC<DetailsContentProps> = ({
  apr,
  lpApr,
  isLp,
  label,
  tokenAddress,
  quoteTokenAddress,
  apy,
  liquidityUrl,
  rewardTokenName,
  lpCurr1,
  lpCurr2,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [link, setLink] = useState('')
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const banana = BANANA_ADDRESSES[chainId as SupportedChainId]
  const gnana = GNANA_ADDRESSES[chainId as SupportedChainId]

  const [onPresentDualLiquidityModal] = useModal(<DualLiquidityModal />, true, true, 'liquidityWidgetModal', true)

  useEffect(() => {
    if (!isLp) {
      if (tokenAddress?.toLowerCase() === banana.toLowerCase()) {
        setLink('swap')
      }
      if (tokenAddress?.toLowerCase() === gnana.toLowerCase()) {
        setLink('gnana')
      }
    }
  }, [chainId, tokenAddress, isLp, banana, gnana])

  const showLiquidity = (token?: any, quoteToken?: any) => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: token,
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: quoteToken,
      }),
    )
    dispatch(
      selectOutputCurrency({
        //@ts-ignore
        currency1: lpCurr1,
        //@ts-ignore
        currency2: lpCurr2,
      }),
    )
    onPresentDualLiquidityModal()
  }

  return (
    <>
      <Flex
        sx={{ justifyContent: 'center', alignItems: 'center', columnGap: '10px' }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Text
          sx={{
            fontWeight: 600,
            fontSize: '14px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          {t('Details')}
        </Text>
        <Svg icon="caret" direction={expanded ? 'up' : 'down'} />
      </Flex>
      <Box sx={styles.detailContainer(!expanded)}>
        <Flex sx={styles.detailRow}>
          {lpApr ? (
            <Text>{t('APR (incl. LP rewards)')}</Text>
          ) : (
            <Text>
              {t('APR')} - {rewardTokenName} {t('rewards')}
            </Text>
          )}
          <Text>{(apr ?? 0 + (lpApr || 0)).toFixed(2)}%</Text>
        </Flex>
        {isLp && lpApr && (
          <>
            <Flex sx={styles.detailRow}>
              <Text>{t('Base APR (BANANA yield only)')}</Text>
              <Text>{apr?.toFixed(2)}%</Text>
            </Flex>
            <Flex sx={styles.detailRow}>
              <Text>{t('APY (1x daily compound)')}</Text>
              <Text>{apy?.toFixed(2)}%</Text>
            </Flex>
          </>
        )}
        <ul>
          {tokenListInfo[isLp ? 'lpPair' : 'notLpPair']?.map((item) => (
            <li key={item}>
              <Text sx={styles?.text} dangerouslySetInnerHTML={{ __html: t(item) }} />
            </li>
          ))}
        </ul>

        <Flex sx={{ marginTop: '25px', justifyContent: 'center' }}>
          {isLp && !liquidityUrl && (
            <FarmButton onClick={() => showLiquidity(tokenAddress, quoteTokenAddress)}>
              {t('GET')} {label}
              <Box sx={{ marginLeft: '5px' }}>
                <Svg icon="ZapIcon" color="primaryBright" />
              </Box>
            </FarmButton>
          )}
          {isLp && liquidityUrl && (
            <Link
              href={liquidityUrl}
              target="_blank"
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Button style={{ fontSize: '16px' }}>
                {t('GET')} {label}
              </Button>
            </Link>
          )}
          {!isLp && (
            <Link
              href={link}
              target="_blank"
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Button style={{ fontSize: '16px' }}>
                {t('GET')} {label}
                <Box sx={{ marginLeft: '5px' }}>
                  <Svg icon="ZapIcon" color="primaryBright" />
                </Box>
              </Button>
            </Link>
          )}
        </Flex>
      </Box>
    </>
  )
}
export default React.memo(DetailsContent)
