import { takeLatest } from 'redux-saga/effects'

import sagas from './sagas'
import { actions } from './slice'

export default ({ api, coreSagas, networks }) => {
  const pluginLoginSaga = sagas({ api, coreSagas, networks })

  return function* pluginAutoAuthSaga() {
    yield takeLatest(actions.autoLogin, pluginLoginSaga.autoLogin)
  }
}
