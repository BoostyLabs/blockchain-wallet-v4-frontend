import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'
import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, compose } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { Field, reduxForm } from 'redux-form'

import { convertCoinToCoin, convertFiatToCoin } from '@core/exchange'
import { GasCalculationOperations, GasDataI } from '@core/network/api/nfts/types'
import { getRatesSelector } from '@core/redux/data/misc/selectors'
import { RatesType } from '@core/types'
import { Text } from 'blockchain-info-components'
import { getEthBalances } from 'components/Balances/selectors'
import CoinDisplay from 'components/Display/CoinDisplay'
import FiatDisplay from 'components/Display/FiatDisplay'
import { Flex } from 'components/Flex'
import { Title, Value } from 'components/Flyout'
import FlyoutHeader from 'components/Flyout/Header'
import SelectBox from 'components/Form/SelectBox'
import { actions, selectors } from 'data'
import { NftOrderStepEnum } from 'data/components/nfts/types'
import { orderFromJSON } from 'data/components/nfts/utils'
import { useRemote } from 'hooks'

import { NftFlyoutRow, StickyCTA } from '../../components'
import NftAssetHeaderRow from '../../components/NftAssetHeader'
import NftFlyoutFailure from '../../components/NftFlyoutFailure'
import NftFlyoutLoader from '../../components/NftFlyoutLoader'
import { Props as OwnProps } from '..'
import BuyCta from './cta'
import BuyFees from './fees'

const Buy: React.FC<Props> = (props) => {
  const {
    close,
    ethBalancesR,
    formValues,
    nftActions,
    openSeaAssetR,
    orderFlow,
    rates,
    walletCurrency
  } = props
  const { amount, coin, fix } = formValues
  const { orderToMatch } = orderFlow

  const cryptoAmt =
    fix === 'FIAT'
      ? convertFiatToCoin({
          coin,
          currency: walletCurrency,
          maxPrecision: 8,
          rates,
          value: amount
        })
      : amount
  const [selfCustodyBalance, custodialBalance] = ethBalancesR.getOrElse([
    new BigNumber(0),
    new BigNumber(0)
  ])

  const openSeaAsset = useRemote(() => openSeaAssetR)
  const sellOrders =
    openSeaAsset.data?.orders?.filter((x) => {
      return x.side === 1
    }) || []
  const lowest_order = sellOrders.sort((a, b) =>
    new BigNumber(a?.current_price).isLessThan(b?.current_price) ? -1 : 1
  )[0]

  const ethBalance = new BigNumber(selfCustodyBalance)
  const buyFees = orderFlow.fees.getOrElse({ gasPrice: 0, totalFees: 0 } as GasDataI)
  const maxBuyPossible = ethBalance.minus(buyFees.totalFees * buyFees.gasPrice).abs()
  const ethStandard = convertCoinToCoin({
    baseToStandard: true,
    coin,
    value: lowest_order?.current_price
  })
  formValues.amount = ethStandard
  const amtToBuy = new BigNumber(lowest_order?.current_price).minus(ethBalance)

  return (
    <>
      {openSeaAssetR.cata({
        Failure: (e) => <NftFlyoutFailure error={e} close={close} />,
        Loading: () => <NftFlyoutLoader close={props.close} />,
        NotAsked: () => null,
        Success: (val) => {
          if (
            val.collection.safelist_request_status !== 'verified' &&
            orderFlow.prevStep !== NftOrderStepEnum.BUY
          ) {
            nftActions.setOrderFlowPrevStep({ prevStep: NftOrderStepEnum.BUY })
            nftActions.setOrderFlowStep({ step: NftOrderStepEnum.NOT_VERIFIED })
          }
          return (
            <>
              <FlyoutHeader sticky data-e2e='buyHeader' mode='back' onClick={() => close()}>
                Buy
              </FlyoutHeader>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div style={{ height: '100%' }}>
                  <NftAssetHeaderRow asset={val} />
                  <NftFlyoutRow>
                    <Title>
                      <b>
                        <FormattedMessage id='copy.buy_with' defaultMessage='Buy With' />
                      </b>
                    </Title>
                    <Value>
                      <Field
                        name='coin'
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(coin: any) => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          const address = window.coins[coin].coinfig.type.erc20Address!

                          nftActions.fetchFees({
                            operation: GasCalculationOperations.Buy,
                            order: orderFromJSON(orderToMatch),
                            paymentTokenAddress: address
                          })
                        }}
                        component={SelectBox}
                        elements={[
                          {
                            group: '',
                            items: val.collection.payment_tokens
                              .map((token) => token.symbol)
                              .filter((symbol) => !!window.coins[symbol])
                              .filter((symbol) => !window.coins[symbol].coinfig.type.erc20Address)
                              .map((coin) => ({
                                text: window.coins[coin].coinfig.symbol,
                                value: window.coins[coin].coinfig.symbol
                              }))
                          }
                        ]}
                      />
                    </Value>
                  </NftFlyoutRow>
                  {orderToMatch ? (
                    <NftFlyoutRow>
                      <Flex alignItems='center' justifyContent='space-between'>
                        <Text color='black' weight={600} size='20px'>
                          <FormattedMessage id='copy.total' defaultMessage='Total' />
                        </Text>
                        <Flex flexDirection='column' alignItems='flex-end' gap={4}>
                          <CoinDisplay
                            size='14px'
                            color='black'
                            weight={600}
                            coin={orderToMatch?.payment_token_contract?.symbol}
                          >
                            {orderToMatch?.current_price}
                          </CoinDisplay>
                          <FiatDisplay
                            size='12px'
                            color='grey600'
                            weight={600}
                            coin={orderToMatch?.payment_token_contract?.symbol}
                          >
                            {orderToMatch?.current_price}
                          </FiatDisplay>
                        </Flex>
                      </Flex>
                    </NftFlyoutRow>
                  ) : null}
                </div>
              </div>
              <StickyCTA>
                <BuyFees {...props} />
                <br />
                <BuyCta
                  {...props}
                  amount={cryptoAmt}
                  amtToBuy={amtToBuy}
                  maxBuyPossible={maxBuyPossible}
                />
              </StickyCTA>
            </>
          )
        }
      })}
    </>
  )
}
const mapStateToProps = (state) => ({
  erc20BalanceR: selectors.core.data.eth.getErc20Balance(
    state,
    // @ts-ignore
    selectors.form.getFormValues('nftBuy')(state)?.coin || 'WETH'
  ),
  ethBalancesR: getEthBalances(state),
  formValues: selectors.form.getFormValues('nftBuy')(state) as {
    amount: string
    coin: string
    expirationMinutes: string
    fix: string
  },
  rates: getRatesSelector('WETH', state).getOrElse({} as RatesType),
  walletCurrency: selectors.core.settings.getCurrency(state).getOrElse('USD')
})

const mapDispatchToProps = (dispatch) => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  formActions: bindActionCreators(actions.form, dispatch)
})
const connector = connect(mapStateToProps, mapDispatchToProps)

const enhance = compose(
  reduxForm<{}, OwnProps>({
    destroyOnUnmount: false,
    form: 'nftBuy',
    initialValues: {
      coin: 'ETH',
      fix: 'CRYPTO'
    }
  }),
  connector
)

type Props = OwnProps & ConnectedProps<typeof connector>

export default enhance(Buy) as React.FC<OwnProps>
