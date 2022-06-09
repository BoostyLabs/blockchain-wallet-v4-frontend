import React from 'react'
import WalletItem from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/WalletItem'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('WalletItem component', (): void => {
  it('Wallet item component renders correctly', (): void => {
    const walletAddress = '0x0d7dB08D75679bbE90b7B1eDfB8BE3a16897Ee17'
    const component = shallow(<WalletItem walletAddress={walletAddress} />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
