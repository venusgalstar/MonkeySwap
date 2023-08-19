import { Flex } from 'components/uikit'

const StyledTag: React.FC<{ text: string; variant: any }> = ({ text, variant }) => {
  const styles = {
    style: {
      fontSize: '10px',
      padding: '0px 6px',
      fontWeight: 700,
      border: 'none',
      borderRadius: '10px',
      height: 'auto',
      width: 'max-content',
    },
  }
  return (
    <Flex variant={variant} {...styles}>
      {text}
    </Flex>
  )
}

export default StyledTag
