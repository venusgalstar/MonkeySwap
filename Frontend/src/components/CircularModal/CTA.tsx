/** @jsxImportSource theme-ui */
import React from 'react'
import CTACard from './CTACard'
import { CTAProps } from './types'
import { CTA_TYPE, MODAL_TYPE } from '../MarketingModalCheck/constants'
import { Flex } from '../uikit'

const CTA_CARDS = {
  'circular-sell': {
    0: <CTACard type={CTA_TYPE.GNANA} action={MODAL_TYPE.SELLING} key={0} />,
    1: <CTACard type={CTA_TYPE.POOLS} action={MODAL_TYPE.SELLING} key={1} />,
    2: <CTACard type={CTA_TYPE.LENDING} action={MODAL_TYPE.SELLING} key={2} />,
  },
  'circular-buy': {
    0: <CTACard type={CTA_TYPE.LENDING} action={MODAL_TYPE.BUYING} key={0} />,
    1: <CTACard type={CTA_TYPE.POOLS} action={MODAL_TYPE.BUYING} key={1} />,
    2: <CTACard type={CTA_TYPE.GNANA} action={MODAL_TYPE.BUYING} key={2} />,
  },
  'circular-gh': {
    0: <CTACard type={CTA_TYPE.LENDING} action={MODAL_TYPE.GENERAL_HARVEST} key={0} />,
    1: <CTACard type={CTA_TYPE.POOLS} action={MODAL_TYPE.GENERAL_HARVEST} key={1} />,
    2: <CTACard type={CTA_TYPE.GNANA} action={MODAL_TYPE.GENERAL_HARVEST} key={2} />,
  },
  'circular-ph': {
    0: <CTACard type={CTA_TYPE.COMPOUND} action={MODAL_TYPE.POOL_HARVEST} key={0} />,
    1: <CTACard type={CTA_TYPE.LENDING} action={MODAL_TYPE.POOL_HARVEST} key={1} />,
    2: <CTACard type={CTA_TYPE.GNANA} action={MODAL_TYPE.POOL_HARVEST} key={2} />,
  },
}

const CTA: React.FC<CTAProps> = ({ actionType }) => {
  const cards = CTA_CARDS[actionType] as { [key: number]: React.ReactElement }
  const cardsLength = Object.keys(cards).length
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        marginTop: '20px',
      }}
    >
      {[...Array(cardsLength)].map((_, idx) => cards[idx])}
    </Flex>
  )
}

export default CTA
