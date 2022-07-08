import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect, ConnectedProps } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { colors } from '@blockchain-com/constellation'
import { bindActionCreators } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { addMinutes, getUnixTime } from 'date-fns'
import { map } from 'ramda'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'

import { Remote } from '@core'
import { convertCoinToCoin, convertCoinToFiat, convertFiatToCoin } from '@core/exchange'
import { GasDataI } from '@core/network/api/nfts/types'
import { getRatesSelector } from '@core/redux/data/misc/selectors'
import { RatesType } from '@core/types'
<<<<<<< Updated upstream
import {
  Button,
  CheckBoxInput,
  Image,
  Link,
  SpinningLoader,
  Text
} from 'blockchain-info-components'
import { getEthBalances } from 'components/Balances/selectors'
import CoinDisplay from 'components/Display/CoinDisplay'
import { Row, Title, Value } from 'components/Flyout'
=======
import { Text } from 'blockchain-info-components'
import { Title, Value } from 'components/Flyout'
>>>>>>> Stashed changes
import FlyoutHeader from 'components/Flyout/Header'
import AmountFieldInput from 'components/Form/AmountFieldInput'
import SelectBox from 'components/Form/SelectBox'
import { actions, selectors } from 'data'
import { NftOrderStepEnum } from 'data/components/nfts/types'
import { Analytics, DeepLinkGoal } from 'data/types'
import { useRemote } from 'hooks'

import { NftFlyoutRow, StickyCTA } from '../../components'
import GetMoreEthComponent from '../../components/GetMoreEth'
import NftAssetHeaderRow from '../../components/NftAssetHeader'
import NftFlyoutFailure from '../../components/NftFlyoutFailure'
import NftFlyoutLoader from '../../components/NftFlyoutLoader'
import { Props as OwnProps } from '..'
import MakeOfferFees from './fees'

const MakeOffer: React.FC<Props> = (props) => {
  const {
    analyticsActions,
    close,
    erc20BalanceR,
    ethBalancesR,
    formActions,
    formValues,
    isAuthenticated,
    isInvited,
    nftActions,
    openSeaAssetR,
    orderFlow,
    rates,
    walletCurrency
  } = props
  const [termsAccepted, setTermsAccepted] = useState(false)
  useEffect(() => {
    analyticsActions.trackEvent({
      key: Analytics.NFT_MAKE_AN_OFFER_VIEWED,
      properties: {}
    })
  }, [])
  const { amount, coin, fix } = formValues
  const { coinfig } = window.coins[coin]
  const [selfCustodyBalance, custodialBalance] = ethBalancesR.getOrElse([
    new BigNumber(0),
    new BigNumber(0)
  ])
  const cryptoAmt =
    fix === 'FIAT'
      ? convertFiatToCoin({
          coin,
          currency: walletCurrency,
          rates,
          value: amount
        })
      : amount
  const fiatAmt =
    fix === 'CRYPTO'
      ? convertCoinToFiat({
          coin,
          currency: walletCurrency,
          isStandard: true,
          rates,
          value: amount || 0
        })
      : amount
  const wrapFees = orderFlow.wrapEthFees.getOrElse({ gasPrice: 0, totalFees: 0 } as GasDataI)
  const offerFees = orderFlow.fees.getOrElse({ gasPrice: 0, totalFees: 0 } as GasDataI)
  const ethBalance = new BigNumber(selfCustodyBalance)
  const erc20Balance = erc20BalanceR.getOrElse(0)
  const maxWrapPossible = ethBalance
    .minus(wrapFees.totalFees * wrapFees.gasPrice)
    .minus(offerFees.totalFees * offerFees.gasPrice)
<<<<<<< Updated upstream
    .minus(wrapFees.totalFees * offerFees.gasPrice)
  const maxOfferPossible = maxWrapPossible.plus(erc20Balance)
=======
  const maxOfferPossible =
    coin === 'WETH' ? maxWrapPossible.plus(erc20Balance) : new BigNumber(erc20Balance)
>>>>>>> Stashed changes
  const amtToBuy = maxOfferPossible
    .times(-1)
    .plus(convertCoinToCoin({ baseToStandard: false, coin, value: cryptoAmt }))
  // Standard Values
  const standardErc20Balance = convertCoinToCoin({
    coin: formValues.coin || 'WETH',
    value: erc20Balance
  })
  const standardMaxWrapPossible = convertCoinToCoin({
    coin: 'ETH',
    value: maxWrapPossible.toString()
  })
  // used to avoid precision error caused by AmountFieldInput component, which
  // uses max 8 decimal precision
  const standardMaxOfferPossible =
    (Math.floor(maxOfferPossible.dividedBy(1e8).toNumber()) * 1e8) / 10 ** coinfig.precision

  const amtToWrap = new BigNumber(cryptoAmt || 0).minus(standardErc20Balance)
  const canWrap =
    amtToWrap.isLessThanOrEqualTo(standardMaxWrapPossible) && formValues.coin === 'WETH'
  const needsWrap = amtToWrap.isGreaterThan(0) && formValues.coin === 'WETH'

  const openSeaAsset = useRemote(() => openSeaAssetR)
  if (openSeaAsset.isLoading) return <NftFlyoutLoader close={props.close} />
  if (openSeaAsset.error)
    return <NftFlyoutFailure error={openSeaAsset.error || ''} close={props.close} />

  const val = openSeaAsset.data

  if (!val) return <NftFlyoutFailure error='Error fetching asset data.' close={props.close} />

  const disabled =
    !formValues.amount ||
    Remote.Loading.is(orderFlow.fees) ||
    props.orderFlow.isSubmitting ||
    !termsAccepted

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted)
  }

  const acceptTerms = () => {
    setTermsAccepted(true)
  }

  const enteredAmountAnalytics = () => {
    analyticsActions.trackEvent({
      key: Analytics.NFT_ENTERED_AMOUNT,
      properties: {
        currency: coin,
        input_amount: Number(amount)
      }
    })
  }

  const offerWithChangedAnalytics = (coin) => {
    analyticsActions.trackEvent({
      key: Analytics.NFT_MAKE_OFFER_WITH_CLICKED,
      properties: {
        currency: coin
      }
    })
  }

  if (
    val.collection.safelist_request_status !== 'verified' &&
    orderFlow.prevStep !== NftOrderStepEnum.MAKE_OFFER
  ) {
    nftActions.setOrderFlowPrevStep({ prevStep: NftOrderStepEnum.MAKE_OFFER })
    nftActions.setOrderFlowStep({ step: NftOrderStepEnum.NOT_VERIFIED })
  }

  return (
    <>
      <FlyoutHeader sticky data-e2e='wrapEthHeader' mode='back' onClick={() => close()}>
        Make Offer
      </FlyoutHeader>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <NftAssetHeaderRow asset={val} />
        <NftFlyoutRow>
          <Value>
            <AmountFieldInput
              coin={coin}
              fiatCurrency={walletCurrency}
              amountError={false}
              quote={fix === 'CRYPTO' ? fiatAmt : cryptoAmt}
              fix={fix as 'CRYPTO' | 'FIAT'}
              name='amount'
              onChange={enteredAmountAnalytics}
              showCounter
              showToggle
              data-e2e='amountField'
              onToggleFix={() => {
                formActions.change('nftMakeOffer', 'fix', fix === 'CRYPTO' ? 'FIAT' : 'CRYPTO')
                formActions.change('nftMakeOffer', 'amount', fix === 'CRYPTO' ? fiatAmt : cryptoAmt)
              }}
            />
          </Value>
        </NftFlyoutRow>
        <NftFlyoutRow>
          <Title>
            <b>
              <FormattedMessage id='copy.offer_with' defaultMessage='Offer With' />
            </b>
          </Title>
          <Value>
            <Field
              name='coin'
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(coin: any) => {
                offerWithChangedAnalytics(coin)
<<<<<<< Updated upstream
                nftActions.fetchFees({
                  asset: val,
                  offer: '0.0001',
                  operation: GasCalculationOperations.CreateOffer,
                  paymentTokenAddress: address
                })
=======
>>>>>>> Stashed changes
              }}
              component={SelectBox}
              elements={[
                {
                  group: '',
                  items: val.collection.payment_tokens
                    .map((token) => token.symbol)
                    .filter((symbol) => !!window.coins[symbol])
                    .filter((symbol) => !!window.coins[symbol].coinfig.type.erc20Address)
                    .map((coin) => ({
                      text: window.coins[coin].coinfig.symbol,
                      value: window.coins[coin].coinfig.symbol
                    }))
                }
              ]}
            />
          </Value>
          <Value>
            <Text size='12px'>ETH will automatically be wrapped to WETH during transaction </Text>
          </Value>
        </NftFlyoutRow>
        <NftFlyoutRow>
          <Title>
            <b>
              <FormattedMessage id='copy.select_coin' defaultMessage='Expires After' />
            </b>
          </Title>
          <Value>
            <Field
              name='expirationMinutes'
              onChange={(days: any) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              }}
              component={SelectBox}
              elements={[
                {
                  group: '',
                  items: map(
                    (item) => ({
                      text: item.text,
                      value: item.value
                    }),
                    [
                      { text: '30 Mins', value: 30 },
                      { text: '1 Hour', value: 60 },
                      { text: '1 Day', value: 1440 },
                      { text: '3 Days', value: 4320 },
                      { text: '7 Days', value: 10080 },
                      { text: '1 Month', value: 43200 },
                      { text: '3 Months', value: 129600 },
                      { text: '6 Months', value: 259200 }
                    ]
                  )
                }
              ]}
            />
          </Value>
        </NftFlyoutRow>
      </div>

      <StickyCTA>
<<<<<<< Updated upstream
        {isAuthenticated ? (
          isInvited ? (
            <>
              <MakeOfferFees {...props} asset={val} />
              <br />
              {needsWrap ? (
                <>
                  {canWrap ? (
                    <div />
                  ) : (
                    <>
                      <GetMoreEthComponent
                        amount={cryptoAmt}
                        amtToBuy={amtToBuy}
                        selfCustodyBalance={new BigNumber(selfCustodyBalance)}
                        custodialBalance={new BigNumber(custodialBalance)}
                      />
                      <div style={{ padding: '1em 0em' }}>
                        <Text
                          size='12px'
                          weight={500}
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          The max you can offer from this wallet is&nbsp;
                          <CoinDisplay
                            style={{ fontSize: '12px', fontWeight: 'bold' }}
                            coin={formValues.coin || 'WETH'}
                          >
                            {Math.max(maxOfferPossible.toNumber(), 0)}
                          </CoinDisplay>
                        </Text>
                      </div>
                    </>
                  )}
                </>
              ) : null}
              {((needsWrap && canWrap) || !needsWrap) && (
                <div style={{ display: 'flex' }}>
                  {' '}
                  <div style={{ padding: '1.2em 0em' }}>
                    <CheckBoxInput
                      name='terms'
                      disabled={false}
                      onChange={toggleTermsAccepted}
                      checked={termsAccepted}
                    />
                  </div>
                  <Text
                    color={colors.grey200}
                    weight={500}
                    size='16px'
                    style={{ padding: '1em 0em', textAlign: 'center' }}
                  >
                    I agree to Blockchain.com’s{' '}
                    <Link
                      onClick={acceptTerms}
                      href='https://www.blockchain.com/legal/terms'
                      target='_blank'
                    >
                      Terms of Service
                    </Link>
                  </Text>
                </div>
              )}
              {needsWrap && !canWrap ? (
                <Button disabled rounded nature='dark' fullwidth data-e2e='notEnoughEth'>
                  <Image
                    width='16px'
                    height='16px'
                    name='alert-orange'
                    style={{ marginRight: '0.5em' }}
                  />
                  <FormattedMessage id='copy.not_enough_eth' defaultMessage='Not Enough ETH' />
                </Button>
              ) : (
                <Button
                  jumbo
                  nature='primary'
                  fullwidth
                  data-e2e='makeOfferNft'
                  disabled={disabled}
                  onClick={() =>
                    nftActions.createOffer({
                      amtToWrap: amtToWrap.isGreaterThan(0) ? amtToWrap.toString() : '',
                      asset: val,
                      expirationTime: getUnixTime(
                        addMinutes(new Date(), parseInt(formValues.expirationMinutes))
                      ),
                      offerFees,
                      wrapFees,
                      ...formValues
                    })
                  }
                >
                  {formValues.amount ? (
                    props.orderFlow.isSubmitting ? (
                      <>
                        {props.orderFlow.status &&
                          (props.orderFlow.status === 'WRAP_ETH' ? (
                            <>
                              <SpinningLoader width='14px' height='14px' borderWidth='3px' />
                              <div style={{ paddingLeft: '1em' }}>
                                <FormattedMessage
                                  id='copy.wrap_eth'
                                  defaultMessage='Wrapping Eth...'
                                />
                              </div>
                            </>
                          ) : (
                            <>{props.orderFlow.status}</>
                          ))}
                      </>
                    ) : (
                      <FormattedMessage
                        id='copy.make_offer_value'
                        defaultMessage={
                          !needsWrap ? 'Make an Offer for {val}' : 'Wrap ETH & Make Offer'
                        }
                        values={{
                          val: `${formValues.amount} ${formValues.coin}`
                        }}
                      />
                    )
                  ) : (
                    <FormattedMessage id='copy.make_an_offer' defaultMessage='Make an Offer' />
                  )}
                </Button>
              )}
            </>
          ) : (
            <Link href='https://www.blockchain.com/waitlist/nft' target='_blank'>
              <Button jumbo nature='primary' fullwidth data-e2e='joinWaitlist'>
                <FormattedMessage id='copy.join_waitlist' defaultMessage='Join the Waitlist' />
              </Button>
            </Link>
          )
        ) : (
          <LinkContainer
            to={`/open/${DeepLinkGoal.MAKE_OFFER_NFT}?contract_address=${val.asset_contract.address}&token_id=${val.token_id}`}
          >
            <Button jumbo nature='primary' fullwidth data-e2e='login'>
              <FormattedMessage
                id='copy.login_to_make_offer'
                defaultMessage='Login to Make an Offer'
              />
            </Button>
          </LinkContainer>
        )}
=======
        <MakeOfferFees {...props} asset={asset} needsWrap={needsWrap} />
        <br />
        <MakeOfferCTA
          {...props}
          amtToBuy={amtToBuy}
          asset={asset}
          canWrap={canWrap}
          needsWrap={needsWrap}
          wrapFees={wrapFees}
          offerFees={offerFees}
          selfCustodyBalance={selfCustodyBalance}
          custodialBalance={custodialBalance}
          cryptoAmt={cryptoAmt}
          amtToWrap={amtToWrap}
          standardMaxOfferPossible={standardMaxOfferPossible}
        />
>>>>>>> Stashed changes
      </StickyCTA>
    </>
  )
}

export type NftMakeOfferFormValues = {
  amount: string
  coin: string
  expirationMinutes: string
  fix: string
}

const mapStateToProps = (state) => {
  const formValues = selectors.form.getFormValues('nftMakeOffer')(state) as NftMakeOfferFormValues

  return {
<<<<<<< Updated upstream
    erc20BalanceR: selectors.core.data.eth.getErc20Balance(state, formValues.coin || 'WETH'),
    ethBalancesR: getEthBalances(state),
=======
    erc20BalanceR: selectors.core.data.eth.getErc20Balance(state, formValues?.coin || 'WETH'),
    ethBalancesR: selectors.balances.getCoinBalancesTypeSeparated('ETH')(state),
    formErrors: selectors.form.getFormSyncErrors('nftMakeOffer')(state) as { amount: boolean },
>>>>>>> Stashed changes
    formValues,
    rates: getRatesSelector(formValues.coin || 'WETH', state).getOrElse({} as RatesType),
    walletCurrency: selectors.core.settings.getCurrency(state).getOrElse('USD')
  }
}

const mapDispatchToProps = (dispatch) => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  formActions: bindActionCreators(actions.form, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

const enhance = compose(
  reduxForm<{}, OwnProps>({
    destroyOnUnmount: false,
    form: 'nftMakeOffer',
    initialValues: {
      coin: 'WETH',
      expirationMinutes: 1440,
      fix: 'CRYPTO',
      networkFees: 'network'
    }
  }),
  connector
)

type Props = OwnProps & ConnectedProps<typeof connector>

export default enhance(MakeOffer) as React.FC<OwnProps>
