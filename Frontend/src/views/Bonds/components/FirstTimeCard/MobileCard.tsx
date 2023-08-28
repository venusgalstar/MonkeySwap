/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import {
  BillDiagramContainer,
  BillGifContainer,
  DescriptionContainer,
  FirstTimeCardContainer,
} from '../UserBillsView/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'contexts/Localization'
import { Flex, IconButton, Svg, Text } from 'components/uikit'
import BillsDiagram from 'components/MarketingModals/Bills/BillsDiagram'
import Image from 'next/image'
import { useHideTips } from './useHideTips'

const MobileCard = () => {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()
  const handleHideTips = useHideTips()

  return (
    <FirstTimeCardContainer>
      <Flex sx={{ justifyContent: 'flex-end' }}>
        <IconButton icon="close" color="text" variant="transparent" onClick={() => handleHideTips(true)} />
      </Flex>
      <BillGifContainer>
        <Image
          src="/images/bills/bill-nfts.gif"
          alt="bill-img"
          width={960}
          height={540}
          sx={{ width: '100%', height: 'auto' }}
          priority
        />{' '}
      </BillGifContainer>
      <DescriptionContainer onClick={() => setExpanded(!expanded)}>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Text size="22px" weight={700} sx={{ margin: '0 0 5px 10px' }}>
            {t('Tips for buying bonds')}
          </Text>
          <span sx={{ marginRight: '10px', transform: 'translate(0, -3px)' }}>
            <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
          </span>
        </Flex>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'fit-content' }}
              transition={{ opacity: { duration: 0.2 } }}
              exit={{ opacity: 0, height: 0 }}
              sx={{ position: 'relative', overflow: 'hidden' }}
            >
              <BillDiagramContainer>
                <BillsDiagram />
              </BillDiagramContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </DescriptionContainer>
    </FirstTimeCardContainer>
  )
}

export default MobileCard
