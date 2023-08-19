import React, { useState, ChangeEvent } from 'react'
import { FormType } from './types'
import styles, { dynamicStyles } from './styles'
import Privacy from './Privacy'
import { Button, Flex, Svg, Text } from 'components/uikit'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
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
    <Flex sx={{
      background: 'white2',
      width: '100%',
      borderTopWidth: '5px',
      borderTopStyle: 'solid',
      borderTopColor: 'white3',
      borderBottomWidth: '5px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'white3',
      padding: '15px 20px',
      justifyContent: 'center',
    }}>
      <Flex sx={styles.content}>
        <Flex sx={styles.left}>
          <Text sx={styles.latestText}>
            Get the latest news from ApeSwap directly to your inbox.
          </Text>
          <Privacy t={t} />
        </Flex>
        <Flex sx={styles.formCon}>
          <Flex
            as='form'
            onSubmit={(e: MouseEvent) => handleSubmit(e)}
            sx={styles.form}
          >
            <Flex sx={{ alignItems: 'center' }}>
              <Svg icon='message' />
              <Input
                name='EMAIL'
                onChange={onHandleChange}
                value={subscriber}
                placeholder={(status === 'success' && message) || 'example@domain.com'}
                sx={styles.input}
              />
            </Flex>
            <Button
              variant='text'
              type='submit'
              disabled={status === 'sending'}
              sx={styles.submit}
            >
              {status === 'sending' ? (
                <Spinner size={20} />
              ) : (
                <Text weight={400} size='38px' mt='1px'>
                  {'>'}
                </Text>
              )}
            </Button>
          </Flex>
          {status === 'error' && (
            <Text color='error' sx={styles.status}>
              {t('Invalid email address. Make sure the format is \'email@domain.com\'')}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NewsletterForm
