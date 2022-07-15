import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Icon } from '@blockchain-com/constellation'
import { IconCheck } from '@blockchain-com/icons'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

import { Continue } from '../SelectAccount'

const ImageWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SuccessMessage = styled(Text)`
  margin-top: 20px;
  text-align: center;
`

export const Success = () => {
  return (
    <>
      <ImageWrapper>
        <Icon size='lg' color='blue300' label='icon Check'>
          <IconCheck />
        </Icon>
        <SuccessMessage>
          Success! <br />
          Your funds are now available
        </SuccessMessage>
      </ImageWrapper>
      <Continue style={{ width: 'unset' }} to='/extension/home'>
        <FormattedMessage id='buttons.continue' defaultMessage='Continue' />
      </Continue>
    </>
  )
}
