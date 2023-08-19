import { Flex, Modal, Svg, Text } from 'components/uikit'
import ModalHeader from 'components/uikit/Modal/ModalHeader'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import AllWallets from './components/AllWallets'
import PrioritizedWallets from './components/PrioritizedWallets'

const modalProps = {
  sx: {
    maxHeight: 'calc(100% - 30px)',
    height: ['395px', '395px', '395px', '470px'],
    width: ['280px', '280px', '280px', '620px'],
    maxWidth: ['280px', '280px', '280px', '620px'],
    minWidth: ['unset', 'unset', 'unset', '620px'],
    overflow: 'hidden',
    padding: ['20px', '20px', '20px', '30px'],
  },
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const ConnectWalletModal = ({ onDismiss }: { onDismiss: () => void }) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <Modal {...modalProps}>
      <ModalHeader {...{ sx: { height: '24px' } }} hideDivider>
        {open && (
          <Flex sx={{ width: '100%' }}>
            <Flex onClick={() => setOpen(false)} sx={{ '&:hover': { cursor: 'pointer' } }}>
              <Svg icon="caret" direction="left" />
              <Text sx={{ fontWeight: 700, ml: '5px', fontSize: '14px' }}>{t('Back')}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Text weight={700}>{t('Connect Wallet')}</Text>
            </Flex>
          </Flex>
        )}
      </ModalHeader>
      <Flex sx={{ height: '400px', flexDirection: 'column' }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={open ? 'wallets' : 'connect'}
            custom={open ? 1 : -1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            sx={{ width: '100%' }}
          >
            {!open ? (
              <PrioritizedWallets setOpen={setOpen} onDismiss={onDismiss} />
            ) : (
              <AllWallets onDismiss={onDismiss} />
            )}
          </motion.div>
        </AnimatePresence>
      </Flex>
    </Modal>
  )
}

export default ConnectWalletModal
