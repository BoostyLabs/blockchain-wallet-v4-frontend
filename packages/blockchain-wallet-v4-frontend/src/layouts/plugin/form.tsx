import React, { useEffect } from 'react'
import { getSessionPayload } from 'plugin/internal/chromeStorage'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { LOGIN_FORM } from 'data/auth/model'
import { LoginSteps } from 'data/auth/types'
import { selectors, actions } from 'data'
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect, ConnectedProps } from 'react-redux'

const Form: React.FC<Props> = (props) => {
  const { formActions, authActions, cache } = props

  const setStep = (step: LoginSteps) => {
    formActions.change(LOGIN_FORM, 'step', step)
  }

  useEffect(() => {
    (async () => {
      authActions.initializeLogin()
      setStep(LoginSteps.ENTER_PASSWORD_WALLET)
      const { guidStored, lastEmail, lastGuid } = cache
      console.log('cashe: ', cache)
      const wrapper = await getSessionPayload()
      const password = wrapper.password
      console.log('password: ', password)
      if (!password) return
      if (guidStored || lastGuid) {
        console.log('guidStored || lastGuid')
        formActions.change(LOGIN_FORM, 'guid', wrapper.wallet.guid)
        formActions.change(LOGIN_FORM, 'email', wrapper.wallet.email)
        formActions.change(LOGIN_FORM, 'step', LoginSteps.ENTER_PASSWORD_WALLET)
        formActions.change(LOGIN_FORM, 'password', password)
      }
      console.log('continue login process')
      authActions.continueLoginProcess()
      console.log('finished')
    })()
  }, [])

  return <div />
}

const mapStateToProps = (state) => ({
  cache: selectors.cache.getCache(state),
  isCoinDataLoaded: selectors.core.data.coins.getIsCoinDataLoaded(state)
})

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(actions.auth, dispatch),
  cacheActions: bindActionCreators(actions.cache, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  routerActions: bindActionCreators(actions.router, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

const enhance = compose(reduxForm<{}, Props>({ form: LOGIN_FORM }), connector)

export default enhance(Form) as React.ComponentClass