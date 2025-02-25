import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { Icon } from '@blockchain-com/constellation'
import { IconArrowUpRight, IconDownload } from '@blockchain-com/icons'
import styled from 'styled-components'

import { IconButton, SkeletonRectangle, Text } from 'blockchain-info-components'
import { Flex } from 'components/Flex'
import { selectors } from 'data'

const BalanceWrapper = styled.div`
  margin-top: 70px;
  height: 207px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconButtonStyled = styled(IconButton)`
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.white};
  border-color: ${(p) => p.theme.white};

  svg {
    fill: ${(props) => props.theme.exchangeLogin};
  }

  span {
    margin-right: 0 !important;
  }
`

const ButtonWrapper = styled.div`
  text-align: center;

  & > *:first-child {
    margin-bottom: 5px;
  }
`

const Balance = (props) => {
  const data = useSelector(selectors.balances.getTotalWalletBalance)
  const balance = data.cata({
    Failure: () => (
      <Text weight={700} size='24px' color='grey200'>
        <FormattedMessage
          id='plugin.coinslist.failed.balance'
          defaultMessage='Failed to get total balance'
        />
      </Text>
    ),
    Loading: () => <SkeletonRectangle width='120px' height='25px' />,
    NotAsked: () => <SkeletonRectangle width='120px' height='25px' />,
    Success: (val) => <>{val.totalBalance}</>
  })

  const goToSendScene = () => {
    props.history.push('/plugin/send')
  }

  const goToReceiveScene = () => {
    props.history.push('/plugin/funding')
  }

  const selectedAccount = useSelector((state) => selectors.cache.getCache(state).selectedAccount)
  const activeAccountCoin = selectedAccount && selectedAccount[0].baseCoin

  return (
    <BalanceWrapper data-testid='coinview-header'>
      <Text style={{ margin: '20px 0' }} color='white' size='40px' weight={500}>
        {balance}
      </Text>
      <Flex justifyContent='center' gap={24}>
        <ButtonWrapper onClick={goToReceiveScene}>
          <IconButtonStyled
            padding='0'
            name='receive'
            rounded
            width='40px'
            height='40px'
            data-e2e='coinview-header-receive-btn'
          >
            <Icon label=''>
              <IconDownload />
            </Icon>
          </IconButtonStyled>
          <Text color='white' size='10px' weight={500}>
            <FormattedMessage id='scenes.exchange.exchangeform.to' defaultMessage='Receive' />
          </Text>
        </ButtonWrapper>
        {activeAccountCoin === 'ETH' ? (
          <ButtonWrapper onClick={goToSendScene}>
            <IconButtonStyled
              padding='0'
              name='IconArrowUpRight'
              rounded
              width='40px'
              height='40px'
              data-e2e='coinview-header-send-btn'
            >
              <Icon label='IconArrowUpRight'>
                <IconArrowUpRight />
              </Icon>
            </IconButtonStyled>
            <Text color='white' size='10px' weight={500}>
              <FormattedMessage
                id='plugin.activity.transactionDetails.send'
                defaultMessage='Send'
              />
            </Text>
          </ButtonWrapper>
        ) : null}
      </Flex>
    </BalanceWrapper>
  )
}

export default Balance
