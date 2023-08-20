import { default as NextLink, LinkProps } from 'next/link'
import { ThemeUIStyleObject } from 'theme-ui'

interface LinkTypes extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode
  sx?: ThemeUIStyleObject
}

const Link = ({ children, ...props }: LinkTypes | any) => {
  return (
    <NextLink
      {...props}
      sx={{
        ...props?.sx,
        color: 'text',
        textDecoration: 'underline',
        border: 'none',
        ':visited': { textDecoration: 'none' },
        ':active': { textDecoration: 'none' },
      }}
    >
      {children}
    </NextLink>
  )
}

export default Link
