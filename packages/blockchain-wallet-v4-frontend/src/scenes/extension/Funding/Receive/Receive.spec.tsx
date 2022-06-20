import React from 'react'
import { connect, ConnectedProps, Provider } from 'react-redux'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureMockStore from 'redux-mock-store'

import { Receive } from '.'

const mockStore = configureMockStore()
const store = mockStore({})

describe('Receive', (): void => {
  it('renders correctly', () => {
    const component = shallow(
      <Provider store={store}>
        <Receive />
      </Provider>
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
