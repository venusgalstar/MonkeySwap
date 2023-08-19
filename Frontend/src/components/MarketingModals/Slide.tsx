import { styles } from './styles'

import { useTranslation } from '../../contexts/Localization'
import { Flex, Text } from 'components/uikit'

const Slide = ({
  step,
  slideTitle,
  slideContent,
}: {
  step: string
  slideTitle: string
  slideContent: React.ReactNode
}) => {
  const { t } = useTranslation()
  return (
    <Flex sx={styles.contentContainer}>
      <Text sx={styles.stepNo}>{t(`${step}`)}</Text>
      <Text sx={styles.slideTitle}>{t(`${slideTitle}`)}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>{slideContent}</Flex>
    </Flex>
  )
}

export default Slide
