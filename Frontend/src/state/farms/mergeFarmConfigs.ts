import { dualFarms, farms, farmsV2, jungleFarms, tokens } from '@ape.swap/apeswap-lists'
import { FarmTypes } from './types'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { ChainId, MAINNET_CHAINS } from 'config/constants/chains'
import { uniqueId } from 'lodash'

const mergeFarmObj: any = {}

const mergeFarmConfigs = () => {
  const mergedFarms = MAINNET_CHAINS.map((chainId) => {
    return {
      chainId,
      farms: [
        // MAV1 farms have been deprecated and would not be displayed on the new repo
        // ...farms.flatMap(
        //   ({
        //     pid,
        //     lpAddresses,
        //     lpSymbol,
        //     tokenAddresses,
        //     tokenSymbol,
        //     quoteTokenAdresses,
        //     quoteTokenSymbol,
        //     projectLink,
        //   }) => {
        //     return chainId === SupportedChainId.BSC
        //       ? {
        //           id: uniqueId(FarmTypes.MASTER_CHEF_V1),
        //           pid,
        //           farmType: FarmTypes.MASTER_CHEF_V1,
        //           lpStakeTokenAddress: lpAddresses[SupportedChainId.BSC] ?? '',
        //           lpStakeTokenSymbol: lpSymbol ?? '',
        //           tokenAddress: tokenAddresses[SupportedChainId.BSC] ?? '',
        //           tokenSymbol,
        //           quoteTokenAddress: quoteTokenAdresses[SupportedChainId.BSC] ?? '',
        //           quoteTokenSymbol,
        //           rewardToken: tokens.banana,
        //           projectLink,
        //         }
        //       : []
        //   },
        // ),
        ...farmsV2.flatMap(
          ({
            pid,
            lpAddresses,
            lpSymbol,
            tokenAddresses,
            tokenSymbol,
            quoteTokenAdresses,
            quoteTokenSymbol,
            projectLink,
          }) => {
            return chainId === ChainId.BSC
              ? {
                  id: uniqueId(FarmTypes.MASTER_CHEF_V2),
                  pid,
                  farmType: FarmTypes.MASTER_CHEF_V2,
                  lpStakeTokenAddress: lpAddresses[ChainId.BSC] ?? '',
                  lpStakeTokenSymbol: lpSymbol ?? '',
                  tokenAddress: tokenAddresses[ChainId.BSC] ?? '',
                  tokenSymbol,
                  quoteTokenAddress: quoteTokenAdresses[ChainId.BSC] ?? '',
                  quoteTokenSymbol,
                  rewardToken: tokens.banana,
                  projectLink,
                }
              : []
          },
        ),
        ...jungleFarms.flatMap(
          ({
            contractAddress,
            jungleId,
            stakingToken,
            rewardToken,
            lpTokens,
            rewardsPerSecond,
            bonusEndBlock,
            tokenPerBlock,
            projectLink,
            twitter,
          }) => {
            return contractAddress?.[chainId as unknown as SupportedChainId] !== undefined
              ? {
                  id: uniqueId(FarmTypes.JUNLGE_FARM),
                  pid: jungleId,
                  farmType: FarmTypes.JUNLGE_FARM,
                  lpStakeTokenAddress: stakingToken.address[chainId as unknown as SupportedChainId] ?? '',
                  lpStakeTokenSymbol: stakingToken.symbol ?? '',
                  tokenAddress: lpTokens?.token.address[chainId as unknown as SupportedChainId] ?? '',
                  tokenSymbol: lpTokens?.token.symbol ?? '',
                  quoteTokenAddress: lpTokens?.quoteToken.address[chainId as unknown as SupportedChainId] ?? '',
                  quoteTokenSymbol: lpTokens?.quoteToken.symbol ?? '',
                  rewardToken: rewardToken,
                  tokensPerBlock: tokenPerBlock,
                  bonusEndBlock,
                  contractAddress: contractAddress[chainId as unknown as SupportedChainId],
                  rewardsPerSecond,
                  projectLink,
                  twitterLink: twitter,
                }
              : []
          },
        ),
        ...dualFarms.flatMap(({ pid, stakeTokenAddress, stakeTokens, rewardTokens, rewarderAddress, dualImage }) => {
          return chainId === ChainId.POLYGON
            ? {
                id: uniqueId(FarmTypes.DUAL_FARM),
                pid,
                farmType: FarmTypes.DUAL_FARM,
                lpStakeTokenAddress: stakeTokenAddress ?? '',
                lpStakeTokenSymbol: `${stakeTokens?.token0.symbol}-${stakeTokens?.token1.symbol}` ?? '',
                tokenAddress: stakeTokens?.token0.address[chainId as unknown as SupportedChainId] ?? '',
                tokenSymbol: stakeTokens?.token0.symbol ?? '',
                quoteTokenAddress: stakeTokens?.token1.address[chainId as unknown as SupportedChainId] ?? '',
                quoteTokenSymbol: stakeTokens?.token1.symbol ?? '',
                rewardToken: rewardTokens.token0,
                secondRewardToken: rewardTokens.token1,
                contractAddress: rewarderAddress,
                dualImage,
              }
            : []
        }),
      ],
    }
  })
  mergedFarms.map(({ chainId, farms }) => (mergeFarmObj[chainId] = farms))
  return mergeFarmObj
}

export default mergeFarmConfigs
