import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Amount } from '.'

describe('Amount', (): void => {
  it('renders correctly', () => {
    const component = shallow(<Amount />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
