import React, { Suspense, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { connect, ConnectedProps, Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { AbstractPlugin } from 'plugin/internal'
import { Store } from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createClient, Provider as UrqlProvider } from 'urql'

import { WalletOptionsType } from '@core/types'
import { NabuErrorDeepLinkHandler } from 'components/NabuErrorDeepLinkHandler'
import SiftScience from 'components/SiftScience'
import { selectors } from 'data'
import { UserDataType } from 'data/types'
import { useDefer3rdPartyScript } from 'hooks'
import AuthLayout from 'layouts/Auth'
import AuthLoading from 'layouts/Auth/template.loading'
import NftsLayout from 'layouts/Nfts'
import PluginLayout from 'layouts/plugin/PluginLayout'
import WalletLayout from 'layouts/Wallet'
import WalletLoading from 'layouts/Wallet/template.loading'
import { UTM } from 'middleware/analyticsMiddleware/constants'
import { utmParser } from 'middleware/analyticsMiddleware/utils'
import { MediaContextProvider } from 'providers/MatchMediaProvider'
import ThemeProvider from 'providers/ThemeProvider'
import TranslationsProvider from 'providers/TranslationsProvider'
import { getTracking } from 'services/tracking'

import Activity from './plugin/Activity'
import BackupSeedPhrase from './plugin/BackupSeedPhrase'
import CoinsList from './plugin/CoinsList'
import CoinsListHeader from './plugin/CoinsList/Header'
import { ConnectDapp } from './plugin/ConnectDapp'
import Funding from './plugin/Funding'
import HomeNavbar from './plugin/HomeNavbar'
import Nft from './plugin/Nft'
import RPCMethodsLayout from './plugin/RPCMethodsLayout'
import Send from './plugin/Send'
import SendTransaction from './plugin/SendTransaction'
import Settings from './plugin/Settings'
import SignatureRequest from './plugin/SignatureRequest'
import SignTransaction from './plugin/SignTransaction'

const queryClient = new QueryClient()

// PUBLIC
const AppError = React.lazy(() => import('./AppError'))
const AuthorizeLogin = React.lazy(() => import('./AuthorizeLogin'))
const Help = React.lazy(() => import('./Help'))
const HelpExchange = React.lazy(() => import('./HelpExchange'))
const Login = React.lazy(() => import('./Login'))
const Logout = React.lazy(() => import('./Logout'))
const MobileLogin = React.lazy(() => import('./MobileLogin'))
const ProductPicker = React.lazy(() => import('./Signup/ProductPicker'))
const RecoverWallet = React.lazy(() => import('./RecoverWallet'))
const Signup = React.lazy(() => import('./Signup'))
const ResetWallet2fa = React.lazy(() => import('./ResetWallet2fa'))
const ResetWallet2faToken = React.lazy(() => import('./ResetWallet2faToken'))
const UploadDocuments = React.lazy(() => import('./UploadDocuments'))
const UploadDocumentsSuccess = React.lazy(() => import('./UploadDocuments/Success'))
const VerifyEmailToken = React.lazy(() => import('./VerifyEmailToken'))
const VerifyEmail = React.lazy(() => import('./VerifyEmail'))

// NFT EXPLORER (mixed)
const NftsHome = React.lazy(() => import('./Nfts/Home'))
const NftsFirehose = React.lazy(() => import('./Nfts/Firehose'))
const NftsCollection = React.lazy(() => import('./Nfts/Collection/Collection'))
const NftsAsset = React.lazy(() => import('./Nfts/Asset'))
const NftsAddress = React.lazy(() => import('./Nfts/Address/Address'))
const NftsSettings = React.lazy(() => import('./Nfts/Settings'))

// WALLET
const Addresses = React.lazy(() => import('./Settings/Addresses'))
const Airdrops = React.lazy(() => import('./Airdrops'))
const CoinPage = React.lazy(() => import('./CoinPage/components/CoinPage'))
const General = React.lazy(() => import('./Settings/General'))
const Home = React.lazy(() => import('./Home'))
const Interest = React.lazy(() => import('./Interest'))
const InterestHistory = React.lazy(() => import('./InterestHistory'))
const Preferences = React.lazy(() => import('./Settings/Preferences'))
const Prices = React.lazy(() => import('./Prices'))
const SecurityCenter = React.lazy(() => import('./SecurityCenter'))
const TaxCenter = React.lazy(() => import('./TaxCenter'))
const TheExchange = React.lazy(() => import('./TheExchange'))
const Transactions = React.lazy(() => import('./Transactions'))
const DebitCard = React.lazy(() => import('./DebitCard'))
const { isPlugin } = AbstractPlugin

const BLOCKCHAIN_TITLE = 'Blockchain.com'

const App = ({
  apiUrl,
  coinViewV2,
  history,
  isAuthenticated,
  nftExplorer,
  persistor,
  store,
  userData,
  walletDebitCardEnabled
}: Props) => {
  const Loading = isAuthenticated ? WalletLoading : AuthLoading

  // parse and log UTMs
  useEffect(() => {
    const utm = utmParser()
    sessionStorage.setItem(UTM, JSON.stringify(utm))
    getTracking({ url: apiUrl })
  }, [apiUrl])

  // lazy load google tag manager
  useDefer3rdPartyScript('https://www.googletagmanager.com/gtm.js?id=GTM-KK99TPJ', {
    attributes: {
      nonce: window.nonce
    }
  })

  const client = createClient({
    url: `${apiUrl}/nft-market-api/graphql/`
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NabuErrorDeepLinkHandler>
          <ThemeProvider>
            <TranslationsProvider>
              <PersistGate loading={<Loading />} persistor={persistor}>
                <MediaContextProvider>
                  <UrqlProvider value={client}>
                    <ConnectedRouter history={history}>
                      <Suspense fallback={<Loading />}>
                        <Switch>
                          {/* Unauthenticated Wallet routes */}
                          <Route path='/app-error' component={AppError} />
                          {/* Plugin routes */}
                          <AuthLayout
                            path='/signup'
                            component={Signup}
                            pageTitle={`${BLOCKCHAIN_TITLE} | Sign up`}
                          />
                          <AuthLayout
                            path='/login'
                            component={Login}
                            pageTitle={`${BLOCKCHAIN_TITLE} | Login`}
                          />
                          {isPlugin() ? (
                            <Switch>
                              <BackupSeedPhrase
                                path='/plugin/backup-seed-phrase'
                                component={BackupSeedPhrase}
                              />
                              <PluginLayout
                                path='/plugin/coinslist'
                                header={<CoinsListHeader />}
                                footer={<HomeNavbar />}
                                component={CoinsList}
                              />
                              <RPCMethodsLayout
                                path='/plugin/sign-transaction'
                                component={SignTransaction}
                              />
                              <PluginLayout
                                path='/plugin/activity'
                                header={<CoinsListHeader />}
                                footer={<HomeNavbar />}
                                component={Activity}
                              />
                              <PluginLayout path='/plugin/funding' component={Funding} />
                              <PluginLayout path='/plugin/settings' component={Settings} />
                              <PluginLayout
                                path='/plugin/nft'
                                header={<CoinsListHeader />}
                                footer={<HomeNavbar />}
                                component={Nft}
                              />
                              <PluginLayout path='/plugin/send' component={Send} />
                              <RPCMethodsLayout
                                path='/plugin/connect-dapp'
                                component={ConnectDapp}
                              />
                              <RPCMethodsLayout
                                path='/plugin/send-transaction'
                                component={SendTransaction}
                              />
                              <RPCMethodsLayout
                                path='/plugin/signature-request'
                                component={SignatureRequest}
                              />
                              <Redirect to='/plugin/coinslist' />
                            </Switch>
                          ) : (
                            <Switch>
                              <AuthLayout path='/authorize-approve' component={AuthorizeLogin} />
                              <AuthLayout
                                path='/help'
                                component={Help}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Help`}
                              />
                              <AuthLayout
                                path='/help-exchange'
                                component={HelpExchange}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Help`}
                              />
                              <AuthLayout path='/logout' component={Logout} />
                              <AuthLayout
                                path='/select-product'
                                component={ProductPicker}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Product Select`}
                              />
                              <AuthLayout
                                path='/mobile-login'
                                component={MobileLogin}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Login`}
                              />
                              <AuthLayout
                                path='/recover'
                                component={RecoverWallet}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Recover`}
                              />
                              <AuthLayout
                                path='/reset-2fa'
                                component={ResetWallet2fa}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Reset 2FA`}
                              />
                              <AuthLayout
                                path='/reset-two-factor'
                                component={ResetWallet2faToken}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Reset 2FA`}
                              />
                              <AuthLayout
                                path='/verify-email'
                                component={VerifyEmailToken}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Verify Email`}
                              />
                              <AuthLayout
                                path='/upload-document/success'
                                component={UploadDocumentsSuccess}
                                exact
                              />
                              <AuthLayout
                                path='/upload-document/:token'
                                component={UploadDocuments}
                              />
                              <AuthLayout
                                path='/wallet'
                                component={Login}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Login`}
                              />
                              <AuthLayout
                                path='/verify-email-step'
                                component={VerifyEmail}
                                pageTitle={`${BLOCKCHAIN_TITLE} | Verify Email`}
                              />
                              {/* NFT Explorer routes */}
                              {nftExplorer && (
                                <NftsLayout
                                  path='/nfts/address/:address'
                                  exact
                                  component={NftsAddress}
                                />
                              )}
                              {nftExplorer && (
                                <NftsLayout
                                  path='/nfts/address/settings/:address'
                                  exact
                                  component={NftsSettings}
                                />
                              )}
                              {nftExplorer && (
                                <NftsLayout
                                  path='/nfts/assets/:contract/:id'
                                  exact
                                  component={NftsAsset}
                                />
                              )}
                              {nftExplorer && (
                                <NftsLayout
                                  path='/nfts/collection/:slug'
                                  exact
                                  component={NftsCollection}
                                />
                              )}
                              <Route exact path='/nfts'>
                                <Redirect to='/nfts/home' />
                              </Route>
                              {nftExplorer && (
                                <NftsLayout
                                  path='/nfts/home'
                                  exact
                                  component={NftsHome}
                                  pageTitle={`${BLOCKCHAIN_TITLE} | NFT Explorer`}
                                />
                              )}
                              {nftExplorer && (
                                <NftsLayout
                                  path='/nfts/explore'
                                  exact
                                  component={NftsFirehose}
                                  pageTitle={`${BLOCKCHAIN_TITLE} | NFT Explorer`}
                                />
                              )}

                              {/* Authenticated Wallet routes */}
                              {walletDebitCardEnabled && (
                                <WalletLayout path='/debit-card' component={DebitCard} />
                              )}
                              <WalletLayout path='/airdrops' component={Airdrops} />
                              <WalletLayout path='/exchange' component={TheExchange} />
                              <WalletLayout path='/home' component={Home} />
                              <WalletLayout path='/rewards' component={Interest} exact />
                              <WalletLayout path='/rewards/history' component={InterestHistory} />
                              <WalletLayout path='/security-center' component={SecurityCenter} />
                              <WalletLayout path='/settings/addresses' component={Addresses} />
                              <WalletLayout path='/settings/general' component={General} />
                              <WalletLayout path='/settings/preferences' component={Preferences} />
                              <WalletLayout path='/prices' component={Prices} />
                              <WalletLayout path='/tax-center' component={TaxCenter} />
                              <WalletLayout
                                path='/coins/:coin'
                                component={coinViewV2 ? CoinPage : Transactions}
                                hideMenu={coinViewV2}
                                center={coinViewV2}
                              />
                              {isAuthenticated ? <Redirect to='/home' /> : <Redirect to='/login' />}
                            </Switch>
                          )}
                        </Switch>
                      </Suspense>
                    </ConnectedRouter>
                    <SiftScience userId={userData.id} />
                  </UrqlProvider>
                </MediaContextProvider>
              </PersistGate>
            </TranslationsProvider>
          </ThemeProvider>
        </NabuErrorDeepLinkHandler>
      </Provider>
    </QueryClientProvider>
  )
}

const mapStateToProps = (state) => ({
  apiUrl: selectors.core.walletOptions.getDomains(state).getOrElse({
    api: 'https://api.blockchain.info'
  } as WalletOptionsType['domains']).api,
  coinViewV2: selectors.core.walletOptions.getCoinViewV2(state).getOrElse(false) as boolean,
  isAuthenticated: selectors.auth.isAuthenticated(state) as boolean,
  isCoinDataLoaded: selectors.core.data.coins.getIsCoinDataLoaded(state),
  nftExplorer: selectors.core.walletOptions.getNftExplorer(state).getOrElse(false) as boolean,
  userData: selectors.modules.profile.getUserData(state).getOrElse({} as UserDataType),
  walletDebitCardEnabled: selectors.core.walletOptions
    .getWalletDebitCardEnabled(state)
    .getOrElse(false)
})

const connector = connect(mapStateToProps)

type Props = {
  history: History
  persistor
  store: Store
} & ConnectedProps<typeof connector>

export default connector(App)
