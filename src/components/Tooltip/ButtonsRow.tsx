import React from 'react'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import { ChainId } from '@ape.swap/sdk'
import { useWeb3React } from '@web3-react/core'
import { Flex, Link, Svg, Text } from 'components/uikit'

const ButtonsRow: React.FC<{ projectLink: string; twitter: string; bubble?: string; audit?: string }> = ({
  projectLink,
  twitter,
  bubble,
  audit,
}) => {
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const bubbleURL = `https://app.bubblemaps.io/bsc/token/${bubble}`

  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <Flex sx={styles.iconButton} as={Link} href={projectLink} target="_blank">
        <Svg icon="URL" width={18} />
      </Flex>
      <Flex sx={styles.iconButton} as={Link} href={twitter} target="_blank">
        <Svg icon="twitter" width={18} color="text" />
      </Flex>
      {chainId === ChainId.BSC && bubble && (
        <Flex sx={styles.iconButton} as={Link} href={bubbleURL} target="_blank">
          <Svg icon="bubble" width={18} color="text" />
        </Flex>
      )}
      {audit && (
        <Flex
          sx={{ ...styles.iconButton, margin: '0 0 5px 0', '& svg': { marginRight: '5px' } }}
          as={Link}
          href={audit}
          target="_blank"
        >
          <Svg icon="audit" width={18} color="text" />
          <Text sx={{ paddingRight: '5px' }}>{t('Audit')}</Text>
        </Flex>
      )}
    </Flex>
  )
}

export default ButtonsRow
