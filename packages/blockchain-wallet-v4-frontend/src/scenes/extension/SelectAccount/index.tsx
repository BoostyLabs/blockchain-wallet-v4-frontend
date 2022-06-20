import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { IconClose } from '@blockchain-com/icons'
import styled from 'styled-components'

import { CoinType } from '@core/types'
import { Button, Text } from 'blockchain-info-components'
import { getTotalBalance } from 'components/Balances/total/selectors'
import { selectors } from 'data'
import { SWAP_ACCOUNTS_SELECTOR } from 'data/coins/model/swap'
import { getCoinAccounts } from 'data/coins/selectors'
import { SwapBaseCounterTypes } from 'data/components/swap/types'
import { RootState } from 'data/rootReducer'

import { Account } from './Account'

const Wrapper = styled.div`
  height: 552px;
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
  margin: auto auto 0;
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
  const coins = useSelector((state: RootState) => state.dataPath)

  const getWallet = (coin: string) => {
    if (!coins[coin].addresses) {
      return Object.keys(coins[coin].data)[0]
    }
    return Object.keys(coins[coin].addresses.data)[0]
  }

  const getAddressType = (coin: string) => {
    if (!props.accounts) {
      return null
    }
    return props.accounts[coin][0].type
  }

  const {
    data: {
      data: { totalBalance }
    }
  } = props

  const accounts: SwapAccountType[] = [
    new SwapAccountType(
      0,
      'Ethereum',
      'ETH',
      'Ethereum account',
      getAddressType('ETH'),
      0,
      getWallet('eth'),
      false,
      0
    ),
    new SwapAccountType(
      0,
      'Bitcoin',
      'BTC',
      'Bitcoin account',
      getAddressType('BTC'),
      1,
      getWallet('btc'),
      false,
      1
    ),
    new SwapAccountType(
      0,
      'Bitcoin Cash',
      'BCH',
      'Bitcoin Cash account',
      getAddressType('BCH'),
      2,
      getWallet('bch'),
      false,
      2
    ),
    new SwapAccountType(
      0,
      'XLM',
      'XLM',
      'XLM account',
      getAddressType('XLM'),
      3,
      getWallet('xlm'),
      false,
      3
    )
  ]

  return (
    <Wrapper>
      <IconWrapper>
        <IconClose color='#98A1B2' height='24px' width='24px' />
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
  const coins = selectors.components.swap.getCoins()
  const accounts = getCoinAccounts(state, { coins, ...SWAP_ACCOUNTS_SELECTOR })
  return { accounts, data }
}

export default connect(mapStateToProps, null)(SelectAccount)
