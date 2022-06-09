import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Success } from '.'

describe('Success', (): void => {
  it('renders correctly', () => {
    const component = shallow(<Success />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
