import PageContainer from 'components/PageContainer'
import Home from 'views/Home'

const HomePage = ({ randomImage, randomLHDImage }: { randomImage: number; randomLHDImage: number }) => {
  return (
    <PageContainer variant="homepage">
      <Home randomImage={randomImage} randomLHDImage={randomLHDImage} />
    </PageContainer>
  )
}

export default HomePage
