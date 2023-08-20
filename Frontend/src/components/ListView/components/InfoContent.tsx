import { Flex, Svg, Tooltip } from 'components/uikit'

const InfoContent = ({
  infoContent,
  expandedContent,
  expanded,
}: {
  infoContent?: React.ReactNode
  expandedContent?: React.ReactNode
  expanded: boolean | undefined
}) => {
  return (
    <>
      {infoContent && (
        <Flex sx={{ display: 'inline-block' }}>
          <Tooltip body={infoContent} transformTip="translate(11%, 0%)" width="205px">
            <Svg icon="info" width={12} color="text" />
          </Tooltip>
        </Flex>
      )}
      {expandedContent && (
        <span style={{ marginLeft: '20px', transform: 'translate(0, -3px)' }}>
          <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
        </span>
      )}
    </>
  )
}

export default InfoContent
