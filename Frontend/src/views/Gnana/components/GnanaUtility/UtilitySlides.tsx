import UtilitySlide from './UtilitySlide'

export const utilitySlides = [
  <UtilitySlide
    key={0}
    action="HOLD"
    icon="passive-farming"
    title="Passive Farming"
    detail="Collect a 2% reflect fee on all GNANA transactions"
  />,
  <UtilitySlide
    key={1}
    action="VOTE"
    icon="governance"
    title="DAO Governance"
    detail="Vote on all protocol decisions"
    href="https://discuss.apeswap.finance/"
  />,
  <UtilitySlide
    key={2}
    action="STAKE"
    icon="exclusive-pools"
    title="Exclusive Pools"
    detail="Access real yield & other exclusive pools"
    href="https://apeswap.finance/pools"
  />,
]
