import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Content, RightText } from './styles'
import { Flex, Svg, Text } from 'components/uikit'

const BillsDiagram: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Content>
        <span
          sx={{
            display: 'flex',
            mr: '15px',
            color: 'text',
            border: '3px solid',
            borderRadius: '25px',
            height: '50px',
            width: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg icon="billsM1" width={50} />
        </span>
        <RightText>
          {t(
            'The token discount is calculated based on several variables: token price, LP price, time, supply, and demand.',
          )}
        </RightText>
      </Content>
      <Content>
        <span
          sx={{
            display: 'flex',
            mr: '15px',
            color: 'text',
            border: '3px solid',
            borderRadius: '25px',
            height: '50px',
            width: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          <Svg icon="billsM2" width={50} />
        </span>
        <RightText>{t('Use Zap ⚡ to purchase a Bond with a single token or create an LP.')}</RightText>
      </Content>
      <Content>
        <span
          sx={{
            display: 'flex',
            mr: '15px',
            color: 'text',
            border: '3px solid',
            borderRadius: '25px',
            height: '50px',
            width: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          <Svg icon="billsM3" width={50} />
        </span>
        <RightText>{t('To mint a full color NFT, purchase a Bond with a value of $25 or more.')}</RightText>
      </Content>
      <Flex sx={{ margin: '22px 0 0 0', '@media screen and (min-width: 852px)': { margin: '22px 0 0 63px' } }}>
        <Text style={{ fontSize: 8, fontWeight: '300', lineHeight: 1.25 }}>
          {t(
            'ApeSwap Bonds are in no way related to any financial product offered by the US government or any other government or any bank or other financial institution. These products are solely affiliated with the third party projects listed on ApeSwap and are not in any way backed, insured, or guaranteed by ApeSwap. These products are not available to persons that are residents or citizens of the US, or that are currently located in the US.',
          )}
        </Text>
      </Flex>
    </Flex>
  )
}

export default BillsDiagram
