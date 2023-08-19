import React from 'react'
import { Button, Flex, Text } from '../../../../components/uikit'
import { useTranslation } from '../../../../contexts/Localization'
import { styles } from './styles'

const Index = () => {
  const { t } = useTranslation()
  return (
    <Flex sx={styles.contributorCont}>
      <Text sx={styles.title}>{t('Are you a contributor to this project?')}</Text>
      <Text sx={styles.info}>
        {t(
          'Submit updated liquidity data through GitHub, or book a meeting with our team to walk you through your project’s Liquidity Health status.',
        )}
      </Text>
      <Flex sx={styles.btnCont}>
        <Button
          variant="secondary"
          onClick={() => window.open('https://github.com/ApeSwapFinance/lhd-config', '_blank')}
          sx={{
            ...styles.btn,
            width: ['100%', '100%', '100%', '215px'],
            m: ['0 0 10px 0', '0 0 10px 0', '0 0 10px 0', '0 0 0 0'],
          }}
        >
          {t('SUBMIT DATA UPDATE')}
        </Button>
        <Button
          onClick={() => window.open('https://calendly.com/bobajan_apeswap/', '_blank')}
          sx={{
            ...styles.btn,
            width: ['100%', '100%', '100%', '215px'],
            m: ['0 0 10px 0', '0 0 10px 0', '0 0 10px 0', '0 0 0 20px'],
          }}
        >
          {t('BOOK A MEETING')}
        </Button>
      </Flex>
    </Flex>
  )
}

export default Index
