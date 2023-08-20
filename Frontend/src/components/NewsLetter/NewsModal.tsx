import React from 'react'
import Image from 'next/image'
import { Box } from 'theme-ui'

// Components
import { Flex, Modal, Text } from 'components/uikit'
import Newsletter from '.'

// Types
import { NewsModalProps } from './types'

const NewsModal: React.FC<NewsModalProps> = ({ onDismiss, mailChimpUrl }) => {
  return (
    <Modal
      sx={{
        zIndex: 200,
        overflowY: 'auto',
        maxHeight: 'calc(100% - 30px)',

        height: '655px',
        display: 'flex',
        width: '100%',

        '@media screen and (min-width: 852px)': {
          maxWidth: '800px',
          minWidth: '800px',
          height: 'auto',
          overflow: 'inherit',
        },
      }}
      onDismiss={onDismiss}
    >
      <Flex sx={{ p: ['0px', '0px', '20px'] }}>
        <Flex>
          <Text
            width={22}
            onClick={onDismiss}
            sx={{ cursor: 'pointer', position: 'absolute', right: '20px', top: '20px' }}
          >
            X
          </Text>
        </Flex>
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'],
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Flex
            sx={{
              justifyContent: 'center',

              height: ['230px', '230px', '400px'],
              width: ['230px', '230px', '330px'],
              position: 'relative',
            }}
          >
            <Image src="/images/marketing-modals/emailApe.svg" alt="Email Ape" fill />
          </Flex>
          <Newsletter mailChimpUrl={mailChimpUrl} variant="modal" />
        </Flex>
      </Flex>
    </Modal>
  )
}

export default NewsModal
