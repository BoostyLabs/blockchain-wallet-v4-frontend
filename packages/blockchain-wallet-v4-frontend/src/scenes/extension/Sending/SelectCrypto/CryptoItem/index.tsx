import React from 'react'
import styled from 'styled-components'

import { IconBlockchainCircle, IconMoneyUsd } from '@blockchain-com/icons'

import { Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 4fr 1fr;
  margin: 0 auto;
  background: transparent;
  width: 90%;
  padding: 10px 0;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CurrencyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 70%;
  padding-left: 10px;
`

const PriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
`

const TextWrapper = styled(Text)`
  font-size: ${(props) => props.size};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
`

export enum CryptoCurrencyValues {
  ETH = 'ETH',
  USDC = 'USDC'
}

// Defines incoming crypto item component props
export class CryptoCurrency {
  constructor(
    public name: string,
    public label: CryptoCurrencyValues,
    public price: number,
    public USDPrice: number
  ) {
    this.name = name
    this.label = label
    this.price = price
    this.USDPrice = USDPrice
  }
}

const CryptoItem: React.FC<CryptoCurrency> = ({ USDPrice, label, name, price }) => {
  return (
    <Wrapper>
      <IconWrapper>
        {label === CryptoCurrencyValues.ETH ? (
          <IconBlockchainCircle height='32px' width='32px' color='#473BCB' />
        ) : (
          <IconMoneyUsd height='32px' width='32px' color='#2775CA' />
        )}
      </IconWrapper>
      <CurrencyWrapper>
        <TextWrapper size='16px' lineHeight='24px' weight={600} color='white'>
          {name}
        </TextWrapper>
        <TextWrapper lineHeight='21px' size='12px' color='#98A1B2' weight={500}>
          {label}
        </TextWrapper>
      </CurrencyWrapper>
      <PriceWrapper>
        <TextWrapper size='16px' lineHeight='24px' weight={600} color='white'>
          {price}
        </TextWrapper>
        <TextWrapper lineHeight='21px' size='12px' color='#98A1B2' weight={500}>
          {USDPrice}
        </TextWrapper>
      </PriceWrapper>
    </Wrapper>
  )
}

export default CryptoItem
