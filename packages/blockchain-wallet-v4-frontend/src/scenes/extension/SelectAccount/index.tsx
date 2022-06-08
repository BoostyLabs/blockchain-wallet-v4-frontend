import React, { useState } from 'react'
import { IconClose } from '@blockchain-com/icons'
import styled from 'styled-components'

import { CoinType } from '@core/types'
import { Button, Text } from 'blockchain-info-components'
import { SwapBaseCounterTypes } from 'data/components/swap/types'

import { Account } from './Account'

const Wrapper = styled.div`
  padding: 27px 24px;
  background: ${(props) => props.theme.exchangeLogin};
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`
// TODO: Mock SwapAccount entity.
export class SwapAccountType {
  // eslint-disable-next-line no-useless-constructor
  public constructor(
    public balance: number | string = '',
    public baseCoin: string,
    public coin: CoinType,
    public label: string,
    public type: SwapBaseCounterTypes,
    public accountIndex: number,
    public address: number | string,
    public archived?: boolean,
    public index?: number
  ) {}
}

const SelectAccount = () => {
  const [activeAccountIndex, setActiveAccountIndex] = useState<number>(0)
  // TODO: Mock accounts data.
  const accounts: SwapAccountType[] = [
    new SwapAccountType(
      '5.20018653',
      'Ethereum',
      'ETH',
      'Ethereum account',
      SwapBaseCounterTypes.CUSTODIAL,
      0,
      '0xb0106c26a6CfbAFB372e317f1a535304F69D3968',
      false,
      0
    ),
    new SwapAccountType(
      '0.20018653',
      'Bitcoin',
      'BTC',
      'Bitcoin account',
      SwapBaseCounterTypes.CUSTODIAL,
      1,
      '0xb0106c26a6CfbAFB372e317f1a535304F69D3968',
      false,
      0
    )
  ]

  return (
    <Wrapper>
      <IconWrapper>
        <IconClose color='#ffffff' height='24px' width='24px' />
      </IconWrapper>
      <Text
        size='20px'
        style={{ marginBottom: '36px', marginTop: '30px' }}
        color='white'
        weight={500}
      >
        Select account
      </Text>
      {accounts.length &&
        accounts.map((account: SwapAccountType) => (
          <Account
            key={account.accountIndex}
            account={account}
            setActiveAccountIndex={setActiveAccountIndex}
            activeAccountIndex={activeAccountIndex}
          />
        ))}
      <Button
        capitalize
        data-e2e='s'
        color='#0E121B'
        height='48px'
        fullwidth
        size='16px'
        style={{ backgroundColor: '#65A5FF', border: 'none', marginTop: '158px' }}
      >
        Import account
      </Button>
    </Wrapper>
  )
}

export default SelectAccount
