import React, { ComponentType, useEffect, useState } from 'react'
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  getSessionPayload,
  isSessionActive,
  setSelectedAddress
} from 'plugin/internal/chromeStorage'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  position: relative;
  background: ${(props) => props.theme.black};
  width: 360px;
  height: 600px;
`

const Header = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${(props) => props.theme.black};
  top: 0;
  width: 100%;
  padding: 20px;
`

const Content = styled.div`
  padding: 24px;
  box-sizing: border-box;
  height: 100%;
`

const Footer = styled.div`
  position: absolute;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.black};
  bottom: 0;
  width: 100%;
`

const ethOnlyPaths = ['/plugin/activity', '/plugin/nft']

const PluginLayout = (props: Props) => {
  const { component: Component, exact = false, footer, header, path, routerActions } = props

  const [isLoading, setLoading] = useState(true)

  const dispatch = useDispatch()

  const isAuthenticated = useSelector(
    (state: RootState) => selectors.auth.isAuthenticated(state) as boolean
  )

  console.log('0')

  const isCoinDataLoaded = useSelector((state) =>
    selectors.core.data.coins.getIsCoinDataLoaded(state)
  )

  console.log('isReady', isCoinDataLoaded)

  if (!isCoinDataLoaded) return <></>

  useEffect(() => {
    console.log('1')
    console.log('window.coins', window.coins)
    console.log('isAuthenticated', isAuthenticated)
    if (isAuthenticated) {
      setLoading(false)
      return
    }

    ;(async function () {
      const wrapper = await getSessionPayload()
      dispatch(actions.core.wallet.setWrapper(wrapper))
    })()
    ;(async () => {
      const isPluginAuthenticated = await isSessionActive()
      if (!isPluginAuthenticated) {
        await chrome.tabs.create({ url: chrome.runtime.getURL('index-tab.html#/login') })
        window.close()
      } else {
        if (
          window.location.pathname !== '/plugin/coinslist' &&
          window.location.pathname !== '/plugin/backup-seed-phrase'
        ) {
          routerActions.push('/plugin/coinslist')
        }
        dispatch(actions.pluginAuth.autoLogin())
        setLoading(false)
      }
    })()
  }, [dispatch, isAuthenticated, routerActions])

  console.log('2')

  if (isLoading) return <></>

  console.log('3')

  const selectedAccount = useSelector((state) => selectors.cache.getCache(state).selectedAccount)
  const walletAddress = useSelector((state) =>
    selectors.core.kvStore.eth.getDefaultAddress(state).getOrElse('')
  )
  const isEthAccountSelected =
    selectedAccount && selectedAccount[0] && selectedAccount[0].baseCoin === 'ETH'

  useEffect(() => {
    if (!walletAddress) return
    setSelectedAddress(walletAddress)
  }, [walletAddress])

  if (!isEthAccountSelected && ethOnlyPaths.includes(path)) {
    routerActions.push('/plugin/coinslist')
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={(matchProps) => (
        <MainWrapper>
          <Wrapper id='plugin-wrapper'>
            {header && <Header>{header}</Header>}
            <Content>
              <Component {...matchProps} />
            </Content>
            {footer && <Footer>{footer}</Footer>}
          </Wrapper>
        </MainWrapper>
      )}
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  routerActions: bindActionCreators(actions.router, dispatch)
})

const connector = connect(null, mapDispatchToProps)

type Props = ConnectedProps<typeof connector> & {
  component: ComponentType<any>
  exact?: boolean
  footer?: JSX.Element
  header?: JSX.Element
  pageTitle?: string
  path: string
}

export default connector(PluginLayout)
