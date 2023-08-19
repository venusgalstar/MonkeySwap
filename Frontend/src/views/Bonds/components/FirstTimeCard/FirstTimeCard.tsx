import React from 'react'
import { useTranslation } from 'contexts/Localization'
import {
  BillDiagramContainer,
  BillGifContainer,
  DescriptionContainer,
  FirstTimeCardContainer,
} from '../UserBillsView/styles'
import { AnimatePresence, motion } from 'framer-motion'
import useIsMobile from 'hooks/useIsMobile'
import MobileCard from './MobileCard'
import { Flex, IconButton, Text } from 'components/uikit'
import BillsDiagram from 'components/MarketingModals/Bills/BillsDiagram'
import Image from 'next/image'
import { useHideTips } from './useHideTips'

const FirstTimeCard = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const handleHideTips = useHideTips()

  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'fit-content' }}
        transition={{ opacity: { duration: 0.2 } }}
        exit={{ opacity: 0, height: 0 }}
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          mt: '20px',
        }}
      >
        {isMobile ? (
          <MobileCard />
        ) : (
          <FirstTimeCardContainer>
            <Flex sx={{ flexDirection: 'column' }}>
              <Flex sx={{ justifyContent: 'flex-end' }}>
                <IconButton icon="close" color="text" variant="transparent" onClick={() => handleHideTips(true)} />
              </Flex>
              <Flex>
                <BillGifContainer>
                  <Image
                    src="/images/bills/bill-nfts.gif"
                    alt="bill-img"
                    width={960}
                    height={540}
                    sx={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </BillGifContainer>
                <DescriptionContainer>
                  <Text sx={{ fontSize: '22px', fontWeight: 700 }}>{t('Tips for buying bonds')}</Text>
                  <BillDiagramContainer>
                    <BillsDiagram />
                  </BillDiagramContainer>
                </DescriptionContainer>
              </Flex>
            </Flex>
          </FirstTimeCardContainer>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default FirstTimeCard
