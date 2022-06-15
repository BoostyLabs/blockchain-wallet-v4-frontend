import React from 'react'
import { IconBlockchainCircle } from '@blockchain-com/icons'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  cursor: pointer;
`

const AccountInfo = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`

const WalletAddressWrapper = styled(Text)`
  word-break: break-word;
`

const WalletAddressLabel = styled(Text)`
  color: '#98A1B2';
`

const WalletItem: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
  return (
    <WalletWrapper id='walletItem'>
      <IconBlockchainCircle height='32px' color='#473BCB' width='32px' />
      <AccountInfo>
        <WalletAddressWrapper size='12px' lineHeight='18px' color='white' weight={500}>
          {walletAddress}
        </WalletAddressWrapper>
        <WalletAddressLabel size='12px' lineHeight='18px' weight={500}>
          Blockchain.com trading account
        </WalletAddressLabel>
      </AccountInfo>
    </WalletWrapper>
  )
}

export default WalletItem
