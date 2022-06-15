import React, { useState } from 'react'
import styled from 'styled-components'

import { IconArrowLeft, IconArrowUpRight } from '@blockchain-com/icons'

import EditGas from 'blockchain-wallet-v4-frontend/src/scenes/extension/SendConfirm/EditGas'

import { Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  padding: 27px 24px;
  height: 100%;
  background: #0e121b;
  position: relative;
`

const IconArrowLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  color: #677184;
`

const IconArrowUpRightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  background: #98a1b2;
`

const Title = styled(Text)`
  margin: 20px 0;
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
  color: white;
`

const SendInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px auto 0;
`

const WalletInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const NetworkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto 0;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 auto 30px;
`

const EditButton = styled.button`
  padding: 0;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  color: #0c6cf2;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
`

const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TextWrapper = styled(Text)`
  text-align: right;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 35px auto 0;
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

export const CancelButton = styled(Button)`
  color: #0c6cf2;
  background: transparent;
`

export const NextButton = styled(Button)`
  background: #0c6cf2;
  color: black;
`

const SendConfirm = () => {
  // indicates if edit gas popup is visible
  const [isEditGasPopupVisible, setIsEditGasPopupVisible] = useState<boolean>(false)

  // goes to previous scene
  const goToPreviousScene = () => {
    window.location.replace('/#/extension/sending')
  }

  // changes popup visibility
  const changePopupVisibility = () => {
    setIsEditGasPopupVisible(!isEditGasPopupVisible)
  }

  // TODO: mock data
  const SENDER_WALLET_ADDRESS = '0x0a5dA08D01829clE90b7A1eDfB8BE3a1231157Ee17'
  const RECEIVER_WALLET_ADDRESS = '0x0d7dB08D75679bbE90b7B1eDfB8BE3a16897Ee77'
  const ETHEREURM_PRICE = 0.00412
  const USD_PRICE = 0.00412
  const GAS_FEE_ETH_VALUE = 0.0000123
  const GAS_FEE_USD_VALUE = 8.09
  const TOTAL_ETH_VALUE = 5.4655

  // shows part of wallet address
  const showWalletAddress = (walletAddress: string) => {
    return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
  }

  return (
    <Wrapper>
      <IconArrowLeftWrapper onClick={goToPreviousScene}>
        <IconArrowLeft height='24px' width='24px' cursor='pointer' />
      </IconArrowLeftWrapper>
      <Title>Sending</Title>
      <div>
        <Text size='16px' lineHeight='24px' weight={500} color='white'>
          {ETHEREURM_PRICE} ETH
        </Text>
        <Text size='12px' lineHeight='18px' weight={500} color='white' opacity='0.7'>
          {USD_PRICE} USD
        </Text>
      </div>
      <SendInformation>
        <WalletInfo>
          <Text size='12px' lineHeight='18px' weight={500} color='white' opacity='0.7'>
            From
          </Text>
          <Text size='14px' lineHeight='21px' weight={500} color='white'>
            {showWalletAddress(SENDER_WALLET_ADDRESS)}
          </Text>
        </WalletInfo>
        <IconArrowUpRightWrapper>
          <IconArrowUpRight height='24px' width='24px' />
        </IconArrowUpRightWrapper>
        <WalletInfo>
          <Text size='12px' lineHeight='18px' weight={500} color='white' opacity='0.7'>
            To
          </Text>
          <Text size='14px' lineHeight='21px' weight={500} color='white'>
            {showWalletAddress(RECEIVER_WALLET_ADDRESS)}
          </Text>
        </WalletInfo>
      </SendInformation>
      <NetworkWrapper>
        <Text color='white' opacity='0.7'>
          Network
        </Text>
        <Text color='white' size='16px' lineHeight='24px' weight={600}>
          Ethereum mainnet
        </Text>
      </NetworkWrapper>
      <ButtonWrapper>
        <EditButton>Edit</EditButton>
      </ButtonWrapper>
      <AdditionalInfo>
        <Text size='12px' lineHeight='18px' weight={500} color='white' opacity='0.7'>
          Estimated Gas Fee
        </Text>
        <Text size='16px' lineHeight='24px' weight={600} color='white'>
          {GAS_FEE_ETH_VALUE} ETH
        </Text>
      </AdditionalInfo>
      <AdditionalInfo>
        <Text size='12px' lineHeight='18px' weight={500} color='white' opacity='0.7'>
          Likely in 30 seconds
        </Text>
        <Text size='14px' lineHeight='21px' weight={500} color='white' opacity='0.7'>
          {GAS_FEE_USD_VALUE} USD
        </Text>
      </AdditionalInfo>
      <TextWrapper size='14px' lineHeight='21px' weight={500} color='white' opacity='0.7'>
        Max Fee: {GAS_FEE_USD_VALUE} USD
      </TextWrapper>
      <ButtonWrapper>
        <EditButton onClick={changePopupVisibility}>Edit</EditButton>
      </ButtonWrapper>
      <TextWrapper size='14px' lineHeight='21px' weight={500} color='white' opacity='0.7'>
        Amount + Gas Fee
      </TextWrapper>
      <AdditionalInfo>
        <Text size='16px' lineHeight='24px' weight={600} color='white'>
          Total
        </Text>
        <Text size='16px' lineHeight='24px' weight={600} color='white'>
          {TOTAL_ETH_VALUE} ETH
        </Text>
      </AdditionalInfo>
      <TextWrapper size='14px' lineHeight='21px' weight={500} color='white' opacity='0.7'>
        {GAS_FEE_USD_VALUE} USD
      </TextWrapper>
      <TextWrapper size='14px' lineHeight='21px' weight={500} color='white' opacity='0.7'>
        Max Fee: {GAS_FEE_USD_VALUE} USD
      </TextWrapper>
      <Buttons>
        <CancelButton onClick={goToPreviousScene}>Back</CancelButton>
        <NextButton>Confirm</NextButton>
      </Buttons>
      {isEditGasPopupVisible && <EditGas changePopupVisibility={changePopupVisibility} />}
    </Wrapper>
  )
}

export default SendConfirm
