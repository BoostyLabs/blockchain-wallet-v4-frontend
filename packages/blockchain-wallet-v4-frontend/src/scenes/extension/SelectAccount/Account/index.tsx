import React, { MouseEvent, useState } from 'react'
import { IconCheckCircle } from '@blockchain-com/icons'
import Tooltip from 'blockchain-wallet-v4-frontend/src/scenes/extension/SelectAccount/Tooltip'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

import CopyIcon from '../../../../icons/CopyIcon'
import IconBitcoin from '../../../../icons/IconBitcoin'
import IconEthereum from '../../../../icons/IconEthereum'
import { SwapAccountType } from '..'

const AccountBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 0;
  cursor: pointer;
`

const CheckBlock = styled.div`
  position: relative;
  #tooltip {
    display: none;
  }
  &:hover {
    #tooltip {
      display: block;
    }
  }
`

const AccountInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto auto auto 16px;
  #tooltip {
    display: none;
  }
  &:hover {
    #tooltip {
      display: block;
    }
  }
`
const IconUncheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #20242c;
`
const WalletBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: copy;
`
class TooltipProperties {
  public backgroundColor: string

  public index: number

  public leftBlockPosition: number

  public leftTrianglePosition: number

  public text: string

  public textColor: string

  public constructor(
    backgroundColor,
    index,
    leftBlockPosition,
    leftTrianglePosition,
    text,
    textColor
  ) {
    this.backgroundColor = backgroundColor
    this.index = index
    this.leftBlockPosition = leftBlockPosition
    this.leftTrianglePosition = leftTrianglePosition
    this.text = text
    this.textColor = textColor
  }
}

type AccountProps = {
  account: SwapAccountType
  activeAccountIndex: number
  copiedWalletAddress: string | number
  setActiveAccountIndex: (activeAccountIndex: number) => void
  setCopiedWalletAddress: (copiedWalletAddress: string | number) => void
}

export const Account: React.FC<AccountProps> = ({
  account,
  activeAccountIndex,
  copiedWalletAddress,
  setActiveAccountIndex,
  setCopiedWalletAddress
}) => {
  const [copyTooltipProperties, setCopyTooltipProperties] = useState<TooltipProperties>(
    new TooltipProperties('#2C3038', 0, 50, 50, 'Copy to clipboard', '#98A1B2')
  )
  const defaultCopyTooltipProperties = new TooltipProperties(
    '#2C3038',
    0,
    50,
    50,
    'Copy to clipboard',
    '#98A1B2'
  )

  const copyAddress = (event: MouseEvent<HTMLDivElement>, address: string | number): void => {
    event.stopPropagation()
    navigator.clipboard.writeText(address.toString())
    setCopiedWalletAddress(address)
    setCopyTooltipProperties(
      new TooltipProperties('#0C6CF2', account.accountIndex, 50, 50, 'Copied!', '#0E121B')
    )
  }

  const shortingAddress = (address: string | number): string => {
    const addressString: string = address.toString()
    return `${addressString.slice(0, 4)}...${addressString.slice(-4)}`
  }

  return (
    <AccountBlock
      key={account.accountIndex}
      onClick={() => setActiveAccountIndex(account.accountIndex)}
    >
      {account.coin === 'ETH' ? (
        <IconEthereum size={24} color='none' />
      ) : (
        <IconBitcoin size={24} color='none' />
      )}
      <AccountInfo>
        {account.address === copiedWalletAddress ? (
          <Tooltip copyTooltipProperties={copyTooltipProperties} />
        ) : (
          <Tooltip copyTooltipProperties={defaultCopyTooltipProperties} />
        )}
        <WalletBlock
          onClick={(event: MouseEvent<HTMLDivElement>) => copyAddress(event, account.address)}
        >
          <Text
            size='16px'
            color='white'
            weight={600}
            lineHeight='150%'
            style={{ marginRight: '9px' }}
          >
            {shortingAddress(account.address)}
          </Text>
          <CopyIcon color={`${(props) => props.theme.exchangeLogin}`} size={16} />
        </WalletBlock>
        <Text size='14px' weight={500} lineHeight='150%' style={{ color: '#98A1B2' }}>
          $5,225.01
        </Text>
      </AccountInfo>
      {activeAccountIndex === account.accountIndex ? (
        <CheckBlock>
          <IconCheckCircle height='24px' width='24px' style={{ fill: '#65A5FF' }} />
          <Tooltip
            copyTooltipProperties={
              new TooltipProperties(
                '#0C6CF2',
                account.accountIndex,
                70,
                65,
                'Connected!',
                '#0E121B'
              )
            }
          />
        </CheckBlock>
      ) : (
        <CheckBlock>
          <IconUncheckCircle />
          <Tooltip
            copyTooltipProperties={
              new TooltipProperties('#2C3038', account.accountIndex, 50, 50, 'Connect', '#98A1B2')
            }
          />
        </CheckBlock>
      )}
    </AccountBlock>
  )
}

export default Account
