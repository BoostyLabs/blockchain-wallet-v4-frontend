import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Funding } from '.'

it('renders correctly', () => {
  const component = shallow(<Funding />)
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})
