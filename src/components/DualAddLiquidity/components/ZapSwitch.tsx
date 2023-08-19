import React from 'react'
import { Box, Switch, useThemeUI } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import track from 'utils/track'
import { styles } from '../styles'
import { useWeb3React } from '@web3-react/core'
import MoonPayModal from 'components/Moonpay/MoonpayModal'
import useModal from 'hooks/useModal'
import { Flex, Svg, Text } from 'components/uikit'
import TooltipBubble from 'components/uikit/Tooltip'
import ZapSlippage from '../../ZapSlippage'
// import SettingsModal from 'components/Menu/GlobalSettings/SettingsModal'

interface ZapSwitchProps {
  handleZapSwitch?: () => void
  goZap?: boolean
}

const ZapSwitch: React.FC<ZapSwitchProps> = ({ handleZapSwitch, goZap }) => {
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const { colorMode } = useThemeUI()
  const isDark = colorMode === 'dark'

  const [onPresentModal] = useModal(<MoonPayModal onDismiss={() => null} />)
  const [onPresentSettingsModal] = useModal(<ZapSlippage />) //<SettingsModal zapSettings={goZap} />

  return (
    <Flex sx={{ margin: '15px 0 5px 0', justifyContent: 'space-between', alignItems: 'center' }}>
      <Flex sx={{ alignItems: 'flex-start' }}>
        <Flex sx={{ marginRight: '5px', alignItems: 'center' }}>
          <Svg icon="ZapIcon" />
        </Flex>
        <Text weight={700} size="16px" sx={{ marginRight: '10px', lineHeight: '18px' }}>
          {t('ZAP')}
        </Text>
        <Box sx={{ width: '50px' }}>
          <Switch
            checked={goZap}
            onChange={handleZapSwitch}
            sx={{
              ...styles.switchStyles,
              backgroundColor: isDark ? 'rgba(56, 56, 56, 1)' : 'rgba(241, 234, 218, 1)',
            }}
          />
        </Box>
        <TooltipBubble
          placement={'bottomLeft'}
          transformTip="translate(-6%, 2%)"
          body={
            <Flex>
              {t(
                'Zap enables you to convert a single token into an LP token in one transaction. Disable Zap to add liquidity with two tokens.',
              )}
            </Flex>
          }
          width="180px"
        >
          <Text>
            <Svg color={'grey' as any} icon="question" width="19px" />
          </Text>
        </TooltipBubble>
      </Flex>
      <Flex>
        {/* <RunFiatButton
          sx={{ marginRight: '2px', width: '24px' }}
          mini
          t={t}
          runFiat={onPresentModal}
          track={track}
          position="DEX"
          chainId={chainId}
        /> */}
        <Flex sx={{ cursor: 'pointer' }} onClick={onPresentSettingsModal}>
          <Svg icon="cog" width="24px" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapSwitch)
