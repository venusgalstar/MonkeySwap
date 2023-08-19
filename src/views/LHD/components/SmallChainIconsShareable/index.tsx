import { CHAIN_DETAILS } from 'views/LHD/utils/config'
import SmallChainIconShareable from 'components/SmallChainIconShareable'

export const icons: any = CHAIN_DETAILS.reduce((obj, chainDetail) => {
  return {
    ...obj,
    [chainDetail.chainId]: <SmallChainIconShareable chain={chainDetail.chainId} />,
  }
}, {})
