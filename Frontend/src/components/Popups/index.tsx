import Toast from 'components/Toast'
import { useActivePopups } from 'state/application/hooks'

const Popups = () => {
  const activePopups = useActivePopups()
  return (
    <>
      {activePopups.map((popup, i) => {
        return (
          <Toast
            key={popup.key}
            popKey={popup.key}
            popIndex={i + 1}
            variant={popup.content.type}
            text={popup.content.text}
            url={popup.content.url}
            linkText={popup.content.urlLabel}
            errorText={popup.content.errorText}
          />
        )
      })}
    </>
  )
}

export default Popups
