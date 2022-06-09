import React from 'react'
import MyAccounts from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/MyAccounts'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('My accounts extension tab', (): void => {
  const container = shallow(<MyAccounts />)
  it('My accounts tab renders correctly', (): void => {
    const tree = toJson(container)
    expect(tree).toMatchSnapshot()
  })
})
