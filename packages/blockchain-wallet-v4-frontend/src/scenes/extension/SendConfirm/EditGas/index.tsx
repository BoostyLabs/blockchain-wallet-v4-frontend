import React from 'react'
import styled from 'styled-components'

import { IconCloseCircle } from '@blockchain-com/icons'

import { Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
`

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  padding: 25px;
  left: 25px;
  top: 95px;
  width: 260px;
  height: 311px;
  border-radius: 16px;
  background: #0e121b;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const AdditionalInformationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 280px;
`

const BlueText = styled(Text)`
  color: #0c6cf2;
`

const PriorityList = styled.ul`
  display: flex;
  padding: 0;
  width: 176px;
  justify-content: space-between;
`

const PriorityItem = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: #98a1b2;

  #low,
  #medium,
  #high {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #98a1b2;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;

    :checked {
      border: 1px solid #0c6cf2;
      ::after {
        position: absolute;
        content: '';
        top: 4px;
        left: 4px;
        height: 14px;
        width: 14px;
        border-radius: 50%;
        background: #0c6cf2;
      }
    }
  }
`

const LeftDivider = styled.div`
  position: absolute;
  left: 30px;
  top: 15px;
  width: 45px;
  height: 1px;
  background: #98a1b2;
`

const RightDivider = styled.div`
  position: absolute;
  right: 29px;
  top: 15px;
  width: 45px;
  height: 1px;
  background: #98a1b2;
`

const Button = styled.button`
  margin-top: 30px;
  height: 48px;
  width: 242px;
  background: #0c6cf2;
  border-radius: 8px;
  outline: none;
  border: none;
`

const EditGas: React.FC<{ changePopupVisibility: () => void }> = ({ changePopupVisibility }) => {
  // TODO: mock data
  const EXPECTED_FEE_VALUE = 0.00286997
  const MAX_GAS_FEE_ETH_VALUE = 0.00302092
  const MAX_GAS_FEE_USD_VALUE = 9.09

  return (
    <Wrapper>
      <Popup>
        <IconWrapper>
          <IconCloseCircle
            height='24px'
            width='24px'
            color='#63676F'
            onClick={changePopupVisibility}
          />
        </IconWrapper>
        <Text size='16px' lineHeight='24px' weight={600} color='white'>
          Edit priority
        </Text>
        <AdditionalInformationWrapper>
          <Text size='32px' lineHeight='40px' weight={600} color='white'>
            ~{EXPECTED_FEE_VALUE}
          </Text>
          <Text size='12px' lineHeight='18px' weight={500}>
            Max fee: {MAX_GAS_FEE_ETH_VALUE} ({MAX_GAS_FEE_USD_VALUE} USD)
          </Text>
          <PriorityList>
            <PriorityItem>
              <label className='outer' htmlFor='low'>
                <input type='checkbox' id='low' />
                <Text>Low</Text>
              </label>
              <LeftDivider />
            </PriorityItem>
            <PriorityItem>
              <label className='outer' htmlFor='medium'>
                <input type='checkbox' id='medium' />
                <Text>Medium</Text>
              </label>
            </PriorityItem>
            <PriorityItem>
              <label className='outer' htmlFor='high'>
                <input type='checkbox' id='high' />
                <Text>High</Text>
              </label>
              <RightDivider />
            </PriorityItem>
          </PriorityList>
          <Text size='12px' lineHeight='18px' weight={500}>
            Likely in 30 seconds
          </Text>
          <BlueText size='12px' lineHeight='18px' weight={600}>
            Advanced Options
          </BlueText>
          <BlueText size='12px' lineHeight='18px' weight={500}>
            How i should choose
          </BlueText>
          <Button onClick={changePopupVisibility}>
            <Text size='16px' lineHeight='24px' weight={600} color='black'>
              Save
            </Text>
          </Button>
        </AdditionalInformationWrapper>
      </Popup>
    </Wrapper>
  )
}

export default EditGas
