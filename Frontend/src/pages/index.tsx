import HomePage from './home'

export default function Index({ randomImage, randomLHDImage }: { randomImage: number; randomLHDImage: number }) {
  return <HomePage randomImage={randomImage} randomLHDImage={randomLHDImage} />
}
