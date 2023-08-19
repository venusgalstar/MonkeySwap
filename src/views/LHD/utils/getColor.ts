export const getColor = (score: number) => {
  if (score < 30) {
    return 'error'
  } else if (score < 70) {
    return 'yellow'
  } else {
    return 'success'
  }
}