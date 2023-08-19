import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../../../../../../components/ListView/styles'
import { Flex, Skeleton, Svg, Text } from 'components/uikit'
import TooltipBubble from 'components/uikit/Tooltip'
import { ThemeUIStyleObject } from 'theme-ui'

export interface ProgressBarWrapperProps {
  title?: string
  value?: React.ReactNode
  value2Direction?: 'column' | 'row'
  toolTip?: string
  toolTipPlacement?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  toolTipTransform?: string
  style?: ThemeUIStyleObject
}

const ProgressBarWrapper: React.FC<ProgressBarWrapperProps> = ({
  title,
  value,
  toolTip,
  toolTipPlacement,
  toolTipTransform,
  style,
  value2Direction = 'row',
}) => {
  const { t } = useTranslation()
  return (
    <Flex sx={style}>
      <Flex sx={{ alignItems: 'center' }}>
        <TooltipBubble
          placement={toolTipPlacement}
          transformTip={toolTipTransform}
          body={<Flex>{t(`${toolTip}`)}</Flex>}
          width="220px"
        >
          <Text sx={styles.titleText}>
            {t(`${title}`)}
            <span sx={{ ml: '5px' }}>
              <Svg icon="question" width="12px" />
            </span>
          </Text>
        </TooltipBubble>
      </Flex>
      <Flex sx={{ flexDirection: value2Direction }}>{value ? value : <Skeleton sx={styles.skeleton} />}</Flex>
    </Flex>
  )
}

export default React.memo(ProgressBarWrapper)
