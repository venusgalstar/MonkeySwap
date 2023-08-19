export const getDotPos = (index: number, carouselLength: number) => {
  return index >= carouselLength * 2
    ? index - carouselLength * 2
    : index - carouselLength < 0
    ? index
    : index - carouselLength
}
