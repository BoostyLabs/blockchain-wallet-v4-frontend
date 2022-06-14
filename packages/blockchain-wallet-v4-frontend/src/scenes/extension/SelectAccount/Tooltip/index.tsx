import React from 'react'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

const TooltipText = styled(Text)`
  white-space: nowrap;
`

interface TooltipProps {
  backgroundColor: string
  index: number
  text: string
  textColor: string
}

const Tooltip: React.FC<{ copyTooltipProperties: TooltipProps }> = ({ copyTooltipProperties }) => {
  const TooltipWrapper = styled.div`
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 4px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${copyTooltipProperties.backgroundColor};
    &:before {
      content: '';
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid ${copyTooltipProperties.backgroundColor};
    }
  `
  return (
    <TooltipWrapper id='tooltip'>
      <TooltipText
        size='12px'
        lineHeight='150%'
        weight={500}
        color={copyTooltipProperties.textColor}
      >
        {copyTooltipProperties.text}
      </TooltipText>
    </TooltipWrapper>
  )
}

export default Tooltip
