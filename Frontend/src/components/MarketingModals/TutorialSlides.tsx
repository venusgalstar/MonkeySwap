import { Flex, Link, Text, Tooltip } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import useIsMobile from '../../hooks/useIsMobile'
import Slide from './Slide'
import useModal from 'hooks/useModal'
import ConnectWalletModal from 'components/ConnectWallet/ConnectWalletModal'

export const SwapSlides = () => {
  const { t } = useTranslation()

  return [
    <Slide
      key={1}
      step="Step 2"
      slideTitle="Select Tokens and Quantities"
      slideContent={
        <>
          <Text sx={styles.content}>{t('Choose the tokens you want to trade and indicate the desired quantities.')}</Text>
          <Text sx={{ fontWeight: 300 }}>
            {t(`Experience seamless and efficient trading with Monkeys Market DEX.`)}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 3"
      slideTitle="Approve Tokens"
      slideContent={
        <>
          <Text sx={styles.content}>{t(`Using your connected wallet, approve the selected token. This step only needs to be done once per token.`)}</Text>
          <Text sx={{ fontWeight: 300 }}>
            {t(`Experience seamless and efficient trading with Monkeys Market DEX.`)}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 4"
      slideTitle="Confirm and Swap"
      slideContent={
        <>
          <Text>
            {t(
              'Upon pressing the swap button, you will be prompted to approve the transaction in your wallet. Take a moment to review the associated fees, and once satisfied, click "confirm." Your transaction should be processed within seconds.',
            )}
          </Text>
          <Text sx={{ fontWeight: 300 }}>
            {t(`Experience seamless and efficient trading with Monkeys Market DEX.`)}
          </Text>
        </>
      }
    />,
  ]
}

export const FarmSlides = () => {
  const { t } = useTranslation()
  return [
    <Slide
      key={1}
      step="Step 2"
      slideTitle="Add Liquidity"
      slideContent={
        <>
          <Text sx={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
            {t(
              `To participate, you'll need to add liquidity. Learn how to add liquidity (https://medium.com/@monkeysmarket48/how-to-farm-2d85890617bd). "click here"`
            )}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 3"
      slideTitle="Stake"
      slideContent={
        <>
          <Text>
            {t(
              `Once you have your LP tokens, click the deposit button and follow the prompts on your Metamask wallet. Stake your desired amount to begin earning Banana Bucks.`,
            )}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 4"
      slideTitle="Harvest"
      slideContent={
        <>
          <Text sx={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
            {t(`Don't forget to periodically harvest your Banana Bucks. You can reinvest them or take some profit. Learn more about the power of compound interest (https://medium.com/@monkeysmarket48/what-is-compound-interest-bdd7560528c1) "click here"`)}
          </Text>
        </>
      }
    />,
  ]
}

export const PoolSlides = () => {
  const { t } = useTranslation()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Get Tokens!"
      slideContent={
        <>
          <Text>{t('Select GET BANANA or GET GNANA to acquire tokens to stake.')}</Text>
          <Text>
            {t('If you want to stake')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(3%, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t("ApeSwap's governance token that also enables access to exclusive pools and IAO allocations")}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>GNANA,</Text>
            </Tooltip>{' '}
            {t("you'll need to get BANANA First!")}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Stake"
      slideContent={
        <>
          <Text>
            {t(`Once you have the tokens, ENABLE your desired Pool and then click DEPOSIT to stake and start earning.`)}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 3"
      slideTitle="Collect!"
      slideContent={
        <>
          <Text>
            {t("Don't forget to HARVEST your earnings periodically. You can reinvest them or cash out at any time!")}
          </Text>
        </>
      }
    />,
  ]
}

export const MaximizerSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Get Tokens!"
      slideContent={
        <>
          <Text>
            {t(
              'Open the desired Maximizer and click GET LP or GET BANANA. This will allow you to easily obtain tokens to stake.',
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t('⚡NEW: You can also')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '10%' : '6%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Convert one token directly into an LP token or other product in a single transaction.')}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>ZAP</Text>
            </Tooltip>{' '}
            {t('to')}{' '}
            <Tooltip
              placement={'topLeft'}
              transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Contribute equal amounts of two tokens to the DEX to facilitate swaps between them.')}
                </Flex>
              }
              sx={{ width: ['240px', '240px', '240px', '300px'] }}
            >
              <Text sx={{ ...styles.content, ...styles.tipTitle }}>add liquidity</Text>
            </Tooltip>{' '}
            {t('with single tokens!')}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Stake"
      slideContent={
        <>
          <Text>
            {t(
              `Once you have the LP tokens or BANANA, ENABLE your desired Maximizer and then click DEPOSIT to stake and start earning.`,
            )}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 3"
      slideTitle="Enjoy!"
      slideContent={
        <>
          <Text>
            {t("You'll see your BANANA rewards balance grow over time. Both the 'AUTO' and 'MAX' Vaults will")}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Maximizer Vaults will automatically re-stake your earnings periodically.')}
                </Flex>
              }
              sx={{ width: ['240px', '240px', '240px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('auto-compound')}</Text>
            </Tooltip>{' '}
            {t('your earnings! You can HARVEST them or UNSTAKE to cash out at any time.')}
          </Text>
        </>
      }
    />,
  ]
}

export const GnanaSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Get BANANA"
      slideContent={
        <>
          <Text>
            {t('In order to convert into GNANA, you must first hold BANANA.')}{' '}
            <Link href="https://apeswap.finance/swap" target="_blank" rel="noreferrer noopener" sx={styles.yellow}>
              {t('Click here')}
            </Link>
            {t('to trade any of your tokens for BANANA!')}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Convert"
      slideContent={
        <>
          <Text>
            {t(
              'Input the desired amount of BANANA you would like to convert, and select CONVERT. Then, confirm the transaction in your wallet.',
            )}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="HEADS UP, APES!"
      slideTitle="Conversion Fee!"
      slideContent={
        <>
          <Text>
            {t('Converting from BANANA to GNANA involves paying a 28% burn fee and a 2%')}{' '}
            <Tooltip
              placement={'topLeft'}
              transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'A fee charged when transferring a reflect token, that is then redistributed among the token holders.',
                  )}
                </Flex>
              }
              sx={{ width: ['220px', '220px', '220px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('reflect fee')}</Text>
            </Tooltip>{' '}
            {t('for a total cost of 30%')}
          </Text>
          <Text sx={{ fontStyle: 'italic' }}>
            <Text sx={styles.content}>{t('(For every 1 BANANA you convert, you will receive 0.7 GNANA)')}</Text>
          </Text>
        </>
      }
    />,
    <Slide
      key={4}
      step="Step 3"
      slideTitle="You're Golden!"
      slideContent={
        <>
          <Text>
            {t('Enjoy your new, shiny GNANA! You can now access exclusive pools, hold them to earn')}{' '}
            <Tooltip
              placement={'topLeft'}
              transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'A fee charged when transferring a reflect token, that is then redistributed among the token holders.',
                  )}
                </Flex>
              }
              sx={{ width: ['200px', '200px', '200px', '320px'] }}
            >
              <Text sx={styles.tipTitle}>{t('reflect fees,')}</Text>
            </Tooltip>{' '}
            {t('or participate in GNANA IAOs.')}
          </Text>
          <Text sx={{ fontStyle: 'italic' }}>
            {t('Additionally, you can now vote in the')}{' '}
            <Tooltip
              placement={isMobile ? 'topLeft' : 'topRight'}
              transformTip={`translate(${isMobile ? '-3%' : '3%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'A decentralized autonomous organization, or DAO, is a community-led entity with no central authority that is governed by computer code.',
                  )}
                </Flex>
              }
              sx={{ width: ['275px', '275px', '275px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>DAO&apos;s</Text>
            </Tooltip>{' '}
            <Link
              sx={styles.yellow}
              href="https://discuss.apeswap.finance/?_ga=2.192308074.1948993264.1666625902-2101162031.1664826138"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('Governance!')}
            </Link>
          </Text>
        </>
      }
    />,
  ]
}

export const BillsSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Select & Enable"
      slideContent={
        <>
          <Text>
            {t('Click or tap BUY on the desired Bond and ENABLE it. Then, approve the transaction in your wallet.')}
          </Text>
          <Text sx={{ fontStyle: 'italic' }}>{t("You'll see the tokens' discount compared to market price.")}</Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Add Liquidity"
      slideContent={
        <>
          <Text>
            {t('Select GET LP - This will allow you to easily')}{' '}
            <Tooltip
              placement={isMobile ? 'topLeft' : 'topRight'}
              transformTip="translate(0%, 2%)"
              body={
                <Flex sx={styles.tipBody}>
                  {t('Contribute equal amounts of two tokens to the DEX to facilitate swaps between them.')}
                </Flex>
              }
              sx={{ width: ['230px', '230px', '230px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('add liquidity')}</Text>{' '}
            </Tooltip>{' '}
            {t('and obtain liquidity provider (LP) tokens in exchange.')}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t('⚡NEW: You can also')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '10%' : '6%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Convert one token directly into an LP token or other product in a single transaction.')}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>ZAP</Text>
            </Tooltip>{' '}
            {t('to add liquidity with single tokens!')}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 3"
      slideTitle="Buy"
      slideContent={
        <>
          <Text>
            {t(
              'Input the desired amount of LPs to deposit and select BUY. Then, confirm the transaction in your wallet.',
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t('⚡NEW: You can also')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '10%' : '6%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Convert one token directly into an LP token or other product in a single transaction.')}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>ZAP</Text>
            </Tooltip>{' '}
            {t('to buy bonds with single tokens!')}
          </Text>
        </>
      }
    />,
    <Slide
      key={4}
      step="Step 4"
      slideTitle="Claim!"
      slideContent={
        <>
          <Text>
            {t(
              'The tokens will vest linearly until the end of the vesting period. You can CLAIM as you earn, or all at once after fully vested.',
            )}{' '}
            {t('You can also')}{' '}
            <Tooltip
              placement={isMobile ? 'topRight' : 'topLeft'}
              transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Transferring an ApeSwap Bond NFT will also transfer any unclaimed tokens to the new holder.')}
                </Flex>
              }
              sx={{ width: ['200px', '200px', '200px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('TRANSFER')}</Text>
            </Tooltip>{' '}
            {t('your Bond NFTs to other wallets!')}
          </Text>
        </>
      }
    />,
  ]
}

export const IAOSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Prepare For Takeoff"
      slideContent={
        <>
          <Text>
            {t('You can commit with either BNB or')}{' '}
            <Tooltip
              placement={isMobile ? 'topLeft' : 'topRight'}
              transformTip={`translate(${isMobile ? '0' : '3%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t("ApeSwap's governance token that also enables access to exclusive pools and IAO allocations.")}
                </Flex>
              }
              sx={{ width: ['270px', '270px', '270px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>GNANA</Text>
            </Tooltip>{' '}
            {t('(or both!). Select GET BNB or GET GNANA to acquire the tokens you need.')}
          </Text>
          <Text sx={{ fontStyle: 'italic' }}>
            {t('Make sure you have the tokens ready for when the sale goes live!')}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="3, 2, 1... Commit!"
      slideContent={
        <>
          <Text>
            {t('Once the IAO goes live, input the desired amount of tokens to commit and select CONTRIBUTE.')}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Keep in mind"
      slideTitle="Overflow"
      slideContent={
        <>
          <Text>
            {t('After the sale ends, if the IAO is')}{' '}
            <Tooltip
              placement={isMobile ? 'topLeft' : 'topRight'}
              transformTip={`translate(${isMobile ? '0' : '-6%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'When more than the target amount of funds are raised, all extra funds will be proportionally distributed to their owners.',
                  )}
                </Flex>
              }
              sx={{ width: ['270px', '270px', '270px', '400px'] }}
            >
              <Text sx={styles.tipTitle}>{t('oversubscribed')},</Text>
            </Tooltip>{' '}
            {t("you'll automatically receive any excess overflow tokens.")}
          </Text>
        </>
      }
    />,
    <Slide
      key={4}
      step="Step 3"
      slideTitle="Claim"
      slideContent={
        <>
          <Text>
            {t('The tokens will')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '2%' : '-3%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'Tokens become available incrementally over time, starting immediately after the sale, and ending when the vesting period is completed.',
                  )}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('vest linearly')}</Text>
            </Tooltip>{' '}
            {t('until the end of the vesting period. You can CLAIM as you earn, or all at once after fully vested.')}
          </Text>
        </>
      }
    />,
  ]
}

export const OrdersSlides = () => {
  const { t } = useTranslation()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Set Conditions"
      slideContent={
        <>
          <Text>
            {t(
              'Select the tokens you want to trade and enter your preferred amount. Then, enter the price at which you want to trade',
            )}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Place Your Order"
      slideContent={
        <>
          <Text> {t('Select APPROVE and click PLACE ORDER, then confirm the transaction in your wallet.')}</Text>
          <Text sx={{ fontStyle: 'italic' }}>{t('You will see your open and past orders below!')}</Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 3"
      slideTitle="Hold Tight!"
      slideContent={
        <>
          <Text>{t('Wait for your order to execute, or cancel it at any time.')}</Text>
          <Text sx={{ fontStyle: 'italic' }}>
            {t(
              "Remember: you'll need to be holding the funds for the trade to be successful once the market price reaches the price you set.",
            )}
          </Text>
        </>
      }
    />,
  ]
}

export const LiquiditySlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Select Tokens & Amount"
      slideContent={
        <>
          <Text>{t('Select the tokens you want to trade and enter your preferred amount.')}</Text>
          <Text sx={{ fontStyle: 'italic' }}>{t('Assets are always deposited in an equal 50/50 value split!')}</Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Confirm Add Liquidity"
      slideContent={
        <>
          <Text>
            {t(
              'Select ADD LIQUIDITY, click CONFIRM and approve the transaction in your wallet. You will receive your liquidity provider (LP) tokes shortly.',
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t('⚡NEW: You can also')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '10%' : '6%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Convert one token directly into an LP token or other product in a single transaction.')}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>ZAP</Text>
            </Tooltip>{' '}
            {t('to add liquidity with single tokens!')}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 3"
      slideTitle="Enjoy The Rewards!"
      slideContent={
        <>
          <Text>
            {t('You are now earning')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '8%' : '5%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'LP token holders receive a portion of the fees charged when swaps occur between the tokens that comprise that LP.',
                  )}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('fees')}</Text>
            </Tooltip>{' '}
            {t('for each transaction that uses this pair of tokens on the network. Some LPs can also be staked on')}{' '}
            <Link
              href="https://apeswap.finance/banana-farms"
              target="_blank"
              rel="noreferrer noopener"
              sx={styles.yellow}
            >
              {t('Yield Farms')}
            </Link>
            {t(' or ')}{' '}
            <Link
              href="https://apeswap.finance/maximizers"
              target="_blank"
              rel="noreferrer noopener"
              sx={styles.yellow}
            >
              {t('BANANA Maximizers')}
            </Link>
            {t('for additional rewards!')}
          </Text>
        </>
      }
    />,
  ]
}

export const LiquidityV3Slides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Configure Your Position"
      slideContent={
        <>
          <Text>
            {t('Select the tokens and approve them. Then, select the amount you want to add, the')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '8%' : '5%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'You can select from 4 options of fee tiers: 0.01%, 0.05%, 0.3%, or 1%. Lower fees liquidity will get priority versus higher fees liquidity.',
                  )}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('fee tier')}</Text>
            </Tooltip>
            , {t('and')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '8%' : '5%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'This is the range in which your position will be eligible for trades. If the relative price of the tokens in your pair fall out of range, your liquidity position won’t be eligible for trading.',
                  )}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('price range')}</Text>
            </Tooltip>
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t('Lower fee pools get used more, so sometimes the amount of volume can make up for the lower fees!')}
          </Text>{' '}
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Confirm Add Liquidity"
      slideContent={
        <>
          <Text>
            {t(
              'Select PREVIEW to review the position and then ADD to confirm. Approve the transaction in your wallet. You will receive your ',
            )}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '10%' : '6%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'Your Liquidity V3 positions are represented in an NFT which contains all your position’s information as well as its range status',
                  )}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>V3 Position NFT</Text>
            </Tooltip>{' '}
            Shortly
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>{t('Make sure your position is "In range"!')}</Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 3"
      slideTitle="Claim Your Rewards!"
      slideContent={
        <>
          <Text>
            {t('You are now earning')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(${isMobile ? '8%' : '5%'}, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t(
                    'Liquidity providers receive a portion of the fees charged when swaps occur between the tokens that comprise that position.',
                  )}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('fees')}</Text>
            </Tooltip>{' '}
            {t(
              'for each transaction that uses this pair of tokens on your set price range. Don’t forget to CLAIM your rewards periodically in the',
            )}{' '}
            <Link href="/v3-liquidity" sx={styles.yellow}>
              {t('Positions')}
            </Link>{' '}
            {t('tab')}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>Keep an eye on your positions range status!</Text>
        </>
      }
    />,
  ]
}

export const MigrateSlides = () => {
  const { t } = useTranslation()
  return [
    <Slide
      key={1}
      step="Step 1"
      slideTitle="Begin Your Migration"
      slideContent={
        <>
          <Text>
            {t(
              'If you have LPs to migrate, select MIGRATE ALL to start migrating. Your custom migration experience will load automatically!',
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t('You can also migrate LPs individually, if you prefer.')}
          </Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="Step 2"
      slideTitle="Unstake Your External LPs"
      slideContent={
        <>
          <Text>
            {t(
              'Select the UNSTAKE ALL button to unstake your positions from the other DEX. Confirm all the transactions in your wallet.',
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t(`You'll be able to see your overall migration progress!`)}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 3"
      slideTitle="Migrate LPs To ApeSwap"
      slideContent={
        <>
          <Text>
            {t(
              'Select APPROVE ALL to approve the ApeSwap migration contracts. Then, select MIGRATE ALL to move your LPs over to ApeSwap. Confirm all the transactions in your wallet.',
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>{t(`Your LPs will now become APE-LPs!`)}</Text>
        </>
      }
    />,
    <Slide
      key={4}
      step="Step 4"
      slideTitle="Stake In ApeSwap"
      slideContent={
        <>
          <Text>
            {t(
              'Select APPROVE ALL and then STAKE ALL to stake all your tokens in ApeSwap products. Confirm all the transactions in your wallet.',
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t('You can also stake in')}{' '}
            <Tooltip
              placement={'topRight'}
              transformTip={`translate(5%, 2%)`}
              body={
                <Flex sx={styles.tipBody}>
                  {t('Maximizer Vaults will auto-compound your rewards periodically to maximize your yields.')}
                </Flex>
              }
              sx={{ width: ['210px', '210px', '210px', '350px'] }}
            >
              <Text sx={styles.tipTitle}>{t('Maximizer Vaults')}</Text>
            </Tooltip>{' '}
            {t(`by toggling “Migrate to Maximizers”.`)}
          </Text>
        </>
      }
    />,
    <Slide
      key={5}
      step="Congratulations"
      slideTitle="Enjoy Your Rewards!"
      slideContent={
        <>
          <Text>
            {t(
              `You're now ready to migrate all your LPs from external DEXs into ApeSwap to earn new yields. What are you waiting for!?`,
            )}
          </Text>
          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
            {t(`You'll see a summary of your migrated assets after all steps are completed.`)}
          </Text>
        </>
      }
    />,
  ]
}

export const TheMigrationSlides = () => {
  const { t } = useTranslation()
  return [
    <Slide
      key={1}
      step="Before we begin"
      slideTitle="Why Do I Need To Migrate?"
      slideContent={
        <>
          <Text sx={{ lineHeight: '22px' }}>
            {t('ApeSwap has updated the smart contracts to implement the new ')}
            <Link
              sx={styles.yellow}
              href="https://vote.apeswap.finance/#/proposal/0x7c816da506f35d6932cf759faf81b221d566942d9472111fb795ab63150760a9"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('Hard Cap')}
            </Link>
            {t(
              `. Users staking in ApeSwap products must migrate their assets to the new MasterApeV2 contract to continue earning rewards.`,
            )}
          </Text>

          <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>{t(`Don't worry - we've made it very easy!`)}</Text>
        </>
      }
    />,
    <Slide
      key={2}
      step="BEFORE WE BEGIN"
      slideTitle="When Should I Migrate?"
      slideContent={
        <>
          <Text sx={{ lineHeight: '22px' }}>
            {t(
              'Users will no longer earn rewards on any assets staked using the original MasterApe as of January 26 22:00 UTC',
            )}
          </Text>
          <Text>
            {t(
              `After January 26 22:00 UTC, you'll only earn rewards in the new contracts. Make sure to migrate all your assets soon!`,
            )}
          </Text>
        </>
      }
    />,
    <Slide
      key={3}
      step="Step 1"
      slideTitle="Unstake From Old Contracts"
      slideContent={
        <>
          <Text>
            {t(
              'Hit the UNSTAKE ALL button to unstake your positions staked in the old contract. Confirm all the transactions in your wallet.',
            )}
          </Text>
          <Text
            sx={{
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            {t(`You'll be able to see your overall migration progress!`)}
          </Text>
        </>
      }
    />,
    <Slide
      key={4}
      step="Step 2"
      slideTitle="Approve New Contracts"
      slideContent={
        <>
          <Text sx={{ lineHeight: '22px' }}>
            {t(
              `Select APPROVE ALL to approve all the new MasterApeV2 contracts. Confirm all the transactions in your wallet. `,
            )}
          </Text>
          <Text
            sx={{
              fontStyle: 'italic',
            }}
          >
            {t(
              `You can also toggle “Migrate to Maximizers”, which will migrate  your positions automatically to a Maximizer Vault if available.`,
            )}
          </Text>
        </>
      }
    />,
    <Slide
      key={4}
      step="Step 3"
      slideTitle="Stake Using New Contracts"
      slideContent={
        <>
          <Text>
            {t(
              `Hit STAKE ALL to stake all your tokens in the new contracts. Confirm all the transactions in your wallet.`,
            )}
          </Text>
          <Text
            sx={{
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            {t(`You're almost there!`)}
          </Text>
        </>
      }
    />,
    <Slide
      key={5}
      step="Congratulations"
      slideTitle="Your Migration Is Ready"
      slideContent={
        <>
          <Text>
            {t(`You're now ready to migrate all your assets from the old MasterApe contract to the new one.`)}
          </Text>
          <Text
            sx={{
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            {t(`You'll see a summary of your migration to MasterApeV2 after it's completed.`)}
          </Text>
        </>
      }
    />,
  ]
}

export const DefaultSlides = () => {
  const { t } = useTranslation()
  return [
    <Slide
      key={1}
      step="TIP #1"
      slideTitle="Bookmark Our Website"
      slideContent={
        <Text>
          {t(
            `Do not enter ApeSwap through search engines, Google Ads, or any links shared through social media like Telegram or Twitter. Always make sure you're at the correct URL (`,
          )}
          <Text sx={{ fontWeight: 700 }}>apeswap.finance</Text>
          {t(`) before connecting your wallet to avoid phishing scams.`)}
        </Text>
      }
    />,
    <Slide
      key={2}
      step="TIP #2"
      slideTitle="Never Share Your Keys"
      slideContent={
        <Text>
          {t(
            `No one from ApeSwap will ever ask you for your wallet keys or seed phrase. Beware of scammers on social media representing themselves as being affiliated with ApeSwap or asking you to send them funds.`,
          )}
        </Text>
      }
    />,
    <Slide
      key={3}
      step="TIP #3"
      slideTitle="Do Your Own Research"
      slideContent={
        <Text>
          {t(
            `Before buying any tokens or using any products offered by ApeSwap, always do your own research. Make sure you read the documentation and tutorials to understand each product.`,
          )}
        </Text>
      }
    />,
  ]
}

export const ConnectWalletSlide = () => {
  const { t } = useTranslation()
  const [onPresentWalletConnectModal] = useModal(
    <ConnectWalletModal onDismiss={() => null} />,
    true,
    true,
    'ConnectWalletModal',
  )
  return (
    <Slide
      step="Step 1"
      slideTitle="Connect Your Wallet"
      slideContent={
        <>
          <Text>
            {t('To get started, connect your wallet. Please click here to')}
          </Text>
          <Text sx={styles.yellow} onClick={onPresentWalletConnectModal}>
            {t('Connect Wallet')}
          </Text>
          <Text sx={{ fontWeight: 300 }}>
            {t('Experience seamless and efficient trading with Monkeys Market DEX.')}
          </Text>
        </>
      }
    />
  )
}
