import React from 'react'

import { PrivacyProps } from './types'
import styles, { dynamicStyles } from './styles'
import { Flex, Link, Svg, Text } from 'components/uikit'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import TooltipBubble from 'components/uikit/Tooltip'

const Privacy: React.FC<PrivacyProps> = ({ isModal, t }) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isMd = isTablet

  return (
    <Flex sx={dynamicStyles.privacy({ isModal })}>
      <Link href="https://apeswap.finance/privacy" target="_blank" rel="noopener noreferrer">
        <Text sx={styles.privacyLink}>{t('We respect your privacy')}</Text>
      </Link>
      <TooltipBubble
        placement={'topLeft'}
        body={
          <Text>
            ApeSwap will only use your email address for the sole purpose of marketing newsletters. Your personal
            information will not be shared with any third party.
          </Text>
        }
        transformTip={'translate(-6%, 0%)'}
        width={'200px'}
      >
        <Svg icon="question" width="12px" />
      </TooltipBubble>
    </Flex>
  )
}

export default Privacy
