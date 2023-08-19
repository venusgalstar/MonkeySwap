import React from 'react'
import { Global } from 'theme-ui'

const GlobalStyles = () => {
  return (
    <Global
      styles={{
        '::-webkit-scrollbar': {
          width: '6px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'text',
          borderRadius: '8px',
        },
        '::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 5px',
          color: 'input',
          borderRadius: '10px',
        },
      }}
    />
  )
}

export default GlobalStyles
