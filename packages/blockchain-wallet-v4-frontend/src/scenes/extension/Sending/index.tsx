import React, { useState } from 'react'
import styled from 'styled-components'

import {
  IconCheckCircle,
  IconChevronDownV2,
  IconClose,
  IconCloseCircle
} from '@blockchain-com/icons'

import Amount from 'blockchain-wallet-v4-frontend/src/scenes/extension/Sending/Amount'
import SelectCrypto from 'blockchain-wallet-v4-frontend/src/scenes/extension/Sending/SelectCrypto'
import CryptoItem, {
  CryptoCurrencyValues
} from 'blockchain-wallet-v4-frontend/src/scenes/extension/Sending/SelectCrypto/CryptoItem'

import { Text } from 'blockchain-info-components'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  align-items: flex-start;
  margin: 0 auto;
  padding: 27px 24px;
  height: 100%;
  background: #0e121b;
`

const IconCloseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  cursor: pointer;
`

const SavedWalletWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const SavedWallet = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  margin: 17px auto;
  width: 254px;
  overflow-wrap: break-word;
  word-break: break-word;
  border-radius: 8px;
  background: #20242c;
  color: #98a1b2;
`
const AssetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px auto;
  padding: 4px 20px;
  width: 271px;
  border-radius: 8px;
  background: black;
`

export const TextWrapper = styled(Text)`
  font-size: ${(props) => props.size};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  margin-top: 35px;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 120px auto 0;
  width: 100%;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 143px;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-style: normal;
  border: none;
  outline: none;
  cursor: pointer;
`

const CancelButton = styled(Button)`
  color: #0c6cf2;
  background: transparent;
`

const NextButton = styled(Button)`
  background: #0c6cf2;
  color: black;
`

const Sending: React.FC = () => {
  const [isSelectCryptoListVisible, setIsSelectCryptoListVisible] = useState<boolean>(false)

  // changes select crypto list visibility
  const changeSelectCryptoListVisibility = () => {
    setIsSelectCryptoListVisible(!isSelectCryptoListVisible)
  }

  // TODO: mock data
  const SAVED_WALLET_ADDRESS = '0x0d7dB08D75679bbE90b7B1eDfB8BE3a16897Ee77'
  const PRICE_ETH_VALUE: number = 5.2116;
  const PRICE_USD_VALUE: number = 5400.21;

  // goes to next scene, i.e send-confirm
  const goToSendConifrmScene = () => {
    window.location.replace('/#/extension/send-confirm')
  }

  // goes to previous scene, i.e send
  const goToPreviousScene = () => {
    window.location.replace('/#/extension/send')
  }

  return (
    <Wrapper>
      <IconCloseWrapper>
        <IconClose
          height='24px'
          width='24px'
          color='white'
          cursor='pointer'
          onClick={goToPreviousScene}
        />
      </IconCloseWrapper>
      <Text size='20px' lineHeight='30px' color='white' weight={500}>
        Send To
      </Text>
      <SavedWalletWrapper>
        <IconCloseCircle height='16px' width='16px' color='#98A1B2' onClick={goToPreviousScene} />
        <SavedWallet>
          <Text size='14px' lineHeight='21px' weight={500}>
            {SAVED_WALLET_ADDRESS}
          </Text>
          <IconCheckCircle height='24px' width='24px' color='#0C6CF2' />
        </SavedWallet>
      </SavedWalletWrapper>
      <TextWrapper lineHeight='18px' size='12px' color='#98A1B2' weight={500}>
        Asset
      </TextWrapper>
      <AssetWrapper>
        <CryptoItem
          name='Ethereum'
          label={CryptoCurrencyValues.ETH}
          price={PRICE_ETH_VALUE}
          USDPrice={PRICE_USD_VALUE}
        />
        <IconChevronDownV2 color='#98A1B2' onClick={changeSelectCryptoListVisibility} />
      </AssetWrapper>
      <TextWrapper lineHeight='18px' size='12px' color='#98A1B2' weight={500} margin-top='32px'>
        Amount
      </TextWrapper>
      <Amount />
      <Buttons>
        <CancelButton onClick={goToPreviousScene}>Cancel</CancelButton>
        <NextButton onClick={goToSendConifrmScene}>Next</NextButton>
      </Buttons>
      {isSelectCryptoListVisible && (
        <SelectCrypto changeSelectCryptoListVisibility={changeSelectCryptoListVisibility} />
      )}
    </Wrapper>
  )
}

export default Sending
