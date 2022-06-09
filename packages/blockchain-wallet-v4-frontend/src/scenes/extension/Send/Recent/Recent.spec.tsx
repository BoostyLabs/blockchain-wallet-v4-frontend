import React from 'react'
import Recent from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/Recent'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('Recent extension tab', (): void => {
  const container = shallow(<Recent />)
  it('Recent tab renders correctly', (): void => {
    const tree = toJson(container)
    expect(tree).toMatchSnapshot()
  })
})
