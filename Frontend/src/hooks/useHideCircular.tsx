export const useHideCircular = (): boolean => {
  const hideCircular = localStorage.getItem('hideCircular')
  return hideCircular ? JSON.parse(hideCircular) : false
}
