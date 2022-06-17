import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ChromePlugin } from 'plugin/internal'
import styled from 'styled-components'

import { selectors } from 'data'

import HomeRoutes from './HomeRoutes'

export const extensionHeight = 600
export const extensionWidth = 800

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const InnerWrapper = styled.div`
  width: ${() => `${extensionWidth}px`};
  height: ${() => `${extensionHeight}px`};
`

const ExtensionRoutes = (props) => {
  if (!ChromePlugin.isPlugin()) {
    return <Redirect to='/home' />
  }

  if (!props.isAuthenticated) {
    return <Redirect to={{ pathname: '/login', state: { from: '' } }} />
  }

  const { path } = props.match
  return (
    <Wrapper>
      <InnerWrapper>
        <Switch>
          <Route path={`${path}`} component={HomeRoutes} />
        </Switch>
      </InnerWrapper>
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.auth.isAuthenticated(state)
})

export default connect(mapStateToProps, null)(ExtensionRoutes)
