/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { MP } from './types'
import { circular } from './styles'
import { Button, Flex, Text } from '../uikit'
import Checkbox from '../uikit/Checkbox'

const CircularContent: React.FC<MP> = ({ actionType, description, supporting, children }) => {
  const { t } = useTranslation()
  const [hideCircular, setHideCircular] = useState<boolean>(false)

  const openLearnMore = () =>
    window.open(
      'https://apeswap.gitbook.io/apeswap-finance/welcome/apeswap-tokens/banana#what-can-i-do-with-banana',
      '_blank',
    )

  const handleHideCircular = (value: boolean): void => {
    setHideCircular(value)
    localStorage.setItem('hideCircular', JSON.stringify(value))
  }

  useEffect(() => {
    const storedValue = localStorage.getItem('hideCircular')
    if (storedValue) {
      setHideCircular(JSON.parse(storedValue))
    }
  }, [])

  return (
    <Flex sx={circular.container}>
      <Text sx={circular.supporting}>{t(`${supporting}`)}</Text>
      <Text sx={circular.description}>{t(`${description}`)}</Text>
      {children}
      <Flex sx={circular.footer}>
        <Button variant="secondary" sx={{ width: ['100%', '188px'] }} onClick={openLearnMore}>
          {t('Learn More')}
        </Button>
        <Flex sx={circular.checkSection} onClick={() => handleHideCircular(!hideCircular)}>
          <Flex sx={circular.checkboxParent}>
            <Checkbox
              id="checkbox"
              checked={hideCircular}
              sx={{ backgroundColor: 'white2' }}
              onChange={() => handleHideCircular(!hideCircular)}
            />
          </Flex>
          <Text sx={circular.checkboxText}>{t("Don't show this again")}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CircularContent
