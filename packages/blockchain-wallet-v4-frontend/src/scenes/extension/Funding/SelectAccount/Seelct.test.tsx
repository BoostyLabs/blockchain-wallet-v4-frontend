import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { SelectAccount } from '.'

describe('SelectAccount', (): void => {
  it('renders correctly', () => {
    const mockSetState = jest.fn()
    const component = shallow(<SelectAccount setFundingStep={mockSetState} />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
