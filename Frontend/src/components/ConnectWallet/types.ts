import { icons } from 'components/uikit/Svg/types'
import { Connection, ConnectionType } from 'utils/connection/types'

export type Login = (connectorId: ConnectionType) => void

export interface Config {
  label: string
  icon: icons
  connection: Connection
}
