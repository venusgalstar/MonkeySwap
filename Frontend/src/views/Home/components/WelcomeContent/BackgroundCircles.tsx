import { Flex } from 'components/uikit'

const BackgroundCircles = () => {
  return (
    <Flex
      sx={{
        width: '1512px',
        height: '600px',
        position: 'relative',
        margin: '0 auto',
        opacity: '.9',
      }}
    >
      <Flex
        sx={{
          position: 'absolute',
          width: '1512px',
          height: '600px',
          overflow: 'hidden',
        }}
      >
        <Flex
          //outerCircle
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['600px', '600px', '900px', '1200px'],
            height: ['600px', '600px', '900px', '1200px'],
            top: ['100px', '100px', '-100px', '-200px'],
            left: ['-100px', '-100px', '300px', '500px'],
            background: 'home.c3',
            boxShadow: 'none',
          }}
        />
        <Flex
          //middleCircle
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['450px', '450px', '675px', '900px'],
            height: ['450px', '450px', '675px', '900px'],
            top: ['175px', '175px', '12.5px', '-50px'],
            background: 'home.c2',
            left: ['-25px', '-25px', '425px', '650px'],
            boxShadow: '0px 0px 200px',
            color: 'home.cShadow',
          }}
        />
        <Flex
          //innerCircle
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['300px', '300px', '450px', '600px'],
            height: ['300px', '300px', '450px', '600px'],
            left: ['50px', '50px', '550px', '800px'],
            top: ['250px', '250px', '125px', '100px'],
            background: 'home.c1',
            boxShadow: '0px 0px 200px',
            color: 'home.cShadow',
          }}
        />
        <Flex
          sx={{
            position: 'absolute',
            bottom: '-201px',
            width: '100%',
            height: '200px',
            boxShadow: '-40px 0px 50px 80px',
            color: 'home.hideCircles',
            zIndex: 5,
          }}
        />
        <Flex
          sx={{
            position: 'absolute',
            width: '0px',
            height: '1130px',
            left: '1512px',
            top: '0px',
            boxShadow: '-40px 0px 50px 80px',
            transform: 'rotate(-180deg)',
            color: 'home.hideCircles',
          }}
        />
      </Flex>
    </Flex>
  )
}

export default BackgroundCircles
