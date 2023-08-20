import { SimpleTokenProfile } from 'state/lhd/types'
import { orderBy } from 'lodash'

export const sortProfiles = (profiles: SimpleTokenProfile[], sortCol: any, sortType: 'asc' | 'desc') => {
  if (!profiles) return
  switch (sortCol) {
    case '#':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile.ranking, sortType)
    case 'Token':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile?.addressMapping?.tokenSymbol, sortType)
    case 'Market Cap':
      return orderBy(
        profiles,
        (profile: SimpleTokenProfile) => profile?.mcap?.reduce((sum, current) => sum + current.amount, 0),
        sortType,
      )
    case '24h Change':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile?.priceChange24hr, sortType)
    case 'Extractable':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile?.extractableLiquidity, sortType)
    case 'Strength':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile?.healthScore, sortType)
    case 'Concentration':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile?.concentrationScore, sortType)
    case 'Ownership':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile?.ownershipScore, sortType)
    case 'Score':
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile?.totalScore, sortType)
    default:
      return orderBy(profiles, (profile: SimpleTokenProfile) => profile.ranking, sortType)
  }
}
