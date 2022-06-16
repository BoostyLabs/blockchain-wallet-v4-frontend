import React from 'react'
import styled from 'styled-components'

import { IconAlert } from '@blockchain-com/icons'

import { Text } from 'blockchain-info-components'

const TooltipWrapper = styled.div`
  top: 90px;
  position: absolute;
  padding: 17px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 232px;
  border-radius: 8px;
  border: 1px solid #ffa133;
  color: white;
  background: none;
`
const TextWrapper = styled(Text)`
  margin-left: 10px;
`

const Tooltip: React.FC<{ message: string }> = ({ message }) => {
  return (
    <TooltipWrapper id='invalidAddress'>
      <IconAlert height='24px' color='#FFA133' width='24px' />
      <TextWrapper size='14px' lineHeight='21px' weight={600} color='white'>
        {message}
      </TextWrapper>
    </TooltipWrapper>
  )
}

export default Tooltip
