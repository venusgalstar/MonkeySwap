import styled from '@emotion/styled'
import { Text } from 'components/uikit'

interface HeadingProps {
  fontWeight?: number
  color?: string
}

const Title = styled(Text)<HeadingProps>`
  color: ${({ color }) => (color !== undefined ? color : 'white')};
  font-weight: ${({ fontWeight }) => (fontWeight !== undefined ? fontWeight : 400)};
  line-height: 18px;
`

export default Title
