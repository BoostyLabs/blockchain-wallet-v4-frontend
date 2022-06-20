import React from 'react'
import { connect, ConnectedProps, Provider } from 'react-redux'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureMockStore from 'redux-mock-store'

import SelectAccount from '.'

const mockStore = configureMockStore()
const store = mockStore({})

describe('SelectAccount', (): void => {
  it('renders correctly', () => {
    const component = shallow(
      <Provider store={store}>
        <SelectAccount />
      </Provider>
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
