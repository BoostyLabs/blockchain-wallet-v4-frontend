import React from 'react'
import { IconClose } from '@blockchain-com/icons'
import { shallow } from 'enzyme'

import SelectAccount from '.'
import Account from './Account'

describe('SelectAccount', () => {
  const selectAccount = shallow(<SelectAccount />)
  it('renders correctly', (): void => {
    expect(selectAccount).toMatchSnapshot()
  })

  it('Should display the "Select account" title', () => {
    expect(selectAccount.contains('Select account')).toBe(true)
  })

  it('Should display the "Import account" button', () => {
    expect(selectAccount.contains('Import account')).toBe(true)
  })

  it('Should display the one Close icon', () => {
    expect(selectAccount.find(IconClose)).toHaveLength(1)
  })

  it('Should display the account block', () => {
    expect(selectAccount.find(Account)).toBeTruthy()
  })
})
