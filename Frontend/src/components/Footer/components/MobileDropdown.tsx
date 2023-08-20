import { Flex, Svg, Text, Link } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { AnimatePresence, motion } from 'framer-motion'

import { useState } from 'react'

const MobileDropdown = ({
  title,
  items,
  underline = true,
}: {
  title: string
  items: { label: string; href: string }[]
  underline?: boolean
}) => {
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation()

  return (
    <Flex
      sx={{
        display: ['flex', 'flex', 'none'],
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '50px',
      }}
    >
      <Flex
        sx={{
          height: '35px',
          width: '100%',
          maxWidth: '375px',
          justifyContent: 'space-between',
          cursor: 'pointer',
          borderBottom: underline && '1px solid',
          borderColor: underline && 'primaryBright',
        }}
        onClick={() => setOpened((prev) => !prev)}
      >
        <Text color="yellow"> {t(title)} </Text>
        <Svg icon="caret" color="primaryBright" direction={opened ? 'up' : 'down'} />
      </Flex>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden', width: '100%', maxWidth: '375px' }}
          >
            {items?.map(({ label, href }) => {
              return (
                <Flex
                  sx={{ margin: '10px 0px', position: 'relative', width: 'fit-content' }}
                  key={label}
                  as={Link}
                  href={href}
                  target="_blank"
                  variant="flex.link"
                >
                  <Text variant="link" color="primaryBright">
                    {t(label)}
                  </Text>
                </Flex>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default MobileDropdown
