import Image from 'next/image'
import { Grid, Box, useThemeUI } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'

const FriendsOfApeSwap = () => {
  const { colorMode } = useThemeUI()
  const { t } = useTranslation()

  const friends = [
    'polygonVillage',
    'quickSwap',
    'chainlink',
    'dappRadar',
    'animoca',
    'ceek',
    'floki',
    'chainGuardians',
    'apollox',
    'moonpay',
  ]

  return (
    <Flex
      sx={{
        maxWidth: '1412px',
        width: '90vw',
        flexDirection: 'column',
        alignSelf: 'center',
        mt: ['62px', '62px', '90px'],
        mb: ['55px', '55px', '130px'],
      }}
    >
      <Flex sx={{ mb: ['10px', '10px', '35px'], justifyContent: 'center' }}>
        <Text sx={{ fontSize: ['25px', '25px', '35px'], fontWeight: '500' }}>{t('Friends of ApeSwap')}</Text>
      </Flex>

      <Grid
        sx={{
          gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr 1fr', '1fr 1fr 1fr 1fr 1fr'],
        }}
      >
        {friends.map((friend, index) => (
          <Box key={index} sx={{ height: '110px', maxWidth: '240px', position: 'relative' }}>
            <Image src={`/images/apeswap-friends/${friend}-${colorMode}.svg`} fill alt="friend logo" key={index} />
          </Box>
        ))}
      </Grid>
    </Flex>
  )
}

export default FriendsOfApeSwap
