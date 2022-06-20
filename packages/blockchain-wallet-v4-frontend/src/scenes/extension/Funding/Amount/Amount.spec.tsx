import React from 'react'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureMockStore from 'redux-mock-store'

import Amount from '.'

const mockStore = configureMockStore()
const store = mockStore({ rate: { data: { price: 1000 } } })

describe('Amount', (): void => {
  const component = shallow(
    <Provider store={store}>
      <Amount />
    </Provider>
  )

  const tree = toJson(component)

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot()
  })

  // it('corrent input value', () => {
  //   const amount = '12.3456'
  //   component.find('#amountInput').simulate('change', {
  //     target: {
  //       value: amount
  //     }
  //   })
  //   expect(component.find('#amountInput').prop('value')).toEqual(amount)
  // })

  // it('corrent exchanged value', () => {
  //   const amount = '10'
  //   const exchangeRate = 2400
  //   component.find('#amountInput').simulate('change', {
  //     target: {
  //       value: amount
  //     }
  //   })

  //   expect(Number(amount) / exchangeRate).toEqual(
  //     parseFloat(component.find('#exchangedAmount').text())
  //   )
  // })
})
