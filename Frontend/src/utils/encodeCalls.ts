import { Interface } from 'ethers/lib/utils'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
}

const encodeCalls = (abi: any[], calls: Call[]) => {
  const encoder = new Interface(abi)
  const addresses = calls.map((call) => call.address.toLowerCase())
  const encodedCallList = calls.map((call) => encoder.encodeFunctionData(call.name, call.params))
  return { addresses, calls: encodedCallList }
}

export default encodeCalls
