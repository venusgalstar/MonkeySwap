import { useState } from 'react'
import { Button, Link, Svg } from '../../../../../components/uikit'

const IconButton = ({
  href,
  icon,
  simpleBtn,
}: {
  href: string | undefined
  icon: 'filledURL' | 'tickShield' | 'twitter' | 'send' | 'discord' | 'copy' | 'explorer'
  simpleBtn?: boolean
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = (address: string) => {
    setIsCopied(true)
    navigator.clipboard.writeText(address)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <Button
      variant="tertiary"
      disabled={!href}
      sx={{
        background: simpleBtn ? 'none' : 'white4',
        padding: '2px 5px',
        borderRadius: '8px',
        ml: '5px',
        height: '19px',
        alignItems: 'center',
        lineHeight: '12px',
      }}
    >
      {href?.slice(0, 2) === '0x' ? (
        <div sx={{ lineHeight: '8px' }} onClick={() => handleCopyClick(href)}>
          <Svg icon={isCopied ? 'success' : 'copy'} width={10} color={!href ? 'textDisabled' : 'text'} />
        </div>
      ) : href ? (
        <Link href={href ?? ''} target="_blank" sx={{ lineHeight: '8px' }}>
          <Svg icon={icon} width={10} color={!href ? 'textDisabled' : 'text'} />
        </Link>
      ) : (
        <Svg icon={icon} width={10} color={!href ? 'textDisabled' : 'text'} />
      )}
    </Button>
  )
}

export default IconButton
