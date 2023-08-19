import React from 'react'
import Flex from '../Flex'

const SwiperDots = ({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) => {
  return (
    <Flex
      sx={{
        background: isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : 'white4',
        height: '14px',
        width: '14px',
        borderRadius: '50px',
        margin: '0px 2.5px 0px 2.5px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  )
}

export default SwiperDots
