import React, { useState, ChangeEvent } from 'react'
import { FormType } from './types'
import styles from './styles'
import Privacy from './Privacy'
import { Button, Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { Input } from 'theme-ui'
import { Spinner } from 'theme-ui'

const NewsletterForm: React.FC<FormType> = ({ status, message, onValidated }) => {
  const [subscriber, setSubscriber] = useState('')
  const { t } = useTranslation()

  const onHandleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setSubscriber(value)
  }

  const handleSubmit = (evt: MouseEvent) => {
    evt.preventDefault()
    if (!(subscriber.indexOf('@') > -1)) return
    if (subscriber.indexOf('@') > -1) {
      onValidated({
        EMAIL: subscriber,
      })
      setSubscriber('')
    }
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        with: '100%',
        gap: '5px',
        mt: ['20px', '20px', '0px'],
        maxWidth: '390px',
      }}
    >
      <Flex sx={styles.left}>
        <Text sx={{ ...styles.latestText, fontSize: '25px' }}>
          {t('Get the latest news from ApeSwap directly to your inbox.')}
        </Text>
      </Flex>
      <Flex sx={{ ...styles.formCon, mt: '15px' }}>
        <Flex as="form" onSubmit={(e: MouseEvent) => handleSubmit(e)} sx={styles.form}>
          <Flex sx={{ alignItems: 'center' }}>
            <Svg icon="message" />
            <Input
              name="EMAIL"
              onChange={onHandleChange}
              value={subscriber}
              placeholder={(status === 'success' && message) || 'example@domain.com'}
              sx={{ ...styles.input }}
            />
          </Flex>
          <Button variant="text" type="submit" disabled={status === 'sending'} sx={styles.submit}>
            {status === 'sending' ? (
              <Spinner size={20} />
            ) : (
              <Text weight={400} size="38px" mt="1px">
                {'>'}
              </Text>
            )}
          </Button>
        </Flex>
        {status === 'error' && (
          <Text color="error" sx={styles.status}>
            {t("Invalid email address. Make sure the format is 'email@domain.com'")}
          </Text>
        )}
      </Flex>
      <Privacy t={t} />
    </Flex>
  )
}

export default NewsletterForm
