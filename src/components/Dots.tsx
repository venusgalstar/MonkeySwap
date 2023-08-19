const Dots = () => {
  return (
    <span
      sx={{
        ':after': {
          display: 'inline-block',
          animation: ' ellipsis 1.25s infinite',
          content: "'.'",
          width: '1em',
          textAlign: 'left',
        },
        '@keyframes ellipsis': {
          '0%': {
            content: "'.'",
          },
          ' 33%': {
            content: "'..'",
          },
          '66%': {
            content: "'...'",
          },
        },
      }}
    />
  )
}

export default Dots
