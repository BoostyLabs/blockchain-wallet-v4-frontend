import React from 'react'
import Send from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('Send extension scene', (): void => {
  const container = shallow(<Send />)
  const walletAddress = '0x0d7dB08D75679bbE90b7B1eDfB8BE3a16897Ee17'

  it('Send scene renders correctly', (): void => {
    const tree = toJson(container)
    expect(tree).toMatchSnapshot()
  })

  it('should set the wallet address value on change event', (): void => {
    container.find('#sendToWalletAddress').simulate('change', {
      target: {
        value: walletAddress
      }
    })
    expect(container.find('#sendToWalletAddress').prop('value')).toEqual(walletAddress)
  })

  it('recent tab should have active className on click', (): void => {
    container.find('#recentTab').simulate('click')
    expect(container.find('#recentTab').hasClass('active')).toBeTruthy()
  })

  it('my accounts tab should have active className on click', (): void => {
    container.find('#myAccountsTab').simulate('click')
    expect(container.find('#myAccountsTab').hasClass('active')).toBeTruthy()
  })
})
