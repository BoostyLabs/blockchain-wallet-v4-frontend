// @ts-nocheck
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'

interface TooltipProps {
  backgroundColor: string
  index: number
  leftBlockPosition: number
  leftTrianglePosition: number
  text: string
  textColor: string
}

const Tooltip: React.FC<{ copyTooltipProperties: TooltipProps }> = ({ copyTooltipProperties }) => {
  const TooltipText = styled(Text)`
    white-space: nowrap;
    color: ${copyTooltipProperties.textColor};
  `
  const TooltipWrapper = styled.div`
    position: absolute;
    top: -40px;
    left: ${copyTooltipProperties.leftBlockPosition}%;
    transform: translate(-${copyTooltipProperties.leftBlockPosition}%, 0);
    border-radius: 4px;
    padding: 6px;
    background: ${copyTooltipProperties.backgroundColor};
    &:before {
      content: '';
      position: absolute;
      top: 30px;
      left: ${copyTooltipProperties.leftTrianglePosition}%;
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
      <TooltipText size='12px' lineHeight='150%' weight={500}>
        {copyTooltipProperties.text}
      </TooltipText>
    </TooltipWrapper>
  )
}

export default Tooltip
