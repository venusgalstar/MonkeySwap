import { useCallback } from 'react'
import { Connection } from './types'

// This can be expanded to handle more connection logic
const useActivate = () => {
  const activate = useCallback(async (connection: Connection) => {
    try {
      await connection.connector.activate()
    } catch (error) {
      console.debug(error)
      console.error(`connection error: ${error}`)
    }
  }, [])
  return activate
}

export default useActivate
