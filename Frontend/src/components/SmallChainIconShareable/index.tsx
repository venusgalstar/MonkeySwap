import Image from 'next/image'

interface SmallChainIconShareable {
  chain: string | number
  color?: string
  height?: number
  width?: number
}

const SmallChainIconShareable: React.FC<SmallChainIconShareable> = ({
  chain,
  color = 'white',
  height = 16,
  width = 16,
}) => {
  return (
    <img
      style={{ borderRadius: '1000px', background: color }}
      height={height}
      width={width}
      src={`/images/chains/${chain}.svg`}
      alt={String(chain)}
    />
  )
}

export default SmallChainIconShareable
