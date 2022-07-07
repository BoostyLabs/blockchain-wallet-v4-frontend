import React, { useState } from 'react'
import { IconBlockchain } from '@blockchain-com/icons'
import styled, { keyframes } from 'styled-components'

import { Flex } from 'components/Flex'

import { Confirmation } from './Confirmation'

const ConnectWrapper = styled(Flex)`
  height: 100%;
  justify-content: center;
  align-items: center;
`
const showingFrames = keyframes`
  from { opacity: 0; transform: scale(0.1) }
  to { opacity: 1; transform: scale(1)}
`
const BlockchainIon = styled(IconBlockchain)`
  animation: ${showingFrames} 2s ease-in-out;
`
export type ConnectStep = 'InitialScreen' | 'Confirmation' | 'Connectiing' | 'Connected'

export const ConnectDapp = () => {
  const [connectStep, setConnectStep] = useState<ConnectStep>('Confirmation')

  const getConnectStep = () => {
    switch (connectStep) {
      case 'Confirmation':
        return <Confirmation setConnectStep={setConnectStep} />
      case 'Connectiing':
        return <>Connecting</>
      case 'Connected':
        return <></>
      default:
        return <BlockchainIon width='137px' height='137px' color='#fff' />
    }
  }
  return <ConnectWrapper>{getConnectStep()}</ConnectWrapper>
}
