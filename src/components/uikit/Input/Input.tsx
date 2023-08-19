import { Input as ThemeInput, Spinner } from 'theme-ui'
import { Text } from 'components/uikit'
import Flex from '../Flex'
import Svg from '../Svg'

type variant = 'search' | 'password' | 'text'
type inputStatus = 'default' | 'error' | 'success'
type color = 'gray' | 'red' | 'green'

type colorSchemeMap = Record<inputStatus, color>

const colorScheme: colorSchemeMap = {
  default: 'gray',
  error: 'red',
  success: 'green',
}

const Input = ({
  variant,
  width,
  status,
  isLoading,
  ...props
}: { variant?: variant; width?: string[]; status?: inputStatus; isLoading?: boolean } | any) => {
  switch (variant) {
    case 'search':
      return (
        <Flex sx={{ position: 'relative', width: width ? width : 'unset' }}>
          <ThemeInput
            {...props}
            sx={{
              background: 'white3',
              border: 'none',
              pl: '10px',
              borderRadius: '10px',
              ':focus': { outline: 'none' },
            }}
          />
          <Flex sx={{ position: 'absolute', right: 5, justifyContent: 'center', height: '100%' }}>
            <Svg icon="search" />
          </Flex>
        </Flex>
      )

    case 'password':
      const statusColor = colorScheme[status as inputStatus]
      return (
        <Flex
          sx={{
            width: width ? width : '100%',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            position: 'relative',
          }}
        >
          <ThemeInput
            {...props}
            type="password"
            sx={{
              position: 'relative',
              background: 'white3',
              border: 'none',
              borderBottom: `2px solid ${statusColor}`,
              color: statusColor,
              pl: '10px',
              borderRadius: '10px',
              ':focus': { outline: 'none' },
            }}
          />
          {isLoading && (
            <Flex sx={{ position: 'absolute', top: '5px', right: '5px', justifyContent: 'center', height: '100%' }}>
              <Spinner width="20px" height="20px" />
            </Flex>
          )}
          <Text sx={{ fontSize: '10px', color: statusColor, visibility: status === 'default' ? 'hidden' : 'visible' }}>
            {status === 'error' ? 'Wrong Password' : 'Correct Password'}
          </Text>
        </Flex>
      )

    default:
      return (
        <ThemeInput
          {...props}
          sx={{
            background: 'white3',
            border: 'none',
            pl: '10px',
            borderRadius: '10px',
            ':focus': { outline: 'none' },
          }}
        />
      )
  }
}

export default Input
