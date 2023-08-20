import React, { useEffect, useState } from 'react'
import { parsedRiskData } from './helpers'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import { riskSupportedChains, TAG_COLOR, TAG_TOKEN_RISK_VALUES, TOKEN_RISK_VALUES } from './constants'
import { Currency } from '@ape.swap/sdk-core'
import TooltipBubble from 'components/uikit/Tooltip'
import { Flex, Link, Text } from 'components/uikit'
import Dots from 'components/Dots'
import { ChainId } from 'config/constants/chains'

const Risk = ({ chainId, currency }: { chainId?: ChainId; currency: Currency | null | undefined }) => {
  const isChainSupported = chainId ? riskSupportedChains.includes(chainId) : false
  const [risk, setRisk] = useState<number | undefined>(undefined)
  const [hide, setHide] = useState(isChainSupported)
  const { t } = useTranslation()

  useEffect(() => {
    setRisk(undefined)
    const wrappedCurrency = currency?.wrapped
    if (isChainSupported && wrappedCurrency) {
      setHide(false)
      parsedRiskData(chainId, wrappedCurrency.address).then((res) => {
        setRisk(res?.risk)
      })
    } else {
      setHide(true)
    }
  }, [chainId, currency, isChainSupported])

  return (
    <>
      {!hide && (
        <Flex sx={styles.riskContainer}>
          <Flex sx={{ minWidth: '150px', justifyContent: 'flex-end', cursor: 'help' }}>
            <TooltipBubble
              placement="bottomRight"
              transformTip="translate(0%, -4%)"
              width="226px"
              style={{ padding: ' 10px' }}
              body={
                <Flex sx={{ flexWrap: 'wrap' }}>
                  <Text
                    sx={{
                      ...styles.title,
                      fontWeight: 700,
                    }}
                  >
                    {risk && TOKEN_RISK_VALUES[risk] ? (
                      TAG_TOKEN_RISK_VALUES[risk]
                    ) : (
                      <>
                        Scanning <Dots />
                      </>
                    )}
                  </Text>
                  <Text sx={styles.title}>
                    {t('Risk scan results are provided by a third party')}{' '}
                    <Link
                      href="https://www.avengerdao.org/riskScanner"
                      target="_blank"
                      rel="noreferrer noopener"
                      sx={styles.yellow}
                    >
                      Avenger DAO
                    </Link>
                  </Text>
                  <Text sx={styles.title}>
                    {t(
                      'It is a tool for indicative purposes only to allow users to check the reference risk level of a BNB Chain Smart Contract. Please do your own research - interactions with any BNB Chain Smart Contract is at your own risk.',
                    )}
                  </Text>
                  <Text sx={styles.title}>
                    {t('Learn more about risk rating')}{' '}
                    <Link
                      href="https://www.avengerdao.org/docs/meter/consumer-api/RiskBand"
                      target="_blank"
                      rel="noreferrer noopener"
                      sx={styles.yellow}
                    >
                      {t('here')}
                    </Link>
                    .
                  </Text>
                </Flex>
              }
            >
              <Flex sx={{ ...styles.tag, borderColor: risk ? TAG_COLOR[risk] : '#A09F9C' }}>
                <Text sx={{ ...styles.text, color: risk ? TAG_COLOR[risk] : '#A09F9C' }}>
                  {risk && TOKEN_RISK_VALUES[risk] ? (
                    TAG_TOKEN_RISK_VALUES[risk]
                  ) : (
                    <>
                      Scanning <Dots />
                    </>
                  )}
                </Text>
              </Flex>
            </TooltipBubble>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default Risk
