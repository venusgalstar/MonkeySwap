import useMatchBreakpoints from './useMatchBreakpoints'

const useIsMobile = () => {
  const { isMobile } = useMatchBreakpoints()
  return isMobile
}

export default useIsMobile
