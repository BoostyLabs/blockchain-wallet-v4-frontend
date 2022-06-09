import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { IconCheckCircle, IconClose } from '@blockchain-com/icons'
import MyAccounts from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/MyAccounts'
import Recent from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/Recent'
import Tooltip from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/Tooltip'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  padding: 27px 24px;
  height: 100%;
  background: #0e121b;
`

const IconCloseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`
const IconCheckCircleWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 30px;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  .checked {
    background: #20242c;
  }
`

export const WalletsWrapper = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const Input = styled.input`
  margin: 17px auto;
  padding-left: 16px;
  height: 45px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #619ff7;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #677184;
  background: none;
  outline: none;
`

const Tabs = styled.div`
  margin-top: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
  .active {
    background: #2c3038;
  }
`

const Tab = styled.button`
  font-size: 14px;
  line-height: 22px;
  color: white;
  height: 27px;
  border-radius: 8px;
  padding: 3px 10px;
  background: none;
  border: none;
  cursor: pointer;
`

enum SendTabs {
  myAccounts = 'My accounts',
  recent = 'Recent'
}

const Send = () => {
  const [activeTab, setActiveTab] = useState<SendTabs | null>(null)

  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isWalletValid, setIsWalletValid] = useState<boolean>(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  // changes and validates wallet address
  const changeWalletAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const walletPattern = /[a-z0-9]{42}/i
    setWalletAddress(e.target.value)
    if (!walletPattern.test(e.target.value)) {
      setIsTooltipVisible(true)
      return
    }
    setIsWalletValid(true)
    setIsTooltipVisible(false)
  }

  // changes active tab.
  const changeActiveTab = (activeTab: SendTabs) => {
    setActiveTab(activeTab)
  }

  // Returns active tab className
  const getActiveTabClassName: (tab: string) => string = (tab: string) =>
    tab === activeTab ? 'active' : ''

  return (
    <Wrapper>
      <IconCloseWrapper>
        <IconClose height='24px' width='24px' color='white' cursor='pointer' />
      </IconCloseWrapper>
      <Text size='20px' lineHeight='30px' color='white' weight={500}>
        Send to
      </Text>
      <InputWrapper>
        <Input
          placeholder='|Search, public address (0x), or ENS '
          value={walletAddress}
          onChange={changeWalletAddress}
          className={isWalletValid ? 'checked' : ''}
          id='sendToWalletAddress'
        />
        {isWalletValid && (
          <IconCheckCircleWrapper id='walletAddressChecked'>
            <IconCheckCircle color='#65A5FF' height='24px' width='24px' />
          </IconCheckCircleWrapper>
        )}
        {isTooltipVisible && <Tooltip />}
      </InputWrapper>
      <Tabs>
        <Link to='/extension/send/recent'>
          <Tab
            id='recentTab'
            className={getActiveTabClassName(SendTabs.recent)}
            onClick={() => changeActiveTab(SendTabs.recent)}
          >
            {SendTabs.recent}
          </Tab>
        </Link>
        <Link to='/extension/send/my-accounts'>
          <Tab
            id='myAccountsTab'
            className={getActiveTabClassName(SendTabs.myAccounts)}
            onClick={() => changeActiveTab(SendTabs.myAccounts)}
          >
            {SendTabs.myAccounts}
          </Tab>
        </Link>
      </Tabs>
      <Switch>
        <Route path='/extension/send/recent' component={Recent} />
        <Route path='/extension/send/my-accounts' component={MyAccounts} />
      </Switch>
    </Wrapper>
  )
}

export default Send
