import Image from 'next/image'
import { Box } from 'theme-ui'

// Hooks
import { useTranslation } from 'contexts/Localization'

// Components
import { Flex, Text } from 'components/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import SmallChainIcon from 'components/SmallChainIcon'
import OpportunityBadge from '../../OpportunityBadge'
import { ReactNode } from 'react'

interface ListCardProps {
  serviceTokenProps: any
  name: string
  isNew?: boolean
  isFeatured?: boolean
  rightContent: ReactNode
  chainId: number
  bg?: string
  hoverTitle?: string
  handleClick?: (args: any) => void
}

const ListCard = ({
  name,
  isNew,
  isFeatured,
  serviceTokenProps,
  rightContent,
  chainId,
  bg = 'white2',
  hoverTitle = 'Buy Now',
  handleClick,
}: ListCardProps) => {
  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        bg,
        px: '20px',
        py: '11px',
        borderRadius: '10px',
        height: '54px',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      {/* TODO: Animate this to slide left to right */}
      <Flex
        sx={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          zIndex: '10',
          opacity: '0',
          bg: 'white2Opacity09',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          left: 0,
          cursor: 'pointer',
          transition: 'opacity 0.3s',
          '&:hover': { opacity: '1', backdropFilter: 'blur(1.5px)' },
        }}
      >
        <Text sx={{ color: 'yellow', fontSize: ['10px', '10px', '12px'] }}>{t(hoverTitle)}</Text>
        <Image
          src="/images/discover-new-opportunities/caret-right-yellow.svg"
          width={10}
          height={10}
          alt="caret right"
        />
      </Flex>
      <Flex sx={{ gap: ['10px', '10px', '20px'], alignItems: 'center' }}>
        <Flex sx={{ position: 'relative' }}>
          <Box sx={{ display: ['flex', 'flex', 'none'] }}>
            <ServiceTokenDisplay {...serviceTokenProps} size={24} />
          </Box>
          <Box sx={{ display: ['none', 'none', 'flex'] }}>
            <ServiceTokenDisplay {...serviceTokenProps} size={32} />
          </Box>
          <Box sx={{ position: 'absolute', zIndex: 1, right: 0, top: ['-9px', '-9px', '-6px'] }}>
            <SmallChainIcon chain={chainId} height={10} width={10} />
          </Box>
        </Flex>
        <Text sx={{ fontSize: ['12px', '12px', '16px'] }}>{name}</Text>
        {isFeatured && <OpportunityBadge type="featured" />}
        {isNew && <OpportunityBadge type="new" />}
      </Flex>
      {rightContent}
    </Flex>
  )
}

export default ListCard
