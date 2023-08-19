import Image from 'next/image'

// Components
import { Flex, Text } from 'components/uikit'

type BadgeType = 'featured' | 'new'

interface OpportunityBadgeProps {
  type: BadgeType
}

const styles: Record<BadgeType, any> = {
  featured: {
    bg: '#424242',
    textColor: '#FAFAFA',
    icon: '/images/discover-new-opportunities/dollar-circle-gray.svg',
  },
  new: {
    bg: 'rgba(243, 186, 47, 0.20)',
    textColor: '#cc7722',
    icon: '/images/discover-new-opportunities/star-yellow.svg',
  },
}

const OpportunityBadge = ({ type }: OpportunityBadgeProps) => {
  return (
    <Flex
      sx={{
        px: '5px',
        gap: '3px',
        height: '13px',
        bg: styles[type].bg,
        borderRadius: '3px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image src={styles[type].icon} alt="dollar-sign" width={7} height={7} />
      <Text
        sx={{
          fontSize: '8px',
          fontWeight: '500',
          textTransform: 'uppercase',
          color: styles[type].textColor,
          lineHeight: '13px',
          opacity: '0.6',
        }}
      >
        {type}
      </Text>
    </Flex>
  )
}

export default OpportunityBadge
