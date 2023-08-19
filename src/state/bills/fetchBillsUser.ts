import erc20ABI from 'config/abi/erc20.json'
import billAbi from 'config/abi/bond.json'
import BigNumber from 'bignumber.js'
import getBillNftData from './getBillNftData'
import { BillsConfig, BillVersion } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import multicall from 'utils/multicall'
import { Bills, UserBill } from 'views/Bonds/types'

export const fetchBillsAllowance = async (chainId: SupportedChainId, account: string, bills: BillsConfig[]) => {
  const calls = bills.map((b) => ({
    address: b.lpToken.address[chainId] ?? '',
    name: 'allowance',
    params: [account, b.contractAddress[chainId]],
  }))
  const allowances = await multicall(chainId, erc20ABI, calls)
  return bills.reduce((acc, bill, index) => ({ ...acc, [bill.index]: new BigNumber(allowances[index]).toString() }), {})
}

export const fetchUserBalances = async (chainId: SupportedChainId, account: string, bills: BillsConfig[]) => {
  const calls = bills.map((b) => ({
    address: b.lpToken.address[chainId] ?? '',
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(chainId, erc20ABI, calls)
  const tokenBalances = bills.reduce(
    (acc, bill, index) => ({ ...acc, [bill.index]: new BigNumber(tokenBalancesRaw[index]).toString() }),
    {},
  )

  return tokenBalances
}

export const fetchUserOwnedBillNftData = async (
  ownedBillsData: { id: string; billNftAddress: string; contractAddress: string }[],
  chainId: SupportedChainId,
  bills: Bills[],
) => {
  const billNftData = ownedBillsData?.map(async ({ id, billNftAddress, contractAddress }) => {
    const bill = bills
      .find((b) => b.contractAddress[chainId] === contractAddress)
      ?.userOwnedBillsNftData?.find((u) => +u.tokenId === +id)
    if (bill) return { id, data: bill }
    return { id, data: await getBillNftData(id, billNftAddress, chainId) }
  })
  return Promise.all(billNftData)
}

export const fetchUserOwnedBills = async (
  chainId: SupportedChainId,
  account: string,
  bills: BillsConfig[],
): Promise<UserBill[]> => {
  const billIdCalls = bills.map((b) => ({
    address: b.contractAddress[chainId] ?? '',
    name: 'getBillIds',
    params: [account],
  }))
  const billIds = await multicall(chainId, billAbi, billIdCalls, true, chainId === SupportedChainId.TLOS ? 5 : 15)
  const billsPendingRewardCall: any = []
  const billDataCalls: any = []
  const billVersions: any = []
  billIds.forEach((idArray: any, index: number) =>
    idArray[0].forEach(
      (id: BigNumber) =>
        id.gt(0) &&
        (billDataCalls.push({
          address: bills[index].contractAddress[chainId],
          name: bills[index].billVersion === BillVersion.V2 ? 'getBillInfo' : 'billInfo',
          params: [id],
        }),
        billDataCalls.push({ address: bills[index].contractAddress[chainId], name: 'billNft' }),
        billsPendingRewardCall.push({
          address: bills[index].contractAddress[chainId],
          name: bills[index].billVersion === BillVersion.V2 ? 'claimablePayout' : 'pendingPayoutFor',
          params: [id],
        }),
        billVersions.push(bills[index].billVersion)),
    ),
  )
  const billData = await multicall(chainId, billAbi, billDataCalls, true, chainId === SupportedChainId.TLOS ? 50 : 150)
  const pendingRewardsCall = await multicall(chainId, billAbi, billsPendingRewardCall)

  const result = []

  for (let i = 0; i < billsPendingRewardCall.length; i++) {
    const billDataPos = i === 0 ? 0 : i * 2
    const data =
      billVersions[i] === BillVersion.V2
        ? {
            address: billsPendingRewardCall[i].address,
            id: billsPendingRewardCall[i].params[0].toString(),
            payout: new BigNumber(billData[billDataPos][0]?.payout.toString())
              .minus(billData[billDataPos][0]?.payoutClaimed.toString())
              .toString(),
            billNftAddress: billData[billDataPos + 1][0].toString(),
            vesting: billData[billDataPos][0]?.vesting.toString(),
            lastBlockTimestamp: billData[billDataPos][0]?.lastClaimTimestamp.toString(),
            truePricePaid: billData[billDataPos][0]?.truePricePaid.toString(),
            pendingRewards: pendingRewardsCall[i][0].toString(),
          }
        : {
            address: billsPendingRewardCall[i].address,
            id: billsPendingRewardCall[i].params[0].toString(),
            payout: billData[billDataPos][0].toString(),
            billNftAddress: billData[billDataPos + 1][0].toString(),
            vesting: billData[billDataPos][1].toString(),
            lastBlockTimestamp: billData[billDataPos][2].toString(),
            truePricePaid: billData[billDataPos][3].toString(),
            pendingRewards: pendingRewardsCall[i][0].toString(),
          }
    result.push(data)
  }

  return result
}
