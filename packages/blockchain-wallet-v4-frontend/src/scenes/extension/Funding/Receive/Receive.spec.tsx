import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Receive } from '.'

describe('Receive', (): void => {
  it('renders correctly', () => {
    const component = shallow(<Receive />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
