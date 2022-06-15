import React, { useState } from 'react'
import styled from 'styled-components'

import { IconArrowLeft, IconSearch } from '@blockchain-com/icons'

import CryptoItem, {
  CryptoCurrency,
  CryptoCurrencyValues
} from 'blockchain-wallet-v4-frontend/src/scenes/extension/Sending/SelectCrypto/CryptoItem'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0e121b;
`

const IconArrowLeftWrapper = styled.div`
  margin: 25px 0 0 25px;
`

const IconSearchWrrapper = styled.div`
  position: absolute;
  top: 110px;
  right: 30px;
  height: 24px;
  width: 24px;
  color: #677184;
`

const Input = styled.input`
  width: 256px;
  height: 48px;
  border-radius: 8px;
  background: transparent;
  margin: 45px auto 25px;
  padding: 0 52px 0 16px;
  border: 1px solid #4d515b;
  font-size: 16px;
  line-height: 24px;
  color: #677184;
  outline: none;
`

const SelectCrypto: React.FC<{ changeSelectCryptoListVisibility: () => void }> = ({
  changeSelectCryptoListVisibility
}) => {
  const [searchedWallet, setSearchedWallet] = useState<string>('')

  // searches wallet
  const searchWallet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedWallet(e.target.value)
  }

  const cryptoCurrencies: CryptoCurrency[] = [
    new CryptoCurrency('Ethereum', CryptoCurrencyValues.ETH, 5.2116, 5400.21),
    new CryptoCurrency('USD Coin', CryptoCurrencyValues.USDC, 5.2116, 5400.21)
  ]

  return (
    <Wrapper>
      <IconArrowLeftWrapper>
        <IconArrowLeft
          width='16px'
          height='16px'
          color='#677184'
          onClick={changeSelectCryptoListVisibility}
        />
      </IconArrowLeftWrapper>
      <Input placeholder='Search coins' value={searchedWallet} onChange={searchWallet} />
      <IconSearchWrrapper>
        <IconSearch />
      </IconSearchWrrapper>
      {cryptoCurrencies.map((cryptoCurrency: CryptoCurrency) => (
        <CryptoItem
          key={cryptoCurrency.name}
          name={cryptoCurrency.name}
          label={cryptoCurrency.label}
          price={cryptoCurrency.price}
          USDPrice={cryptoCurrency.USDPrice}
        />
      ))}
    </Wrapper>
  )
}

export default SelectCrypto
