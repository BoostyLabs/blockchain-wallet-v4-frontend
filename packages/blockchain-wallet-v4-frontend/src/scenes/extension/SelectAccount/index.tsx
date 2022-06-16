import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { IconClose } from '@blockchain-com/icons'
import styled from 'styled-components'

import { CoinType } from '@core/types'
import { Button, Text } from 'blockchain-info-components'
import { getTotalBalance } from 'components/Balances/total/selectors'
import { SwapBaseCounterTypes } from 'data/components/swap/types'
import { RootState } from 'data/rootReducer'

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
const SubHeaderText = styled(Text)`
  margin: 0px 0 36px;
  color: #98a1b2;
`
const HeaderText = styled(Text)`
  margin: 30px 0 12px;
`
const ImportButton = styled(Button)`
  background-color: ${(props) => props.theme.exchangeLogin};
  border: 1px solid #0c6cf2;
  margin-top: 158px;
  color: #0c6cf2;
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

const SelectAccount = (props) => {
  const [activeAccountIndex, setActiveAccountIndex] = useState<number>(0)
  const [copiedWalletAddress, setCopiedWalletAddress] = useState<string | number>('')
  // @ts-ignore
  const address = useSelector((state: RootState) => state.dataPath.eth.addresses.data)

  const {
    data: { totalBalance }
  } = props

  // TODO: Mock accounts data.
  const accounts: SwapAccountType[] = [
    new SwapAccountType(
      totalBalance,
      'Ethereum',
      'ETH',
      'Ethereum account',
      SwapBaseCounterTypes.CUSTODIAL,
      0,
      Object.keys(address)[0],
      false,
      0
    )
  ]

  return (
    <Wrapper>
      <IconWrapper>
        <IconClose color='#ffffff' height='24px' width='24px' />
      </IconWrapper>
      <HeaderText size='20px' color='white' weight={500}>
        Select account
      </HeaderText>
      <SubHeaderText size='14px' weight={500}>
        {`Total Balance ${totalBalance}`}
      </SubHeaderText>
      {accounts.length &&
        accounts.map((account: SwapAccountType) => (
          <Account
            key={account.accountIndex}
            account={account}
            setActiveAccountIndex={setActiveAccountIndex}
            activeAccountIndex={activeAccountIndex}
            setCopiedWalletAddress={setCopiedWalletAddress}
            copiedWalletAddress={copiedWalletAddress}
          />
        ))}
      <ImportButton capitalize data-e2e='s' height='48px' fullwidth size='16px'>
        Add account
      </ImportButton>
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  const data = getTotalBalance(state)
  return data
}

export default connect(mapStateToProps, null)(SelectAccount)
