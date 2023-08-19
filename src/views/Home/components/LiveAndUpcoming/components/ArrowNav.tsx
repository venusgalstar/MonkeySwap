import Image from 'next/image'

// Components
import { Flex, Text, Svg } from 'components/uikit'

const ArrowNav = ({ handleNav, direction }: { handleNav: () => void; direction: 'left' | 'right' }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: ['none', 'none', 'flex'],
        height: '100%',
        cursor: 'pointer',
        width: '60px',
        position: 'relative',
      }}
      onClick={handleNav}
    >
      <Svg icon="caret" direction={direction} />
      <Flex
        sx={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '10',
          opacity: '0',
          bg: 'white2Opacity09',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          left: 0,
          cursor: 'pointer',
          transition: 'opacity 0.3s',
          '&:hover': { opacity: '1', backdropFilter: 'blur(1.5px)' },
        }}
      >
        <Svg icon="caret" direction={direction} />
      </Flex>
    </Flex>
  )
}

export default ArrowNav
