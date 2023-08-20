import { CHAIN_DETAILS } from 'views/LHD/utils/config'
import SmallChainIcon from 'components/SmallChainIcon'

export const icons: any = CHAIN_DETAILS.reduce((obj, chainDetail) => {
  return {
    ...obj,
    [chainDetail.chainId]: <SmallChainIcon chain={chainDetail.chainId} />,
  }
}, {})
