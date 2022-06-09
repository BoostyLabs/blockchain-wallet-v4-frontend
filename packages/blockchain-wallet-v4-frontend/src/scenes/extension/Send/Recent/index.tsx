import React from 'react'
import { WalletsWrapper } from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send'
import WalletItem from 'blockchain-wallet-v4-frontend/src/scenes/extension/Send/WalletItem'

const Recent: React.FC = () => {
  // TODO: mock recent wallets data.
  const recentWallets: string[] = [
    'J4Pd7dB08D75679bbE90b7B1eDfB8BE3a16897Ee77',
    'J4Ad7dB08D75679bbE90b7B1eDfB8BE3a16897Ee77'
  ]

  return (
    <WalletsWrapper>
      {recentWallets.map((address: string) => (
        <WalletItem walletAddress={address} key={address} />
      ))}
    </WalletsWrapper>
  )
}

export default Recent
