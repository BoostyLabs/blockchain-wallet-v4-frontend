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

const WalletItem: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
  return (
    <WalletWrapper id='walletItem'>
      <IconBlockchainCircle height='32px' color='#473BCB' width='32px' />
      <AccountInfo>
        <Text size='12px' lineHeight='18px' style={{ color: '#98A1B2' }} weight={500}>
          Blockchain.com trading account
        </Text>
        <Text size='14px' lineHeight='21px' color='white' weight={500}>
          {walletAddress}
        </Text>
      </AccountInfo>
    </WalletWrapper>
  )
}

export default WalletItem
