import React, { MouseEvent } from 'react'
import { IconCheckCircle, IconCopy } from '@blockchain-com/icons'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

import IconBitcoin from '../../../../icons/IconBitcoin'
import IconEthereum from '../../../../icons/IconEthereum'
import { SwapAccountType } from '..'

export const AccountBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  cursor: pointer;
`
const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto auto 16px;
`
const WalletBlock = styled.div`
  display: flex;
  align-items: center;
  cursor: copy;
`
type AccountProps = {
  account: SwapAccountType
  activeAccountIndex: number
  setActiveAccountIndex: (activeAccountIndex: number) => void
}

const Account: React.FC<AccountProps> = ({
  account,
  activeAccountIndex,
  setActiveAccountIndex
}) => {
  const copyAddress = (event: MouseEvent<HTMLDivElement>, address: string | number): void => {
    event.stopPropagation()
    navigator.clipboard.writeText(address.toString())
    // TODO: Some notification about copy address.
  }

  const shortingAddress = (address: string | number): string => {
    const addressString: string = address.toString()
    return `${addressString.slice(0, 4)}...${addressString.slice(-4)}`
  }

  return (
    <AccountBlock
      key={account.accountIndex}
      onClick={() => setActiveAccountIndex(account.accountIndex)}
      className='account'
    >
      {account.coin === 'ETH' ? <IconEthereum /> : <IconBitcoin />}
      <AccountInfo>
        <Text size='12px' weight={500} style={{ color: '#98A1B2', lineHeight: '150%' }}>
          {account.label}
        </Text>
        <WalletBlock
          onClick={(event: MouseEvent<HTMLDivElement>) => copyAddress(event, account.address)}
          className='wallet-address'
        >
          <Text size='14px' color='white' weight={500} style={{ lineHeight: '150%' }}>
            {shortingAddress(account.address)}
          </Text>
          <IconCopy color='#ffffff' height='12px' width='12px' style={{ paddingLeft: '5px' }} />
        </WalletBlock>
        <Text size='14px' color='white' weight={500} style={{ lineHeight: '150%' }}>
          {account.balance} {account.coin}
        </Text>
        <Text size='12px' weight={500} style={{ color: '#98A1B2', lineHeight: '150%' }}>
          $5,225.01
        </Text>
      </AccountInfo>
      {activeAccountIndex === account.accountIndex && (
        <IconCheckCircle height='24px' width='24px' style={{ fill: '#65A5FF' }} />
      )}
    </AccountBlock>
  )
}

export default Account
