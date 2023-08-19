import Image from 'next/image'

interface SmallChainIcon {
  chain: string | number
  color?: string
  height?: number
  width?: number
}

const SmallChainIcon: React.FC<SmallChainIcon> = ({ chain, color = 'white', height = 16, width = 16 }) => {
  return (
    <Image
      style={{ borderRadius: '1000px', background: color }}
      height={height}
      width={width}
      src={`/images/chains/${chain}.svg`}
      alt={String(chain)}
    />
  )
}

export default SmallChainIcon
