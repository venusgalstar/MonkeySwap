import { Protocol } from '@ape.swap/router-sdk'
import { Currency } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Flex, Text } from 'components/uikit'
import { RoutingDiagramEntry } from '../types'

const RouteDiagram = ({
  currencyIn,
  currencyOut,
  routes,
}: {
  currencyIn: Currency | undefined
  currencyOut: Currency | undefined
  routes: RoutingDiagramEntry[]
}) => {
  return (
    <Flex sx={{ position: 'relative', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <Text weight={500} sx={{ alignSelf: 'flex-start', ml: '2px', mb: '2px' }}>
        Route
      </Text>
      {routes.map(({ protocol, percent, path }, i) => {
        return (
          <Flex
            key={i}
            sx={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              margin: '2px 0px',
            }}
          >
            <CurrencyLogo currency={currencyIn} style={{ zIndex: 2, marginRight: '7px' }} size={20} />
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Flex sx={{ width: 'calc(100%)', alignItems: 'center', position: 'absolute', zIndex: 1, left: 0 }}>
                <svg width="100%" height="35" viewBox="850 0 300 200" xmlns="http://www.w3.org/2000/svg">
                  <line
                    x1="0"
                    x2="3000"
                    y1="100"
                    y2="100"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray="1, 45"
                    sx={{ stroke: 'opacityBadge' }}
                  />
                </svg>
              </Flex>
              <Flex
                sx={{
                  zIndex: 2,
                  alignItems: 'center',
                  background: 'white3',
                  padding: '2px',
                  borderRadius: '5px',
                  minWidth: 'fit-content',
                }}
              >
                <Text
                  size="10px"
                  sx={{
                    background: 'white4',
                    padding: '0px 2px',
                    borderRadius: '3px',
                    lineHeight: '20px',
                    mr: '2px',
                  }}
                >
                  {protocol === Protocol.MIXED ? 'V3 + V2' : protocol}{' '}
                </Text>
                <Text size="10px" sx={{ lineHeight: '0px' }}>
                  {percent.toSignificant(2)}%
                </Text>
              </Flex>
              <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                {path.map(([currency0, currency1, feeAmount], j) => {
                  return (
                    <Flex
                      key={`${i}-${j}`}
                      sx={{
                        zIndex: 2,
                        alignItems: 'center',
                        background: 'white3',
                        minWidth: 'fit-content',
                        padding: '2px',
                        borderRadius: '3px',
                        height: '20px',
                      }}
                    >
                      <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={15} spacing="-5px" />
                      <Text size="10px" ml="3px" sx={{ lineHeight: '5px' }}>
                        {feeAmount / 10000}%
                      </Text>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
            <CurrencyLogo currency={currencyOut} style={{ zIndex: 2 }} size={20} />
          </Flex>
        )
      })}
    </Flex>
  )
}

export default RouteDiagram
