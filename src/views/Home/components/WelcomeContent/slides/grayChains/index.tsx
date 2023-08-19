import Bnb from './bnb'
import Poly from './poly'
import Arbitrum from './Arbitrum'
import Tlos from './Tlos'
import { ReactNode } from 'react'
import { ChainId } from 'config/constants/chains'

export const grayIcons: Partial<Record<ChainId, ReactNode>> = {
  [ChainId.BSC]: <Bnb />,
  [ChainId.POLYGON]: <Poly />,
  [ChainId.ARBITRUM_ONE]: <Arbitrum />,
  [ChainId.TLOS]: <Tlos />,
}
