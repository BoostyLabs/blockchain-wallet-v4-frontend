import React from 'react'
import { IconAlert } from '@blockchain-com/icons'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

const TooltipWrapper = styled.div`
  position: absolute;
  top: 90px;
  right: 270px;
  border-radius: 8px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 135px;
  border: 1px solid #ffa133;
  color: white;
  background: none;
`

const Tooltip: React.FC = () => {
  return (
    <TooltipWrapper id='invalidAddress'>
      <IconAlert height='24px' color='#FFA133' width='24px' />
      <Text size='14px' lineHeight='21px' weight={600} color='white'>
        Invalid address
      </Text>
    </TooltipWrapper>
  )
}

export default Tooltip
