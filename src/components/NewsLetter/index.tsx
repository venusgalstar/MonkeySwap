import MailChimpSubscribe from 'react-mailchimp-subscribe'
import NewsletterForm from './NewsLetterForm'
import NewsletterFormModal from './NewsLetterFormModal'
import { NewsletterProps } from './types'

const Newsletter = ({ mailChimpUrl, variant = 'default' }: { mailChimpUrl: string; variant?: 'modal' | 'default' }) => {
  const Form = variant === 'modal' ? NewsletterFormModal : NewsletterForm

  return (
    <MailChimpSubscribe
      url={mailChimpUrl}
      render={({ subscribe, status, message }: any) => (
        <Form status={status} message={message} onValidated={(formData) => subscribe(formData)} />
      )}
    />
  )
}

export default Newsletter
