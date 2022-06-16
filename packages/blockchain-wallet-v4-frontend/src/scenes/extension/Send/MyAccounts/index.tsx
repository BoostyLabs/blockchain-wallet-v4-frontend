import React from 'react'

import { WalletsWrapper } from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send'
import WalletItem from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/WalletItem'

const MyAccounts: React.FC = () => {
  // TODO: mock accounts wallets data.
  const myAccounts: string[] = [
    'A4Pd7dB08D75679bbE90b7B1eDfB8BE3a16897Ee77',
    'B4Ad7dB08D75679bbE90b7B1eDfB8BE3a16897Ee77'
  ]

  return (
    <WalletsWrapper>
      {myAccounts.map((address: string) => (
        <WalletItem walletAddress={address} key={address} />
      ))}
    </WalletsWrapper>
  )
}

export default MyAccounts
