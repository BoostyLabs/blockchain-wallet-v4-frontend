import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { SelectAccount } from '.'

describe('SelectAccount', (): void => {
  it('renders correctly', () => {
    const component = shallow(<SelectAccount />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
