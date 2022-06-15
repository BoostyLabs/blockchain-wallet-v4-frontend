import React, { useState } from 'react'
import styled from 'styled-components'

import Revert from 'blockchain-wallet-v4-frontend/src/icons/Revert'

import { Text } from 'blockchain-info-components'

const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  background: transparent;
`

const CurrencyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 140px;
`

const TextWrapper = styled(Text)`
  font-size: ${(props) => props.size};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
`
const Input = styled.input`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: white;
  border: none;
  outline: none;
  background: transparent;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 38px;
  border-radius: 8px;
  background: black;
  outline: none;
  border: none;
  cursor: pointer;
`

const Amount: React.FC = () => {
  const [ethereumValue, setEthereumValue] = useState<string>('0.00')
  const [usdValue, setusdValue] = useState<string>('0.00')
  const [isEthereumMainCurrency, setIsEthereumMainCurrency] = useState<boolean>(true)

  // changes ethereum value and sets usd value.
  const changeEthereumValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEthereumValue(e.target.value)
    // TODO: calculate logic
    setusdValue(e.target.value)
  }

  // changes main currency, i.e ethereum/usd
  const changeMainCurrency = () => {
    setIsEthereumMainCurrency(!isEthereumMainCurrency)
  }

  return (
    <AmountWrapper>
      <CurrencyWrapper>
        <InputWrapper>
          <Input
            value={isEthereumMainCurrency ? ethereumValue : usdValue}
            onChange={changeEthereumValue}
            size={ethereumValue.length - 2}
          />
          <TextWrapper size='16px' lineHeight='21px' weight={600} color='white'>
            {isEthereumMainCurrency ? 'ETH' : 'USD'}
          </TextWrapper>
        </InputWrapper>
        <TextWrapper>
          {isEthereumMainCurrency ? `${usdValue} USD` : `${ethereumValue} ETH`}
        </TextWrapper>
      </CurrencyWrapper>
      <Buttons>
        <Button onClick={changeMainCurrency}>
          <Revert />
        </Button>
        <Button>
          <TextWrapper lineHeight='18px' size='12px' color='#0C6CF2' weight={500}>
            Max
          </TextWrapper>
        </Button>
      </Buttons>
    </AmountWrapper>
  )
}

export default Amount
