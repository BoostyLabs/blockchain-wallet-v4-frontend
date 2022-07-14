import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Icon, Text } from 'blockchain-info-components'
import { Flex } from 'components/Flex'

import { SettingsList } from '../Overal'

const NetworkHeading = styled(Text)`
  font-size: 20px;
  margin: 34px 0 58px;
  color: ${(props) => props.theme.white};
`

const NetworkButton = styled.button`
  width: 100%;
  padding: 0;
  background-color: transparent;
  border: unset;
  outline: none;
  cursor: pointer;
`

const ButtonLabel = styled(Text)`
  margin-left: 16px;
  flex-grow: 1;
  color: ${(props) => props.theme.white};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`

const ButtonSatus = styled(Text)`
  color: ${(props) => props.theme.white};
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: right;
`
class Network {
  public messageId: string

  public icon: string

  public label: string

  public isConnected: boolean

  constructor(messageId: string, icon: any, label: string, isConnected: boolean) {
    this.messageId = messageId
    this.icon = icon
    this.label = label
    this.isConnected = isConnected
  }
}

export const Networks = () => {
  const networks = [
    new Network('scenes.plugin.settings.networks.ethereum', 'ETH', 'Ethereum', true),
    new Network('scenes.plugin.settings.networks.polygon', 'MATIC', 'Polygon', false),
    new Network('scenes.plugin.settings.networks.near', 'NEAR', 'Near', false),
    new Network('scenes.plugin.settings.networks.fantom', 'FTM', 'Fantom', false),
    new Network('scenes.plugin.settings.networks.arbitrum', 'ETH', 'Arbitrum', false),
    new Network('scenes.plugin.settings.networks.optimist', 'ETH', 'Optimist', false)
  ]

  return (
    <>
      <NetworkHeading>
        <FormattedMessage
          id='scenes.plugin.settings.networks.heading'
          defaultMessage='Available networks'
        />
      </NetworkHeading>
      <SettingsList>
        {networks.map((network: Network) => (
          <li key={network.label}>
            <NetworkButton>
              <Flex justifyContent='space-between' alignItems='center'>
                <Icon size='24' name={network.icon} />
                <ButtonLabel>
                  <FormattedMessage id={network.messageId} defaultMessage={network.label} />
                </ButtonLabel>
                <ButtonSatus>{network.isConnected && 'Connected'}</ButtonSatus>
              </Flex>
            </NetworkButton>
          </li>
        ))}
      </SettingsList>
    </>
  )
}
