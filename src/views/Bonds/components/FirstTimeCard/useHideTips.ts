export const useHideTips = () => {
  return (value: boolean) => {
    localStorage.setItem('hideTips', JSON.stringify(value))
  }
}
