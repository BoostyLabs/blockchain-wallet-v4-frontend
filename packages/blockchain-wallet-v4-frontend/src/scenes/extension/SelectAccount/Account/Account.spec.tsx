import React from 'react'
import { IconCheckCircle } from '@blockchain-com/icons'
import { shallow } from 'enzyme'

import { SwapBaseCounterTypes } from 'data/components/swap/types'

import Account, { AccountBlock } from '.'

describe('Account', () => {
  const account = {
    accountIndex: 0,
    address: '0xb0106c26a6CfbAFB372e317f1a535304F69D3968',
    archived: false,
    balance: '5.02',
    baseCoin: 'Ethereum',
    coin: 'ETH',
    index: 0,
    label: 'Ethereum account',
    type: SwapBaseCounterTypes.CUSTODIAL
  }
  const activeAccountIndex = 1
  const setActiveAccountIndex = jest.fn()

  const accountComponent = shallow(
    <Account
      account={account}
      activeAccountIndex={activeAccountIndex}
      setActiveAccountIndex={setActiveAccountIndex}
    />
  )
  it('Should display the one account block', () => {
    expect(accountComponent.find(AccountBlock)).toHaveLength(1)
  })

  it('Should display the copy address button', () => {
    const onCopyAddressButton = accountComponent.find('.wallet-address')

    expect(onCopyAddressButton).toHaveLength(1)
  })

  it('Should copy wallet address after click', () => {
    const onCopyAddressButton = accountComponent.find('.wallet-address')

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve())
      }
    })

    onCopyAddressButton.simulate('click', {
      stopPropagation: () => {},
      writeText: window.navigator.clipboard.writeText('address')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('address')
    expect(accountComponent).toMatchSnapshot()
  })

  it('Should display the icon of the selected account', () => {
    accountComponent.find('.account').simulate('click')
    expect(accountComponent.find(IconCheckCircle)).toBeTruthy()
  })
})
