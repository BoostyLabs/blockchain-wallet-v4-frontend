import { lift, mapObjIndexed, toUpper, values } from 'ramda'

import {
  AccountTokensBalancesResponseType,
  BSPaymentTypes,
  CoinfigType,
  ExtractSuccess,
  SwapOrderType
} from '@core/types'
import { selectors } from 'data'
import { RootState } from 'data/rootReducer'

import * as SelfCustodySelectors from '../../coins/selectors/coins/self-custody'
import { getOutputFromPair } from '../swap/model'

// eslint-disable-next-line import/prefer-default-export
export const getCoinsWithBalanceOrMethod = (state: RootState) => {
  const sbMethodsR = selectors.components.buySell.getBSPaymentMethods(state)
  // TODO: SELF_CUSTODY, remove this
  const stxEligibility = SelfCustodySelectors.getStxSelfCustodyAvailablity(state)
  // TODO, check all custodial features
  const sbBalancesR = selectors.components.buySell.getBSBalances(state)
  const erc20sR = selectors.core.data.eth.getErc20AccountTokenBalances(state)
  const recentSwapTxs = selectors.custodial.getRecentSwapTxs(state).getOrElse([] as SwapOrderType[])
  const custodials = selectors.core.data.coins.getCustodialCoins()
  // TODO: SELF_CUSTODY
  const selfCustodials = stxEligibility ? ['STX'] : []

  const transform = (
    paymentMethods: ExtractSuccess<typeof sbMethodsR>,
    sbBalances: ExtractSuccess<typeof sbBalancesR>,
    erc20s: AccountTokensBalancesResponseType['tokenAccounts']
  ) => {
    const custodialErc20s = Object.keys(sbBalances).filter(
      (coin) => window.coins[coin] && window.coins[coin].coinfig.type.erc20Address
    )
    const coinsInRecentSwaps = recentSwapTxs.map((tx) => getOutputFromPair(tx.pair))
    const coinOrder = [
      ...new Set([
        'USD',
        'EUR',
        'GBP',
        'BTC',
        'ETH',
        'BCH',
        'XLM',
        ...selfCustodials,
        ...custodials,
        // ...coins.rest // erc20s
        // TODO: erc20 phase 2, key off hash not symbol
        ...erc20s.map(({ tokenSymbol }) => toUpper(tokenSymbol)),
        ...custodialErc20s,
        ...coinsInRecentSwaps
      ])
    ]
      .map((coin) => window.coins[coin])
      // TODO: erc20 phase 2, remove
      // reject coins that have not been attached to window
      // maybe erc20s that have been sent to users account
      .filter(Boolean)

    return values(
      mapObjIndexed((coin: { coinfig: CoinfigType }) => {
        return {
          ...coin,
          method:
            coin.coinfig.type.name !== 'FIAT' ||
            !!paymentMethods.methods.find(
              (method) =>
                method.currency === coin.coinfig.symbol && method.type === BSPaymentTypes.FUNDS
            )
        }
      }, coinOrder)
    )
  }

  return lift(transform)(sbMethodsR, sbBalancesR, erc20sR)
}

export default getCoinsWithBalanceOrMethod
